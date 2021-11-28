import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Button from '../../components/Button';
import Layout from '../../components/Layout';
import GradientBG from '../../components/GradientBG';
import {TabBar} from '../../components/Header';
import {student, studentLight} from '../../styles/Color';
import Input from '../../components/Input';

export default function TellUs({route}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('STUDENT');
  const [filePath, setFilePath] = useState({});
  const navigation = useNavigation();
  const activeColor = type == 'STUDENT';

 
    

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
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
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  return (
    <Layout>
      <TabBar />
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Tell Us About You
        </Text>
        <Text style={{fontWeight: 'bold', marginVertical: 10}}>You are a</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setType('STUDENT')}>
            <GradientBG
              style={{
                width: 100,
                padding: 10,
                borderRadius: 20,
                opacity: activeColor ? 1 : 0.4,
              }}>
              <Icon
                name="users"
                size={20}
                color={activeColor ? '#FFF' : '#000'}
              />
              <Text
                style={{
                  color: activeColor ? '#FFF' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Student
              </Text>
            </GradientBG>
          </TouchableOpacity>

          <Text style={{marginHorizontal: 10}}>OR</Text>
          <TouchableOpacity onPress={() => setType('TUTOR')}>
            <GradientBG
              style={{
                width: 100,
                padding: 10,
                borderRadius: 20,
                opacity: activeColor ? 0.4 : 1,
              }}>
              <Icon
                name="users"
                size={20}
                color={!activeColor ? '#FFF' : '#000'}
              />
              <Text
                style={{
                  color: !activeColor ? '#FFF' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Teacher
              </Text>
            </GradientBG>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setType('ADMIN')}
          style={{
            marginVertical: 10,
            alignSelf: 'flex-start',
            padding: 10,
            backgroundColor: studentLight,
            borderRadius: 50,
          }}>
          <Text style={{fontWeight: 'bold', color: student}}>
            Are you an admin?
          </Text>
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold', marginTop: 20}}>Name</Text>
        <Input
          placeholder="Enter Your Name"
          onChangeText={text => setName(text)}
        />
        <Button
          title="Upload your Photo"
          onPress={()=>chooseFile('photo')}
        />
        <Button
          title="Next"
          onPress={() =>
           {
             if(name && type){
               const nav =  type == 'STUDENT' ? 'Register' : type == 'ADMIN' ? 'RegisterAdmin' : 'RegisterTutor'
              navigation.navigate(nav, {
                prevData: {name: name, type: type, photo: filePath, phone: route.params.phone},
              })
             }else{
               alert("Select User type, Name, Photo(optional) ")
             }
           }
          }
        />
      </View>
    </Layout>
  );
}
