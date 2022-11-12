import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import '@firebase/firestore'
import 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import 'firebase/performance'

const FirebaseCredentials = {
  apiKey: 'AIzaSyApV5D3FLttjYjlA7PExm-E7dTrf1BimBM',
  authDomain: 'sharestock-app.firebaseapp.com',
  projectId: 'sharestock-app',
  storageBucket: 'sharestock-app.appspot.com',
  messagingSenderId: '571999392036',
  appId: '1:571999392036:web:703f66a957acfb1869a3b1',
  measurementId: 'G-F13HGEFG33'
}

export default function (): FirebaseApp | null {
  if (!getApps.length) {
    const app = initializeApp(FirebaseCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ('measurementId' in FirebaseCredentials) {
        getAnalytics()
      }
    }
    console.log('Firebase was successfully initialized.')
    return app
  }

  return null
}
