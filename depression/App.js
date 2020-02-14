import React, { Component } from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import Depression from './app/index';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<StatusBar hidden={true} />
        <Depression/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
  },

});


