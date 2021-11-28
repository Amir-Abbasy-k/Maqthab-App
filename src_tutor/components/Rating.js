import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Rating() {
    return (
        <View style={{flexDirection: 'row'}}>
             {[Array(5).fill("$").map(()=> <Icon
              type="antdesign"
              style={{paddingVertical: 10}}
              name="star"
              size={13}
              color="#C4C4C4"
            />)]}
        </View>
    )
}
