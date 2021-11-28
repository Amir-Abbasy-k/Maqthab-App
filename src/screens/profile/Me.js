import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import { TabBar } from '../../components/Header';
import Layout from '../../components/Layout';
// import MultiSlider from '../../components/MultiSlider';

const Home = () => {
  return (
    <Layout>
      <TabBar title="Profile"/>
    <ScrollView contentContainerStyle={{ margin: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 20,
        }}>

        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#CCC2FC',
            borderRadius: 35,
          }}
        />
    
      </View>

      <Text
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '700',
        }}>
        Amir Abbasy
      </Text>
 

      <Text
        style={{ justifyContent: 'center', textAlign: 'center', fontSize: 12 }}>
        India, Kerala
      </Text>

   

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
      <Text  style={styles.text}>
        What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
        typesetting industry Lorem Ipsum has been the industry's standard.
      </Text>

      <Button
        title="Edit My Profile"
        style={{ marginVertical: 10 }}
        onPress={null}
      />
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#444',
    opacity: 0.7
  },
  head: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 20,
    marginBottom: 8
  },
});

export default Home;
