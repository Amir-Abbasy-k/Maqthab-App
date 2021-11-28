import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Quran() {
  const [chapters, setChapters] = useState();
  const nav = useNavigation()
  useEffect(() => {
    let headersList = {
      Accept: '*/*',
    };
    let reqOptions = {
      url: 'https://api.quran.com/api/v4/chapters',
      method: 'GET',
      headers: headersList,
    };
    axios.request(reqOptions).then(function (response) {
      console.log(response.data.chapters);
      setChapters(response.data.chapters);
    });
  }, []);

  return (
    <Layout>
      {chapters && (
        <FlatList
          data={chapters}
          keyExtractor={(i, k) => k.toString()}
          renderItem={({item}, key) => (
            <TouchableOpacity style={styles.container} onPress={()=> nav.navigate('QuranRead', {chapterId :item.id})}>
             <Text style={styles.title}>{item.id}</Text>
             <Text style={styles.title}>{item.name_simple}</Text>
             <Text style={styles.title}>{item.name_arabic}</Text>
             <View>
             <Text style={styles.text}>verses_count - {item.verses_count}</Text>
             <Text style={styles.text}>{JSON.stringify(item.pages)}</Text>
             </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    marginBottom: 5
  },title:{
      fontSize: 15,
      fontWeight: '900'
  },text:{
      fontSize: 10
  }
});
