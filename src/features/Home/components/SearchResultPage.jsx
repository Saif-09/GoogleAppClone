import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    Image,
    Animated,
    Easing,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { rw } from '../../../utils/helpers/responsiveHelper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { SERP_API } from '@env';

const SearchResultsPage = ({ route }) => {
    const { query, openBottomSheet } = route.params || {};
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    const fetchSearchResults = async () => {
        if (!query) return;
        setLoading(true);
        const API_KEY = SERP_API;
        const endpoint = 'https://serpapi.com/search';

        try {
            const response = await axios.get(endpoint, {
                params: {
                    q: query,
                    engine: 'google',
                    api_key: API_KEY,
                    num: 20,
                },
            });

            if (response.data.organic_results) {
                setResults(response.data.organic_results.map((item, index) => ({
                    id: index.toString(),
                    title: item.title,
                    link: item.link,
                    snippet: item.snippet,
                    image: item.thumbnail || item.favicon,
                    source: item.source,
                })));
            } else {
                console.warn('No results found');
            }
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [query]);

    const openURL = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', 'Unable to open this link.');
            }
        } catch (error) {
            console.error('Failed to open URL:', error.message);
        }
    };

    const renderResult = ({ item }) => (
        <TouchableOpacity
            onPress={() => openURL(item.link)}
            style={styles.resultContainer}
        >
            {item.image && (
                <Image
                    source={{ uri: item.image }}
                    style={styles.resultImage}
                    resizeMode="cover"
                />
            )}
            <View style={styles.resultTextContainer}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSource}>{item.source}</Text>
                <Text style={styles.resultSnippet}>{item.snippet}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderShimmer = () => {
        return [...Array(5)].map((_, index) => (
            <View key={index} style={styles.resultContainer}>
                <ShimmerPlaceholder
                    style={styles.resultImage}
                    autoRun={true}
                    visible={!loading} 
                />
                <View style={styles.resultTextContainer}>
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        autoRun={true}
                        visible={!loading} 
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        autoRun={true}
                        visible={!loading} 
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        autoRun={true}
                        visible={!loading} 
                    />
                </View>
            </View>
        ));
    };

    const backPress = () => {
        navigation.goBack()
    };

    const handleNoQueryPress = () => {
        navigation.navigate('Home');
        if (openBottomSheet) {
            openBottomSheet();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        source={require('../../../assets/images/googleLogo.png')}
                        style={{ width: rw(80), height: rw(30) }}
                        resizeMethod="contain"
                    />
                </View>
                <View style={{ width: rw(80), height: rw(10) }}></View>
            </View>

            {query ? (
                loading ? (
                    <FlatList
                        data={[...Array(5)]} 
                        renderItem={renderShimmer}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.resultList}
                    />
                ) : (
                    <FlatList
                        data={results}
                        renderItem={renderResult}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.resultList}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No results found</Text>
                        }
                    />
                )
            ) : (
                <TouchableOpacity
                    style={styles.noQuery}
                    onPress={handleNoQueryPress}
                >
                    <Animated.View
                        style={[
                            styles.noQueryContainer,
                            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="search" size={40} color="#8db2f8" style={styles.icon} />
                        </View>
                        <Text style={styles.noQueryText}>Please enter a search query on the homepage to see results.</Text>
                        <Text style={styles.noQuerySubtext}>Tap here to go back and search.</Text>
                    </Animated.View>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default SearchResultsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202124',
    },
    resultList: {
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    resultContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#303134',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    resultTextContainer: {
        flex: 1,
    },
    resultTitle: {
        color: '#BDBDBD',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultSource: {
        color: '#8db2f8',
        fontSize: 14,
        marginTop: 4,
    },
    resultSnippet: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 4,
    },
    shimmerText: {
        height: 16,
        width: '100%',
        marginBottom: 8,
        borderRadius: 4,
    },
    emptyText: {
        color: '#9d9fa2',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    noQuery: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
    },
    noQueryContainer: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 20,
        backgroundColor: '#2a2a2a',
        width: '90%',
        maxWidth: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    iconContainer: {
        backgroundColor: '#3a3a3a',
        borderRadius: 50,
        padding: 16,
        marginBottom: 16,
    },
    icon: {},
    noQueryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 8,
    },
    noQuerySubtext: {
        color: '#8db2f8',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});