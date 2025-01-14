import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Animated,
    SafeAreaView,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isIOS, rw } from '../../../utils/helpers/responsiveHelper';
import AnimatedDots from '../components/AnimatedDots';

const VoiceSearchScreen = ({ navigation }) => {
    const [isListening, setIsListening] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        Voice.onSpeechStart = () => setIsListening(true);
        Voice.onSpeechEnd = () => setIsListening(false);

        Voice.onSpeechResults = (event) => {
            const recognizedText = event.value[0] || '';
            setResult(recognizedText);
            setIsListening(false);

            if (recognizedText.trim()) {
                setTimeout(() => {
                    setIsListening(false);
                    Voice.destroy().then(Voice.removeAllListeners);
                    navigation.navigate('SearchResultsPage', { query: recognizedText });
                }, 1500);
            } else {
                Alert.alert('No input detected', 'Please try speaking again.');
            }
        };

        Voice.onSpeechError = (error) => {
            console.error('Speech error:', error.message);
            setError(true);
            setIsListening(false);
            Alert.alert('Error', error.message);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startListening = async () => {
        try {
            if (isListening) {
                await Voice.stop();
                setIsListening(false);
            }

            setError(false);
            setResult('');
            await Voice.start('en-US');
        } catch (err) {
            console.error('Voice start error:', err);
            Alert.alert('Error', 'Could not start voice recognition.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-ios" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>
                {isListening ? 'Listening...' : 'Speak now'}
            </Text>
            <Text style={styles.subtitle}>
                {isListening
                    ? 'Please speak clearly into the microphone'
                    : 'Tap the mic to start speaking'}
            </Text>

            {result && (
                <Text style={styles.recognizedText}>You said: "{result}"</Text>
            )}

            {!isListening && (
                <TouchableOpacity style={styles.micButton} onPress={startListening}>
                    <Icon name="mic" size={60} color="#fff" />
                </TouchableOpacity>
            )}

            {isListening && (
                <AnimatedDots isListening={isListening}/>
            )}
        </SafeAreaView>
    );
};

export default VoiceSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202124',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: isIOS?rw(60):rw(20),
        left: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#9d9fa2',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    recognizedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    micButton: {
        backgroundColor: '#303134',
        padding: rw(25),
        borderRadius: rw(100),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
});