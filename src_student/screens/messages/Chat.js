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
import {useNavigation} from '@react-navigation/native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

import ChatBox from './components/ChatBox';
import {CustomTabBar} from '../../components/Header';
import {student} from '../../styles/Color';
import Layout from '../../components/Layout';

import Pusher from 'pusher-js/react-native';
import pusherConfig from '../../../src/pusher.json';
import APIKit from '../../services/ApiKit';
// import ChatView from './ChatView';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: false
    };
    this.pusher = new Pusher(pusherConfig.key, pusherConfig);

    this.chatId = `chat_${
      this.props?.route.params?.chatId.me +
      '_' +
      this.props?.route.params?.chatId.reci
    }`;
    this.sender = this.props?.route.params?.chatId.me + '_sender';
    this.reciver = this.props?.route.params?.chatId.reci + '_reciver';
    this.reciverId = this.props?.route.params?.chatId.reci;
    this.reciverName= this.props?.route.params?.name;

    this.chatListId = this.props?.route.params?.chatListId || 0

    // this.chatChannel = this.pusher.subscribe('chat_channel');
    this.chatChannel = this.pusher.subscribe(this.chatId);
    this.chatChannel.bind('pusher:subscription_succeeded', () => {
      this.chatChannel.bind('join', data => {
        this.handleJoin(data.name);
      });
      this.chatChannel.bind('part', data => {
        this.handlePart(data.name);
      });
      this.chatChannel.bind('message', data => {
        this.handleMessage(data.name, data.message);
      });
    });

    this.handleSendMessage = this.onSendMessage.bind(this);

    console.log('>>>>>>>>>>>>>>>>>', this.chatId, this.sender, this.reciver);
  }

  handleJoin(name) {
    // (4)
    const messages = this.state.messages.slice();
    messages.push({action: 'join', name: name});
    this.setState({
      messages: messages,
    });
  }

  handlePart(name) {
    // (5)
    const messages = this.state.messages.slice();
    messages.push({action: 'part', name: name});
    this.setState({
      messages: messages,
    });
  }

  handleMessage(name, message) {
    // (6)
    const messages = this.state.messages.slice();
    messages.push({action: 'message', name: name, message: message});
    this.setState({
      messages: messages,
    });
  }

  componentDidMount() {
    fetch(`${pusherConfig.restServer}/users/${this.props.name}`, {
      method: 'PUT',
    });
    this._getMessages();
  }
  _getMessages = () => {
    APIKit.get(`chat/${this.chatListId}/messages`).then(res => {
      if (res.status == 200) {
        // console.log("_getMessages",res.data.data.messages);
        this.setState({messages: res.data.data.messages})
      } else {
        console.log('err catch', res.data);
      }
    });
  };

  componentWillUnmount() {
    // (8)
    fetch(`${pusherConfig.restServer}/users/${this.props.name}`, {
      method: 'DELETE',
    });
  }

  // onSendMessage_() {
  //   console.log('WORKS');
  //   const payload = {
  //     message: 'text',
  //   };
  //   fetch(`${pusherConfig.restServer}/users/${this.props.name}/messages`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   });
  // }

  onSendMessage(msgBody) {
    this.setState({loading: true});

    let body = {
      chatId: this.chatId,
      messageBody: {
        name: this.reciverId,
        message: msgBody,
      },
    };
    // console.log('body', body);
    this._storeMessage(body);


    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    fetch(`${pusherConfig.restServer}/users/sendMessage`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headersList,
    })
      .then(function (response) {
        // console.log("response", response.data);
        return response.text();
      })
      .then(function (data) {
    this.setState({loading: false});
        // console.log('---', data);
      })
      .catch(er => console.log(er));
  }


   _storeMessage = (body) => {
    APIKit.post(`chat/messages/send`,{ "receiver_id": this.reciverId,
    "message": body.messageBody.message}).then(res => {
      // console.log("_getClasses",res.data);
      if (res.status == 200) {
        this.setState({loading: false});
      } else {
        console.log('err catch', res.data);
        this.setState({loading: false});
      }
    });
  };



  render() {
    const messages = this.state.messages;
    return (
      <Chat
        messages={messages}
        onSendMessage={this.handleSendMessage}
        chatId={this.chatId}
        sender={this.sender}
        reciver={this.reciver}
        reciverName={this.reciverName}
        loading={this.state.loading}
      />
    );
  }
}

// //////////////////////////////////////////////////////////////////// ->

function Chat(props) {
  // console.log('>>>>>>>>>>>>>>>>>', props.messages);

  const navigation = useNavigation();

  // const [msgs, setMsgs] = useState([
  //   {message: 'Hi', name: 'amir'},
  //   {message: 'Hi Amir', name: 'ami'},
  //   {message: 'How are you!', name: 'amir'},
  // ]);

  // const [taggedMassege, setTaggedMassege] = useState();

  const flatlistRef = useRef();
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.focus();
  }, []);

  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd({animating: true});
  };

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
            backgroundColor:
              props?.item.name !== props.sender ? student : '#fff',
            alignSelf:
              props?.item.name !== props.sender ? 'flex-end' : 'flex-start',
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
        <Text
          style={{
            color: props?.item.name !== props.sender ? '#fff' : student,
          }}>
          {props?.item.message}
        </Text>
      </View>
    </View>
  );

  return (
    // <View style={styles.container}>
    <Layout contentContainerStyle={styles.container}>
      <CustomTabBar>
        <Icon
          name="arrow-left"
          size={25}
          color="#444"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            backgroundColor: '#ccc',
            padding: 5,
            borderRadius: 5,
            marginHorizontal: 15,
          }}>
          <Icon name="user" size={16} color="#444" onPress={() => null} />
        </View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          {props?.reciverName ? props.reciverName : 'Muhammed'}
        </Text>
      </CustomTabBar>
      <FlatList
        ref={flatlistRef}
        // data={msgs}
        data={props.messages}
        renderItem={({item}) => <ListItem item={item} sender={props.sender} />}
        keyExtractor={key => key.toString()}
        contentContainerStyle={{marginHorizontal: 12}}
        ListFooterComponent={null}
        ListFooterComponentStyle={{marginTop: 20, marginHorizontal: 50}}
      />

      <ChatBox
        onPressSend={text => {
          // let newMsg = [...msgs];
          // newMsg.push({message: text, name: 'ami', taggedMassege: taggedMassege});
          // setMsgs(newMsg);
          // console.log(newMsg);
          onPressFunction();
          props.onSendMessage(text);
          // setTaggedMassege();
        }}
        closeTaggedMsg={() => setTaggedMassege()}
        chatBoxRef={chatBoxRef}
        style={{paddingHorizontal: 12}}
        loading={props?.loading}
      />
    </Layout>
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
