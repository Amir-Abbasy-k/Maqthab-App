import { useNavigation } from '@react-navigation/core';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  PixelRatio,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';



const DATA = [
  {
    img:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    title: 'Nature Imitates Art',
    caption: '....something like that',
  },
  {
    img:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    title: 'High quality Art work',
    caption: '... for a fraction of the price',
  },
  {
    img:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    title: 'Top Notch Artists',
    caption: '... all in one place',
  }
];

const Intro = () => {
    const navigation = useNavigation();
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');
  const animVal = useRef(new Animated.Value(0)).current;

  console.log('animVal', animVal);

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }

    Animated.timing(animVal, {
      toValue: indexOfNextScreen,
      duration: 500,
      Easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const { currentPage: pageIndex } = sliderState;

  const move = animVal.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-30, 70, 430],
  });
  return (
    <>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: 100,
            backgroundColor: 'skyblue',
          }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}>
          <Animated.Image
            source={require('../../assets/images/intro.jpg')}
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateX: move }],
              left: -300,
            }}
          />

          {DATA.map((item, key) => {
            return (
              <View
                style={{
                  width,
                  height,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <Image source={{ uri: item.img }} style={styles.imageStyle} /> */}
                <View style={styles.wrapper}>
                  <Text style={styles.header}>{item.title}</Text>
                  <Text style={styles.paragraph}>{item.caption}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.paginationWrapper}>
          {DATA.map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                { opacity: pageIndex === index ? 1 : 0.2 },
              ]}
              key={index}
            />
          ))}
        </View>
        <View
          style={{
            ...styles.paginationWrapper,
            bottom: 10,
            paddingHorizontal: 50,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
          <Text>Don't Show Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
          <Text>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    borderRadius: 50,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#FFF',
    marginLeft: 10,
  },
});
