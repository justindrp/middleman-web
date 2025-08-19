// src/lib/firebase-admin.ts
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);

const app = getApps()[0] ?? initializeApp({
  credential: cert(svc),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminBucket = getStorage().bucket();
