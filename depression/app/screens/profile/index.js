import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {userSignout} from '../../actions/authAction';
import {useDispatch} from 'react-redux';

const ProfileScreen = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
     <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center",flex:2,justifyContent:'space-between',padding:10  }}>
			</View>
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={{uri: user.profileURL}} style={styles.image} resizeMode="center"></Image>
                </View>
            </View>
            <View style={styles.infoContainer}>
                 <Text style={[styles.text, { fontWeight: "200", fontSize: 36  }]}>{user.fullname}</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 ,textDecorationLine: 'underline'}]}>{user.email}</Text>
            </View>
        {/**<TouchableOpacity
        onPress={()=> dispatch(userSignout)}
      >
        <Text style={{ alignSelf: "center" }}>Logout</Text>
      </TouchableOpacity>**/}
        </ScrollView>
     </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
});
