import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { GoogleSignin } from '@react-native-community/google-signin'
import { AsyncStorage, Platform, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import {
  START_FB_SIGNIN,
  FB_SIGNIN_SUCCESS,
  FB_SIGNIN_FAILED,
  START_GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILED,
  START_EMAIL_PASSWORD_LOGIN,
  EMAIL_PASSWORD_LOGIN_SUCCESS,
  DOCTOR_EMAIL_PASSWORD_LOGIN_SUCCESS,
  EMAIL_PASSWORD_LOGIN_FAILED,
  START_USER_FETCH_FROM_ASYNC,
  USER_FETCH_FROM_ASYNC_FAILED,
  USER_FETCH_FROM_ASYNC_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
  START_SIGN_OUT,
  PICKER_IMAGE_SOURCE_SUCCESS,
  UPLOAD_IMAGE_STARTED,
  UPLOAD_IMAGE_FINISHED,
  FIRESTORE_UPLOAD_STARTED,
  FIRESTORE_UPLOAD_FAILED,
  FIRESTORE_UPLOAD_SUCCESS,
  START_EMAIL_PASSWORD_SIGNIN,
  EMAIL_PASSWORD_SIGNIN_SUCCESS,
  EMAIL_PASSWORD_SIGNIN_FAILED,
  DOCTOR_GOOGLE_SIGN_IN_SUCCESS,
  DOCTOR_FB_SIGNIN_SUCCESS,
  DOCTOR_EMAIL_PASSWORD_SIGNIN_SUCCESS,
  DOCTOR_USER_FETCH_FROM_ASYNC_SUCCESS,
  DOCTOR_PROFILE_CREATE_UPDATE,
  DOCTOR_PROFILE_CREATE_START,
  DOCTOR_PROFILE_CREATE_SUCCESS,
  DOCTOR_PROFILE_CREATE_FAILED,
  DOCTOR_PROFILE_UPDATE_START,
  DOCTOR_PROFILE_UPDATE_SUCCESS,
  DOCTOR_PROFILE_UPDATE_FAILED,
  DOCTOR_AVAILABLE_LIST_FETCH_START,
  DOCTOR_AVAILABLE_LIST_FETCH_SUCCESS,
  DOCTOR_AVAILABLE_LIST_FETCH_FAILED,
  AVATAR_FORM_UPLOAD_STARTED,
  AVATAR_FORM_UPLOAD_SUCCESS,
  AVATAR_FORM_UPLOAD_FAILED,
  AVATAR_VOICE_ANSWER_UPLOAD_STARTED,
  AVATAR_VOICE_ANSWER_UPLOAD_SUCCESS,
  AVATAR_VOICE_ANSWER_UPLOAD_FAILED,
  INITIALIZING_USER_SUCCESS,
  INITIALIZING_USER_STARTED,
  INITIALIZING_USER_FAILED,
  INITIALIZING_DOCTOR_STARTED,
  INITIALIZING_DOCTOR_SUCCESS,
  INITIALIZING_DOCTOR_FAILED,
  BOOKING_APPOINTMENT_FOR_DOCTOR_STARTED,
  BOOKING_APPOINTMENT_FOR_DOCTOR_SUCCESS,
  BOOKING_APPOINTMENT_FOR_DOCTOR_FAILED,
} from './types'
import { act } from 'react-test-renderer'
import { exp } from 'react-native-reanimated'
import backend_api from '../credentials/api.json'

function bootstrap() {
  GoogleSignin.configure({
    scopes: ['profile', 'email'],
    webClientId:
      '849034506077-8n89fq2qn7plsj3vgerriueovdcl59et.apps.googleusercontent.com',
  })
}

async function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      alert('Signed out')
      return true
    })
    .catch(function (error) {
      console.log('signout failed', error)
      return false
      // An error happened
    })
}

async function saveUser(user) {
  try {
    await AsyncStorage.setItem('user_details', JSON.stringify(user))
    console.log('saved user')
  } catch (error) {
    console.log('error saving user', error)
    // Error saving data
  }
}

async function updateUser(user) {
  try {
    await AsyncStorage.mergeItem('user_details', JSON.stringify(user))
    console.log('updated user')
    fetchUser()
  } catch (error) {
    console.log('error updating user', error)
    // Error saving data
  }
}

