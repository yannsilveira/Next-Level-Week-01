import React from 'react';
import { Roboto_700Bold, Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <Routes />
      </>
    );
  }
}

