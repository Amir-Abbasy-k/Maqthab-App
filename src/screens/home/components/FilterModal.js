import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import MultiSlider from '../../../components/MultiSlider';

const Filter = props => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');

  // const checkTextInput = () => {
  //   Alert.alert('Success');
  // };

  return (
    <ScrollView style={{padding: 22, backgroundColor: '#fff'}}>
      <AntDesign
        style={{alignSelf: 'flex-end'}}
        name="close"
        size={25}
        color="#000"
        onPress={props?.onPress}
      />

      <Text style={styles.title}>Subject</Text>
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

      <Text style={styles.title}>Spoken</Text>
      <View style={styles.v}>
        {new Array(8).fill('*').map((item, key) => {
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

      {/* <Text style={styles.title}>Rating</Text> */}
      {/* <MultiSlider /> */}

      <Text style={styles.title}>Spoken</Text>
      <View style={styles.v}>
        {new Array(4).fill('*').map((item, key) => {
          return (
            <Button
              placeholder="Username"
              title={'Learn here'}
              err="This is err"
              style={{padding: 5, paddingHorizontal: 10}}
              disabled={key % 4 == 0}
            />
          );
        })}
      </View>

      <Button
        bold
        title="Filter"
        onPress={props?.onPress}
        style={{marginVertical: 20}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  v: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
    marginTop: 20,
    fontWeight: '700',
  },
});

export default Filter;
