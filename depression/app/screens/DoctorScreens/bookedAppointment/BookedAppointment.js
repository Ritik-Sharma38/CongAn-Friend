import React, { Component, useState, useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Button, ProgressBarAndroid, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Card, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const BookedAppointment = () => {
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation();
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear(); 
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds();
    const [CurrentDate, setDate] = useState({ Date: date + '/' + month + '/' + year})
    const [CurrentTime, setTime] = useState({ Time: hours + ':' + min + ':' + sec})
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container} >
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',  alignContent:'center', alignItems: 'center', }}>
                    <Icon.Button 
                        backgroundColor="#2E71DC"
                        name="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                    <View style={{marginHorizontal: '30%'}}>
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.profilePicture
                            }}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center', alignContent: 'center', paddingTop: 5,paddingBottom: 5,}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.Full_Name}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <View style={styles.appointmentBox}>
                    <Text style={styles.appointment}>Booked appointment</Text>
                    <View>
                        <ListItem
                            leftAvatar={{
                                title: 'appointment',
                                source: { uri: 'https://cdn2.iconfinder.com/data/icons/calendar-36/64/5-512.png' },
                            }}
                            title={'Ritik Sharma'}
                            subtitle={'Mumbai'}
                        />
                        <Text style={{paddingLeft: 20, fontSize: 17}}>Date: {CurrentDate.Date}</Text>
                        <Text style={{paddingLeft: 20, fontSize: 17}}>Time: {CurrentTime.Time}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.Lbutton}>
                            <Text style={{color: 'white'}}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Rbutton} onPress={() => navigation.navigate('VideoCall', { channel: user.channel})}>
                            <Text style={{color: 'white'}}>Video Call</Text>
                        </TouchableOpacity>
                    </View>
                </View >
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
    appointment: {
        padding: 10,
        fontSize: 25,
    },
    appointmentBox: {
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

export default BookedAppointment

