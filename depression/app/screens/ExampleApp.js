import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class ExampleApp extends Component {
  
  record = async () => {
    if (this.camera) {
      console.log("starting recording.....")
      const options = { maxDuration: 120 };
      const data = await this.camera.recordAsync(options);
      console.log("...from start recording...", data)
    }else {
      console.log("else.........")
    }
  };
  stopRecord = async () => {
    if (this.camera) {
      const options = { maxDuration: 120 };
      const data = await this.camera.stopRecording();
      console.log("...from stop recording..",data);
    }
  };
  
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.record} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> start </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopRecord.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Stop </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',   
  },
  preview: {
    flex: 1,
    padding: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
