import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import {TabBar} from '../../components/Header';
import {useNavigation, validatePathConfig} from '@react-navigation/core';
import APIKit,{API_KEY, BaseUrl} from '../../services/ApiKit';
import {useUserContext} from '../../../UserContext';
const Register = props => {
  const prevData = props?.route.params.prevData;
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [name, set_name] = useState({value: '', err: ''});
  const [gender, set_gender] = useState({value: 'M', err: ''});
  const [email, set_email] = useState({value: '', err: ''});
  const [mobile, set_mobile] = useState({value: '', err: ''});
  const [rate, set_rate] = useState({value: '', err: ''});
  const [password, set_password] = useState({value: '', err: ''});
  const [password_confirmation, set_password_confirmation] = useState({
    value: '',
    err: '',
  });
  const [country, set_country] = useState({value: 'ARE', err: ''});
  const [state, set_state] = useState({value: '07', err: ''});
  const [city, set_city] = useState({value: '', err: ''});
  const [subject, set_subject] = useState({value: [], err: ''});
  const [language, set_language] = useState({value: [], err: ''});
  const [avatar, set_avatar] = useState({
    value: '',
    err: '',
  });
  const [terms_of_service, set_terms_of_service] = useState({
    value: '',
    err: '',
  });
  const [loading, setLoading] = useState(true);

  const nav = useNavigation();
  const useContext = useUserContext();

  useEffect(() => {
    APIKit.get('/teacher/register').then(res => {
      const data = res.data.data;
      // console.log(data);
      if (res.status == 200) {
        const list = [];
        Object.entries(data.countries).map(item =>
          list.push({label: item[1], value: item[0]}),
        );
        setCountryList(list);

        // const state_list = [];
        // Object.entries(data.states).map(item =>
        //   state_list.push({label: item[1], value: item[0]}),
        // );
        // setStateList(state_list);

        setLanguagesList(data.languages);

        const sub_list = [];
        data.subjects.map(i =>
          sub_list.push({name: i.name, id: i.id, selected: false}),
        );
        setSubjects(sub_list);
        setLoading(false)
      }
    });
  }, []);

// GET STATES LIST
  useEffect(()=>{
    APIKit.get(`/states/${country.value}`).then(res => {
      const data = res.data.data;
      if (res.status == 200) {
      const list = [];
      Object.entries(data.states).map(item =>
        list.push({label: item[1], value: item[0]}),
      );
      setStateList(list);
      }
    });
  },[country])


  const _register = () => {
    setLoading(true)
    const url =  `${BaseUrl}teacher/register`
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "Api-Key": API_KEY,
  };
   let body = new FormData();
   body.append('name', prevData.name);
   body.append('email', email.value);
   body.append('mobile', prevData.phone);
   body.append('country', country.value);
   body.append('state', state.value);
   body.append('city', city.value);
   body.append('rate', rate.value);
   body.append('gender', gender.value);
   //  formdata.append("subject[0]", "1");
   subject?.value.map((item,key) => body.append(`subject[${key}]`, item.id));
   language?.value.map((item,key) => body.append(`language[${key}]`, item.id));
   //  body.append("language[0]", "1");
   body.append("terms_of_service", "1");
   body.append("password", "12345678");
   body.append("password_confirmation", "12345678");
  //  body.append("avatar", prevData.photo.assets[0]);
   console.log("body--------------", headers);



   fetch(url, { 
     method: "POST",
     body: body,
     headers: headers
   }).then(function(response) {
     return response.json();
   }).then(function(data) {
    setLoading(false)
     console.log("RES", data);
        if(data?.errors){
          Object.entries(data.errors).map((item, key) => {
            console.log(item);
            if (item[0] == 'name') {
              set_name({...name, err: item[1][0]});
            } else if (item[0] == 'email') {
              set_email({...email, err: item[1][0]});
            } else if (item[0] == 'gender') {
              set_gender({...gender, err: item[1][0]});
            } else if (item[0] == 'mobile') {
              set_mobile({...mobile, err: item[1][0]});
            } else if (item[0] == 'country') {
              set_country({...country, err: item[1][0]});
            } else if (item[0] == 'state') {
              set_state({...state, err: item[1][0]});
            } else if (item[0] == 'city') {
              set_city({...city, err: item[1][0]});
            } else if (item[0] == 'rate') {
              set_rate({...rate, err: item[1][0]});
            } else if (item[0] == 'subject') {
              set_subject({...subject, err: item[1][0]});
            } else if (item[0] == 'language') {
              set_language({...language, err: item[1][0]});
            } else if (item[0] == 'terms_of_service') {
              set_terms_of_service({...terms_of_service, err: item[1][0]});
            } else if (item[0] == 'avatar') {
              set_avatar({...avatar, err: item[1][0]});
            } else {
            }
          });
        }else{
          alert(data?.message)
          console.log("=============",data);
          useContext.setData({...useContext.data, userType:  prevData?.type, prof:{name: prevData?.name, pic: prevData?.photo.assets[0].uri || ''}});
        }
   })
  };


  const validate = () => {
    //Check for the Name TextInput
    if (!email.value.trim()) {
      set_email({...email, err: 'Enter your Email'});
      return;
    }
    if (!country.value.trim()) {
      set_country({...country, err: 'Select your Coutry'});
      return;
    }
    if (!city.value.trim()) {
      set_city({...city, err: 'Enter your City'});
      return;
    }

    //Checked Successfully
    //Do whatever you want
    _register();
  };

  return (
    <Layout style={{backgroundColor:'#fff'}}>
      <TabBar title="Register" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Email</Text>
            <Input
              placeholder="Email"
              value={email.value}
              err={email.err}
              onChangeText={text => set_email({...email, value: text})}
            />

              {/*  Gender */}
           <View>
              <Text style={styles.title}>Gender</Text>
                <Picker
                selectedValue={gender.value}
                style={{backgroundColor: '#F1EEFF'}}
                onValueChange={val => set_gender({...gender, value: val})}>
                  {[{label: "Male", value:"M"}, {label: "Female", value:"F"}, {label: "Other", value:"O"}].map((item, idx) => {
                    return <Picker.Item label={item.label} value={item.value} />;
                  })}
                </Picker>
              <Text style={styles.err}>{gender?.err}</Text>
            </View> 

            {/* Country */}
            <View>
              <Text style={styles.title}>Country</Text>
              {countryList && (
                <Picker
                  selectedValue={country.value}
                  style={{backgroundColor: '#F1EEFF'}}
                  onValueChange={val => set_country({...country, value: val})}>
                  {countryList.map((item, idx) => {
                    return (
                      <Picker.Item label={item.label} value={item.value} />
                    );
                  })}
                </Picker>
              )}
              <Text style={styles.err}>{country?.err}</Text>
            </View>

            {/*  State */}
           <View>
              <Text style={styles.title}>State</Text>
              {stateList && (
                <Picker
                selectedValue={state.value}
                style={{backgroundColor: '#F1EEFF'}}
                onValueChange={val => set_state({...state, value: val})}>
                  {stateList.map((item, idx) => {
                    return <Picker.Item label={item.label} value={item.value} />;
                  })}
                </Picker>
              )}
              <Text style={styles.err}>{state?.err}</Text>
            </View> 

            {/* City */}
            <Text style={styles.title}>City</Text>
            <Input
              placeholder="City"
              value={city.value}
              err={city.err}
              onChangeText={text => set_city({...city, value: text})}
            />

            {/* Rate */}
            <Text style={styles.title}>Hourly Rate</Text>
            <Input
              placeholder="Hourly Rate"
              value={rate.value}
              err={rate.err}
              onChangeText={text => set_rate({...rate, value: text})}
              keyboardType="numeric"
            />

            {/* 
            <Input
              placeholder="Date of birth"
              value=""
              // err="Date of birth should be valid date"
              // onChangeText={(text)=>set_city({...city, value: text})}
            /> */}

            <Text style={styles.title}>Languages</Text>
            <View style={styles.v}>
              {languagesList.map((item, key) => {
                // console.log(item);
                return (
                  <Button
                    placeholder="Username"
                    title={item.name}
                    err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={true}
                    onPress={() => {
                      let list = [...language.value, item];
                      set_language({...language, value: list});
                    }}
                  />
                );
              })}
                <Text style={styles.err}>{language?.err}</Text>
            </View>

            <Text style={styles.title}>I want to teach</Text>

            <View style={styles.v}>
              {subjects.map((item, key) => {
                // console.log(item);
                return (
                  <Button
                    placeholder="Username"
                    title={item.name}
                    err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={true}
                    onPress={() => {
                      let list = [...subject.value, item];
                      set_subject({...subject, value: list});
                    }}
                  />
                );
              })}
                <Text style={styles.err}>{subject?.err}</Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Icon name="md-checkmark-circle" size={20} color="#096" />I have
              read and agree to the terms of use.
            </Text>

            {/* <CheckBox
          value={true}
          onValueChange={null}
          // style={styles.checkbox}
        /> */}

            <Button
              bold
              title="Submit"
              onPress={() => validate()}
              style={{marginTop: 30}}
              loading={loading}
            />

<Text style={styles.err}>{terms_of_service?.err}</Text>
            <Text style={styles.err}>{name?.err}</Text>
            <Text style={styles.err}>{mobile?.err}</Text>
            <Text style={styles.err}>{avatar?.err}</Text>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
  header: {
    fontSize: 20,
    marginVertical: 24,
  },
  v: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    color: '#444',
    marginVertical: 5,
  },
  title: {
    fontSize: 12,
  },
  err: {
    color: 'red',
    fontSize: 10,
  },
});

export default Register;
