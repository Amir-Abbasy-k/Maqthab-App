import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import {TabBar} from '../../components/Header';
import { useNavigation } from '@react-navigation/core';

const Register = props => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');

  const nav = useNavigation();

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!textInputName.trim()) {
      alert('Please Enter Name');
      return;
    }
    //Check for the Email TextInput
    if (!textInputEmail.trim()) {
      alert('Please Enter Email');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    alert('Success');
  };

  return (
    <Layout rootStyle={{}}>
      <TabBar title="Register" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {/* <Text style={styles.header}>Sign up as new member</Text> */}

            <Input
              placeholder="Email"
              value={textInputName}
              err="This is err"
            />

            {/* Country */}
            <DropDown
              title="Country"
              data={[
                {label: 'ID', value: 'ID'},
                {label: 'Passport', value: 'Passport'},
              ]}
              onChangeItem={val => null}
              errorMessage={'err'}
            />
            {/* State */}
            <DropDown
              title="State"
              data={[
                {label: 'ID', value: 'ID'},
                {label: 'Passport', value: 'Passport'},
              ]}
              onChangeItem={val => null}
              errorMessage={'err'}
            />
            <Input placeholder="City" value={textInputName} err="This is err" />

            {/*  Time Zone */}
            <DropDown
              title="Time Zone"
              data={[
                {label: 'ID', value: 'ID'},
                {label: 'Passport', value: 'Passport'},
              ]}
              onChangeItem={val => null}
              errorMessage={'err'}
            />

            <Text style={styles.title}>I want to learn</Text>

            <View style={styles.v}>
              {new Array(5).fill('*').map((item, key) => {
                return (
                  <Button
                    placeholder="Username"
                    title={'Learn here'}
                    err="This is err"
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={key % 2 == 0}
                  />
                );
              })}
            </View>

            <Text
              style={{
                fontSize: 12,
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Icon name="md-checkmark-circle" size={20} color="#096" />I have
              read and agree to the terms of use.
            </Text>

            {/* <CheckBox
          value={true}
          onValueChange={null}
          // style={styles.checkbox}
        /> */}

            <Button
              bold
              title="Submit"
              onPress={() => nav.navigate('Main')}
              style={{marginTop: 30}}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
  header: {
    fontSize: 20,
    marginVertical: 24,
  },
  v: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    color: '#444',
    marginVertical: 5,
  },
});

export default Register;
