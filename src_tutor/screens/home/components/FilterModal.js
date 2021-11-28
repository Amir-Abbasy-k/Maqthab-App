import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import MultiSlider from '../../../components/MultiSlider';

const Filter = props => {
  const [filter, setFilter] = useState();
  const [subject, set_subject] = useState({value: [], err: ''});
  const [language, set_language] = useState({value: [], err: ''});
  const [country, set_country] = useState({value: [], err: ''});


  useEffect(() => {
    props?.setFilterVals({subject,language,country})
  }, [subject, language, country])

  // const checkTextInput = () => {
  //   Alert.alert('Success');
  // };

  
console.log("props?.languagesList", props?.languagesList);
  return (
    <ScrollView style={{padding: 22, backgroundColor: '#fff'}}>
      <AntDesign
        style={{alignSelf: 'flex-end'}}
        name="close"
        size={25}
        color="#000"
        onPress={props?.onClose}
      />


       {/* Country */}
       <View>
              <Text style={styles.title}>Country</Text>
              {props?.countryList && (
                <Picker
                  selectedValue={"city"}
                  style={{backgroundColor: '#F1EEFF'}}
                  onValueChange={val =>set_country(val)}>
                  {props?.countryList.map((item, idx) => {
                    return (
                      <Picker.Item label={item.label} value={item.value} />
                    );
                  })}
                </Picker>
              )}
            </View>



            <Text style={styles.title}>Subject</Text>
            <View style={styles.v}>
              {props?.subjects.map((item, key) => {
                // console.log(item);
                return (
                  <Button
                    placeholder="Username"
                    title={item.name}
                    // err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={true}
                    onPress={() => {
                      let list = [...subject.value,item];
                      set_subject({...subject, value: list});
                    }}
                  />
                );
              })}
            </View>


      <Text style={styles.title}>Languages</Text>
            <View style={styles.v}>
              {props?.languagesList.map((item, key) => {
                // console.log(item);
                return (
                  <Button
                    placeholder="Username"
                    title={item.name}
                    // err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={true}
                    onPress={() => {
                      let list = [...language.value,item];
                      set_language({...language, value: list});
                    }}
                  />
                );
              })}
            </View>


      
      {/* <Text style={styles.title}>Price</Text>
      <MultiSlider /> */}

     

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
