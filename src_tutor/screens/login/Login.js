import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import {student, studentLight} from '../../styles/Color';

export default function Login() {
  const navigation = useNavigation();
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
            onPress={() => navigation.navigate('OtpVerify')}
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </Layout>
  );
}
