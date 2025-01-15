import React, { Component, useReducer } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { rw } from '../../utils/helpers/responsiveHelper';
import { Colors } from '../../styles/colors';

const WebViewScreen = ({}) => {
    const route = useRoute();
    console.log(route, "route")
    const link = route.params.url
    console.log(link, "link")
    const navigation = useNavigation();
    const backPress = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} />

            <SafeAreaView style={{}} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.background.primary }}>
                <TouchableOpacity
                    onPress={backPress}
                    style={{ marginRight: rw(10), paddingHorizontal: rw(20), marginBottom: rw(10) }}
                >
                    <Icon name="arrow-back-ios-new" size={rw(20)} color="#9d9fa2" />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: rw(20),
                        width: rw(50),
                        height: rw(50),
                    }}
                >
                    <Image
                        source={require('../../assets/images/googleLogo.png')}
                        style={{ width: rw(80), height: rw(30) }}
                        resizeMethod="contain"
                    />
                </View>
                <View style={{ width: rw(80), height: rw(10) }}></View>
            </View>

            <WebView source={{ uri: link }} style={{ flex: 1 }} />
        </View>
    )
}

export default WebViewScreen