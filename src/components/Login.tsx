"use client";

import { auth, provider, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // You can store token in Zustand or cookies if needed
      console.log("User Info:", user);
      console.log("JWT Token:", token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Sign In with Google
      </button>
    </div>
  );
}
