/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigation from './Drawer/DrawerNavigation';
import Register from '../screens/register/Register';
import RegisterTutor from '../screens/register/RegisterTutor';
import RegisterAdmin from '../screens/register/RegisterAdmin';
import Intro from '../screens/splash/Intro';
import Login from '../screens/login/Login';
import Splash from '../screens/splash/Splash';
import OtpVerify from '../screens/verify/OtpVerify';
import TellUs from '../screens/verify/TellUs';
import Test from '../Test';
import Quran from '../screens/quran/Quran';
import QuranRead from '../screens/quran/QuranRead';


const MainRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator  
       screenOptions={{ headerShown: false }}
      initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TellUs"
          component={TellUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterTutor"
          component={RegisterTutor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterAdmin"
          component={RegisterAdmin}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Main"
          component={DrawerNavigation}
          options={{headerShown: false}}
        /> 
       
       <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        /> 
       <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Quran"
          component={Quran}
          options={{headerShown: false}}
        /> 
       <Stack.Screen
          name="QuranRead"
          component={QuranRead}
          options={{headerShown: false}}
        /> 
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;

const styles = StyleSheet.create({});
