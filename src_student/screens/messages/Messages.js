import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {TabBar} from '../../components/Header';
import Layout from '../../components/Layout';
import { colors } from '../../styles/Color';
import APIKit from '../../services/ApiKit';


function Message(props) {
    const navigation = useNavigation();
    console.log(props.data);
    let item = props.data
  return (
    <View style={styles.container}>
      <View style={{...styles.iconView, backgroundColor: colors[props?.color]}}>
        <Icon name="user" size={16} color="#444" onPress={() => null} />
      </View>
      <TouchableOpacity style={{flex: 1}} onPress={()=> navigation.navigate('Chat', {name:item.receiver?.name, chatListId: item.id, chatId: {me: item.sender_id, reci: item.receiver_id}})}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.receiver?.name}</Text>
        {/* <Text style={styles.time}>8h</Text> */}
        <Text style={{fontSize: 12, opacity: 0.6}}>New message</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function Messages() {

  const [chatList, setChatList] = useState();

  useEffect(()=>{
    _getChatList()
  },[])
  
  console.log(chatList);
    _getChatList = () => {
      APIKit.get(`chat`).then(res => {
        // console.log("_getClasses",res.data.data.chats);
        if (res.status == 200) {
          setChatList(res.data.data.chats)
        } else {
          console.log('err catch', res.data);
        }
      });
    };
  
  return (
    <Layout>
      <TabBar title="Massages" />
      {chatList && chatList.map((item, key) => {
        const rndInt = Math.floor(Math.random() * 5) + 1;
       return <Message color={rndInt} key={key} data={item}/>
})}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    alignItems: 'center',
    marginVertical: 12,
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
  time: {
    fontSize: 11,
    fontWeight: 'bold',
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
