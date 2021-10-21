import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import updateImage from '../assets/images/updateImage.png';

export default function ImagePicker() {
  const [imageUri, setImageUri] = useState(updateImage);
  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      },
      response => {
        console.log('Image picker call back successfully');
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
            //uri: response.assets[0].uri,
          };
          setImageUri(source);
          console.log(source);
        }
      },
    );
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      },
      response => {
        console.log('Image picker call back successfully');
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
            //uri: response.assets[0].uri,
          };
          setImageUri(source);
          console.log(source);
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <Image style={{width: 100, height: 100}} source={imageUri}></Image>
      <Button
        onPress={() => {
          openImagePicker();
        }}
        title="Choose from library"></Button>
      <Button
        onPress={() => {
          openCamera();
        }}
        title="Open Camera"></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
