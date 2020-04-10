import React, { Component, useState, useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Button, ProgressBarAndroid, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDoctorList} from '../../actions/authAction';
import { Card, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const TalkToDoctor = () => {
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation();
    const DoctorList = useSelector(state => state.auth.DoctorList) 
    const dispatch = useDispatch();
    const [items, setItems] = useState(DoctorList)
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear(); 
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds();
    useEffect(() => {
        dispatch(fetchDoctorList())
        setItems(DoctorList)
    }, []);
    const [DocInfoCard, setCard] = useState({ 
        cardStae: false,
        DoctorName: '',
        DocProfilePic: '',
        Specialization: '',
        Message: '',
        HospiatlClinicName: '',
        Channel: '',
    })
    const [CurrentDate, setDate] = useState({ Date: date + '/' + month + '/' + year})
    const [CurrentTime, setTime] = useState({ Time: hours + ':' + min + ':' + sec})
    const [Appointment, setaptm] = useState({
        Date: '',
        DoctorName: '',
        Hospital_Clinic_Name: "you don't have any appointment",
        BookingTime: '',
    })
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container} >
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',  alignContent:'center', alignItems: 'center'}}>
                    <Icon.Button 
                        backgroundColor="#2E71DC"
                        name="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                    <View style={{flexDirection: 'row', marginHorizontal: '20%'}}>
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.profileURL
                            }}
                            showEditButton
                            onEditPress={() => alert("not allowed now")}
                        />
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.AvatarImg
                            }}
                            showEditButton
                            onEditPress={() => navigation.navigate('Avatar')}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center', alignContent: 'center', paddingTop: 5,paddingBottom: 5,}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.fullname}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <View style={styles.appointmentBox}>
                    <Text style={styles.appointment}>Booked appointment</Text>
                    <View>
                        <ListItem
                            leftAvatar={{
                                title: Appointment.Hospital_Clinic_Name,
                                source: { uri: 'https://cdn2.iconfinder.com/data/icons/calendar-36/64/5-512.png' },
                            }}
                            title={Appointment.Hospital_Clinic_Name}
                            subtitle={Appointment.DoctorName}
                        />
                        <Text style={{paddingLeft: 20, fontSize: 17}}>{Appointment.BookingTime}</Text>
                        <Text style={{paddingLeft: 20, fontSize: 17}}>{Appointment.Date}</Text>
                    </View>
                </View >
                <Text style={styles.AvailableDoc}>Available Doctors for call</Text>
                {items.map(item => (
                    <ListItem
                        leftAvatar={{
                            title: item.First_Name,
                            source: { uri: item.profilePicture },
                        }}
                        title= {item.Full_Name}
                        subtitle={item.Specialization}
                        onPress={()=> setCard({
                            cardStae: true,
                            DoctorName: item.Full_Name,
                            DocProfilePic: item.profilePicture,
                            Specialization: item.Specialization,
                            Message: item.Message_for_patient,
                            HospiatlClinicName: item.Hospital_Clinic_Name,
                            Channel: item.channel,
                        })}
                        onLongPress={()=> Alert.alert('Message for patient', item.Message_for_patient)}
                        chevron
                    />
                ))}
                { DocInfoCard.cardStae && (
                    <Card
                        containerStyle={styles.card}>
                        <Image
                            style={styles.image}
                            source={{ uri: DocInfoCard.DocProfilePic }}
                        />
                        <Text style={styles.DocName}>{DocInfoCard.DoctorName}</Text>
                        <ListItem
                            leftAvatar={{
                                title: DocInfoCard.DoctorName,
                                source: { uri: 'https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-hospital-icon-png-image_319682.jpg' },
                            }}
                            title= {DocInfoCard.HospiatlClinicName}
                            subtitle={DocInfoCard.Specialization}
                            onPress={()=> Alert.alert('Hospital Adress', 'This feature wil be soon available soon')}
                        />
                        <Text style={styles.message}>Message : {DocInfoCard.Message}</Text>
                        <TouchableOpacity style={styles.appointmentButton} onPress={()=> setaptm({
                                Date: 'Date: '+ CurrentDate.Date,
                                DoctorName: DocInfoCard.DoctorName + ' - ' + DocInfoCard.Specialization,
                                Hospital_Clinic_Name: DocInfoCard.HospiatlClinicName,
                                BookingTime: 'Time: ' + CurrentTime.Time,
                            })}>
                            <Text style={{color: 'white'}}>BOOK APPOINTMENT</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.Lbutton}>
                            <Text style={{color: 'white'}}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Rbutton} onPress={() => navigation.navigate('VideoCall', { Channel: DocInfoCard.Channel })}>
                            <Text style={{color: 'white'}}>Video Call</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </Card>
                )}
            </ScrollView>
		</SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      backgroundColor: '#2E71DC',
    },
    SecondHalf: {
     
    },
    AvailableDoc: {
        fontSize: 25,
        padding: 8,
    },
    appointment: {
        padding: 10,
        fontSize: 25,
    },
    appointmentBox: {
        height: height/4,
        backgroundColor: '#fff'
    },
    card: {
        borderRadius: 7,
        width: width/1.07,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
    },
    image: {
        width: width/1.155,
        height: width/1.155,
        borderRadius: 3,
    },
    DocName: {
        fontSize: 25,
        padding: 10
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
        width: width/2.9,
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
        width: width/2.9,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
      },
});

export default TalkToDoctor

