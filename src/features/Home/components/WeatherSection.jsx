import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { rw } from '../../../utils/helpers/responsiveHelper';
import {WEATHER_API_KEY} from '@env';
import { openWebView } from '../../../utils/helpers/WebViewOpener';
import { useNavigation } from '@react-navigation/native';

const WeatherSection = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }
        return true;
    };

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            const weatherApiKey = WEATHER_API_KEY;
            const airQualityApiKey = WEATHER_API_KEY;

            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`
            );
            const weatherJson = await weatherResponse.json();

            const airQualityResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${airQualityApiKey}`
            );
            const airQualityJson = await airQualityResponse.json();

            setWeatherData(weatherJson);
            setAirQuality(airQualityJson.list[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error.message || error);
            setLoading(false);
        }
    };

    const openWeatherApp = () => {
        if (weatherData) {
            const { name } = weatherData;

            const googleWeatherUrl = `https://www.google.com/search?q=weather+${name}`;

            openWebView(googleWeatherUrl, navigation)
        }
    };

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            const hasPermission = await requestLocationPermission();

            if (hasPermission === 'granted' || Platform.OS === 'ios') {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    error => {
                        console.error('Error fetching location:', error.message || error);
                        console.log('Falling back to default location: Jaipur');
                        fetchWeatherData(28.7041, 77.1025); 
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                console.error('Location permission denied');    
                console.log('Falling back to default location: Delhi')
                fetchWeatherData(28.7041, 77.1025); 
            }
        };

        fetchLocationAndWeather();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#8db2f8" />;
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {/* Weather Card */}
            {weatherData && (
                <TouchableOpacity onPress={openWeatherApp}>
                    <View style={styles.card}>
                        <Text style={styles.locationText}>{weatherData.name}</Text>
                        <View style={styles.row}>
                            <Text style={styles.tempText}>{Math.round(weatherData.main.temp)}°C</Text>
                            <Image
                                source={{
                                    uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                                }}
                                style={styles.weatherIcon}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {/* Air Quality Card */}
            {airQuality && (
                <View style={styles.card}>
                    <Text style={styles.airQualityText}>Air quality · {airQuality.main.aqi}</Text>
                    <View style={styles.row}>
                        <Text style={styles.veryPoorText}>
                            {airQuality.main.aqi === 1
                                ? 'Good'
                                : airQuality.main.aqi === 2
                                ? 'Fair'
                                : airQuality.main.aqi === 3
                                ? 'Moderate'
                                : airQuality.main.aqi === 4
                                ? 'Poor'
                                : 'Very Poor'}
                        </Text>
                        <View
                            style={[
                                styles.circleIcon,
                                {
                                    backgroundColor:
                                        airQuality.main.aqi === 1
                                            ? 'green'
                                            : airQuality.main.aqi === 2
                                            ? 'yellow'
                                            : airQuality.main.aqi === 3
                                            ? 'orange'
                                            : airQuality.main.aqi === 4
                                            ? 'red'
                                            : 'red',
                                },
                            ]}
                        >
                            <Icon name="waves" size={18} color="black" />
                        </View>
                    </View>
                </View>
            )}

            {/* Settings Card */}
            <View style={styles.card}>
                <Icon name="settings" size={18} color="#8db2f8" style={styles.settingsIcon} />
                <Text style={styles.customizeText}>Customize space</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: rw(10),
        marginTop: rw(14),
    },
    card: {
        width: rw(160),
        borderWidth: 1,
        borderColor: '#3c3e45',
        borderRadius: rw(20),
        paddingHorizontal: rw(12),
        marginHorizontal: rw(5),
        paddingVertical: rw(12),
        justifyContent: 'space-between',
        gap: rw(14),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationText: {
        color: '#fff',
        fontSize: rw(14),
        fontFamily: 'Poppins-Regular',
    },
    tempText: {
        color: '#fff',
        fontSize: rw(20),
        fontFamily: 'Poppins-Medium',
    },
    airQualityText: {
        color: '#fff',
        fontSize: rw(14),
        fontFamily: 'Poppins-Regular',
    },
    veryPoorText: {
        color: '#fff',
        fontSize: rw(16),
        fontFamily: 'Poppins-Regular',
    },
    circleIcon: {
        width: rw(24),
        height: rw(24),
        borderRadius: rw(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        marginBottom: rw(5),
    },
    customizeText: {
        color: '#94959c',
        fontSize: rw(12),
        fontFamily: 'Poppins-Medium',
    },
    icon: {
        marginLeft: rw(5),
    },
    weatherIcon: {
        width: rw(50),
        height: rw(20),
        marginLeft: rw(5),
    },
});

export default WeatherSection;