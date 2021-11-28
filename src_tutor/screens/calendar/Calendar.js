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
import DateTimePicker from '@react-native-community/datetimepicker';

import Layout from '../../components/Layout';
import Button, {ButtonSmall} from '../../components/Button';
import TimeBox from '../../components/TimeBox';
import {studentLight} from '../../styles/Color';
import {TabBar} from '../../components/Header';
import APIKit from '../../services/ApiKit';

const day = [
  ' ',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saterday',
];

const DATA = [
  {day: 'Saterday', times: [{start: '7.00 am', end: '8.00 am'}]},
  {day: 'Sunday', times: []},
  {
    day: 'Monday',
    times: [
      {start: '7.00 am', end: '8.00 am'},
      {start: '8.00 am', end: '9.00 am'},
    ],
  },
  {day: 'Tuesday', times: [{start: '7.00 am', end: '8.00 am'}]},
  {day: 'Wednesday', times: [{start: '7.00 am', end: '8.00 am'}]},
  {day: 'Thursday', times: []},
  {day: 'Friday', times: [{start: '7.00 am', end: '8.00 am'}]},
];

const Calendar = props => {
  const [slotes, setSlotes] = useState();
  const [editTimes, setEditTimes] = useState(false);
  const [showAddTimeModal, setShowAddTimeModal] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(['Time From', 'Time To']);
  const [show, setShow] = useState([false, false]);
  const [sloteDay, setSloteDay] = useState();

  useEffect(() => {
    _getSlotes();
  }, []);

  const _getSlotes = () => {
    APIKit.get(`/teacher/slot`).then(res => {
      if (res.status == 200) {
        const data = res.data.data.slots;
        // console.log("######################",data);
        setSlotes(data);
      } else {
        // console.log('err catch', res.data);
      }
    });
  };

  const addSlote = () => {
    const body = {day: sloteDay, from: time[0], to: time[1]};
    APIKit.post('/teacher/slot', body).then(res => {
      console.log(res.data);
      if (res.status == 200) {
        _getSlotes();
        setShowAddTimeModal(false);
        alert(JSON.stringify(res.data.message));
      } else {
        alert(JSON.stringify(res.data.errors));
      }
    });
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
        {slotes &&
          Object.entries(slotes).map(item => {
            {
              /* {slotes.map((item, key) => { */
            }
            return (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.title}>
                    {day[item[1][0].day].toUpperCase()}
                  </Text>
                  <View style={styles.line} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TimeBox
                    times={item[1]}
                    edit={editTimes}
                    restDays={false}
                    addTime={day_ => {
                      setShowAddTimeModal(true);
                      setSloteDay(day_);
                    }}
                    refresh={() => _getSlotes()}
                  />
                </View>
              </View>
            );
          })}

        {/* REST DAYS */}
        {slotes &&
          day.map((i, key) => {
            let t = false
            Object.entries(slotes).map(item => {
              if(key == item[1][0].day || key == 0)t = true
              //   console.log(i, key == item[1][0].day);
            });
              if (t) {
                return null;
              } else {
             return (
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.title}>{day[key].toUpperCase()}</Text>
                      <View style={styles.line} />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TimeBox
                        times={[]}
                        edit={editTimes}
                        restDays={true}
                        addTime={day_ => {
                          setShowAddTimeModal(true);
                          setSloteDay(day_);
                        }}
                        refresh={() => _getSlotes()}
                        day={key}
                      />
                    </View>
                  </View>
                );
              }
            // });
          })}

        <Button
          title={!editTimes ? 'Update Timeslot' : 'Done'}
          style={{marginVertical: 10}}
          onPress={() => setEditTimes(!editTimes)}
          bold
        />
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
              <ButtonSmall
                title={time[0]}
                onPress={() => setShow([true, false])}
                style={{paddingHorizontal: 20}}
              />
              <ButtonSmall
                title={time[1]}
                onPress={() => setShow([false, true])}
                style={{paddingHorizontal: 20}}
              />
            </View>
            <Button
              title="Add Available Time"
              style={{marginTop: 20}}
              onPress={addSlote}
            />
          </View>
        </View>
      </Modal>

      {show[0] && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="clock"
          onChange={pickTime => {
            let d = pickTime.nativeEvent.timestamp;
            console.log(d.toLocaleTimeString());
            setTime([d.toLocaleTimeString(), time[1]]);
            setShow([false, false]);
          }}
        />
      )}
      {show[1] && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="clock"
          onChange={pickTime => {
            let d = pickTime.nativeEvent.timestamp;
            console.log(d.toLocaleTimeString());
            setTime([time[0], d.toLocaleTimeString()]);
            setShow([false, false]);
          }}
        />
      )}
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
