import React from 'react';
import { ActivityIndicator, View,StyleSheet } from 'react-native';

function Loader(props){
    console.log("loader props",props)
    return(
        <View style = {styles.container}>
            <ActivityIndicator
               animating = {props.animating}
               color = '#fff'
               size = "large"
               style = {styles.activityIndicator}/>
        </View>
    )
}
export default Loader;
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})
