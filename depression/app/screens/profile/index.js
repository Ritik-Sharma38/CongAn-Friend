import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,SafeAreaView,ScrollView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {userSignout} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import { Button, Avatar, Card, Image} from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.FirstHalf}>
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri: user.profileURL
                    }}
                    showEditButton
                />
                <Text style={{fontSize: 18,color: '#fff' }}>{user.fullname}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <Card
                    containerStyle={styles.Cards}>
                    <Image
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty0.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '3%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Check your health timeline</Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <Image
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty3.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Daily Activity</Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <Image
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty7.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Talk to Avatar</Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <Image
                    style={{width: width/1.1, height: height/2.5, fontSize: 22}}
                    source={require('../../assets/healty9.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Social life </Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <Image
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty8.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Medical prescription</Text>
                </Card>
                <Card
                    containerStyle={{backgroundColor: '#2E71DC', height: height/2.5, width: width/1.08, borderRadius: 15, alignItems: 'center', justifyContent: 'center',}}>
                    <Image
                    style={{width: width, height: height/3,}}
                    source={require('../../assets/healty12.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Profile and account setting</Text>
                </Card>
                <Button onPress={()=>{dispatch(userSignout())}}  title="LogOut"/>
            </ScrollView>
		</SafeAreaView>
      );
};

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      height: height/8,
      alignItems: 'center',
      alignContent: 'center',
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
  
  