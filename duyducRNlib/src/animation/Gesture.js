/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';

function Gesture() {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        listener: event => {},
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
      // onPanResponderRelease:Animated.event([null, {dx: pan.x, dy: pan.y}], {
      //     listener: event => {},
      //     useNativeDriver: false,
      //   }),
    }),
  ).current;
  useEffect(() => {
    console.log(pan.x, pan.y);
  });

  function onMove(event) {
    // const {locationX, locationY} = event.nativeEvent;
    // pan.x = locationX;
    // console.log(pan.x, locationX);
    // pan.y = locationY;
    // console.log(pan.y, locationY);
  }
  function onRelease(event) {
    //const {locationX, locationY} = event.nativeEvent;
  }
  function onPress(event) {
    //const {locationX, locationY} = event.nativeEvent;
    Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    });
    console.log('onpress');
  }
  const r = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <View
        style={{
          backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Animated.View
          style={{
            ...styles.box,
            transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate: r}],
          }}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetPanResponder={() => true}
          onResponderMove={event => {
            onMove(event);
            console.log('onmove');
          }}
          onResponderRelease={event => {
            onRelease(event);
          }}
          onResponderGrant={event => {
            onPress(event);
            console.log('onpress');
          }}></Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default Gesture;