async function clearUser() {
  try {
    console.log('clear data')
    await AsyncStorage.removeItem('user_details')
    return true
  } catch (error) {
    console.log('error saving user', error)
    return false
    // Error saving data
  }
}

export const userSignout = () => {
  console.log('signout start')
  return async (dispatch) => {
    dispatch({
      type: START_SIGN_OUT,
    })
    try {
      if (logout) {
        console.log('signout success')
        clearUser()
        dispatch({
          type: SIGN_OUT_SUCCESS,
        })
      } else {
        console.log('signout failed')
        dispatch({
          type: SIGN_OUT_FAILED,
        })
      }
    } catch (error) {
      console.log('signout failed', error)
      dispatch({
        type: SIGN_OUT_FAILED,
      })
    }
  }
}
export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({
      type: START_USER_FETCH_FROM_ASYNC,
    })
    try {
      {
        /*const value = await firebase.auth().onAuthStateChanged(function(user) {
               if (user) {
                    console.log("user is signed in, user data: " ,user)
                    dispatch({
                        type: USER_FETCH_FROM_ASYNC_SUCCESS,
                        payload: user
                    });
               }
               else {
                   console.log(" no user signed in")
                   dispatch({
                       type: USER_FETCH_FROM_ASYNC_FAILED,
                   })
               }
            });
        */
      }
      const value = await AsyncStorage.getItem('user_details')
      if (value !== null) {
        // We have data!!
        console.log(' value from async storage', value)
        var user = JSON.parse(value)
        if (user.profile === 'doctor') {
          dispatch({
            type: DOCTOR_USER_FETCH_FROM_ASYNC_SUCCESS,
            payload: JSON.parse(value),
          })
        } else {
          dispatch({
            type: USER_FETCH_FROM_ASYNC_SUCCESS,
            payload: JSON.parse(value),
          })
        }
      } else {
        console.log('value not saved its null')
        dispatch({
          type: USER_FETCH_FROM_ASYNC_FAILED,
        })
      }
    } catch (error) {
      console.log('error loading timestamp')
      dispatch({
        type: USER_FETCH_FROM_ASYNC_FAILED,
      })
      // Error retrieving data
    }
  }
}
export const googleSignin = (profileType) => {
  bootstrap()
  return async (dispatch) => {
    dispatch({
      type: START_GOOGLE_SIGN_IN,
    })
    try {
      await GoogleSignin.hasPlayServices()
      const user = await GoogleSignin.signIn()
      console.log('user fetch google login', user)
      console.log('fetch tokens', GoogleSignin.getTokens())
      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      )
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          var user = result.user
          if (profileType === 'doctor') {
            console.log('writting data to doctor profile and firebase.')
            var userDict = {
              id: user.uid,
              fullname: user.displayName,
              email: user.email,
              profileURL: user.photoURL,
              profile: profileType,
            }
            var temp = {
              id: user.uid,
              profile: profileType,
              google: {
                fullname: user.displayName,
                email: user.email,
                profileURL: user.photoURL,
              },
            }
            firestore().collection('doctors').doc(user.uid).update(temp)
            saveUser(userDict)
            dispatch({
              type: DOCTOR_GOOGLE_SIGN_IN_SUCCESS,
              payload: userDict,
            })
          } else {
            var userDict = {
              id: user.uid,
              fullname: user.displayName,
              email: user.email,
              profileURL: user.photoURL,
              BasicDetails: {},
              profile: profileType,
            }
            var temp = {
              id: user.uid,
              imageNumber: 0,
              profile: profileType,
              email: user.email,
              profileURL: user.photoURL,
              fullname: user.displayName,
              google: {
                fullname: user.displayName,
                email: user.email,
                profileURL: user.photoURL,
              },
              BasicDetails: {},
              imageData: {
                imageSubData: {
                  imageName: '',
                  imageDownloadUrl: '',
                },
              },
              healthTimeline: {
                PHQ8Value: [
                  { ScaleValue: 0, Date: '20/04', Time: ' ' },
                  { ScaleValue: 3, Date: '20/04', Time: ' ' },
                  { ScaleValue: 22, Date: '03/05', Time: ' ' },
                  { ScaleValue: 15, Date: '10/05', Time: ' ' },
                  { ScaleValue: 18, Date: '16/05', Time: ' ' },
                  { ScaleValue: 20, Date: '23/05', Time: ' ' },
                  { ScaleValue: 22, Date: '30/05', Time: ' ' },
                  { ScaleValue: 24, Date: '06/06', Time: ' ' },
                ],
              },
            }
            console.log('google signIn success from patient')
            firestore().collection('users').doc(user.uid).update(temp)
            saveUser(userDict)
            dispatch({
              type: GOOGLE_SIGN_IN_SUCCESS,
              payload: userDict,
            })
          }
        })
        .catch((error) => {
          clearUser()
          dispatch({
            type: GOOGLE_SIGN_IN_FAILED,
            payload: error.code,
          })
          console.log('google signin failed', error.error)
          alert('Please try again! ' + error.error)
        })
    } catch (error) {
      console.log('google login error', error)
      clearUser()
      dispatch({
        type: GOOGLE_SIGN_IN_FAILED,
        payload: error.message,
      })
      alert('Please try again!' + error)
    }
  }
}
export const fbSignin = (profileType) => {
  return async (dispatch) => {
    dispatch({
      type: START_FB_SIGNIN,
    })
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        throw new Error('User cancelled the login process')
        dispatch({
          type: FB_SIGNIN_FAILED,
          payload: 'User cancelled the login process',
        })
      } else {
        const data = await AccessToken.getCurrentAccessToken()
        if (!data) {
          dispatch({
            type: FB_SIGNIN_FAILED,
            payload: 'Fetching fb token failed',
          })
        } else {
          const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken
          )
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
              var user = result.user
              if (profileType === 'doctor') {
                var userDict = {
                  id: user.uid,
                  fullname: user.displayName,
                  email: user.email,
                  profileURL: user.photoURL,
                  profile: profileType,
                }
                console.log('uploading data on firestore')
                var temp = {
                  id: user.uid,
                  profile: profileType,
                  fb: {
                    fullname: user.displayName,
                    email: user.email,
                    profileURL: user.photoURL,
                  },
                }
                firestore().collection('doctors').doc(user.uid).update(temp)
                saveUser(userDict)
                console.log('upload finished')
                dispatch({
                  type: DOCTOR_FB_SIGNIN_SUCCESS,
                  payload: userDict,
                })
              } else {
                var userDict = {
                  id: user.uid,
                  fullname: user.displayName,
                  email: user.email,
                  profileURL: user.photoURL,
                  BasicDetails: {},
                  profile: profileType,
                }
                console.log('uploading data on firestore')
                var temp = {
                  id: user.uid,
                  imageNumber: 0,
                  profile: profileType,
                  email: user.email,
                  profileURL: user.photoURL,
                  fb: {
                    fullname: user.displayName,
                    email: user.email,
                    profileURL: user.photoURL,
                  },
                  BasicDetails: {
                    fullname: user.displayName,
                  },
                  imageData: {
                    imageSubData: {
                      imageName: '',
                      imageDownloadUrl: '',
                    },
                  },
                  healthTimeline: {
                    PHQ8Value: [
                      { ScaleValue: 0, Date: '20/04', Time: ' ' },
                      { ScaleValue: 3, Date: '20/04', Time: ' ' },
                      { ScaleValue: 22, Date: '03/05', Time: ' ' },
                      { ScaleValue: 15, Date: '10/05', Time: ' ' },
                      { ScaleValue: 18, Date: '16/05', Time: ' ' },
                      { ScaleValue: 20, Date: '23/05', Time: ' ' },
                      { ScaleValue: 22, Date: '30/05', Time: ' ' },
                      { ScaleValue: 24, Date: '06/06', Time: ' ' },
                    ],
                  },
                }
                firestore().collection('users').doc(user.uid).update(temp)
                saveUser(userDict)
                console.log('upload finished')
                dispatch({
                  type: FB_SIGNIN_SUCCESS,
                  payload: userDict,
                })
              }
            })
            .catch((error) => {
              dispatch({
                type: FB_SIGNIN_FAILED,
                payload: error,
              })
              alert('Please try again! ' + error.code)
            })
        }
      }
    } catch (error) {
      dispatch({
        type: FB_SIGNIN_FAILED,
        payload: error,
      })
      alert('Facebook Login failed' + error)
    }
  }
}

