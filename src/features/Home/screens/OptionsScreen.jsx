import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, SafeAreaView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { rw } from '../../../utils/helpers/responsiveHelper';
import { openWebView } from '../../../utils/helpers/WebViewOpener';
import { useNavigation } from '@react-navigation/native';

const OptionsScreen = () => {
    const navigation = useNavigation()
    const options = [
        { id: 1, label: 'Gemini', icon: 'star', url: 'https://gemini.google.com' },
        { id: 2, label: 'Search Labs', icon: 'science', url: 'https://labs.google.com' },
        { id: 3, label: 'Search text in an image', icon: 'image-search', url: 'https://images.google.com' },
        { id: 4, label: 'Song Search', icon: 'music-note', url: 'https://music.youtube.com' },
        { id: 5, label: 'Change app icon', icon: 'app-settings-alt', url: 'https://myaccount.google.com' },
        { id: 6, label: 'Add Search widget', icon: 'widgets', url: 'https://support.google.com' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
            <View style={styles.container}>
                <Text style={styles.header}>More</Text>
                <View style={styles.grid}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.card}
                            onPress={() => openWebView(option.url, navigation)}
                        >
                            <View style={styles.iconContainer}>
                                <Icon name={option.icon} size={20} color="#8db2f8" />
                            </View>
                            <Text style={styles.cardText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OptionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        paddingHorizontal: rw(20),
        paddingTop: 20,
    },
    header: {
        color: '#fff',
        fontSize: rw(18),
        fontWeight: '500',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        width: '48%',
    },
    iconContainer: {
        marginBottom: rw(30),
    },
    cardText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
});