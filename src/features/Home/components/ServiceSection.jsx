import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isIOS, rw } from '../../../utils/helpers/responsiveHelper';

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
    const openURL = async (url) => {
        try {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `https://${url}`;
            }

            if (isIOS) {
                const supported = await Linking.canOpenURL(url);
                if (!supported) {
                    Alert.alert('Error', 'Unable to open this link.');
                    return;
                }
            }

            await Linking.openURL(url);
        } catch (error) {
            console.error('Failed to open URL:', error);
            Alert.alert('Error', 'Failed to open link.');
        }
    };

    const buttons = [
        {
            icon: 'image-search',
            backgroundColor: '#51422b',
            iconColor: '#be9347',
            onPress: () => openURL('https://images.google.com'),
        },
        {
            icon: 'translate',
            backgroundColor: '#393f4f',
            iconColor: '#8db2f8',
            onPress: () => openURL('https://translate.google.com'),
        },
        {
            icon: 'school',
            backgroundColor: '#364e41',
            iconColor: '#70d69d',
            onPress: () => openURL('https://classroom.google.com'),
        },
        {
            icon: 'music-note',
            backgroundColor: '#614542',
            iconColor: '#feb2b0',
            onPress: () => openURL('https://music.youtube.com'),
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