export const emailSignup = (email, password, profileType) => {
  return async (dispatch) => {
    dispatch({ type: START_EMAIL_PASSWORD_SIGNIN })
    try {
      const doLogin = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      console.log('uploading data on firestore')
      if (profileType === 'doctor') {
        var userDict = {
          id: doLogin.user.uid,
          email: doLogin.user.email,
          profile: profileType,
        }
        await firestore()
          .collection('doctors')
          .doc(doLogin.user.uid)
          .update(userDict)
        saveUser(userDict)
        console.log('upload finished , user saved: ', userDict)
        dispatch({
          type: DOCTOR_EMAIL_PASSWORD_SIGNIN_SUCCESS,
          payload: userDict,
        })
      } else {
        var userDict = {
          id: doLogin.user.uid,
          email: doLogin.user.email,
          imageNumber: 0,
          BasicDetails: {},
          profile: profileType,
          imageData: {
            imageSubData: {
              imageName: '',
              imageDownloadUrl: '',
            },
          },
          healthTimeline: {
            PHQ8Value: [
              { ScaleValue: 0, Date: '20/04', Time: ' ' },
              { ScaleValue: 3, Date: '20/04', Time: ' ' },
              { ScaleValue: 22, Date: '03/05', Time: ' ' },
              { ScaleValue: 15, Date: '10/05', Time: ' ' },
              { ScaleValue: 18, Date: '16/05', Time: ' ' },
              { ScaleValue: 20, Date: '23/05', Time: ' ' },
              { ScaleValue: 22, Date: '30/05', Time: ' ' },
              { ScaleValue: 24, Date: '06/06', Time: ' ' },
            ],
          },
        }
        console.log('writting to firesetore ....', doLogin.user.uid, userDict)
        await firestore()
          .collection('users')
          .doc(doLogin.user.uid)
          .set(userDict)
        saveUser(userDict)
        console.log('upload finished , user saved: ', userDict)
        dispatch({
          type: EMAIL_PASSWORD_SIGNIN_SUCCESS,
          payload: userDict,
        })
      }
    } catch (error) {
      dispatch({
        type: EMAIL_PASSWORD_SIGNIN_FAILED,
        payload: error,
      })
      alert(error.code)
      console.log('Signup failed : ', error, error.code)
    }
  }
}

