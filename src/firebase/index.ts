import { getApps, FirebaseApp, initializeApp } from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import '@firebase/firestore'
import 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import 'firebase/performance'

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
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
}

const initializeFirebase = (credentials: IFirebaseCredentials): FirebaseApp => {
  const app = initializeApp(credentials)
  if (typeof window !== 'undefined') {
    if ('measurementId' in credentials) {
      getAnalytics()
    }
  }
  console.log('Firebase was successfully initialized.')
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
