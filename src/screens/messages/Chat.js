//https://blog.logrocket.com/react-native-gesture-handler-swipe-long-press-and-more/
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

import ChatBox from './components/ChatBox';
import {CustomTabBar} from '../../components/Header';
import {student} from '../../styles/Color';

export default function App() {

const navigation = useNavigation();

  const [msgs, setMsgs] = useState([
    {msg: 'Hi', user: 'amir'},
    {msg: 'Hi Amir', user: 'ami'},
    {msg: 'How are you!', user: 'amir'},
  ]);
  const [taggedMassege, setTaggedMassege] = useState();

  const flatlistRef = useRef();
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.focus();
  }, []);

  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd({animating: true});
  };

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: '#f7f7f7',
          opacity: 0.5,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 12}}>Replay</Text>
      </View>
    );
  };

  console.log(msgs);

  const ListItem = props => (
    <View
      style={{
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
      }}>
      <View
        style={[
          styles.msg,
          {
            backgroundColor: props?.item.user == 'ami' ? student : '#fff',
            alignSelf: props?.item.user == 'ami' ? 'flex-end' : 'flex-start',
          },
        ]}>
        {/* {props?.item?.taggedMassege && (
            <Text
              style={{
                backgroundColor: 'rgba(1,1,1,0.1)',
                paddingHorizontal: 5,
                borderRadius: 2,
               
              }}>
              {props.item.taggedMassege.msg}
            </Text>
          )} */}
        <Text style={{color: props?.item.user == 'ami' ? '#fff' : student}}>
          {props?.item.msg}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomTabBar>
        <Icon name="arrow-left" size={25} color="#444" onPress={() => navigation.goBack()} />
        <View style={{backgroundColor: '#ccc', padding: 5, borderRadius: 5,  marginHorizontal: 15}}>
        <Icon name="user" size={16} color="#444" onPress={() => null} />
        </View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Muhammed
        </Text>
      </CustomTabBar>
      <FlatList
        ref={flatlistRef}
        data={msgs}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={key => key.toString()}
        contentContainerStyle={{marginHorizontal: 12}}
        ListFooterComponent={() => (
          <Button
            title="Sample responce"
            onPress={() => {
              let newMsg = [...msgs];
              newMsg.push({
                msg: 'This is msg ' + new Date().getTime(),
                user: 'amir',
              });
              setMsgs(newMsg);
              console.log(newMsg);
              onPressFunction();
            }}
          />
        )}
        ListFooterComponentStyle={{marginTop: 20, marginHorizontal: 50}}
      />

      <ChatBox
        onPressSend={text => {
          let newMsg = [...msgs];
          newMsg.push({msg: text, user: 'ami', taggedMassege: taggedMassege});
          setMsgs(newMsg);
          console.log(newMsg);
          onPressFunction();
          setTaggedMassege();
        }}
        taggedMassege={taggedMassege}
        closeTaggedMsg={() => setTaggedMassege()}
        chatBoxRef={chatBoxRef}
        style={{paddingHorizontal: 12}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#ecf0f1',
  },
  msg: {
    marginVertical: 5,
    padding: 5,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});
