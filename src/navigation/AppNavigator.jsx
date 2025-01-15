import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchResultsPage from '../features/Home/components/SearchResultPage';
import LensScreen from '../features/ImageSearch/screens/LensScreen';
import VoiceSearchScreen from '../features/Voice/screens/VoiceScreen';
import BottomNavigator from './BottomNavigator';
import WebViewScreen from '../features/WebView/WebView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeTabs" component={BottomNavigator} />
                <Stack.Screen name="Lens" component={LensScreen} />
                <Stack.Screen name="Voice" component={VoiceSearchScreen} />
                <Stack.Screen name="SearchResultsPage" component={SearchResultsPage} />
                <Stack.Screen name="WebView" component={WebViewScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;