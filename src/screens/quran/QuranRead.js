import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import Layout from '../../components/Layout';
import APIKit from '../../services/ApiKit';
import axios from 'axios';
var widthX = Dimensions.get('window').width;

function Customize(props) {
  const [custome, setCustom] = useState({size: 20});
  useEffect(() => {
    props?.onChange(custome);
  }, [custome]);

  return (
    <View>
      <TextInput
        keyboardType="number-pad"
        value={custome}
        style={{borderWidth: 3}}
        placeholder="Font Size"
        // onChangeText={val => setCustom({...custome, size: val})}
        onChangeText={val => setCustom(val)}
      />
    </View>
  );
}

export default function QuranRead(props) {
  let chapterId = props.route.params.chapterId;
  let SIZE = 23;

  const [chapter, setChapter] = useState();
  const [configs, setConfigs] = useState(SIZE);

  console.log(configs, SIZE);

  useEffect(() => {
    let headersList = {
      Accept: '*/*',
    };
    let reqOptions = {
      url: `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${chapterId}`,
      method: 'GET',
      headers: headersList,
    };
    axios.request(reqOptions).then(function (response) {
      setChapter(response.data);
    });
  }, []);

  return (
    <Layout contentContainerStyle={{padding: 22, backgroundColor: '#cccccc40'}}>
      {/* <Customize onChange={vals => setConfigs(vals)} /> */}
      {/* <Button onPress={()=> SIZE += 5} title="PlUS"/> */}
      <View>
        {chapterId > 1 && (
          <Text style={styles.bismi}>بِسۡمِ اللهِ الرَّحۡمٰنِ الرَّحِيۡمِ</Text>
        )}
        <Text style={{...styles.verse, fontSize: SIZE}}>
          {chapter &&
            chapter.verses.map((item, key) => {
              return item.text_indopak + ` (${item.verse_key}) * `;
            })}
        </Text>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  verse: {
    fontWeight: '900',
    textAlign: 'justify',
    fontSize: 20,
    lineHeight: 50
  },
  bismi: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
});
