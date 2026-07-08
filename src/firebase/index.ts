import { getApps, FirebaseApp, initializeApp } from 'firebase/app'

interface IFirebaseCredentials {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

const FirebaseCredentials: IFirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
}

const initializeFirebase = (credentials: IFirebaseCredentials): FirebaseApp => {
  const app = initializeApp(credentials)
  return app
}

const getFirebaseApp = (): FirebaseApp | null => {
  const apps = getApps()
  if (!apps.length) {
    return initializeFirebase(FirebaseCredentials)
  }
  return apps[0]
}

export default getFirebaseApp
