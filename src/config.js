// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"

import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

// Your web app's Firebase configuration (your config)
const firebaseConfig = {
  apiKey: "...",
  databaseURL: "...",
  projectId: "..."
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)

// change it to Firestore with cache mode
const db = initializeFirestore(app, {localCache:
  persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
})

/* To use emulator */
connectFirestoreEmulator(db, '127.0.0.1', 8080)
/* end of firebase */

export {
  db
}