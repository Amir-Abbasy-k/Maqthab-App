/* eslint-disable prettier/prettier */
//globalfonts used across the project for changing text styles
import {StyleSheet, Platform} from 'react-native';

export const globalfonts = StyleSheet.create({
    black:{
        fontFamily: Platform.select({
            android: 'Mulish-Black',
            ios: 'Mulish-Black',
        }),
    },
    bold: {
        fontFamily: Platform.select({
            android: 'Mulish-Bold',
            ios: 'Mulish-Bold',
        }),
    },
    semiBold: {
        fontFamily: Platform.select({
            android: 'Mulish-SemiBold',
            ios: 'Mulish-SemiBold',
        }),
    },
    medium: {
        fontFamily: Platform.select({
            android: 'Mulish-Medium',
            ios: 'Mulish-Medium',
        }),
    },
    regular: {
        fontFamily: Platform.select({
            android: 'Mulish-Regular',
            ios: 'Mulish-Regular',
        }),
    },
    light: {
        fontFamily: Platform.select({
      android: 'Mulish-Light',
            ios: 'Mulish-Light',
        }),
    },
})
