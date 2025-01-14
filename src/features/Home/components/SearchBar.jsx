import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchIcon from '../../../assets/icons/svgs/SearchIcon'
import MicIcon from '../../../assets/icons/svgs/MicIcon'
import LensIcon from '../../../assets/icons/svgs/LensIcon'
import { isIOS, rw } from '../../../utils/helpers/responsiveHelper'
import { Colors } from '../../../styles/colors'

const SearchBar = ({openBottomSheet, handleLensButton, handleMicButton}) => {
    return (
        <View
            style={{width:'100%'
            }}
        >
            <TouchableOpacity
                onPress={openBottomSheet} 
                style={{
                    width: '95%',
                    height: rw(70),
                    backgroundColor: Colors.background.secondary,
                    borderRadius: rw(60),
                    paddingHorizontal: rw(22),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <SearchIcon
                    width={rw(22)}
                    height={rw(22)}
                    stroke={Colors.common.lightGray}
                    fill={Colors.common.lightGray}
                    strokeWidth={1}
                />
                <Text
                    style={{
                        flex: 1,
                        color: Colors.common.lightGray,
                        fontSize: isIOS ? rw(26) : rw(24),
                        marginLeft: rw(12),
                    }}
                >
                    Search
                </Text>

                {/* Mic Icon */}
                <TouchableOpacity
                    onPress={handleMicButton}
                    style={{ marginRight: rw(20) }}
                >
                    <MicIcon
                        width={rw(29)}
                        height={rw(29)}
                        stroke={Colors.icon.active}
                        fill={Colors.icon.active}
                        strokeWidth={0}
                    />
                </TouchableOpacity>

                {/* Lens Icon */}
                <TouchableOpacity
                    onPress={handleLensButton}
                    style={{ marginRight: rw(10) }}
                >
                    <LensIcon
                        width={rw(26)}
                        height={rw(26)}
                        stroke={Colors.icon.active}
                        fill={Colors.icon.active}
                        strokeWidth={16}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})