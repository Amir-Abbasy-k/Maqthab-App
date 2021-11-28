import React, {Fragment} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import DropDownPicker from 'react-native-dropdown-picker';
import {grey, lightGrey, tutorLight} from '../styles/Color';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DropDown = props => {
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [val, setVal] = React.useState();

  // const list = [{label: props.title, value: '_'}, ...props.data];

  return (
    <View>
      <Text style={styles.title}>{props?.title}</Text>  

      <Picker
        selectedValue={props?.value}
        style={{backgroundColor: '#F1EEFF'}}
        onValueChange={props?.onValueChange}>
        {props.data.map((item, idx) => {
          return <Picker.Item label={item.label} value={item} />;
        })}

        {/*             
<Picker.Item label="Java" value="java" />
<Picker.Item label="JavaScript" value="js" /> */}
      </Picker>
      <Text style={styles.err}>{props?.err}</Text> 

    </View>
  );
  return (
    <>
      {props.title && (
        <TouchableOpacity
          onPress={() => setBottomSheetVisible(true)}
          style={
            Platform.OS === 'android'
              ? {
                  justifyContent: 'space-between',
                  width: '100%',
                }
              : {
                  borderBottomWidth: 1,
                  padding: 10,
                  marginBottom: 10,
                  borderColor: '#dfdfdf',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }
          }>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              opacity: 0.6,
            }}>
            {props.title}
            {props.errorMessage && (
              <Text style={{color: 'red'}}>
                <Icon
                  type="material"
                  name="error-outline"
                  size={14}
                  color="red"
                />
                {props.errorMessage}
              </Text>
            )}
          </Text>
          {val && <Text>{val.label}</Text>}
          {Platform.OS === 'ios' && (
            <Icon name="arrow-drop-down" type="Material-Icons" color="#777" />
          )}
        </TouchableOpacity>
      )}
      <Modal
        visible={bottomSheetVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.4)'}}>
        <Picker
          // selectedValue={props.data[0].value}
          style={{backgroundColor: '#fff'}}
          onValueChange={(itemValue, itemIndex) => {
            props.onChangeItem(itemValue);
            setBottomSheetVisible(false);
            setVal(itemValue);
          }}>
          {list.map((item, idx) => {
            return <Picker.Item label={item.label} value={item} />;
          })}
        </Picker>
      </Modal>
    </>
  );
};

export default DropDown;
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
  err: {
    color: 'red',
    fontSize: 10,
  },
});
