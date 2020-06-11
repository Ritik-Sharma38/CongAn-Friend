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
  const firebaseUser = useSelector((state) => state.auth.firebaseUser)
  const navigation = useNavigation()
  const DoctorList = useSelector((state) => state.auth.DoctorList)
  const [moreInfoBookedApt, setMoreInfoApt] = useState(false)
  const [BookedAppointmentAvatar, setAvatar] = useState(
    { 
      profilePicture: 'https://image.flaticon.com/icons/png/512/17/17004.png',
      doctorsName: 'No appointment',
      specialization: '',
      date: '',
      comMod: 
        {
          call: 0,
          chat: 0,
          video: 0,
        },
      moreInfoDoc: {},      
    }
  )
  const dispatch = useDispatch()
  var AppointmentDetails = {}
  useEffect(()=> {
    try{
      AppointmentDetails = firebaseUser.BookedAppointment[firebaseUser.BookedAppointment.length-1]
      if(AppointmentDetails){
        setAvatar(
          {
            ...BookedAppointmentAvatar,
            profilePicture: AppointmentDetails.AppointmentDetails.docDetails.DoctorsInfo.profilePicture,
            doctorsName: AppointmentDetails.AppointmentDetails.docDetails.DoctorsInfo.Full_Name,
            specialization: AppointmentDetails.AppointmentDetails.docDetails.DoctorsInfo.specialization,
            date: AppointmentDetails.AppointmentDetails.date,
            comMod: AppointmentDetails.AppointmentDetails.comunicationMode,
            moreInfoDoc: AppointmentDetails.AppointmentDetails.docDetails.DoctorsInfo,
          }
        )
        console.log("from try-if block", AppointmentDetails.AppointmentDetails)
      }
    }catch(error){
      console.log("error from talk-is to doctor", error)
    }
  }, [])
  const selectComMode = (mode) => {
    console.log("comMod", mode)
  }
  console.log('firebase detils from talk to doctor', BookedAppointmentAvatar.moreInfoDoc)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC"/>
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
                title: BookedAppointmentAvatar.doctorsName,
                source: {
                  uri:
                    BookedAppointmentAvatar.profilePicture,
                },
              }}
              title={BookedAppointmentAvatar.doctorsName}
              subtitle={BookedAppointmentAvatar.specialization}
              onLongPress={() => setMoreInfoApt(true)}
            />
            <Text style={styles.BookedAptDate}>
              Date : {BookedAppointmentAvatar.date}
            </Text>
            <View style={styles.SelectComMode}>
              <TouchableOpacity style={BookedAppointmentAvatar.comMod.video ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('video')}>
                <Text style={styles.VideoCallText}>{'  '}
                  <Icon
                    size={16}
                    name='personal-video'
                    type='MaterialIcons'
                  />
                  {' '}Video{'  '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={BookedAppointmentAvatar.comMod.call ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('call')}>
                <Text style={styles.VideoCallText}>{'  '}
                  <Icon
                    size={16}
                    name='phone-in-talk'
                    type='MaterialIcons'
                  />
                  {' '}Call{'  '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={BookedAppointmentAvatar.comMod.chat ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('chat')}>
                <Text style={styles.VideoCallText}>{'  '}
                  <Icon
                    size={16}
                    name='textsms'
                    type='MaterialIcons'
                  />
                  {' '}Chat{'  '}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.LongPressMoreInfo}>Long press for more details</Text>
            {moreInfoBookedApt && (
              <View style={styles.MoreInfoDoc}>
                <Text style={styles.MoreinfoHeading}>More information</Text>
                <Text style={styles.MOreInfoText}>Age: {BookedAppointmentAvatar.moreInfoDoc.age}</Text>
                <Text style={styles.MOreInfoText}>Gender: {BookedAppointmentAvatar.moreInfoDoc.gender}</Text>
                <Text style={styles.MOreInfoText}>Hospital / Clinic :{BookedAppointmentAvatar.moreInfoDoc.hospitalClinicName}</Text>
                <Text style={styles.MOreInfoText}>City / Town: {BookedAppointmentAvatar.moreInfoDoc.cityTown}</Text>
                <Text style={styles.MOreInfoText}>
                  State: {BookedAppointmentAvatar.moreInfoDoc.state}{'   '}
                  Country: {BookedAppointmentAvatar.moreInfoDoc.country}
                </Text>
                <View style={styles.MessagePatient}>
                  <Text style={styles.MessageHeading}>Message:</Text>
                  <Text style={styles.MOreInfoText}>{BookedAppointmentAvatar.moreInfoDoc.messagePatient}</Text>
                </View>
              </View>
            )}
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
  LongPressMoreInfo: {
    paddingLeft: '5%',
    fontStyle: 'italic',
    color: 'rgba(100, 100, 100, 1)'
  },
  DocName: {
    fontSize: 25,
    padding: 10,
  },
  message: {
    paddingLeft: 19,
    fontSize: 15,
  },
  BookedAptDate: { 
    paddingLeft: '5%',
    fontSize: 17,
  },
  SelectComMode: {
    marginTop: '2%',
    flexDirection: 'row',
    padding: '1.5%',
  },
  SelectComModeText: {
    fontSize: 16
  },
  VideoCallButtonOnn: {
    marginLeft: '4%',
    backgroundColor: '#00FF00'
  },
  VideoCallButtonOff: {
    marginLeft: '4%',
    backgroundColor: 'rgba(235, 235, 235, 1)'
  },
  VideoCallText: {
    fontSize: 16,
  },
  MOreInfoText: {
    fontSize: 15,
    marginBottom: '0.5%'
  },
  MoreinfoHeading: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  MoreInfoDoc: {
    borderColor: '#D3D3D3',
    borderTopWidth: 1,
    marginTop: '3%',
    padding: '4%'
  },
  MessagePatient: {
    borderColor: '#D3D3D3',
    borderTopWidth: 1,
    marginTop: '3%',
    paddingTop: '4%'
  },
  MessageHeading: {
    fontWeight: 'bold',
    marginBottom: '1%'
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