export const initalize = (uid) => {
  return async (dispatch) => {
    dispatch({ type: INITIALIZING_USER_STARTED })
    try {
      console.log(
        'starting fetching of User data from firestore with uid=',
        uid
      )
      await dispatch(fetchDoctorList())
      const docRef = await firestore().collection('users').doc(uid)
      docRef.get().then(function (doc) {
        if (true) {
          dispatch({
            type: INITIALIZING_USER_SUCCESS,
            payload: doc.data(),
          })
          console.log(
            'Finished Firestore user fetching. Fetching Doctor and VoiceQuestions list'
          )
        }
      })
      console.log('Finished initalizing.')
    } catch (error) {
      console.log('Error in initalizing....', error)
      dispatch({
        type: INITIALIZING_USER_FAILED,
        payload: error,
      })
    }
  }
}
export const emailLogin = (email, password, profileType) => {
  return async (dispatch) => {
    dispatch({ type: START_EMAIL_PASSWORD_LOGIN })
    console.log(email, password, 'starting login')
    try {
      const loginData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      if (profileType === 'doctor') {
        const docRef = await firestore()
          .collection('doctors')
          .doc(loginData.user.uid)
        docRef.get().then(function (doc) {
          if (doc.exists) {
            console.log(doc.data())
            dispatch({
              type: DOCTOR_EMAIL_PASSWORD_LOGIN_SUCCESS,
              payload: doc.data(),
            })
            saveUser(doc.data())
            console.log('Doctor login successful')
          }
        })
      } else {
        const docRef = await firestore()
          .collection('users')
          .doc(loginData.user.uid)
        docRef.get().then(function (doc) {
          if (doc.exists) {
            console.log(doc.data())
            dispatch({
              type: EMAIL_PASSWORD_LOGIN_SUCCESS,
              payload: doc.data(),
            })
            saveUser(doc.data())
            console.log('Login successful')
          }
        })
      }
    } catch (error) {
      console.log('Login failed', error.code, error)
      dispatch({
        type: EMAIL_PASSWORD_LOGIN_FAILED,
        payload: error,
      })
      alert('Login failed ', error.code)
    }
  }
}
export const docInitalize = (uid) => {
  return async (dispatch) => {
    dispatch({ type: INITIALIZING_DOCTOR_STARTED })
    try {
      console.log(
        'starting fetching of doctor data from firestore with uid=',
        uid
      )
      const docRef = await firestore().collection('doctors').doc(uid)
      console.log('docref', docRef)
      docRef.get().then(function (doc) {
        if (true) {
          dispatch({
            type: INITIALIZING_DOCTOR_SUCCESS,
            payload: doc.data(),
          })
          console.log('Finished Firestore doctor fetching')
        }
      })
      console.log('Finished initalizing.')
    } catch (error) {
      console.log('Error in initalizing....', error)
      dispatch({
        type: INITIALIZING_DOCTOR_FAILED,
        payload: error,
      })
    }
  }
}
export const pickImage = (uid, userName) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_STARTED })
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('user cancelled the image operation')
      } else if (response.error) {
        alert('Error: ', response.error)
      } else {
        const source = { uri: response.uri }
        console.log('printing image uri: ', source)
        dispatch({
          type: PICKER_IMAGE_SOURCE_SUCCESS,
          payload: source,
        })
        console.log('calling uploadImage function')
        dispatch(uploadImge(source.uri, uid, userName))
      }
    })
  }
}

