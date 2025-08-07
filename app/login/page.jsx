'use client';

import { useState } from "react";
console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase"; // relativer Pfad
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, passwort);
      const uid = userCredential.user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const name = docSnap.exists() ? docSnap.data().name : "Benutzer";

      sessionStorage.setItem("username", name);
      router.push("/dashboard");
    } catch (err) {
      setError("Login fehlgeschlagen. Prüfe deine Daten.");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl mb-6 font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Passwort"
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Einloggen
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
