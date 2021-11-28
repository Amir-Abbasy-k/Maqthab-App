import React, { useState, useEffect } from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, TextInput, Image} from 'react-native';
import {useUserContext} from '../../../UserContext';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import APIKit from '../../services/ApiKit';
import {student, studentLight} from '../../styles/Color';

export default function Login() {
  const navigation = useNavigation();
  const [number, setNumber] =  useState(1074574665);
  const [loading, setLoading] =  useState(false);
  const [err, setErr] =  useState();

  // useEffect(()=>{
  //   _getToken();
  // },[])

   
  const _genOTP = ()=>{
    setLoading(true)
    setErr()
    let body =  { "mobile": number}
    APIKit.post('/otp/send', body).then(res => {
      console.log(res.data);
      if (res.status) {
        if(res.data.errors){
          setErr(res.data.errors.mobile[0])
          setLoading(false)
        }else{
          navigation.navigate('OtpVerify', {otpSample: res.data.OTP, phone: number});
        }
      } else {
        alert(JSON.stringify(res.data))
        setLoading(false)
      }
    });
  }

  // const signUp = () => {
  //   // navigation.navigate('Main');
  //   // useContext.setData({userType: "STUDENT", profPic: "assets/images/ic-user.png"})
  //     //remove
  //     if(number == 1074574665 ){
  //       useContext.setData({...useContext.data, userType: 'STUDENT', prof:{name: "Amir", pic: "new url"}});
  //     }else if(number == 1642918397){
  //       useContext.setData({...useContext.data, userType: 'TUTOR', prof:{name: "Abbasy", pic: "new tutor url"}});
  //     }else{
  //       _genOTP()
  //     }
  // };

  return (
    <Layout contentContainerStyle={{flex: 1, justifyContent: 'center', padding: 22}}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 120, height: 120, alignSelf: 'center', marginBottom: 100}}
        />
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
              borderColor: student,
              
            }}
            placeholder="Mobile Number"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
            onChangeText={(txt)=> setNumber(txt)}
          />
          <Button
            title="Verify Number"
            onPress={() => _genOTP()}
            style={{marginTop: 20}}
            bold
            loading={loading}
          />
          {err &&  <Text style={{color: 'tomato'}}>{err}</Text>}
          {/* <Button
            title="Verify Number (test tutor)"
            onPress={() => {
              navigation.navigate('Main');
              useContext.setData({
                userType: 'TUTOR',
                profPic: 'assets/images/ic-user.png',
              });
            }}
            style={{marginTop: 20}}
          />
          <Button
            title="New Member (test)"
            onPress={() => {
              navigation.navigate('TellUs');
              useContext.setData({
                userType: '',
                profPic: 'assets/images/ic-user.png',
              });
            }}
            style={{marginTop: 20}}
          />
          <Button
            title="test admin"
            onPress={() => {
              navigation.navigate('Main');
              useContext.setData({
                userType: 'ADMIN',
                profPic: 'assets/images/ic-user.png',
              });
            }}
            style={{marginTop: 20}}
          /> */}
      </View>
    </Layout>
  );
}
