import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GradientBG from '../../../components/GradientBG';
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../../../../UserContext'
const DrawerHeader = () => {
const profCntx = useUserContext().data?.prof;
console.log(profCntx);
  return (
    <View style={{flexDirection: 'row', alignItems:'center', padding: 22, marginTop: 22}}>
   <GradientBG style={{borderRadius: 15, padding: 5}}>
        <Icon
          name="user" 
          size={25}
          color="#000"
          style={{padding: 2}}
          onPress={() => null}
        />
      </GradientBG>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>{profCntx?.name}</Text>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({});
