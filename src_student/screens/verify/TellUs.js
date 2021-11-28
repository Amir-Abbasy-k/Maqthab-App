import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../../components/Button';
import Layout from '../../components/Layout';
import GradientBG from '../../components/GradientBG';
import { TabBar } from '../../components/Header';
import { student, studentLight } from '../../styles/Color';
import Input from '../../components/Input';

export default function Login() {
  const navigation = useNavigation();
  return (
    <Layout>
      <TabBar/>
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Tell Us About You
        </Text>
        <Text style={{fontWeight: 'bold',marginVertical: 10}}>
         You are a
        </Text>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
  
        <GradientBG style={{width: 100, padding: 10, borderRadius: 20, opacity: 0.7}}>
          <Icon name="user" size={20}color="#FFF" />
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
            Student
          </Text>
        </GradientBG>

        <Text style={{marginHorizontal: 10, opacity: 0.5}}>OR</Text>

        <GradientBG style={{width: 100, padding: 10, borderRadius: 20}}>
          <Icon name="users" size={20}color="#FFF" />
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
            Teacher
          </Text>
        </GradientBG>
</View>
        
        <TouchableOpacity style={{ marginVertical: 10,alignSelf: 'flex-start',padding: 10,backgroundColor: studentLight, borderRadius: 50}}>
        <Text style={{fontWeight: 'bold', color:  student,}}>
         Are you an admin?
        </Text>
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold',marginTop:20}}>
         Name
        </Text>
        <Input placeholder="Enter Your Name" />
        <Button
            title="Upload your Photo"
            onPress={() => navigation.navigate('Register')}
          />
        <Button
            title="Next"
            onPress={() => navigation.navigate('Register')}
          />


       
      </View>
    </Layout>
  );
}
