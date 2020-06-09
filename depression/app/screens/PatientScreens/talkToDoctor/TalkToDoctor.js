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
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window')

const TalkToDoctor = () => {
  const user = useSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const DoctorList = useSelector((state) => state.auth.DoctorList)
  const dispatch = useDispatch()
  console.log('Doctors detils', DoctorList)
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
        <View style={styles.appointmentBox}>
          <Text style={styles.appointment}>Booked appointment</Text>
          <View>
            <ListItem
              leftAvatar={{
                title: "null",
                source: {
                  uri:
                    'https://cdn2.iconfinder.com/data/icons/calendar-36/64/5-512.png',
                },
              }}
              title="null"
              subtitle="null"
            />
            <Text style={{ paddingLeft: 20, fontSize: 17 }}>
              Appointment Time
            </Text>
            <Text style={{ paddingLeft: 20, fontSize: 17 }}>
              Appointment Date
            </Text>
          </View>
        </View>
        <Text style={styles.AvailableDoc}>Available Doctors</Text>
        {DoctorList.map((item) => (
          <View style={styles.ListAvailableDoctor}>
            <ListItem
              leftAvatar={{
                title: item.Full_Name,
                source: { uri: item.profilePicture },
              }}
              title={item.Full_Name}
              subtitle={item.specialization}
              onPress={() =>navigation.navigate("Selected Doctor", {DoctorsInfo: item})}
              chevron
            />
            <Text style={styles.AvailableDocCityState}>City: {item.cityTown} State: {item.state}</Text>
          </View>
        ))}
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
  SecondHalf: {},
  AvailableDoc: {
    fontSize: 25,
    padding: 8,
  },
  ListAvailableDoctor: {
    backgroundColor: '#fff'
  },
  AvailableDocCityState: {
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 4,
  },
  appointment: {
    padding: 10,
    fontSize: 25,
  },
  appointmentBox: {
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 7,
    width: width / 1.07,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  image: {
    width: width / 1.155,
    height: width / 1.155,
    borderRadius: 3,
  },
  DocName: {
    fontSize: 25,
    padding: 10,
  },
  message: {
    paddingLeft: 19,
    fontSize: 15,
  },
  appointmentButton: {
    backgroundColor: '#2E71DC',
    height: 40,
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
  Lbutton: {
    backgroundColor: '#2E71DC',
    height: 40,
    marginHorizontal: 25,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.9,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Rbutton: {
    backgroundColor: '#2E71DC',
    height: 40,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.9,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
})

export default TalkToDoctor
