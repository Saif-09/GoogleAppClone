import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { rw } from '../../../utils/helpers/responsiveHelper';
import { useNavigation } from '@react-navigation/native';
import { openWebView } from '../../../utils/helpers/WebViewOpener';

const IconButton = ({ icon, backgroundColor, iconColor, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor }]}
            onPress={onPress}
        >
            <Icon name={icon} size={rw(20)} color={iconColor} />
        </TouchableOpacity>
    );
};

const ServiceSection = () => {

    const navigation = useNavigation();
    
    const buttons = [
        {
            icon: 'image-search',
            backgroundColor: '#51422b',
            iconColor: '#be9347',
            onPress: () => openWebView('https://images.google.com', navigation),
        },
        {
            icon: 'translate',
            backgroundColor: '#393f4f',
            iconColor: '#8db2f8',
            onPress: () => openWebView('https://translate.google.com', navigation),
        },
        {
            icon: 'school',
            backgroundColor: '#364e41',
            iconColor: '#70d69d',
            onPress: () => openWebView('https://classroom.google.com', navigation),
        },
        {
            icon: 'music-note',
            backgroundColor: '#614542',
            iconColor: '#feb2b0',
            onPress: () => openWebView('https://music.youtube.com', navigation),
        },
    ];

    return (
        <View style={styles.container}>
            {buttons.map((button, index) => (
                <IconButton
                    key={index}
                    icon={button.icon}
                    backgroundColor={button.backgroundColor}
                    iconColor={button.iconColor}
                    onPress={button.onPress}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: rw(12),
        paddingVertical: rw(10),
        paddingBottom: rw(14),
        borderBottomWidth: rw(1),
        borderColor: '#3c3e45',
    },
    iconContainer: {
        paddingVertical: rw(18),
        paddingHorizontal: rw(31),
        borderRadius: rw(32),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ServiceSection;