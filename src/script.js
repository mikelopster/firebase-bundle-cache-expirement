import { db } from './config.js'

import {
  collection,
  getDocsFromCache,
  onSnapshot,
  namedQuery,
  loadBundle
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

/*
main data
*/

let posts = []

const loadPostsBundle = async () => {
  let urlBundle = 'http://127.0.0.1:9199/test/firestore-data-bundles/bundles.txt'

  // Get Bundle data from GCS and load it
  const response = await axios.get(urlBundle)
  await loadBundle(db, response.data)

  // retrieve from the loaded Bundle data
  const query = await namedQuery(db, 'posts-bundle')
  const snaps = await getDocsFromCache(query)

  posts = snaps.docs.map(snap => snap.data())
  console.log('== load posts from bundle', posts)
}

const loadPostsFromCache = async () => {
  // load post from firestore cache (on local)
  const snaps = await getDocsFromCache(collection(db, 'posts'))
  posts = snaps.docs.map(snap => snap.data())
  console.log('== load posts (cache)', posts)
}

const loadPosts = async () => {
  const q = collection(db, 'posts')
  // add snapshot for subscribe posts
  onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    const source = snapshot.metadata.fromCache ? 'local cache' : 'server'
    console.log('source', source)
    let currentPost = []

    snapshot.docChanges().forEach((change) => {
      currentPost.push(change.doc.data())
      posts.push(change.doc.data())
    })

    console.log('== posts', posts)
  })
}

const main = async () => {
  await loadPostsBundle()
  await loadPostsFromCache()
  // loadPosts()
}

main()