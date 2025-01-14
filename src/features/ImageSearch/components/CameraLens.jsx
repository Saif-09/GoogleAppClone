import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const CameraLens = () => {
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <View style={[styles.focusBox,{top: windowHeight / 5.5,}]}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusBox: {
        width: 250, 
        height: 250,
        alignSelf: 'center',
        position: 'absolute',
    },
    corner: {
        position: 'absolute',
        width: 30, 
        height: 5,
        backgroundColor: 'white',
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopLeftRadius: 24, 
    },
    topRight: {
        top: 0,
        right: 0,
        transform: [{ rotate: '90deg' }],
        borderTopRightRadius: 24,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        transform: [{ rotate: '270deg' }],
        borderBottomLeftRadius: 24,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        transform: [{ rotate: '180deg' }],
        borderBottomRightRadius: 24,
    },
});

export default CameraLens;