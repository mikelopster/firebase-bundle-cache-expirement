const { db, storage } = require('./firebaseConfig')
const LoremIpsum = require("lorem-ipsum").LoremIpsum

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  }
})

const fs = require('fs')

const postsRef = db.collection('posts')
const bundle = db.bundle()
const BUCKET_NAME = 'test'

const categoriesList = ['programming', 'firebase', 'flutter', 'golang']
const tagsList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const generatePosts = async () => {
  const uid = 'test'
  const description = lorem.generateSentences(5)

  for (let i = 0; i < 100; i++) {
    const category = categoriesList[Math.floor(Math.random() * categoriesList.length)]
    const tags = [
      tagsList[Math.floor(Math.random() * tagsList.length)],
      tagsList[Math.floor(Math.random() * tagsList.length)]
    ]

    await postsRef.add({
      uid,
      category,
      description,
      tags
    })
  }
  console.log('run')
}

const generateBundle = async () => {
  let querySnapshot = await postsRef.get()
  const bundleBuffer = bundle.add('posts-bundle', querySnapshot)
  const timestamp = Date.now()
  const buffer = await bundleBuffer.build()
  console.log('build bundle', bundleBuffer)

  // write them out locally for upload
  const bundledFilePath = `./test/${timestamp}.txt`
  fs.writeFileSync(bundledFilePath, buffer)

  // Upload the file to GCS
  const destination = `firestore-data-bundles/bundles.txt`
  await storage.bucket(BUCKET_NAME).upload(bundledFilePath,
    {
      destination,
      public: true,
      metadata: { cacheControl: `public, max-age=60` }
    })

    console.log(`uploaded to https://storage.googleapis.com/${BUCKET_NAME}/${destination}`)
}

const main = async () => {
  // let postSnapshot = await postsRef.get()
  // console.log('post count', postSnapshot.size)
  await generatePosts()
  await generateBundle()
}

main()
