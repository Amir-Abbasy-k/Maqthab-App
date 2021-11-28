/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './Drawer/DrawerNavigation';
import Profile from '../screens/profile/Profile';
import Calendar from '../screens/calendar/Calendar';
import Chat from '../screens/messages/Chat';
import ClassRooms from '../screens/classrooms/ClassRooms';
import Intro from '../screens/splash/Intro';
import Login from '../screens/login/Login';
import TellUs from '../screens/verify/TellUs';
import Me from '../screens/profile/Me';
import Razorpay from '../screens/pay/Razorpay';
import StreamClass from '../screens/classrooms/Stream';
import EditProfile from '../screens/profile/EditProfile';
import Quran from '../../src/screens/quran/Quran';
import QuranRead from '../../src/screens/quran/QuranRead';



const MainRoute = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator  
       screenOptions={{ headerShown: false }}
      initialRouteName="Main">
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="TellUs"
          component={TellUs}
          options={{headerShown: false}}
        />
     
           <Stack.Screen
          name="Main"
          component={DrawerNavigation}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{headerShown: false}}
        />
    
       <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Classrooms"
          component={ClassRooms}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        /> 
       <Stack.Screen
          name="Me"
          component={Me}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        /> 
   
   
       <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Pay"
          component={Razorpay}
          options={{headerShown: false}}
        /> 
   
       <Stack.Screen
          name="Stream"
          component={StreamClass}
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
