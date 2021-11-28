import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {student, studentLight} from '../styles/Color';

export default function GradientBG(props) {
  return (
    <LinearGradient
      start={{x: -0.3, y: 0.7}}
      end={{x: 0.4, y: 0.3}}
      colors={[studentLight, student]}
      style={(styles.root, props?.style)}>
      {props?.children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 50,
    borderRadius: 30,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
