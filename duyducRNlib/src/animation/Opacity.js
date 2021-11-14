/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Animated, Easing} from 'react-native';
import {useEffect, useRef} from 'react';

function Opacity() {
  const opacity = useRef(new Animated.Value(0)).current;
  const marginTop = useRef(new Animated.Value(0)).current;
  const color = useRef(new Animated.Value(0)).current;
  const colorConvert = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['orange', 'green'],
  });
  const rotate = useRef(new Animated.Value(0)).current;
  const r = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  useEffect(() => {
    const anim1 = Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    const anim2 = Animated.timing(marginTop, {
      toValue: 100,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    const anim3 = Animated.timing(color, {
      toValue: 1,
      duration: 10000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    const anim4 = Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    Animated.parallel([anim1, anim2, anim3, anim4]).start();
  });

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          opacity,
          marginTop,
          backgroundColor: colorConvert,
          transform: [{rotate: r}],
        }}></Animated.View>
    </SafeAreaView>
  );
}

export default Opacity;
