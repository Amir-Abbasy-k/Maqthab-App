import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { student } from '../../../styles/Color';

export default function Input(props) {
  const [text, setText] = useState();

  console.log(props?.taggedMassege);

  const flatlistRef = useRef();
  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd({animating: true});
  };



  return (
    <View style={{...styles.container, ...props?.style}}>
      {props?.taggedMassege && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{backgroundColor: '#f7f7f7', flex: 1}}>
            <Text style={{paddingHorizontal: 5, color: 'orange'}}>
              {props.taggedMassege.user}
            </Text>
            <Text style={{padding: 5}}>{props.taggedMassege.msg}</Text>
          </View>

          <Icon
            name="close"
            size={15}
            color="#444"
            onPress={props?.closeTaggedMsg}
            style={{paddingHorizontal: 10}}
          />
        </View>
      )}
      <View style={{flexDirection: 'row', marginTop: 3}}>
        <TextInput
          style={{padding: 5, flex: 1}}
          value={text}
          onChangeText={text => setText(text)}
          ref={props?.chatBoxRef}
          placeholder="Type messege..."
        />

        <TouchableOpacity
          onPress={() => {
            props?.onPressSend(text);
            setText();
          }}
          style={{
            padding: 10,
            backgroundColor: student,
            borderRadius: 20,
          }}>
          <Ionicons
            name="send-sharp"
            size={20}
            style={{ transform: [{translateX: 2}]}}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
  },
});
