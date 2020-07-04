const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./cammit-covid-19-firebase-adminsdk-hklss-b309173335.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cammit-covid-19.firebaseio.com',
})
const defaultStorage = admin.storage()

exports.sendFile = functions
  .region('europe-west2')
  .storage.object()
  .onFinalize(async (object) => {
    if (!object.name.startsWith('chatFileUpload')) return

    const uid = object.name.split('/')[2]
    const userType = object.name.split('/')[1]
    const fileKind = object.contentType.split('/')[0]
    const fileExt = object.contentType.split('/')[1]
    const fileName = object.name.split('/')[3]

    const bucket = defaultStorage.bucket(object.bucket)
    const file = bucket.file(object.name)

    const options = {
      action: 'read',
      expires: '03-17-2025',
    }

    // Get a signed URL for the file
    const urls = await file.getSignedUrl(options)
    const url = urls[0]

    const doc = await admin.firestore().collection(userType).doc(uid).get()
    const data = doc.data()
    let tokens
    try {
      tokens = data.tokens
      console.log(tokens)
    } catch (error) {
      console.log('Token error:', error)
      return
    }

    const message = {
      tokens: tokens,
      data: {
        file: url,
        fileType: fileKind,
        fileExt: fileExt,
        fileName: fileName,
      },
    }

    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        if (response.failureCount > 0) {
          const failedTokens = []
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(registrationTokens[idx])
            }
          })
          console.log('List of tokens that caused failures: ' + failedTokens)
        }
        console.log(response.successCount + ' messages were sent successfully')
        return
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
  })
