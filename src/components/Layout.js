/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Image, ScrollView,View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {student, studentLight} from '../styles/Color';
//...props.rootStyle
const Layout = props => {
  // const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'}  barStyle="dark-content" />
      <Image source={require('../assets/images/BG.png')}
      style={{...StyleSheet.absoluteFill}}
      />
      <SafeAreaView style={{
        ...styles.rootStyle,
        ...props.style,
        // marginBottom: tabBarHeight,
      }}>
      <ScrollView contentContainerStyle={props?.contentContainerStyle}>
        {props?.children}
      </ScrollView>
      </SafeAreaView>
    </>
  );

};

export default Layout;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor:'#fff'
  },
});
