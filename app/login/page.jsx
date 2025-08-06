'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Dashboard() {
  const [name, setName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name); // 👈 zieht den Firestore-Namen
        } else {
          console.log('Kein Name im Firestore gefunden');
          setName('Unbekannter Held');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Willkommen {name ? name : '...wird geladen'}!</h1>
    </div>
  );
}
