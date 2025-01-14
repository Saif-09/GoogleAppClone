import React, { useState, useEffect } from "react";
import {
    Image,
    View,
    Modal,
    TouchableOpacity,
    Text,
} from "react-native";
import { rw } from "../../../utils/helpers/responsiveHelper"; 
import GoogleLabsIcon from "../../../assets/icons/svgs/GoogleLabsIcon";
import UserProfileIcon from "../../../assets/icons/svgs/UserProfileIcon";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import FastImage from 'react-native-fast-image'
import UserProfileModal from "./UserProfileModal";
import { Colors } from "../../../styles/colors";
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env'


const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    GoogleSignin.configure({
        iosClientId: IOS_CLIENT_ID, 
        webClientId: WEB_CLIENT_ID, 
    });

    useEffect(() => {
        console.log('User Info Updated:', userInfo);
    }, [userInfo]);

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo.data.user);
            setUserInfo(userInfo.data.user); 
            setModalVisible(false); 
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleGoogleSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (error) {
            console.log("Sign-Out Error:", error);
        }
    };


    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: rw(20),
                    paddingTop: rw(10),
                }}
            >
                <View style={{ marginTop: rw(8) }}>
                    <GoogleLabsIcon
                        width={rw(36)}
                        height={rw(36)}
                        stroke={Colors.common.blue}
                        fill={Colors.common.lightGray}
                    />
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {userInfo?.photo ? (
                        <>
                            <View
                                style={{
                                    width: rw(50),
                                    height: rw(50),
                                    borderRadius: rw(60),
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={require('../../../assets/images/googleCircle.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: rw(60),
                                    }}
                                />
                                <FastImage
                                    style={{
                                        width: rw(36),
                                        height: rw(36),
                                        borderRadius: rw(18),
                                        position: 'absolute',
                                    }}
                                    source={{
                                        uri: userInfo?.photo,
                                        headers: { Authorization: 'someAuthToken' },
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </View>
                        </>

                    ) : (
                        <View style={{marginTop:rw(8)}}>
                            <UserProfileIcon
                            width={rw(36)}
                            height={rw(36)}
                            stroke={Colors.common.blue}
                            fill={Colors.common.blue}
                        />
                        </View>
                        
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: rw(40),
                        width: rw(130),
                        height: rw(50),
                    }}
                >
                    <Image
                        source={require('../../../assets/images/googleLogo.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMethod="contain"
                    />
                </View>
            </View>

            <UserProfileModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                userInfo={userInfo}
                handleGoogleSignIn={handleGoogleSignIn}
                handleGoogleSignOut={handleGoogleSignOut}
            />
        </>
    );
};

export default Header;