export const pickVideo = (uid, userName) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_STARTED })
    const options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('user cancelled the image operation')
      } else if (response.error) {
        alert('Error: ', response.error)
      } else {
        const source = { uri: response.uri }
        console.log('printing video uri: ', source)
        dispatch({
          type: PICKER_IMAGE_SOURCE_SUCCESS,
          payload: source,
        })
        console.log('calling uploadImage function')
        dispatch(uploadImge(source.uri, uid, userName))
      }
    })
  }
}

export const firestoreUpload = (name, uid, patientBasicDetails) => {
  return async (dispatch) => {
    dispatch({ type: FIRESTORE_UPLOAD_STARTED })
    try {
      console.log(
        'firestoreUpload function running: parameters',
        name,
        uid,
        patientBasicDetails
      )
      const imgReff = await storage().ref('userData/assets/' + name)
      const url = await imgReff.getDownloadURL()
      console.log(url)
      await firestore().collection('users').doc(uid).update({
        fullname: patientBasicDetails.fullname,
        BasicDetails: patientBasicDetails,
        AvatarImg: url,
      })
      console.log('url written to firestore')
      var userDict = {
        BasicDetails: patientBasicDetails,
        fullname: patientBasicDetails.fullname,
        AvatarImg: url,
      }
      console.log('writin data to local user', userDict)
      updateUser(userDict)
      dispatch(fetchUser())
      dispatch({ type: FIRESTORE_UPLOAD_SUCCESS })
    } catch (error) {
      dispatch({ type: FIRESTORE_UPLOAD_FAILED })
      console.log(' firebase upload error', error)
      dispatch(userSignout())
      alert('Error: Restarting application may fix', error.error)
    }
  }
}
export const uploadImge = (uri, userId, imageName) => {
  return async (dispatch) => {
    console.log('started image upload', uri, imageName)
    const docRef = await firestore().collection('users').doc(userId)
    const Count = await (await docRef.get()).data().imageNumber
    const imgRef = await storage()
      .ref('userData/uploadImage/' + userId)
      .child(imageName + Count)
      .putFile(uri)
    const imgReff = await storage().ref(imgRef.metadata.fullPath)
    const url = await imgReff.getDownloadURL()
    console.log('download url', url)
    var imageData = {
      imageName: {
        imageDownloadUrl: url,
        imageName: imageName + Count,
      },
    }
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        imageData: firebase.firestore.FieldValue.arrayUnion(imageData),
        imageNumber: Count + 1,
      })
    dispatch({ type: UPLOAD_IMAGE_FINISHED })
    console.log('finished uploading image and image counter incremented')
  }
  {
    /*const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const Fetch = RNFetchBlob.polyfill.Fetch
        window.fetch = new Fetch({
            auto : true,
            binaryContentTypes : [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ]
        }).build()
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            const imageRef = storage().ref('userData/uploadImage/'+userId).child(imageName)
            fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: '${mime};BASE64' })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
                console.log("Calling storeDownloadURL function")
                storeDownloadURL(url, sessionId, userId)
            })
            .catch((error) => {
                reject(error)
            })
        })*/
  }
}

