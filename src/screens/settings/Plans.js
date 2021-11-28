import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Switch } from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import {TabBar} from '../../components/Header';
import Layout from '../../components/Layout';
import { student } from '../../styles/Color';

export default function Plans() {
  const navigation = useNavigation();
  const focused = useIsFocused()
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    navigation.toggleDrawer();
  }, [focused]);
  return (
    <Layout rootStyle={{paddingHorizontal: 22}}>
      <TabBar title="Plan & Pricing" />
      <Text style={{fontSize: 17, fontWeight: 'bold', alignSelf: 'center', marginVertical: 15}}>Learn Quran now!</Text>
      <Text style={styles.normal}>How many monthly hours do you need?</Text>

      {/* Select Houres */}
      <DropDown
        //   title="none"
        data={[
          {label: 'ID', value: 'ID'},
          {label: 'Passport', value: 'Passport'},
        ]}
        onChangeItem={val => null}
        errorMessage={'err'}
      />

      <Text style={styles.title}>Do you want to enable Parental Watch?</Text>


    <View style={{flexDirection: 'row'}}>
    <Text style={{...styles.normal, width: '85%'}}>
        (Parental Watch automatically records snippets of lessons at random
        times, so parents can review their child's progress).
      </Text>
      
      <Switch
        trackColor={{ false: "#767577", true: student }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        // onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>

      <Text style={styles.title}>
        Do you want the ability to record parts of your lessons for revision
        later?
      </Text>

      <View style={{padding: 20, borderWidth: 1,marginVertical: 15, borderRadius: 25, borderStyle: 'dashed', borderColor: student }}>
        <Text style={{fontSize: 25, alignSelf: 'center', color: student, marginBottom: 10}}>Rs 1200 / Month</Text>
        <Button bold title="PURCHASE" />
      </View>

      <Text style={styles.normal}>
        *Classroom plans renew automatically. You can Unsubscribe at any time to
        turn off automatic renewal.
        {'\n'}
      </Text>
      <Text style={styles.normal}>
        *The Tutor's payment is NOT included in the Classroom plan. Tutors have
        to be paid separately
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  normal: {
    opacity: 0.7,
    marginBottom: 5,

  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 7
  },
});
