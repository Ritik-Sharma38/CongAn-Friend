import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {userSignout} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProfileScreen = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
        <View style={{height: 667, backgroundColor: "#192879"}}>
            <View style={styles.mainbody}>
            <Image style={styles.imgprofile} source={{uri: user.profileURL}} />
                <Text style={styles.name}>
                    {user.fullname}
                </Text>
                <View style={styles.itemprofile}>
                    <Icon
                    name='user' color="white" />
                    <Text style={styles.name}>
                    {user.email}
                    </Text>
                </View>
                <Button onPress={()=>{dispatch(userSignout())}} style={styles.btnlogout} title="LogOut"/>
            </View>
		</View>
      );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    mainbody: {
        marginTop: 30,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 70
    },
    imgprofile:{
        marginLeft: 100,
        marginTop: 50,
        height: 120,
        width: 120,
        borderRadius: 60
    },
    name:{
        color: "white",
        fontSize: 18,
        marginLeft: 100,
        marginTop:12,
    },
    itemprofile:{
        marginTop: 30,
    },
    btnlogout:{
        width: 300,
        height: 50,
        marginLeft: 14,
        marginBottom: 40,
        backgroundColor: "#50D9EA"
    },
    labelbtn:{
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight:"bold"
    }
   });
