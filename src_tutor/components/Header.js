import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import GradientBG from '../components/GradientBG';
import {student} from '../styles/Color';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
      }}>
      <TouchableOpacity
      onPress={()=> navigation.toggleDrawer()}
        style={{
          width: 60,
          height: 20,
          justifyContent: 'space-around',
        }}>
        <View style={{width: 35, height: 3, backgroundColor: student}} />
        <View style={{width: 15, height: 3, backgroundColor: student}} />
      </TouchableOpacity>
      <Text style={{fontSize: 12}}>App Name</Text>

      <GradientBG style={{borderRadius: 10}}>
        <Icon
          name="user"
          size={20}
          style={{padding: 8}}
          color="#FFF"
          onPress={() => navigation.navigate("Me")}
        />
      </GradientBG>
    </View>
  );
}

export function TabBar(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 15,...props.style}}>
      <Icon name="arrow-left" size={25} color="#444" onPress={() => navigation.goBack()}  />
      <Text style={{fontSize: 16, fontWeight: 'bold', paddingLeft: 10}}>
        {props?.title}
      </Text>
    </View>
  );
}

export function CustomTabBar(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
      }}>
     {props?.children}
    </View>
  );
}

