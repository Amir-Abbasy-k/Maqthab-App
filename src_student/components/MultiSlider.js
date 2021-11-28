import React, { useState } from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function MultiSliderCopm() {
  const [multiSliderValue, setMultiSliderValue] = useState([20, 60]);
  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  return (
    <MultiSlider
      markerStyle={{
        ...Platform.select({
          ios: {
            height: 30,
            width: 30,
            shadowColor: '#907AF9',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 1,
            shadowOpacity: 0.1,
          },
          android: {
            height: 20,
            width: 20,
            borderRadius: 50,
            backgroundColor: '#907AF9',
          },
        }),
      }}
      pressedMarkerStyle={{
        ...Platform.select({
          android: {
            height: 30,
            width: 30,
            borderRadius: 20,
            backgroundColor: '#E1DEFA',
          },
        }),
      }}
      selectedStyle={{
        backgroundColor: '#907AF9',
      }}
      trackStyle={{
        backgroundColor: '#E1DEFA',
      }}
      touchDimensions={{
        height: 40,
        width: 40,
        borderRadius: 20,
        slipDisplacement: 20,
      }}
      values={[multiSliderValue[0], multiSliderValue[1]]}
      sliderLength={280}
      onValuesChange={multiSliderValuesChange}
      min={0}
      max={100}
      allowOverlap={false}
      minMarkerOverlapDistance={10}
    />
  );
}

const styles = StyleSheet.create({});
