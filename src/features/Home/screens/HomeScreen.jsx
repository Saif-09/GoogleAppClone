import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    View,
    RefreshControl,
    Animated, 
} from 'react-native';
import { rw } from '../../../utils/helpers/responsiveHelper';
import { useNavigation } from '@react-navigation/native';
import {NEWS_API_KEY} from '@env';
import axios from 'axios';
import {
    Header,
    SearchBar,
    ServiceSection,
    WeatherSection,
    FeedCard,
    BottomSheet,
} from '../components';
import { Colors } from '../../../styles/colors';
import { openURL } from '../../../utils/helpers/LinkOpener';

const HomeScreen = () => {
    const modalizeRef = useRef(null);
    const [trendingNews, setTrendingNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [feedData, setFeedData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    const fetchTrendingNews = useCallback(async () => {
        try {
            const apiKey = NEWS_API_KEY;
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`
            );
            if (response.data.status === 'ok' && response.data.articles.length > 0) {
                const articles = response.data.articles.map((article, index) => ({
                    id: index.toString(),
                    title: article.title,
                    image: article.urlToImage,
                    source: article.source.name,
                    url: article.url,
                }));
                setTrendingNews(articles);
                setFeedData(articles);
            } else {
                console.warn('No articles found');
            }
        } catch (error) {
            console.error('Error fetching trending news:', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchTrendingNews();
        setRefreshing(false);
    }, [fetchTrendingNews]);

    const handleSearch = useCallback((text) => {
        setSearchText(text);
        if (text?.trim().length > 0) {
            navigation.navigate('Search', { query: text });
        }
    }, [navigation]);


    const handleLensButton = useCallback(() => {
        navigation.navigate('Lens');
    }, [navigation]);

    const handleMicButton = useCallback(() => {
        navigation.navigate('Voice');
    }, [navigation]);

    const memoizedSuggestions = useMemo(() => {
        if (searchText.trim()) {
            return [
                `${searchText}`,
                `${searchText} tips`,
                `${searchText} news`,
                `What is ${searchText}?`,
                `${searchText} guide`,
            ];
        }
        return [];
    }, [searchText]);

    useEffect(() => {
        fetchTrendingNews();
    }, [fetchTrendingNews]);

    useEffect(() => {
        setSuggestions(memoizedSuggestions);
    }, [memoizedSuggestions]);

    const handleScroll = useCallback((event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setIsSticky(scrollY > 200);
    }, []);

    const openBottomSheet = useCallback(() => {
        modalizeRef.current?.open();
    }, []);

    const closeBottomSheet = useCallback(() => {
        modalizeRef.current?.close();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true, 
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background.primary }}>
            <ScrollView
                stickyHeaderIndices={[1]}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.common.lightGray]}
                        tintColor={Colors.common.lightGray}
                    />
                }
            >
                {/* Header */}
                <Header />

                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: rw(30),
                    paddingTop: isSticky ? rw(10) : 0,
                    backgroundColor: 'transparent',
                    zIndex: 1,
                }}>
                    <SearchBar
                        openBottomSheet={openBottomSheet}
                        handleMicButton={handleMicButton}
                        handleLensButton={handleLensButton}
                    />
                </View>

                {/* ServiceSection with fade-in animation */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <ServiceSection />
                </Animated.View>

                <WeatherSection />

                {/* Feed List */}
                <FlatList
                    data={feedData}
                    renderItem={({ item }) => (
                        <FeedCard item={item} openURL={openURL} navigation={navigation}/>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: rw(10) }}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>

            {/* Bottom Sheet */}
            <BottomSheet
                modalizeRef={modalizeRef}
                searchText={searchText}
                setSearchText={setSearchText}
                handleMicButton={handleMicButton}
                handleLensButton={handleLensButton}
                closeBottomSheet={closeBottomSheet}
                loading={loading}
                suggestions={suggestions}
                trendingNews={trendingNews}
                handleSearch={handleSearch}
            />
        </SafeAreaView>
    );
};

export default React.memo(HomeScreen);