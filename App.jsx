import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SERP_API, WEATHER_API_KEY, NEWS_API_KEY, SCRAPING_DOG_API_KEY, CLOUD_NAME } from '@env';
import { isIOS } from './src/utils/helpers/responsiveHelper';


const App = () => {


  const requestLocationPermission = async () => {
    const permission =
      isIOS
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.error('Location permission denied');
    }
  };


  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, }}>
      <View style={{ flex: 1, backgroundColor: '#202124' }}>
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})