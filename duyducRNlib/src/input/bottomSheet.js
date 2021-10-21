import * as React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import updateProfile from '../assets/images/updateImage.png';

export default function BottomSheetComponent() {
  //Create components inside bottomsheet
  const renderInner = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 500,
      }}>
      <Text>Swipe down to close</Text>
      <Image style={{width: 100, height: 100}} source={updateProfile}></Image>
      <Button
        title="Click to close bottomSheet"
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
        }}></Button>
    </View>
  );
  //Create components at the header of bottomsheet
  const renderHeader = () => (
    <View
      style={{
        backgroundColor: 'orange',
      }}>
      <Text>BottomSheet</Text>
    </View>
  );

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Button
        title="Click to open bottomSheet"
        onPress={() => {
          bottomSheetRef.current.snapTo(0);
        }}></Button>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[550, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={50}
      />
    </View>
  );
}
