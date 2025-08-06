'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase"; // relativer Pfad
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || "Benutzer");
        } else {
          setName("Unbekannt");
        }
      } catch (err) {
        setName("Fehler beim Laden");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return <p className="p-10 text-xl">Lade...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl mb-4 font-bold">Willkommen, {name}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </main>
  );
}
