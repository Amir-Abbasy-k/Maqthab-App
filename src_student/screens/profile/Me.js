import React, { useState , useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import { TabBar } from '../../components/Header';
import Layout from '../../components/Layout';
import APIKit from '../../services/ApiKit';
// import MultiSlider from '../../components/MultiSlider';

const Me = (props) => {
  const [profile, setProfile] = useState()

  useEffect(() => {
    _getProfileData()
  }, [])
    
    const _getProfileData = () => {
      APIKit.get('/student/profile').then(res => {
        // const data = res.data.data;
        // console.log(res.data);
        setProfile(res.data.data)
        // if (res.status == 200) {
        //   console.log(data);
        // } else {
        //   console.log('err catch',data);
        // }
      });
    };

    console.log(profile);

  return (
    <Layout>
      <TabBar title="Profile"/>
    <ScrollView contentContainerStyle={{ margin: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 20,
        }}>

        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#CCC2FC',
            borderRadius: 35,
          }}
        />
    
      </View>

{ profile &&     <Text
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '700',
        }}>
  {profile?.user[0].name}
      </Text>}
 
      { profile &&  
      <Text
        style={{ justifyContent: 'center', textAlign: 'center', fontSize: 12 }}>
         { profile?.user[0].user_detail.country}{', '}
         { profile?.user[0].user_detail.state}{', '}
         { profile?.user[0].user_detail.city}{'\n'}
         { profile?.user[0].email}
      </Text>
}
   

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
         {profile?.user[0].user_detail.gender == 'F' ? "Girl" : "Boy"}{'\n'}
          {/* {console.log(profile?.user[0].languages)} */}
          {/* {console.log(profile.languages)} */}
          {profile?.user[0].languages.map((lan)=>
           profile.languages.map((i)=>{
              if(i.id == lan.language_id){
                return i.name+', '
              }
            })
          )} 
          {'\n'}
           {/* Subjects  */}
          {profile?.user[0].subjects.map((sub)=>
           profile.subjects.map((i)=>{
              if(i.id == sub.subject_id){
                return i.name+', '
              }
            })
          )} 
        </Text>
      </View>

      <Text style={styles.head}>About</Text>
      <Text  style={styles.text}>
       _
      </Text>

      <Button
        title="Edit My Profile"
        bold={true}
        style={{ marginVertical: 10 }}
        onPress={()=> props.navigation.navigate("EditProfile", {profile:profile})}
      />
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#444',
    opacity: 0.7
  },
  head: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 20,
    marginBottom: 8
  },
});

export default Me;
