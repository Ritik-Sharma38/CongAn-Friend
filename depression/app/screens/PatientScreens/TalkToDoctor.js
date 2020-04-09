import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated, ProgressBarAndroid, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDoctorList} from '../../actions/authAction';
import { Button, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

 
const TalkToDoctor = () => {
    const [talkToAvatarState, setTalkToAvatarState] = useState(false);
    const [trigerImg, setTrigerImg] = useState(true)
    const [trigerHltme, setTrigerHltme] = useState(true)
    const [trigerDact, setTrigerDact] = useState(true)
    const [trigerSlyf, setTrigerSlyf] = useState(true)
    const [trigerMps, setTrigerMps] = useState(true)
    const [trigerProfile, setTrigerProfile] = useState(true)
    const [trigerAvtarVideo, setTrigerAvatarVideo] = useState(true)
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation();
    const imageSource = useSelector(state => state.auth.imageSource)
    const progressBar = useSelector(state => state.auth.progressBarStatus)
    const DoctorList = useSelector(state => state.auth.DoctorList) 
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container}>
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
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
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.fullname}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <Button
                    title = "fetch data"
                    onPress={()=> dispatch(fetchDoctorList())}
                />
                <Text>printing Doctor data {DoctorList}</Text>
            </ScrollView>
		</SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      height: height/8,
      backgroundColor: '#2E71DC',
    },
    SecondHalf: {
     
    },
    Cards: {
      backgroundColor: '#2E71DC',
      height: height/2,
      width: width/1.08,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#000',
      shadowOpacity: 0.4,
      elevation: 4,
    },
});

export default TalkToDoctor

