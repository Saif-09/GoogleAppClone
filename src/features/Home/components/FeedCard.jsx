import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvIcon from 'react-native-vector-icons/EvilIcons';
import { rw } from '../../../utils/helpers/responsiveHelper';
import { Colors } from '../../../styles/colors';

const FeedCard = ({ item, openURL }) => {
    return (
        <TouchableOpacity
            key={item.id}
            onPress={() => openURL(item.url)} 
            style={{
                marginVertical: 10,
                overflow: 'hidden',
                borderBottomWidth: 1,
                borderColor: Colors.common.darkGray,
                paddingHorizontal: rw(16),
            }}
        >
            {item.image && (
                <Image
                    source={{ uri: item.image }}
                    style={{
                        width: '100%',
                        height: rw(200),
                        borderRadius: 12,
                    }}
                />
            )}
            <View style={{ paddingVertical: 10 }}>
                <Text
                    style={{
                        color: Colors.common.white,
                        fontSize: rw(20),
                        marginBottom: 5,
                    }}
                >
                    {item.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: Colors.common.mediumGray,
                            fontSize: rw(12),
                            marginTop: rw(8),
                        }}
                    >
                        {item.source}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: rw(20),
                            marginTop: rw(4),
                        }}
                    >
                        <TouchableOpacity>
                            <Icon name="favorite-border" size={16} color={Colors.icon.borderColor} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <EvIcon name="share-apple" size={20} color={Colors.icon.borderColor} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="more-vert" size={16} color={Colors.icon.borderColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FeedCard;