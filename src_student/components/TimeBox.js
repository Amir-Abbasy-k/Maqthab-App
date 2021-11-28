import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../styles/Color'

function TimeBox(props) {
  const rndInt = Math.floor(Math.random() * 5) + 1;
  console.log(props?.times);
  return (
    <ScrollView style={{flexDirection: 'row'}} horizontal>
      {/* <FontistoIcon
                    style={{ position: 'relative'}}
                    name="search"
                    size={20}
                    color="#444"
                  /> */}

      {props?.times && props?.times.map(time => (
        <TouchableOpacity
          style={{...styles.card, backgroundColor: colors[rndInt]}}
          onPress={()=> props?.onPress(time)}
          >
          <Text style={styles.time}>{time.from}</Text>
          <MaterialIcons
            style={{padding: 10}}
            name="access-time"
            size={20}
            color="#444"
          />
          <Text style={styles.time}>{time.to}</Text>

          {props?.edit && (
            <AntDesign
              style={{position: 'absolute', top: 0, right: 0}}
              name="closecircle"
              size={20}
              color="#444"
              onPress={() => console.log('delete')}
            />
          )}
          
        </TouchableOpacity>
      ))}

      {props?.edit && (
        <TouchableOpacity style={{...styles.card, backgroundColor: '#F1EEFF'}} onPress={props?.addTime}>
          <MaterialIcons
            style={{padding: 10}}
            name="more-time"
            size={30}
            color="#444"
          />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 140,
    backgroundColor: '#ccc',
    borderRadius: 35,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
    marginRight: 5,
    fontWeight: '700',
  },
  time: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
});

export default TimeBox;
