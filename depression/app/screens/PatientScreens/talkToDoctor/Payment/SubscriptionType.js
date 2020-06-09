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

const { width, height } = Dimensions.get('window')

const SubscriptionType = () => {
  const user = useSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute();
  const AppointmentInfo = route.params;
 
  console.log('user Details', user, AppointmentInfo )
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
        {/*<View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.Button
            backgroundColor="#2E71DC"
            name="menu"
            onPress={() => navigation.openDrawer()}
          />*/}
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.profileURL,
              }}
            />
            <View style={{marginLeft: 8}}>
              <Avatar
                size="large"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
            </View>
          </View>
        
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <Text style={{ fontSize: 18, color: '#fff' }}>{user.fullname}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FirstHalf: {
    backgroundColor: '#2E71DC',
  },
  SecondHalf: {
    
  },

})

export default SubscriptionType
