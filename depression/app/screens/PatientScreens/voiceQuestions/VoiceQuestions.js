import React, { Component, useState, useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Button, ProgressBarAndroid, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Card, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const VoiceQuestions = () => {
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation();
    console.log("rendring voice question page")
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
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center', alignContent: 'center', paddingTop: 5,paddingBottom: 5,}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.fullname}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
               
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

export default VoiceQuestions

