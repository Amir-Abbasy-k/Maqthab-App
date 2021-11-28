import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

function Input(props) {
  return (
    <View style={styles.inner}>
      <Text style={styles.err}>{props?.err}</Text>
      <TextInput
        placeholder={props?.placeholder}
        value={props?.value}
        style={{ ...styles.textInput, ...props?.style }}
        onChangeText={props?.onChangeText}
        defaultValue={props?.defaultValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    justifyContent: 'space-around',
  },
  textInput: {
    padding: 8,
    backgroundColor: '#F1EEFF',
    marginBottom: 5,
  },
  err: {
    color: 'red',
    fontSize: 10,
  },
});

export default Input;
