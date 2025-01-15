import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image,
    Alert,
    Linking,
    Dimensions,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { Modalize } from 'react-native-modalize';
import { rw } from '../../../utils/helpers/responsiveHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Link, useNavigation } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { SCRAPING_DOG_API_KEY, CLOUD_NAME } from '@env';
import CameraLens from '../components/CameraLens';
import { openWebView } from '../../../utils/helpers/WebViewOpener';


const LensScreen = () => {
    const device = useCameraDevice('back');
    const camera = useRef(null);
    const modalizeRef = useRef(null);
    const [imagePath, setImagePath] = useState('');
    const [flashMode, setFlashMode] = useState('off');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        checkPermission();
    }, []);

    const checkPermission = async () => {
        await Camera.requestCameraPermission();
        await Camera.requestMicrophonePermission();
    };

    const clickPhoto = async () => {
        if (camera.current) {
            const photo = await camera.current.takePhoto({ flash: flashMode });
            setImagePath(photo.path);
            modalizeRef.current?.open();
            setLoading(true);
            await processImage(photo.path);
        }
    };

    const processImage = async (path) => {
        try {
            const imageUrl = await uploadToCloudinary(path);
            console.log('Uploaded Image URL:', imageUrl);

            const apiKey = SCRAPING_DOG_API_KEY;
            const apiUrl = 'https://api.scrapingdog.com/google_lens';
            const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`;

            console.log('Making request to ScrapingDog API with lens URL:', lensUrl);

            const response = await axios.get(apiUrl, {
                params: { api_key: apiKey, url: lensUrl },
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setResults(response.data.lens_results);
                console.log('ScrapingDog Results:', response.data.lens_results);
            } else {
                console.error('ScrapingDog API Error (non-200):', response);
                Alert.alert('Error', 'Failed to fetch Google Lens results');
            }
        } catch (error) {
            console.error('ScrapingDog API Error Details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
            });
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const uploadToCloudinary = async (filePath) => {
        const formData = new FormData();
        formData.append('file', { uri: filePath, name: 'photo.jpg', type: 'image/jpeg' });
        formData.append('upload_preset', 'googleapp');
        const cloudName = CLOUD_NAME;
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data.secure_url;
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const toggleFlashMode = () => {
        setFlashMode((prevFlashMode) => (prevFlashMode === 'off' ? 'on' : 'off'));
    };

    const renderModalContent = () => {
        if (loading) {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: rw(16), paddingTop: 20 }}>
                    {[...Array(10)].map((_, index) => (
                        <View key={index} style={{ width: '48%', marginBottom: 16 }}>
                            <ShimmerPlaceHolder
                                style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 8, }}
                                autoRun={true}
                                duration={1500}
                                shimmerColors={['#3A3A3A', '#4A4A4A', '#3A3A3A']}
                                shimmerWidth={400}
                            />
                            <ShimmerPlaceHolder
                                style={{ width: '100%', height: 20, borderRadius: 4 }}
                                autoRun={true}
                                duration={1500}
                                shimmerColors={['#3A3A3A', '#4A4A4A', '#3A3A3A']}
                                shimmerWidth={400}
                            />
                        </View>
                    ))}
                </View>
            );
        }

        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Google Lens Results</Text>
                {results.length === 0 ? (
                    <Text style={styles.noResultsText}>No results found</Text>
                ) : (
                    <View style={styles.resultsContainer}>
                        {results.map((result, index) => (
                            <TouchableOpacity
                                onPress={() => openWebView(result.link, navigation)}
                                key={index} style={styles.resultCard}>
                                <Image
                                    source={{ uri: result.thumbnail }}
                                    style={styles.resultImageLarge}
                                />
                                <Text style={styles.resultTitleSmall}>{result.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };
    if (device === null) return <ActivityIndicator />;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo
                flash={flashMode}
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.iconContainer}>
                    <Icon name="arrow-back-ios-new" size={rw(22)} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFlashMode} style={styles.iconContainer}>
                    <Icon
                        name={flashMode === 'off' ? 'flash-off' : 'flash-on'}
                        size={rw(22)}
                        color="white"
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Google Lens</Text>
                <View style={{ width: rw(100) }} />
            </View>
            <CameraLens />

            <TouchableOpacity
                onPress={clickPhoto}
                style={styles.captureButtonContainer}>
                <View style={styles.captureButton}>
                    <Icon name="search" size={rw(24)} color="black" />
                </View>
            </TouchableOpacity>

            <Modalize
                ref={modalizeRef}
                snapPoint={400}
                modalHeight={Dimensions.get('window').height}
                withHandle={true}
                modalStyle={styles.modalStyle}
                handleStyle={styles.handleStyle}
                handlePosition='inside'
            >
                {renderModalContent()}
            </Modalize>
        </SafeAreaView>
    );
};

export default LensScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: rw(18),
        paddingTop: rw(14),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: rw(40),
        height: rw(40),
    },
    headerText: {
        fontSize: rw(22),
        color: 'white',
        fontWeight: '600',
        marginBottom: rw(18),
    },
    captureButtonContainer: {
        width: rw(80),
        height: rw(80),
        borderRadius: rw(40),
        borderWidth: rw(2),
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: rw(100),
        alignSelf: 'center',
    },
    captureButton: {
        width: rw(70),
        height: rw(70),
        borderRadius: rw(40),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalStyle: {
        borderTopLeftRadius: rw(30),
        borderTopRightRadius: rw(30),
        backgroundColor: '#303134',
        paddingVertical: rw(10),
    },
    handleStyle: {
        width: rw(50),
        height: rw(6),
        backgroundColor: '#9d9fa2',
        borderRadius: rw(3),
        alignSelf: 'center',
        marginTop: rw(0),
    },
    modalContent: {
        padding: rw(10),
    },
    modalHeader: {
        fontSize: rw(22),
        fontWeight: 'bold',
        marginBottom: rw(20),
        textAlign: 'center',
        color: 'white',
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: rw(20),
        fontWeight: '500',
        color: '#888',
    },
    shimmerContainer: {
        flex: 1,
        padding: rw(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    shimmerItem: {
        width: '48%',
        marginBottom: rw(10),
    },
    resultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    resultCard: {
        width: '48%',
        marginBottom: rw(10),
        alignItems: 'center',
    },
    resultImageLarge: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: rw(10),
        backgroundColor: '#ddd',
    },
    resultTitleSmall: {
        marginTop: rw(8),
        fontSize: rw(14),
        textAlign: 'left',
        color: '#fff',
    },
});