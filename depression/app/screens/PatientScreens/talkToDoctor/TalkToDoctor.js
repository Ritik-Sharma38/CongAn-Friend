import React, { Component, useState, useEffect, useCallback } from 'react'
import {
  RefreshControl,
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
  const [refreshing, setRefreshing] = React.useState(false);
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
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("refreshing............")
    refresAppointment()
    setRefreshing(false);
  }, [refreshing]);
  useEffect(()=> {
    refresAppointment()
  }, [])
  const refresAppointment = () => {
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
  }
  const selectComMode = (mode) => {
    console.log("comMod", mode)
  }
  console.log('firebase detils from talk to doctor', BookedAppointmentAvatar.moreInfoDoc)
  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView
        contentContainerStyle={styles.SecondHalf}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
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
              <TouchableOpacity style={BookedAppointmentAvatar.comMod.video ? styles.VideoCallButtonOnnFirst : styles.VideoCallButtonOffFirst} onPress={()=> selectComMode('video')}>
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
            <Text style={styles.LongPressMoreInfo}>Long press on doctor for more details</Text>
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
        <View>
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
        </View>
      </ScrollView>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  AvailableDoc: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '3%',
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
    fontWeight: 'bold',
    fontSize: 20,
  },
  appointmentBox: {
    paddingTop: 20,
    paddingBottom: 10,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  LongPressMoreInfo: {
    paddingTop: '2%',
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
    fontSize: 17,
  },
  SelectComMode: {
    marginTop: '2%',
    flexDirection: 'row',
    paddingTop: '1.5%',
  },
  SelectComModeText: {
    fontSize: 16
  },
  VideoCallButtonOnnFirst: {
    backgroundColor: '#00FF00'
  },
  VideoCallButtonOffFirst: {
    backgroundColor: 'rgba(235, 235, 235, 1)'
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
    paddingTop: 10,
  },
  MessagePatient: {
    borderColor: '#D3D3D3',
    borderTopWidth: 1,
    marginTop: '3%',
    paddingTop: '2.5%'
  },
  MessageHeading: {
    fontWeight: 'bold',
    marginBottom: '1%'
  },
  AvailableDocView: {
    
  }
})

export default TalkToDoctor
