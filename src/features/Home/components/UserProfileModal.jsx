// UserProfileModal.js
import React from "react";
import {
    View,
    Modal,
    TouchableOpacity,
    Text,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from 'react-native-fast-image';
import { rw } from "../../../utils/helpers/responsiveHelper"; 
import { Colors } from "../../../styles/colors";

const UserProfileModal = ({ modalVisible, setModalVisible, userInfo, handleGoogleSignIn, handleGoogleSignOut }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.background.overlay,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: 10,
                        width: "90%",
                        padding: 20,
                        alignItems: "flex-start",
                    }}
                >
                    {/* Close Button */}
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            padding: 10,
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <MaterialIcons name="close" size={24} color={Colors.common.white} />
                    </TouchableOpacity>

                    {/* Modal Title */}
                    <Text
                        style={{
                            color: Colors.common.white,
                            fontSize: rw(24),
                            fontWeight: "bold",
                            marginBottom: rw(30),
                            alignSelf: "center",
                        }}
                    >
                        Google
                    </Text>

                    {/* Sign In Button */}
                    {userInfo?.name ? (
                        <>
                            <View style={{ alignItems: "center", marginBottom: 20, flexDirection: 'row', gap: rw(20), alignItems: 'center', }}>
                                <FastImage
                                    style={{
                                        width: rw(50),
                                        height: rw(50),
                                        borderRadius: rw(25),
                                    }}
                                    source={{
                                        uri: userInfo?.photo,
                                        priority: FastImage.priority.high,
                                    }}
                                />
                                <View style={{ justifyContent: 'center', marginBottom: rw(10), width: '54%', }}>
                                    <Text
                                        style={{
                                            color: Colors.common.white,
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginTop: 10,
                                        }}
                                    >
                                        {userInfo?.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#ccc",
                                            fontSize: 14,
                                            marginTop: 5,
                                        }}
                                    >
                                        {userInfo?.email}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={handleGoogleSignOut}
                                    style={{ paddingHorizontal: rw(10), backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', paddingVertical: rw(4), borderRadius: rw(6), position: 'absolute', right: rw(-80) }}>
                                    <Text style={{ fontSize: 12, color: "#333" }}>Sign out</Text>
                                </TouchableOpacity>

                            </View>
                        </>
                    ) : (<TouchableOpacity
                        onPress={handleGoogleSignIn}
                        style={{
                            backgroundColor: "#4285F4",
                            padding: 15,
                            borderRadius: 5,
                            marginBottom: 20,
                            width: "34%",
                            alignItems: "center",
                            alignSelf: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontSize: rw(14),
                                textAlign: "center",
                            }}
                        >
                            Sign in
                        </Text>
                    </TouchableOpacity>)}

                    {/* Menu Options */}
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                        }}
                    >
                        <Icons
                            name="incognito"
                            size={24}
                            color={Colors.common.white}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: Colors.common.white, fontSize: 16 }}>
                            Turn on Incognito
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                        }}
                    >
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={Colors.common.white}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: Colors.common.white, fontSize: 16 }}>
                            SafeSearch
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            backgroundColor: "#555",
                            width: "100%",
                            marginVertical: 10,
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                        }}
                    >
                        <MaterialIcons
                            name="settings"
                            size={24}
                            color={Colors.common.white}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: Colors.common.white, fontSize: 16 }}>
                            Settings
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                        }}
                    >
                        <MaterialIcons
                            name="feedback"
                            size={24}
                            color={Colors.common.white}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: Colors.common.white, fontSize: 16 }}>
                            Help and Feedback
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            backgroundColor:Colors.background.sectionDivider,
                            width: "100%",
                            marginVertical: 10,
                        }}
                    />

                    {/* Footer Links */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Text style={{ color: "#888", fontSize: rw(12) }}>
                            Privacy Policy
                        </Text>
                        <Text style={{ color: "#888", fontSize: rw(12) }}>
                            Terms of Service
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default UserProfileModal;