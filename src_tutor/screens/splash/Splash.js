// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import { useIsFocused } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ImageBackground
} from 'react-native';

const App = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();
  
useEffect(() => {
  setTimeout(() => {
   navigation.navigate('Main'); 
  }, 2000);
}, [isFocused]);




  return (
    <View style={{flex: 1}}>
       <ImageBackground 
       style={{height: '100%', width: '100%', justifyContent:'center'}}
       source={require('../../assets/images/BG.png')}>
           
           <Image
          source={require('../../assets/images/logo.png')}
          style={{alignSelf: 'center', width: 120, height: 120}}
        />

       </ImageBackground>
   </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});