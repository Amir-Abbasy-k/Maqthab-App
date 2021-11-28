import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/home/Home';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  CommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { student } from '../../styles/Color';
import Plans from '../../screens/settings/Plans';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          // tabBarStyle: { position: 'absolute',  bottom: 30, backgroundColor: 'red' },
          inactiveTintColor: '#F1EEFF',
          tabBarActiveTintColor: student,
          tabBarInactiveTintColor: '#ccc',
          tabBarShowLabel: false,
          backgroundColor: 'transparent',
          tabBarActiveBackgroundColor: 'transparent',
          headerShown: false,
          tabBarStyle: { position: 'absolute' },
        }}
      
        >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={20} color={color} />),
          }}
        />
        {/* <Tab.Screen
          name="Class"
          component={ClassRooms}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="video-camera" size={20}  color={color}/>),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({ color }) => (
              <CommunityIcons name="message" size={20}  color={color}/>),
              tabBarBadge: 1,
              tabBarBadgeStyle:{color: 'yellow', backgroundColor: student}
          }}
        /> */}
        <Tab.Screen
          name="Settings"
          component={Plans}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-settings-sharp" size={20}  color={color}/>),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 5,
    paddingBottom: 5,
    backgroundColor:'red'
  },
  tabIcon: {},
  tabLabel: {
    fontSize: 12,
  },
});
