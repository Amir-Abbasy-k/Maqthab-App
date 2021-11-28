import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Button from '../../components/Button';
import {TabBar} from '../../components/Header';
import Layout from '../../components/Layout';
// import Rating from '../../components/Rating';
import APIKit from '../../services/ApiKit';
import { student } from '../../styles/Color';
import {getProfile} from '../../services/asyncStorage/AsyncStorage'

const TutorProfile = props => {
  const [profile, setProfile] = useState()
  const [me, setMe] = useState()

  useEffect(async() => {  
  setMe(JSON.parse(await getProfile()))
  }, [])

  useEffect(() => {
   _getProfileData()
  }, [])
    
    const _getProfileData = () => {
      APIKit.get(`/student/teacher/show/${props.route?.params?.tutorId}`).then(res => {
        if (res.status == 200) {
          const data = res.data.data.user[0];
          setProfile(data)
          console.log(data);
        } else {
          console.log('err catch',data);
        }
      });
    };


  return (
    <Layout style={{backgroundColor:'#fff'}}>
      <TabBar title="Profile" />
      <ScrollView contentContainerStyle={{margin: 22, paddingBottom: 50}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 20,
          }}>
          <FontAwesome5
            style={{padding: 10}}
            name="calendar-day"
            size={30}
            color={student}
            onPress={() => props.navigation.navigate('Calendar', {tutorId: profile?.id})}
          />
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#CCC2FC',
              borderRadius: 35,
            }}
          />
          <MaterialIcons
            style={{padding: 10}}
            name="chat-bubble"
            size={30}
            color={student}
            // onPress={() => props.navigation.navigate('Chat', {chatId: "chat_"+me?.id+profile?.id})}
            onPress={() => props.navigation.navigate('Chat', {name: profile?.name, chatId: {me: me?.id, reci: profile?.id}})}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '700',
            }}>
           {profile?.name}
          </Text>
          {/* <Rating /> */}
          <Rating
          imageSize={20}
          showRating
          ratingColor={3}
          ratingTextColor={student}
          onFinishRating={null}
          style={{ paddingVertical: 10 }}
        />
          <Text
        style={{ justifyContent: 'center', textAlign: 'center', fontSize: 12 }}>
         { profile?.user_detail.country}{', '}
         { profile?.user_detail.state}{', '}
         { profile?.user_detail.city}{'\n'}
         { profile?.email}
      </Text>
        </View>

        <Text style={styles.head}>
          Hourly Rate – {profile?.rate ? profile.rate : '0'}
        </Text>

        <Text style={styles.head}>Recitation</Text>
        <View
          style={{
            backgroundColor: '#F1EEFF',
            width: '100%',
            height: 30,
            borderRadius: 30,
          }}
        />

<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '85%',
          marginTop: 10,
        }}>
        <Text style={styles.text}>
          Gender{'\n'}
          Languages{'\n'}
          Teaches
        </Text>
        <Text style={styles.text}>
         {profile?.user_detail.gender == 'F' ? "Girl" : "Boy"}{'\n'}
          {/* {console.log(profile?.user[0].languages)} */}
          {/* {console.log(profile.languages)} */}
          {profile?.languages_name.map((lan)=>
           profile.languages_name.map((i)=>{
              if(i.id == lan.language_id){
                return i.name+', '
              }
            })
          )} 
          {'\n'}
           {/* Subjects  */}
          {profile?.subjects_name.map((sub)=>
           profile.subjects_name.map((i)=>{
              if(i.id == sub.subject_id){
                return i.name+', '
              }
            })
          )} 
        </Text>
      </View>



        <Button
          title="Invite to Teach"
          style={{marginVertical: 10}}
          onPress={()=> props.navigation.navigate('Settings')}
        />

        {/* <Text style={styles.head}>Employement History</Text>
        <Text style={styles.text}>- What is Lorem Ipsum Lorem</Text>

        <Text style={styles.head}>Certifications</Text>
        <Text style={styles.text}>What is Lorem Ipsum Lorem</Text> */}
        <Text style={styles.head}>About</Text>
        <Text style={styles.text}>
         -
        </Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#444',
    opacity: 0.7,
  },
  head: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 20,
    marginBottom: 8,
  },
});

export default TutorProfile;