export const storeDownloadURL = (getDownloadUrl, sessionId, uid) => {
  console.log(
    'inside download url function with parameters: download url, sessionId, uid',
    getDownloadUrl,
    sessionId,
    uid
  )
  var tempData = {
    DownloadUrl: getDownloadUrl,
    SessionId: sessionId,
  }
  firestore().collection('users').doc(uid).set(tempData)
}

export const doctorProfileUpload = (uid, DoctorProfileDetails) => {
  return async (dispatch) => {
    dispatch({ type: DOCTOR_PROFILE_CREATE_START })
    try {
      var DoctorProfileDetail = {
        ...DoctorProfileDetails,
        Full_Name:
          DoctorProfileDetails.firstName + ' ' + DoctorProfileDetails.lastName,
        channel: DoctorProfileDetails.lastName + DoctorProfileDetails.firstName,
      }
      ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
          console.log('user cancelled the image operation')
        } else if (response.error) {
          alert('Error: ', response.error)
        } else {
          const source = { uri: response.uri }
          console.log('printing image uri: ', source)
          dispatch(DoctorProfile(DoctorProfileDetail, source.uri, uid))
        }
      })
    } catch (error) {
      console.log('Profile creation failed : ', error.code, error)
      Alert.alert('Something went worng', error.code)
      dispatch({
        type: DOCTOR_PROFILE_CREATE_FAILED,
        payload: error,
      })
    }
  }
}

export const DoctorProfile = (DoctorProfileDetail, uri, uid) => {
  return async (dispatch) => {
    try {
      const imgRef = await storage()
        .ref('userData/Doctors/' + uid)
        .child('profilePic')
        .putFile(uri)
      const imgReff = await storage().ref(imgRef.metadata.fullPath)
      const url = await imgReff.getDownloadURL()
      const docRef = await firestore()
        .collection('DoctorsData')
        .doc('AvailabeleDoctor')
      const DoctorList = await (await docRef.get()).data().DoctorsList
      var DoctorProfileDetails = {
        ...DoctorProfileDetail,
        profilePicture: url,
        iid: DoctorList.length,
      }
      await firestore().collection('doctors').doc(uid).update({
        DoctorProfileDetails,
      })
      await firestore()
        .collection('DoctorsData')
        .doc('AvailabeleDoctor')
        .update({
          DoctorsList: firebase.firestore.FieldValue.arrayUnion(
            DoctorProfileDetails
          ),
        })
      dispatch({
        type: DOCTOR_PROFILE_CREATE_SUCCESS,
      })
      console.log('created proflie and updated doctors list')
      updateUser(DoctorProfileDetails)
    } catch (error) {
      console.log('Profile creation failed : ', error.code, error)
      Alert.alert('Something went wrong', error.code)
      dispatch({
        type: DOCTOR_PROFILE_CREATE_FAILED,
        payload: error,
      })
    }
  }
}
export const updateDoctorProfile = (uid, DoctorProfileDetail, profilepic) => {
  return async (dispatch) => {
    console.log('Starting update', profilepic)
    dispatch({ type: DOCTOR_PROFILE_UPDATE_START })
    try {
      const imgRef = await storage()
        .ref('userData/Doctors/' + uid)
        .child('profilePic')
        .putFile(profilepic)
      const imgReff = await storage().ref(imgRef.metadata.fullPath)
      const url = await imgReff.getDownloadURL()
      var DoctorProfileDetails = {
        ...DoctorProfileDetail,
        Full_Name:
          DoctorProfileDetail.firstName + ' ' + DoctorProfileDetail.lastName,
        channel: DoctorProfileDetail.lastName + DoctorProfileDetail.firstName,
        profilePicture: url,
      }
      await firestore().collection('doctors').doc(uid).update({
        DoctorProfileDetails,
      })
      updateUser(DoctorProfileDetails)
      const docRef = await firestore().collection('doctors').doc(uid)
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log('document found')
          const user = doc.data()
          const doctorIndexValue = user.iid
          dispatch({ type: DOCTOR_PROFILE_UPDATE_SUCCESS })
        }
      })
    } catch (error) {
      console.log('Profile Updation failed : ', error.code, error)
      Alert.alert('Something went wrong', error.code)
      dispatch({
        type: DOCTOR_PROFILE_UPDATE_FAILED,
        payload: error,
      })
    }
  }
}
export const fetchDoctorList = () => {
  return async (dispatch) => {
    dispatch({ type: DOCTOR_AVAILABLE_LIST_FETCH_START })
    try {
      const docRef = await firestore()
        .collection('DoctorsData')
        .doc('AvailabeleDoctor')
      const DoctorList = await (await docRef.get()).data().DoctorsList
      const docRef2 = await firestore()
        .collection('Questions')
        .doc('VoiceQuestions')
      const QuestionsList = await (await docRef2.get()).data().QuestionList
      dispatch({
        type: DOCTOR_AVAILABLE_LIST_FETCH_SUCCESS,
        payload: {
          DoctorList: DoctorList,
          QuestionsList: QuestionsList,
        },
      })
    } catch (error) {
      console.log('Error in fetching Doctor List', error.code, error)
      dispatch({
        type: DOCTOR_AVAILABLE_LIST_FETCH_FAILED,
        payload: error,
      })
    }
  }
}

