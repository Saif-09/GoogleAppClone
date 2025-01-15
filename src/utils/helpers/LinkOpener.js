import { Linking } from "react-native";

export const openURL = async (url) => {
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