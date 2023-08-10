const admin = require('firebase-admin')
admin.initializeApp({
  projectId: 'bundle-firebase-test'
})

const db = admin.firestore()
const storage = admin.storage()

module.exports = { admin, db, storage }