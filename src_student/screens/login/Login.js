import React,{useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, TextInput} from 'react-native';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import {student, studentLight} from '../../styles/Color';
import {useUserContext} from '../../../UserContext';
import APIKit from '../../../src/services/ApiKit';

export default function Login() {
  const navigation = useNavigation();
  const userType = useUserContext();

  useEffect(() => {
    _getToken();
  }, [])

  const _getToken=()=>{
    let body = {
      "mobile": 1234567890,
      "password": "facilis",
      "device_name": "dolor"
  }
  
    // APIKit.post('/sanctum/token', body).then(data => {
    // console.log(data);
    // });

    const url = new URL(
      "http://staging.maqtab.in/api/sanctum/token"
  );
  
  const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Api-Key": "IceknuGz3kgH9XlvYDOwrQciMa61GsiKXvtqT6un1c",
  };
  
  fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  }).then(response => console.log(response));


  }

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          marginHorizontal: 22,
        }}>
        <Text>App Logo</Text>
        <View style={{}}>
          <TextInput
            style={{
              // backgroundColor: studentLight,
              fontSize: 22,
              padding: 10,
              // textAlign: 'center',
              fontWeight: 'bold',
              color: student,
              marginTop: 5,
              borderBottomWidth: 1,
              borderColor: student
            }}
            placeholder="Mobile Number"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
          />
          <Button
            title="Verify Number"
            onPress={() => {navigation.navigate('OtpVerify');
            // userType.setData({userType: "TUTOR", profPic: "assets/images/ic-user.png"})
          }
          }
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </Layout>
  );
}
