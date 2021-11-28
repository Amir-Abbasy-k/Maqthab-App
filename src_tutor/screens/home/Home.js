import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import GradientBG from '../../components/GradientBG';
import ProfileCard from '../../components/ProfileCard';
import Button, {ButtonSmall} from '../../components/Button';
import FilterModal from './components/FilterModal';
import {student} from '../../styles/Color';
import APIKit from '../../services/ApiKit';

// import MultiSlider from '../components/MultiSlider';

const Home = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [countryList, setCountryList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [languages, setLanguages] = useState('');
  const [subjects, setSubjects] = useState([]);


  useEffect(() => {
    _getTeachersList();
    _getFilterData();
    // return () => {
    // }

    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
  }, []);

  console.log('tutors', tutors == []);

  const _getTeachersList = () => {
    setLoading(true)
    // navigation.navigate('Main');
    // useContext.setData({userType: "STUDENT", profPic: "assets/images/ic-user.png"})
    let body = filter
      ? {
          country: filter?.country,
          subject: filter?.subject?.value.map(item => item.id),
          language: filter?.language?.value.map(item => item.id),
        }
      : {};

    let body_ = {
      "gender": "M",
      "country": "IND",
      "state": "KL",
      "subject": [
          1,
          2
      ],
      "language": [
          1,
          2
      ]

    };
    console.log('body', body);
    APIKit.post('/teacher/student/search', body).then(res => {
      if (res.status == 200) {
        const data = res.data.data.users.data;
        setTutors(data);
        setModalVisible(false);
        setFilter()
       setLoading(false)
      } else {
        console.log('err catch', res);
    setLoading(false)
      }
    });
  };

  const _getFilterData = () => {
    APIKit.get('/teacher/student/search').then(data => {
      const list = [];
      Object.entries(data.data.data.countries).map(item =>
        list.push({label: item[1], value: item[0]}),
      );
      setCountryList(list);
      setLanguagesList(data.data.data.languages);

      const sub_list = [];
      data.data.data.subjects.map(i =>
        sub_list.push({name: i.name, id: i.id, selected: false}),
      );
      setSubjects(sub_list);
    });
  };

  return (
    <Layout>
      <Header />
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <GradientBG style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 30, fontWeight: '200'}}>
              Find Your {'\n'}Best Students
            </Text>
            <Image source={require('../../assets/images/qr_green.png')} />
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
            <ButtonSmall
              title={tutors.length == 0 ? 'Cancel' : 'Filter'}
              style={{paddingVertical: 7}}
              onPress={() =>
                tutors.length == 0
                  ? _getTeachersList() : setModalVisible(true)
              }
            />
          </View>
        </GradientBG>
        {loading &&  <ActivityIndicator color={student} size={20} />}

        {tutors.length != 0 ? (
          tutors.map((item, key) => (
            <ProfileCard
              data={item}
              key={Math.random()}
              onPress={() => props.navigation.navigate('Profile', {profileId: item.id})}
              onPressChat={() =>
                props.navigation.navigate('Chat', {tutor: item})
              }
            />
          ))
        ) : ( <Text style={{textAlign: 'center'}}>No Data!</Text> )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {languagesList && countryList && subjects && (
          <FilterModal
            onClose={() => setModalVisible(!modalVisible)}
            onPress={() => {
              _getTeachersList();
            }}
            languagesList={languagesList}
            countryList={countryList}
            subjects={subjects}
            setFilterVals={val => setFilter(val)}
          />
        )}
      </Modal>
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
