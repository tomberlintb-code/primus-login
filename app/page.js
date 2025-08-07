'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Hallo Primus!</h1>
      <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Zum Login
      </Link>
    </main>
  );
}
