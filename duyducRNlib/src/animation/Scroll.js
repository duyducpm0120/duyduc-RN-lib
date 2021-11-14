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
  Image,
  useWindowDimensions,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';

function Scroll() {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  );
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}>
      <ScrollView
        horizontal={true}
        style={{
          backgroundColor: 'black',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {listener: event => {}, useNativeDriver: false},
        )}>
        {images.map((image, index) => {
          const o = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
          const h = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [100, 400, 100],
            extrapolate: 'clamp',
          });
          return (
            <Animated.Image
              source={{uri: image}}
              key={index.toString()}
              //resizeMode="cover"
              style={{
                width: windowWidth - 40,
                height: h,
                opacity: o,
                borderRadius: 15,
                marginHorizontal: 20,
              }}></Animated.Image>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'orange',
        }}>
        {images.map((image, index) => {
          const w = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={{
                backgroundColor: 'gray',
                height: 10,
                width: w,
                borderRadius: 50,
                marginHorizontal: 3,
              }}></Animated.View>
          );
        })}
      </View>
      <Text>AAA</Text>
    </SafeAreaView>
  );
}

export default Scroll;