export const avatarFormUpload = (uid, answers) => {
  return async (dispatch) => {
    dispatch({ type: AVATAR_FORM_UPLOAD_STARTED })
    try {
      console.log('firestoreUpload function running: parameters', uid, answers)
      await firestore()
        .collection('users')
        .doc(uid)
        .update({ AvatarFormQA: answers })
      console.log('answers written to firestore')
      dispatch({ type: AVATAR_FORM_UPLOAD_SUCCESS })
    } catch (error) {
      dispatch({
        type: AVATAR_FORM_UPLOAD_FAILED,
        payload: error.code,
      })
      console.log(' firebase upload error', error)
      alert('upload failed please check internet connection', error.code)
    }
  }
}

// api call
async function postData(url = '', payload = {}) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Host: 'backend.default.example.com',
    },
    data: payload,
  })
}

export const voiceQuestionAnswerUpload = (uid, file, id) => {
  return async (dispatch) => {
    dispatch({ type: AVATAR_VOICE_ANSWER_UPLOAD_STARTED })
    try {
      console.log('started Voice Answers upload')
      QuestionAnswer = {
        VoiceAnsers: {
          id: id, //push in array form// error // solve this.
          file: file,
          answer: true,
        },
      }
      updateUser(QuestionAnswer)
      await storage()
        .ref('/userData/Patient/VoiceQuestions/' + uid)
        .child(id)
        .putFile(file)
      dispatch({ type: AVATAR_VOICE_ANSWER_UPLOAD_SUCCESS })
      console.log('Finished Voice Answers upload', id)

      // backend api call on last audio
      if (id.substring(0, 2) == '33') {
        console.log('LAST AUDIO', id, backend_api.endpoint)
        const data = {
          dir: 'userData/Patient/VoiceQuestions',
          uid: uid,
        }
        try {
          await postData(backend_api.endpoint, data)
        } catch (err) {
          console.log(err)
        }
      }
    } catch (error) {
      dispatch({
        type: AVATAR_VOICE_ANSWER_UPLOAD_FAILED,
        payload: error.code,
      })
      console.log(error)
    }
  }
}

export const bookAppointmentForDoctor = (
  UserUid,
  DoctorUid,
  appointmentDetails
) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_APPOINTMENT_FOR_DOCTOR_STARTED })
    try {
      await firestore()
        .collection('users')
        .doc(UserUid)
        .update({
          BookedAppointment: firebase.firestore.FieldValue.arrayUnion(
            appointmentDetails
          ),
        })
      await firestore()
        .collection('doctors')
        .doc(DoctorUid)
        .update({
          BookedAppointment: firebase.firestore.FieldValue.arrayUnion(
            appointmentDetails
          ),
        })
      console.log('Uloaded appointment deails to firebase')
      dispatch({ type: BOOKING_APPOINTMENT_FOR_DOCTOR_SUCCESS })
    } catch (error) {
      dispatch({
        type: BOOKING_APPOINTMENT_FOR_DOCTOR_FAILED,
        payload: error,
      })
      console.log('Error from bookingAppointmentForDoctor', error)
    }
  }
}
