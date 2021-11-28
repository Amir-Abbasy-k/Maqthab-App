import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import GradientBG from '../../components/GradientBG';
import ProfileCard from '../../components/ProfileCard';
import Button from '../../components/Button';
import FilterModal from './components/FilterModal';
import {student} from '../../styles/Color';

// import MultiSlider from '../components/MultiSlider';

const Home = props => {


  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Layout>
      <Header />
      <ScrollView contentContainerStyle={{}}>
        <GradientBG style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 30, fontWeight: '200'}}>
             Admin
            </Text>
            <Image source={require('../../assets/images/qr_blue.png')} />
          </View>

          <View style={styles.search}>
            <Icon
              name="search"
              size={20}
              color="#900"
              style={{padding: 10}}
              color="#CCC2FC"
            />
            <TextInput
              placeholder="Search"
              style={{
                flex: 1,
                textAlign: 'left',
                color: '#907AF9',
                fontSize: 15,
              }}
            />
            <Button
              title="Filter"
              style={{paddingVertical: 7}}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </GradientBG>

        <Text style={styles.modalText}>Payment History</Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 22,
    borderRadius: 35,
    // backgroundColor: '#fff',

    shadowColor: student,
    shadowOffset: {width: 16, height: 16},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 12,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Home;
