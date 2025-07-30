/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// Grab configuration from environment variables.  If the variables are not
// defined (such as during static site generation) default to empty strings
// to avoid Firebase throwing an invalid API key error on the server.  The
// app will only be initialised on the client where the keys are present.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

let app: any;
// Declare `auth` and `provider` with the `any` type so the compiler will
// not complain when they are undefined on the server.  They will be
// properly initialised on the client where Firebase can run.
let auth: any;
let provider: any;
// Only initialise Firebase when running in the browser.  This avoids
// executing Firebase code during server‑side rendering, which would
// otherwise throw an `auth/invalid-api-key` error if the keys are missing.
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

export { auth, provider, signInWithPopup, signOut };
