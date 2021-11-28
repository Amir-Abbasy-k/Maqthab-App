import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RootLayout from '../../layout/RootLayout';
const {width, height} = Dimensions.get('window');
import Background from '../../assets/BackgroundOne';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CustomStatusBar from '../../components/CustomStatusBar';
import {
  grey,
  lightGrey,
  primaryColor,
  secondaryColor,
} from '../../global/Color';
import {Icon} from 'react-native-elements';
import {globalfonts} from '../../global/Fonts';
import Loading from '../../assets/Loading';
import {Icon_1, Icon_2, Icon_3} from '../../assets/customIcons/CustomIcons';
import {getAsyncStorage, showToast} from '../../global/Utils';
import APIKit from '../../global/ApiKit';
import DropDown from '../../components/DropDown';
import {TextInput} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const resendOTP = ({route}) => {
  const [loading, setLoading] = useState(true);
  // const [val, setVal] = useState([{username : route.params.username, otp: ''}]);

  const navigation = useNavigation();
  const _getCountry = () => {
    setLoading(true);
    APIKit.post(`stylist_app/stylist_app_countries`)
      .then(data => {
        // console.log(data)
        let g = []
        data.data.map((item)=> {
          g.push({value : {item}, label: item.country_name})
        })
        setCountry(g)
    setLoading(false);

        if (data.status) {

        } else {
        }
      })
      .catch(error => {
        console.log(error);
    setLoading(false);

      });
};



  return (
    <RootLayout>
      <CustomStatusBar
        barStyle="dark-content"
        backgroundColor={secondaryColor}
      />
      <Background />
      <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFillObject}}>
          <Image source={require('../../assets/white-bg.png')} />
        </View>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}>
 
<Text>Username : Amri </Text>
         <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              borderRadius: 20,
              width: width / 1.3,
              alignItems: 'center',
              elevation: 10,
              shadowColor: 'rgba(0,0,0,0.5)',
              marginVertical: 15,
              paddingHorizontal: 15,
            }}>
           {/* {val?.value?.item ? <Text style={{marginRight: 10}}>+{val.value.item.country_id}</Text>  : <Text style={{marginRight: 10}}>{'- -'}</Text>} */}


       <TextInput placeholder="Mobile Number" 
            onChangeText={text=>setVal({...val, otp: text})}
            style={{marginLeft: 16}} />
          </View> 

          
          {/* {error?.err && <Text style={styles.err}>{error.err}</Text>} */}
<View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>

          <Button
            title="Next"
            buttonContainerStyle={{margin: 10, flex: 1}}
            onPress={() => navigation.navigate('ConfirmOTP', {data: val})}
            disabled={loading}
            // loading={loading}
            loadingColor="#fff"
            buttonContainerStyle={{}}
            style={{padding: 10, paddingHorizontal: 50}}
          />
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.forgotPassword]}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Register')}
              style={{marginHorizontal: 10}}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Icon_1 />
            <Icon_2 />
            <Icon_3 />
          </View>
          </View>
        </ScrollView>
      </View>
    </RootLayout>
  );
};

export default resendOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    // height: height /1.11,
    backgroundColor: '#fff',
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  form: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  header: {
    fontSize: 18,
    marginBottom: 15,
    ...globalfonts.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    fontSize: 12,
    ...globalfonts.light,
    color: grey,
    marginVertical: 20,
    opacity: 0.7,
  },
  err: {
    alignSelf: 'flex-start',
    fontSize: 12,
    ...globalfonts.light,
    color: 'red',
    opacity: 0.7,
  },
  logo: {
    alignSelf: 'center',
    margin: 10,
    marginTop: 20,
  },
});
