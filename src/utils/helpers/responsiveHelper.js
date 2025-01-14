import { Dimensions, Platform } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";


// Check for Platform
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Responsive Dimensions
const width = isAndroid ? 360 : 390; 
const screenWidth = width / 100;

export function rw(n) {
    return responsiveWidth(n / screenWidth);
}


export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;