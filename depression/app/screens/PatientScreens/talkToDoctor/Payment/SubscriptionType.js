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
import { bookAppointmentForDoctor } from '../../../../actions/authAction'

const { width, height } = Dimensions.get('window')

const SubscriptionType = () => {
  const user = useSelector((state) => state.auth.user)
  var BookedAppointment = useSelector((state)=> state.auth.BookedAppointment)
  const progressBar = useSelector((state) => state.auth.progressBarStatus)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute();
  const AppointmentInfo = route.params;
  const bookingAppointment = async () => {
    await dispatch(bookAppointmentForDoctor(user.id, AppointmentInfo.AppointmentDetails.docDetails.DoctorsInfo.uid, AppointmentInfo))
  }
  if(BookedAppointment){
    navigation.navigate('Profile')
    BookedAppointment=false
  }
  console.log('user Details from subscription', user.id, AppointmentInfo.AppointmentDetails.docDetails.DoctorsInfo.uid )
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
        <View style={styles.SubSecondHalf}>
          <Card>
            <Text style={styles.SubscriptionText}>Select your subscription type</Text>
            <TouchableOpacity style={styles.SubscriptionButton} onPress={()=> bookingAppointment()}>
              <Text style={styles.SubscriptionOptionText}>6 month / 1 year price /-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SubscriptionButton} onPress={()=> bookingAppointment()}>
              <Text style={styles.SubscriptionOptionText}>Monthly price /-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SubscriptionButton} onPress={()=> bookingAppointment()}>
              <Text style={styles.SubscriptionOptionText}>Pay as you go price /-</Text>
            </TouchableOpacity>
          </Card>
        </View>
        {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
        )}
        <Text style={styles.PaymentNotice}>Payment system is not implemented yet, select any option to continue with booking appointment.</Text>
      </ScrollView>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  SubSecondHalf: {
    height: height/1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 7,
    width: width / 1.07,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  SubscriptionText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  SubscriptionButton: {
    backgroundColor: '#2E71DC',
    height: 35,
    marginHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  SubscriptionOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  PaymentNotice: {
    fontStyle: 'italic',
    fontSize: 15,
    padding: 20,
    color: 'red'
  }
})

export default SubscriptionType
