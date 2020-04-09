import React from 'react';
import { ActivityIndicator, View,StyleSheet } from 'react-native';

const Loader = () => {
    console.log("loader props")
    return(
        <View style = {styles.container}>
            <ActivityIndicator
               color = '#000'
               size = "large"
            />
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
