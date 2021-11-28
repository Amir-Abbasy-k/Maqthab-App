import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabBar} from '../../components/Header';
import Layout from '../../components/Layout';
import Button, {ButtonSmall} from '../../components/Button';
import {colors} from '../../styles/Color'
import APIKit from '../../services/ApiKit';

{
  /* <Icon name="user" size={16} color="#444" onPress={() => null} /> */
}

const day = [
  " ",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday"]


export default function ClassRooms(props) {
  const [schedules, setSchedules] = useState(false);

  useEffect(() => {
    _getClasses();
  }, []);

  const _getClasses = () => {
    APIKit.get(`/student/slot/scheduled`).then(res => {
      console.log("_getClasses",res.data);
      if (res.status == 200) {
      const data = res?.data.data.schedules;
      setSchedules(data)
      console.log(data);
      } else {
        console.log('err catch', res.data);
      }
    });
  };

  console.log(schedules);

  return (
    <Layout contentContainerStyle={{backgroundColor:'#fff', flex: 1}}>
      <TabBar title="Classrooms" />
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
      {/* <Text style={styles.title}>Today's Class</Text> */}

      {/* {new Array(6).fill('&').map(() => { */}
      {schedules && schedules.map((item ,key) => {
             const rndInt = Math.floor(Math.random() * 5) + 1;
       return <View style={styles.container}>
          <TouchableOpacity style={{...styles.card, backgroundColor: colors[rndInt]}}>
            <Text style={styles.time}>{item?.slots.from}</Text>
            <MaterialIcons
              style={{padding: 10}}
              name="access-time"
              size={20}
              color="#444"
            />
            <Text style={styles.time}>{item?.slots.to}</Text>
          </TouchableOpacity>
          {/* Name */}
          <View style={{flex: 1, marginTop: 15}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.iconView}>
                <Icon name="user" size={16} color="#444" onPress={() => null} />
              </View>
              <Text style={styles.name}>{item?.teacher.name}</Text>
            </View>

            {/* Start button */}
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                marginLeft: 5,
                paddingRight: 0,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text>{day[item?.slots.day]}</Text>
                {/* <Text style={{fontSize: 22}}>Class 21</Text> */}
              </View>
              <ButtonSmall title="Join at Class" onPress={()=> props.navigation.navigate('Stream', {url: item?.meeting_url})} />
            </View>
          </View>
        </View>
})}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginHorizontal: 22,
    paddingLeft: 0,
    paddingRight: 10,
    borderRadius: 25,
  },
  iconView: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ccc',
    borderRadius: 25,
    padding: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
    marginRight: 5,
    fontWeight: '700',
    marginLeft: 22
  },
  time: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
