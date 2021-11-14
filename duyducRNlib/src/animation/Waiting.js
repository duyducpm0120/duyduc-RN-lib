import React from 'react';
import {
  SafeAreaView,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useRef} from 'react';

export default function Waiting() {
  const list = [0, 1, 2, 3, 4];
  const autoX = useRef(new Animated.Value(0)).current;
  const dotsRender = list.map((value, index) => {
    const animAutoX = Animated.loop(
      Animated.spring(autoX, {
        toValue: 5,
        //easing: Easing.bounce,
        useNativeDriver: false,
      }),
      {iterations: 4000},
    );
    const animAutoX1 = Animated.loop(
      Animated.timing(autoX, {
        toValue: 6,
        duration: 1500,
        //easing: Easing.swing,
        useNativeDriver: false,
      }),
    );
    animAutoX1.start();
    const width = autoX.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [10, 20, 10],
      extrapolate: 'clamp',
    });
    const color = autoX.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['#8A8181', '#68BD45', '#8A8181'],
      extrapolate: 'clamp',
    });
    console.log(index);
    return (
      <Animated.View
        style={{
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: color,
          marginHorizontal: 10,
        }}></Animated.View>
    );
  });
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 50,
      }}>
      {dotsRender}
    </SafeAreaView>
  );
}
