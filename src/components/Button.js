import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import GradientBG from './GradientBG';

function Button(props) {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity onPress={()=>{
      props.onPress();
      props.disabled && setSelected(true)
    }}>
      { props.disabled && selected || props?.bold ? (
        <GradientBG style={{ ...styles.root, ...props?.style }}>
              {props?.loading ? <ActivityIndicator loading={true} color="#FFF" /> :  <Text
            style={
              (styles.buttonText,
              { fontSize: props?.bold && 20, color: '#fff', fontWeight: '900' })
            }>
            {props?.title}
          </Text>}
        </GradientBG>
      ) : (
        <View
          style={{
            ...styles.root,
            ...props?.style,
            backgroundColor: '#F1EEFF',
          }}>
      <Text
            style={{
              ...styles.buttonText,
              color: '#444',
              fontSize: props?.bold && 20,
            }}>
            {props?.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default Button;
