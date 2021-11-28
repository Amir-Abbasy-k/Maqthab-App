import React, { useEffect } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {Text,TouchableHighlight, View} from 'react-native';

// https://razorpay.com/docs/payment-gateway/react-native-integration/standard/android/
// key id : rzp_test_yF4DCzhQyQi2mJ
//key secret : FWAyVsjz7pfHfMdAuWqquYm8
// azharpullipparambu@oksbi
function App() {
return <View>

<TouchableHighlight onPress={() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yF4DCzhQyQi2mJ', // Your api key
    amount: '100',
    name: 'faoo',
    prefill: {
      email: 'amirabbasyk@gmail.com',
      contact: '6238474116', 
      name: 'Razorpay Software'
    },
    theme: {color: '#61b244'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}}>
  <Text>hkjhkj</Text>
</TouchableHighlight>
</View>
  }

  
export default App;