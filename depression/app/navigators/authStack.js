import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { PatientSignedIn } from './PatientSignedIn'
import { DoctorSignedIn } from './DoctorSignedIn'
import { SignedOut } from './SignedOut'
import { fetchUser } from '../actions/authAction'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import RNBackgroundDownloader from 'react-native-background-downloader'

const Stack = createStackNavigator()
const AuthStack = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchUserAuth() {
      console.log('auth stack')
      await dispatch(fetchUser())
      console.log('fetch user success')
    }

    async function startDownloads() {
      let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads()
      for (let task of lostTasks) {
        console.log(`Task ${task.id} was found!`)
        task
          .progress((percent) => {
            console.log(`Downloaded: ${percent * 100}%`)
          })
          .done(() => {
            console.log('Download is done!')
          })
          .error((error) => {
            console.log('Download canceled due to error: ', error)
          })
      }
    }
    startDownloads()
    fetchUserAuth()
  }, [dispatch])

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log('value of isAuth', isAuthenticated)
  if (isAuthenticated === true) {
    return <PatientSignedIn />
  } else if (isAuthenticated === false) {
    return <SignedOut />
  } else if (isAuthenticated === 'doctor') {
    return <DoctorSignedIn />
  } else {
    return (
      <View>
        <ActivityIndicator color="#2E71DC" size="large" />
      </View>
    )
  }
}
export default AuthStack
