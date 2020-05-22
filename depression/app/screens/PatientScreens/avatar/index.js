import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ProgressBarAndroid, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Card, Button  } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'; 
import {connect} from 'react-redux';
import {firestoreUpload} from '../../../actions/authAction';
import Swiper from 'react-native-swiper'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

class AvtarSelection extends Component {

  constructor(props){
    super();
    this.state = {
      errors: []
    }
    this.props = props;
    this._carousel = {};
    this.init();
  }

  init(){
    this.state = {
      videos: [
        { 
          uri: require('../../../assets/teenGirl2.png'),
          title: 'Write something about the TeenGirl.',
          name: 'teenGirl2.png'
        },
        { 
          uri: require('../../../assets/teenBoy2.png'),
          title: 'Write something about the TeenBoy.',
          name: 'teenBoy2.png'
        },
        { 
          uri: require('../../../assets/women.png'),
          title: 'Write something about the Woman.',
          name: 'women.png'
        },
        { 
          uri: require('../../../assets/man2.png'),
          title: 'Write something about the Man.',
          name: 'man2.png' 
        },
        { 
          uri: require('../../../assets/teenboy.png'),
          title: 'Write something about the avatar.',
          name: 'teenboy.png' 
        },
        { 
          uri: require('../../../assets/teenGirl.jpg'),
          title: 'Write something about the avatar.',
          name: 'teenGirl.jpg'
        },
        { 
          uri: require('../../../assets/unname.png'),
          title: 'Write something about the avatar.',
          name: 'unname.png'
        },
        { 
          uri: require('../../../assets/man.jpg'),
          title: 'Write something about the avatar.',
          name: 'man.jpg'
        },
      ]
    };
  }
 
  componentDidMount() {
    this._carousel.snapToItem(2);
  }

  profilePage = async() => {
    var uid = this.props.user.id
    console.log("user uid = ", uid)
    await this.props.firestoreUpload(this.patientBasicDetails.AvatarName, uid, this.patientBasicDetails)
    console.log("upload success")
  }
  
  state={
    AvatarSelcted: "This is me",
  }

  AvatarSelection = async(avatarName) => {
    this.patientBasicDetails.AvatarName=avatarName
    this.setState({AvatarSelcted: 'Awesome'});
    console.log("insdie......", avatarName, this.patientBasicDetails.AvatarName, this.state.AvatarSelcted)
  }

  patientBasicDetails= {
    AvatarName: '',
    fullname: '',
    age: 0,
    gender: '',
    country: '',
    state: '',
    cityTown: '',
    postalCode: '',
  }
  
  _renderItem = ( {item} ) => {
    return (
      <Card
        containerStyle={{borderRadius: 20, width: width/1.08,}}>
        <Image
          style={{width: width/1.2, height:height/2.7}}
          source={item.uri}
        />
        <Text style={{marginTop: '2%', alignSelf: 'center'}}>
          {item.title}
        </Text>
        <Button
          onPress={()=>this.AvatarSelection(item.name)}
          buttonStyle={{borderRadius: 25}}
          title="This is me"
        />
        <Text style={styles.AvatarSelectionText}>{this.state.AvatarSelcted}</Text>
      </Card>  
    );
  }

  render = () => {
    console.log("rendering Avtar selection page", this.props.user)
    console.log("dict........", this.patientBasicDetails)
    return (
      <ScrollView style = {styles.container}>
        <StatusBar backgroundColor='#2E71DC'/>
        <View style = {styles.FirstHalf}>
          <Text style={styles.SelectAvatarText}>Select your Avatar</Text>
          <Carousel
            ref={ (c) => { this._carousel = c; } }
            data={this.state.videos}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={width}
            itemWidth={width}
            layout={'stack'}
            layoutCardOffset={8}
            firstItem={0}
          />
        </View>
        <View style = {styles.SecondHalf}>
          <Swiper style={styles.wrapper}>
            <View style={styles.swiperPage}>
              <TextInput
                placeholder="Full Name"
                style={styles.textInput}
                placeholderTextColor='black'
                autoCompleteType='name'
                autoCapitalize='characters'
                importantForAutofill='yes'
                onChangeText = { FirstName => { this.patientBasicDetails.fullname=FirstName }}
              />
              <TextInput
                placeholder="Age"
                style={styles.textInput}
                placeholderTextColor='black'
                keyboardType='numeric'
                onChangeText = { age => { this.patientBasicDetails.age=age}}
              />
              <TextInput
                placeholder="Gender"
                style={styles.textInput}
                placeholderTextColor='black'
                autoCapitalize='characters'
                onChangeText = { gender => { this.patientBasicDetails.gender=gender}}
              />
              <TextInput
                placeholder="Country"
                style={styles.textInput}
                placeholderTextColor='black'
                textContentType='countryName'
                autoCapitalize='characters'
                onChangeText = { country => { this.patientBasicDetails.country=country}}
              />
              <TextInput
                placeholder="State"
                style={styles.textInput}
                placeholderTextColor='black'
                textContentType='addressState'
                autoCapitalize='characters'
                onChangeText = { state => { this.patientBasicDetails.state=state}}
              />
              <TextInput
                placeholder="City/Town"
                style={styles.textInput}
                placeholderTextColor='black'
                textContentType='addressCityAndState'
                autoCapitalize='characters'
                onChangeText = { cityTown => { this.patientBasicDetails.cityTown=cityTown}}
              />
              <TextInput
                placeholder="Postal code"
                style={styles.textInput}
                placeholderTextColor='black'
                autoCompleteType='postal-code'
                onChangeText = { postalCode => { this.patientBasicDetails.postalCode=postalCode}}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.profilePage()}>
                <Text style={styles.NextButton}>NEXT</Text>
              </TouchableOpacity>         
              { this.props.progressBarStatus && (
                <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
              )}
            </View>
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SelectAvatarText: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#fff'
  },
  FirstHalf: {
    backgroundColor: '#2E71DC',
  },
  AvatarSelectionText: {
    fontSize: 16,
    color: 'green',
    alignSelf: 'center'
  },
  SecondHalf: {
    alignItems: 'center',
  },
  wrapper: {

  },
  swiperPage: {
      alignContent: 'center',
      padding: 10,
  },
  textInput: {
      height:50,
      marginHorizontal:'6%',
      borderBottomWidth: 1,
      marginVertical:'1%',
      borderColor:'rgba(0,0,0,0.02)',
  },
  button: {
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
    NextButton: {
      color: '#fff',
      fontSize: 18
    }
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  progressBarStatus: state.auth.progressBarStatus
});
const mapDispatch = { firestoreUpload };
export default connect(mapStateToProps,mapDispatch)(AvtarSelection);
 