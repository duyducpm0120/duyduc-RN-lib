/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Animated, Easing, Image} from 'react-native';
import {useEffect, useRef} from 'react';
import {run} from 'jest';

function Rotate() {
  const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  );
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
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    // const anim1 = Animated.timing(opacity, {
    //   toValue: 1,
    //   duration: 5000,
    //   easing: Easing.bounce,
    //   useNativeDriver: false,
    // });
    // const anim2 = Animated.timing(marginTop, {
    //   toValue: 100,
    //   duration: 3000,
    //   easing: Easing.bounce,
    //   useNativeDriver: false,
    // });
    const anim3 = Animated.timing(color, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    const anim4 = Animated.loop(
      Animated.spring(rotate, {
        toValue: 1,
        duration: 1000,
        //easing: Easing.bounce,
        useNativeDriver: false,
      }),
    );
    Animated.parallel([anim3, anim4]).start();
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
          opacity: 1,
          marginTop: 100,
          backgroundColor: colorConvert,
          transform: [{rotate: r}],
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: images[0]}}></Image>
      </Animated.View>
    </SafeAreaView>
  );
}

export default Rotate;
