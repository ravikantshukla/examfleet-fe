"use client";

// Force dynamic rendering because this page uses Firebase Auth on the
// client.  Without this directive Next.js would attempt to pre‑render
// the page during the build phase.
export const dynamic = 'force-dynamic';

import { useState, useEffect, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useProgressStore } from '@/store/useProgressStore';

/**
 * The upload page allows the user to drag and drop a PDF for
 * summarisation.  When the file is uploaded it sends a POST request
 * to the `/api/summarize` endpoint and displays the returned summary.
 * Each successful upload increments the notes counter and awards XP.
 */
export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const { incrementNotes, gainXp } = useProgressStore();

  // Require authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }
    setLoading(true);
    setSummary(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const res = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSummary(data.summary ?? 'No summary generated.');
      // update progress: note uploaded and some XP (e.g. 5 XP per upload)
      incrementNotes();
      gainXp(5);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload and summarise the file.');
    } finally {
      setLoading(false);
    }
  };

  if (!userChecked) return null;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload and Summarize Notes</h1>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-4 border-dashed p-8 text-center rounded-md mb-4 cursor-pointer"
        onClick={() => {
          const input = document.getElementById('file-input');
          input?.click();
        }}
      >
        {selectedFile ? (
          <p>Selected: {selectedFile.name}</p>
        ) : (
          <p>Drag & drop a PDF or click to select a file</p>
        )}
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
        onClick={handleUpload}
        disabled={loading || !selectedFile}
      >
        {loading ? 'Summarizing...' : 'Upload & Summarize'}
      </button>
      {summary && (
        <div className="mt-6 bg-gray-50 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="whitespace-pre-line text-gray-800">{summary}</p>
        </div>
      )}
    </main>
  );
}