import React, { Component, useState, useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Button, ProgressBarAndroid, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Card, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const BookedAppointment = () => {
    var user = useSelector(state => state.auth.user)
    var firebaseUser = useSelector(state => state.auth.firebaseUser)
    const navigation = useNavigation();
    const [moreInfoBookedApt, setMoreInfoApt] = useState(false)
    const [BookedAppointmentAvatar, setAvatar] = useState(
        { 
          profilePicture: 'https://image.flaticon.com/icons/png/512/17/17004.png',
          patientName: 'No appointment',
          gender: '',
          date: '',
          age: '',
          ageGender:" ",
          comMod: 
            {
              call: 0,
              chat: 0,
              video: 0,
            },
          moreInfoDoc: {},      
        }
      )
    try {
        var AppointmentDetails = firebaseUser.BookedAppointment
    }catch(error){
        console.log(error)
    }
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear(); 
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds();
    const [CurrentDate, setDate] = useState({ Date: date + '/' + month + '/' + year})
    const [CurrentTime, setTime] = useState({ Time: hours + ':' + min + ':' + sec})
    console.log("firebase detils", AppointmentDetails)
    return (
        <SafeAreaView style = {styles.container} >
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={styles.AvatarView}>
                    <Avatar
                    size='small'
                    rounded
                    source={{
                        uri: user.profileURL,
                    }}
                    />       
                    <View style={styles.UserName}>
                        <Text style={{ fontSize: 18 }}>{user.fullname}</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <View style={styles.appointmentBox}>
                    <Text style={styles.appointment}>Booked appointment</Text>
                    {AppointmentDetails.map((item) => (
                        <View>
                            <ListItem
                                leftAvatar={{
                                    title: item.AppointmentDetails.patientDetails.fullname,
                                    source: {
                                    uri:
                                        item.AppointmentDetails.patientDetails.profileURL,
                                    },
                                }}
                                title={item.AppointmentDetails.patientDetails.fullname}
                                subtitle={item.AppointmentDetails.patientDetails.BasicDetails.age + ', ' + item.AppointmentDetails.patientDetails.BasicDetails.gender}
                                onLongPress={() => setMoreInfoApt(true)}
                            />
                            <Text style={styles.BookedAptDate}>
                                Date : {item.AppointmentDetails.date}
                            </Text>
                            <View style={styles.SelectComMode}>
                                <TouchableOpacity style={item.AppointmentDetails.comunicationMode.video ? styles.VideoCallButtonOnnFirst : styles.VideoCallButtonOffFirst} onPress={()=> selectComMode('video')}>
                                    <Text style={styles.VideoCallText}>{'  '}
                                        <Icon
                                            size={16}
                                            name='personal-video'
                                            type='MaterialIcons'
                                        />
                                    {' '}Video{'  '}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={item.AppointmentDetails.comunicationMode.call ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('call')}>
                                    <Text style={styles.VideoCallText}>{'  '}
                                        <Icon
                                            size={16}
                                            name='phone-in-talk'
                                            type='MaterialIcons'
                                        />
                                    {' '}Call{'  '}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={item.AppointmentDetails.comunicationMode.chat ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('chat')}>
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
                            <Text style={styles.LongPressMoreInfo}>Long press on patient for more details</Text>
                            {moreInfoBookedApt && (
                                <View style={styles.MoreInfoDoc}>
                                    <Text style={styles.MoreinfoHeading}>More information</Text>
                                    <Text style={styles.MOreInfoText}>Age: {item.AppointmentDetails.patientDetails.BasicDetails.age}</Text>
                                    <Text style={styles.MOreInfoText}>Gender: {item.AppointmentDetails.patientDetails.BasicDetails.gender}</Text>
                                    <Text style={styles.MOreInfoText}>City / Town: {item.AppointmentDetails.patientDetails.BasicDetails.cityTown}</Text>
                                    <Text style={styles.MOreInfoText}>
                                    State: {item.AppointmentDetails.patientDetails.BasicDetails.state}{'   '}
                                    Country: {item.AppointmentDetails.patientDetails.BasicDetails.country}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
		</SafeAreaView>
    );
};

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
        padding: 20, 
    },
    appointmentBox: {
        paddingTop: 20,
        paddingBottom: 10,
      },
    appointment: {
        fontSize: 20,
    },
    LongPressMoreInfo: {
        paddingTop: '2%',
        fontStyle: 'italic',
        color: 'rgba(100, 100, 100, 1)'
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
        borderBottomWidth: 1,
        marginTop: '3%',
        paddingTop: 10,
        paddingBottom: '3%'
    },
});

export default BookedAppointment

