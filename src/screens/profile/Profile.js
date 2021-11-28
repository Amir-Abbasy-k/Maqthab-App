import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import {TabBar} from '../../components/Header';
import Layout from '../../components/Layout';
import Rating from '../../components/Rating';
// import MultiSlider from '../../components/MultiSlider';

const Home = props => {
  return (
    <Layout>
      <TabBar title="Profile" />
      <ScrollView contentContainerStyle={{margin: 22}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 20,
          }}>
          <FontAwesome5
            style={{padding: 10}}
            name="calendar-day"
            size={30}
            color="#CCC2FC"
            onPress={() => props.navigation.navigate('Calendar')}
          />
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#CCC2FC',
              borderRadius: 35,
            }}
          />
          <MaterialIcons
            style={{padding: 10}}
            name="chat-bubble"
            size={30}
            color="#CCC2FC"
            onPress={() => props.navigation.navigate('Chat')}
          />
        </View>

   <View style={{alignItems: 'center'}}>
   <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '700',
          }}>
          Amir Abbasy
        </Text>
        <Rating />

        <Text
          style={{justifyContent: 'center', textAlign: 'center', fontSize: 12}}>
          India, Kerala
        </Text>
   </View>

        <Text style={styles.head}>Recitation</Text>
        <Text style={styles.head}>for recitation – 500 rs, for Hifz – 2000 rs</Text>
        <View
          style={{
            backgroundColor: '#F1EEFF',
            width: '100%',
            height: 30,
            borderRadius: 30,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            marginTop: 10,
          }}>
          <Text style={styles.text}>
            Gender{'\n'}
            Languages{'\n'}
            Teaches
          </Text>
          <Text style={styles.text}>
            Male{'\n'}
            Arabic, English{'\n'}
            Recitation, Arabic, Tajweed
          </Text>
        </View>

        <Text style={styles.head}>About</Text>
        <Text style={styles.text}>
          What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing
          and typesetting industry Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s when an unknown printer took a galley
          of type and scrambled it to make a type specimen book it has?
        </Text>

        <Button
          title="Invite to Teach"
          style={{marginVertical: 10}}
          onPress={null}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#444',
    opacity: 0.7,
  },
  head: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 20,
    marginBottom: 8,
  },
});

export default Home;
