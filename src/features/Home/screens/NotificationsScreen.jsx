import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationsScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Icon name="notifications-off" size={60} color="#9aa0a6" />
            </Animated.View>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.title}>All Caught Up</Text>
            </Animated.View>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.subtitle}>No new notifications for now. Enjoy the silence!</Text>
            </Animated.View>
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202124',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#e8eaed',
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#9aa0a6',
        marginTop: 8,
        textAlign: 'center',
    },
});