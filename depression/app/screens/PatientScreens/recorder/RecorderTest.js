import React, { Component, useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  ProgressBarAndroid,
  StatusBar,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Avatar, ListItem } from 'react-native-elements'
import { useNavigation , useRoute} from '@react-navigation/native'
import ConnectyCube, { login } from "react-native-connectycube";

const { width, height } = Dimensions.get('window')

const RecorderTest = () => {
  const user = useSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userss, setUserDetails] = useState(
    {
      id: 1579249,
      name: 'user1',
      login: 'user1',
      password: '12345678',
      color: '#077988',
    }
  )
  const CREDENTIALS = {
    appId: 2764, 
    authKey: "XTnPQhjGh-6OQMd",
    authSecret: "Oz4SeMZWa57UkJf"
  };
  
  const CONFIG = {
    debug: { mode: 1 } // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
  };
  ConnectyCube.init(CREDENTIALS, CONFIG);

  const createSession = () => {
    ConnectyCube.createSession()
      .then((session) => {
        console.log("session created", session)
      })
      .catch((error) => {
        console.log("Error in session creation", error)
      });
  }

  const searchUser = () => {
    const searchParams = { login: "user1" };

    ConnectyCube.users
      .get(searchParams)
      .then((result) => {
        console.log(result)
     })
      .catch((error) => {
        console.log("Error:", error)
      });
  }

  const signupUser = () => {
    const userProfile = {
      login: "marvin18",
      password: "12345678",
      email: "awesomeman@gmail.com",
      full_name: "Marvin Simon",
      phone: "47802323143",
      website: "https://dozensofdreams.com",
      tag_list: ["iphone", "apple"],
      custom_data: JSON.stringify({ middle_name: "Bartoleo" }),
    };
    
    ConnectyCube.users
      .signup(userProfile)
      .then((user) => {
        console.log("user signup success", user)
      })
      .catch((error) => {
        console.log("Error in signup: ", error)
      });
  }

  const crateUserWithLogin = async() => {
    const userCredentials = { login: "marvin18", password: "12345678" };
    const opponentsIds = [1579249]
    ConnectyCube.createSession(userCredentials)
      .then((session) => {
        console.log("session created...", session.user)
        try{
          navigation.navigate('Video call', {opponentsIds})
        }catch(error){
          console.log("Error in navigation: ", error)
        } 
      })
      .catch((error) => {
        console.log("Error in session creation", error)
      });
  }

  const loginUser = async (user) => {
    console.log("login as", user, user.id, user.password)
    ConnectyCube.createSession(user)
      .then(() =>
        ConnectyCube.chat.connect({
          userId: user.id,
          password: user.password,
        }),
      )
      .then(() => {
        navigation.navigate('Video call')
      })
      .catch((error) => {
        console.log("Error in loginUser", error)
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FirstHalf}>
          <View style={styles.AvatarView}>
            <Avatar
              size='small'
              rounded
              source={{
                uri: user.profileURL,
              }}
            />
            <View style={{marginLeft: 8}}>
              <Avatar
                size="small"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
            </View>        
            <View
              style={styles.UserName}>
              <Text style={{ fontSize: 18 }}>{user.fullname}</Text>
            </View>
          </View>
      </View>
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        <View>
          <Button onPress={()=> createSession()}
            title="Create session"
          />
          <Button onPress={()=> searchUser()}
            title="Search user"
          />
          <Button onPress={()=> signupUser()}
            title="Signup user"
          />
          <Button onPress={()=> crateUserWithLogin()}
            title="Login user"
          />
          <Button onPress={()=> loginUser(userss)}
            title="Login user with user"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  FirstHalf: {
    
  },
  AvatarView: {
    padding: 10,
    width: width/1.1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: '4%',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  UserName: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  SecondHalf: {
    
  },
  
})

export default RecorderTest
