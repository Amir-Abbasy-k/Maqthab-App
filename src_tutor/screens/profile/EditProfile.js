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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import {TabBar} from '../../components/Header';
import {useNavigation, validatePathConfig} from '@react-navigation/core';
import APIKit, { API_KEY } from '../../services/ApiKit';
import {getToken}from '../../services/asyncStorage/AsyncStorage'


const EditProfile = props => {
  const [profile, setProfile] = useState();

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [name, set_name] = useState({value: '', err: ''});
  const [email, set_email] = useState({value: '', err: ''});
  const [mobile, set_mobile] = useState({value: '', err: ''});
  const [country, set_country] = useState({value: '', err: ''});
  const [state, set_state] = useState({value: '', err: ''});
  const [city, set_city] = useState({value: '', err: ''});
  const [subject, set_subject] = useState({value: '', err: ''});
  const [language, set_language] = useState({value: '', err: ''});
  const [avatar, set_avatar] = useState({value: '', err: ''});
  const [filePath, setFilePath] = useState({value: '', err: ''});

  const nav = useNavigation();

  useEffect(() => {
    const profile = props?.route.params.profile;
    setProfile(profile.user);

    const list = [];
    Object.entries(profile.countries).map(item =>
      list.push({label: item[1], value: item[0]}),
    );
    setCountryList(list);

    const state_list = [];
    Object.entries(profile.states).map(item =>
      state_list.push({label: item[1], value: item[0]}),
    );
    setStateList(state_list);

    const sub_list = [];
    props?.route.params.profile.subjects.map(i =>
      sub_list.push({name: i.name, id: i.id, selected: false}),
    );
    setSubjects(sub_list);

    setLanguagesList(profile.languages);

    set_name({...name, value: profile.user[0].name});
    set_email({...email, value: profile.user[0].email});
    set_mobile({...mobile, value: profile.user[0].mobile});
    set_state({...state, value: profile.user[0].user_detail.state});
    set_city({...city, value: profile.user[0].user_detail.city});
    set_country({...country, value: profile.user[0].user_detail.country});
    set_subject({...subject, value: profile.user[0].subjects});
    set_language({...language, value: profile.user[0].languages});
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



  const _updateProfile = async () => {

  //   const url = new URL(
  //     "http://staging.maqtab.in/api/student/profile"
  // );
    const url = "http://staging.maqtab.in/api/student/profile";

  const headers = {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "Api-Key": API_KEY,
      "Authorization": `Bearer ${await getToken()}`
  };
    const body = new FormData();
    body.append('name', name.value);
    body.append('email', email.value);
    body.append('mobile', mobile.value);
    body.append('country', country.value);
    body.append('state', state.value);
    body.append('city', city.value);
    body.append('subject[0]', '1');
    body.append('language[0]', '1');
    avatar?.value && body.append('avatar', avatar.value.assets[0]);
    filePath?.value && body.append('recitation', filePath.value.assets[0]);
    // body.append('recitation','file');
    console.log();

    fetch(url, {
      method: "POST",
      headers,
      body,
  }).then(response => response.json()).then((data)=>{
    if(data?.errors){
      Object.entries(data.errors).map((item, key) => {
        console.log(item);
        if (item[0] == 'name') {
          set_name({...name, err: item[1][0]});
        } else if (item[0] == 'email') {
          set_email({...email, err: item[1][0]});
        } else if (item[0] == 'mobile') {
          set_mobile({...mobile, err: item[1][0]});
        } else if (item[0] == 'country') {
          set_country({...country, err: item[1][0]});
        } else if (item[0] == 'state') {
          set_state({...state, err: item[1][0]});
        } else if (item[0] == 'city') {
          set_city({...city, err: item[1][0]});
        } else if (item[0] == 'subject') {
          set_subject({...subject, err: item[1][0]});
        } else if (item[0] == 'language') {
          set_language({...language, err: item[1][0]});
        } else if (item[0] == 'terms_of_service') {
          set_terms_of_service({...terms_of_service, err: item[1][0]});
        } else if (item[0] == 'avatar') {
          set_avatar({...avatar, err: item[1][0]});
        } else if (item[0] == 'recitation') {
          setFilePath({...filePath, err: item[1][0]});
        } else {
        }
      });
    }
  })


    // APIKit.post('/student/profile', body).then(res => {
      // console.log(res.data.data);
      // nav.navigate('Login')
      // navigation.navigate('Main');
      // useContext.setData({userType: "STUDENT", profPic: "assets/images/ic-user.png"})
    // });
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
    _updateProfile();
  };



  
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      if(type ==  "audio"){
        setFilePath({...filePath, value: response})
      }else{
        set_avatar({...avatar, value: response});
      }
    });
  };


  return (
    <Layout style={{backgroundColor:'#fff'}}>
      <TabBar title="Edit Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {/* <Text style={styles.header}>Sign up as new member</Text> */}

            <Input
              placeholder="Name"
              value={name.value}
              err={name?.err}
              onChangeText={text => set_name({...name, value: text})}
            />
            <Input
              placeholder="Email"
              value={email.value}
              err={email.err}
              onChangeText={text => set_email({...email, value: text})}
            />
            <Input
              placeholder="Mobile"
              value={mobile.value.toString()}
              err={mobile.err}
              onChangeText={text => set_mobile({...mobile, value: text})}
            />

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

            {/* State */}
            <View>
              <Text style={styles.title}>State</Text>
              {stateList && (
                <Picker
                  selectedValue={state.value}
                  style={{backgroundColor: '#F1EEFF'}}
                  onValueChange={val => set_state({...state, value: val})}>
                  {stateList.map((item, idx) => {
                    return (
                      <Picker.Item label={item.label} value={item.value} />
                    );
                  })}
                </Picker>
              )}
              <Text style={styles.err}>{state?.err}</Text>
            </View>

            <Text style={styles.title}>City</Text>
            {/* City */}
            <Input
              placeholder="City"
              value={city.value}
              err={city.err}
              onChangeText={text => set_city({...city, value: text})}
            />

            {/*  Language */}
            <Text style={styles.title}>Languages</Text>

            <View style={styles.v}>
              {languagesList.map((item, key) => {
                var disabled = true;
                profile[0].languages.map(i => {
                  if (i.language_id == item.id) {
                    disabled = false;
                  } else {
                    disabled = true;
                  }
                });
                return (
                  <Button
                    placeholder="Username"
                    title={item.name}
                    err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={disabled}
                    onPress={() => {
                      let list = [...language.value, item];
                      set_language({...language, value: list});
                    }}
                  />
                );
              })}
            </View>

            {/* 
            <Input
              placeholder="Date of birth"
              value=""
              // err="Date of birth should be valid date"
              // onChangeText={(text)=>set_city({...city, value: text})}
            /> */}

            <Text style={styles.title}>Subjects</Text>

            <View style={styles.v}>
              {subjects.map((item, key) => {
                var disabled = true;
                profile[0].subjects.map(i => {
                  if (i.subject_id == item.id) {
                    disabled = false;
                  } else {
                    disabled = true;
                  }
                });
                return (
                  <Button
                    placeholder="_"
                    title={item.name}
                    err={subject.err}
                    style={{padding: 5, paddingHorizontal: 10}}
                    disabled={disabled}
                    onPress={() => {
                      let list = [...subject.value, item];
                      set_subject({...subject, value: list});
                    }}
                  />
                );
              })}
            </View>
            <Text style={styles.title}>Upload sample audio clip</Text>

            <Button
          title="Choose audio clip"
          onPress={()=>chooseFile('audio')}
          disabled
        />
              <Text style={styles.err}>{avatar?.err}</Text>

              <Text style={styles.title}>Upload new profile Photo</Text>

            <Button
          title="Take picture"
          onPress={()=>chooseFile('photo')}
          disabled
        />
              <Text style={styles.err}>{filePath?.err}</Text>



            <Button
              bold
              title="Update"
              onPress={() => validate()}
              style={{marginVertical: 15}}
            />
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

export default EditProfile;
