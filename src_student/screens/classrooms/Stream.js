import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import {student} from '../../styles/Color'


export default function app(props){

  const [loading, setLoading] = useState(true)
    // const jsCode = `document.querySelector('.HeaderHero').style.backgroundColor = 'purple';`;

    const jsCode = `
    var x = document.getElementsByClassName("deep-linking-mobile__button_primary");
    for(var i = 0; i <= x.length; i++){
      let html = x[i].innerHTML;
       if(html === "Launch in web"){
        x[i].click();
       }else{
        // alert(html);
       }
   }`;

   useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
   }, [])



    return (
      <View style={styles.container}>
       
        <WebView
          // ref={ref => webView = ref}
          source={{ uri:  props?.route.params.url }}
          originWhitelist={['*']}
          javaScriptEnabledAndroid={true}
          injectedJavaScript={jsCode}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          onNavigationStateChange={(nav) => console.log(nav)}
        />
         {loading &&
       <View style={{flex:1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, height: '100%', width:'100%',zIndex: 100}}>
          <ActivityIndicator loading={true} color={student} size={50} />
          <Text>Setting Class...</Text>
         </View>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})