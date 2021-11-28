import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import TimeBox from '../../components/TimeBox';
import {studentLight} from '../../styles/Color';
import {TabBar} from '../../components/Header';
import APIKit from '../../services/ApiKit';

const day = [
  " ",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday"]


const Calendar = props => {
  const [slotes, setSlotes] = useState();
  const [selectedSlote, setSelectedSlote] = useState();
  const [showAddTimeModal, setShowAddTimeModal] = useState(false);

  useEffect(() => {
    _getSlotes();
  }, []);

  const _getSlotes = () => {
    APIKit.get(`/student/slot/${props?.route.params.tutorId}`).then(res => {
      if (res.status == 200) {
        const data = res.data.data.slots;
        setSlotes(data)
      } else {
        console.log('err catch', res.data);
      }
    });
  };


  const bookSlote = () => {
    const body = {
      // teacher_id: props?.route.params.tutorId,
      teacher_id: selectedSlote?.teacher_id,
      user_slot_id: selectedSlote?.id,
    };
    APIKit.post('/student/slot/schedule', body).then(res => {
      console.log(res.data);
      if (res.status == 200) {
        // console.log(res.data.data);
        alert(JSON.stringify(res.data.message));
        setShowAddTimeModal(false);
      } else {
        alert(JSON.stringify(res.data.errors));
      }
    });
    // console.log('selectedSlote', selectedSlote, body);
  };

  return (
    <Layout rootStyle={{}}>
      <TabBar title="Calendar" style={{backgroundColor: '#fff'}} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 22,
        }}>
        {/* <TimeBox times={[{start: '7.00 am', end: '8.00 am'}]} /> */}

        {slotes && Object.entries(slotes).map((item,key) => {
          // console.log("====",item[1].times[key].id);
          return (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>{day[item[1].day]}</Text>
                <View style={styles.line} />
              </View>
              <View style={{flexDirection: 'row'}}>
              <TimeBox
                  times={item[1]}
                  // edit={editTimes}
                  // addTime={() => setShowAddTimeModal(true)}
                  onPress={(t) => {
                    // setSelectedSlote({time: item[1][key], id: item[1][key].id});
                    setSelectedSlote(t);
                    console.log("--------------------",t);
                    setShowAddTimeModal(true);
                  }}
                  // onPress
                />
              </View>
            </View>
          );
        })} 
        {/* 
        <Button
          title={!editTimes ? 'Update Timeslot' : 'Cancel Edit'}
          style={{marginVertical: 10}}
          onPress={() => setEditTimes(!editTimes)}
          bold
        /> */}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddTimeModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setShowAddTimeModal(!showAddTimeModal);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            style={{
              paddingVertical: 10,
              alignSelf: 'flex-end',
              marginRight: 20,
            }}
            name="close"
            size={25}
            color="#FFF"
            onPress={() => setShowAddTimeModal(!showAddTimeModal)}
          />
          <View style={{backgroundColor: '#fff', padding: 20, width: '90%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TextInput
                value={selectedSlote && selectedSlote?.from}
                style={{
                  backgroundColor: studentLight,
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingHorizontal: 30,
                }}
              />
              <TextInput
                value={selectedSlote && selectedSlote?.to}
                style={{
                  backgroundColor: studentLight,
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingHorizontal: 30,
                }}
              />
            </View>
            <Button
              title="Book Slote"
              style={{marginTop: 20}}
              onPress={bookSlote}
            />
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
    marginRight: 5,
    fontWeight: '700',
  },
  line: {
    backgroundColor: '#444',
    height: 1,
    width: '100%',
  },
});

export default Calendar;
