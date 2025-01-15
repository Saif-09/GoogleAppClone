import React from 'react';
import { SafeAreaView, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Text, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LensIcon from '../../../assets/icons/svgs/LensIcon';
import { rw } from '../../../utils/helpers/responsiveHelper';
import { Colors } from '../../../styles/colors';

const BottomSheet = ({
    modalizeRef,
    searchText,
    setSearchText,
    handleMicButton,
    handleLensButton,
    closeBottomSheet,
    loading,
    suggestions,
    trendingNews,
    handleSearch,
}) => {
    const clearSearchText = () => {
        setSearchText('');
    };

    return (
        <Modalize
            ref={modalizeRef}
            modalHeight={Dimensions.get('window').height} 
            handleStyle={{ backgroundColor: Colors.profile.border, width: rw(50), height: rw(5) }}
            modalStyle={{ backgroundColor: Colors.background.primary }}
            withHandle={false}
            panGestureEnabled={false} 
        >
            <SafeAreaView style={{ flex: 1, paddingTop: rw(20) }}>
                {/* Search Bar */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: rw(20),
                        paddingVertical: rw(10),
                        width: '95%',
                        alignSelf: 'center',
                        height: rw(56),
                        backgroundColor: Colors.background.secondary,
                        borderRadius: rw(60),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {/* Back Button */}
                    <TouchableOpacity onPress={closeBottomSheet} style={{ marginRight: rw(10) }}>
                        <Icon name="arrow-back-ios-new" size={rw(16)} color={Colors.common.lightGray} />
                    </TouchableOpacity>

                    {/* Search Input */}
                    <TextInput
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        placeholder="Search or type URL"
                        placeholderTextColor={Colors.common.lightGray}
                        style={{
                            flex: 1,
                            color: Colors.common.white,
                            fontSize: 16,
                            marginLeft: rw(10),
                            
                        }}
                    />

                    {searchText ? (
                        <TouchableOpacity onPress={clearSearchText}>
                            <Icon
                                name="close"
                                size={rw(24)}
                                color={Colors.icon.active}
                                style={{ marginLeft: rw(10) }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity onPress={handleMicButton}>
                                <Icon
                                    name="mic"
                                    size={rw(24)}
                                    color={Colors.icon.active}
                                    style={{ marginLeft: rw(10) }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleLensButton}
                                style={{ marginLeft: rw(15) }}
                            >
                                <LensIcon
                                    width={rw(26)}
                                    height={rw(26)}
                                    stroke={Colors.icon.active}
                                    fill={Colors.icon.active}
                                    strokeWidth={16}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* What's Trending List */}
                <View style={{ marginTop: 20, paddingHorizontal: rw(20), }}>
                    <Text style={{ color: Colors.text.trending, fontSize: 14, marginBottom: 10 }}>
                        {searchText ? 'Suggestions' : "What's Trending"}
                    </Text>
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.common.lightGray} />
                    ) : (
                        <FlatList
                        style={{width:'95%'}}
                            data={searchText ? suggestions : trendingNews}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSearch(typeof item === 'string' ? item : item.title)} 
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        
                                    }}
                                >
                                    <View
                                        style={{
                                            width: rw(32),
                                            height: rw(32),
                                            borderRadius: rw(40),
                                            backgroundColor: Colors.background.secondary,
                                            marginRight: rw(16),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon
                                            name="trending-up"
                                            size={rw(20)}
                                            color={Colors.common.lightGray}
                                        />
                                    </View>
                                    <Text style={{ color: Colors.text.trending, fontSize: rw(14),flex: 1,
                                            flexWrap: 'wrap', 
                                            flexShrink: 1, }}>
                                        {typeof item === 'string' ? item : item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) =>
                                typeof item === 'string' ? index.toString() : item.id
                            }
                        />
                    )}
                </View>
            </SafeAreaView>
        </Modalize>
    );
};

export default BottomSheet;