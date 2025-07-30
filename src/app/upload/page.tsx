// Upload Page (src/app/upload/page.tsx)
"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return alert("No file selected");
    alert(`Uploading: ${selectedFile.name}`);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Your Notes</h1>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-4 border-dashed p-8 text-center rounded-md mb-4"
      >
        {selectedFile ? (
          <p>Selected: {selectedFile.name}</p>
        ) : (
          <p>Drag & drop a PDF or click to select a file</p>
        )}
      </div>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
    </main>
  );
}
