import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Rating from './Rating'

function ProfileCard(props) {
  console.log(props.data);
  const tutor  = props?.data
  return (
    <TouchableOpacity style={styles.root} onPress={props?.onPress}>
      <View style={{width: 60}}>
        <Image
          source={{
            uri: 'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png',
          }}
          style={{width: 50, height: 50, marginRight: 15, borderRadius: 18}}
        />
      </View>

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View  style={{flex: 1, justifyContent: 'space-between'}}>
            <Text style={styles.name}>{tutor?.name}</Text>
            <Text style={styles.text}>{tutor?.email}</Text>
            <Text style={styles.text}>Mobile: {tutor?.mobile}</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcon
              style={{paddingVertical: 10}}
              name="message"
              size={25}
              color="#C4C4C4"
              onPress={props?.onPressChat}
            />
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 5,}}>
       <Rating/>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            Gender{'\n'}
            Languages{'\n'}
            Teachers{'\n'}
            Rates
          </Text>

          <Text style={styles.text}>
            Male{'\n'}
            Arabic, English{'\n'}
            Recitation, Arabic, Tajweed{'\n'}
            $5 / hour
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    marginHorizontal: 22,
    marginVertical: 7,
    backgroundColor: '#fff',

    shadowColor: '#ccc',
    shadowOffset: {width: 16, height: 16},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 12,

    borderRadius: 35,
    alignItems: 'center',
  },
  name: {
    padding: 5,
    color: '#444',
    fontSize: 16,
  },
  text: {
    color: '#C4C4C4',
    fontSize: 12,
  },
});

export default ProfileCard;
