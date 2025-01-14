import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';

const AnimatedDots = ({ isListening }) => {
    const [dotAnimation] = useState(new Animated.Value(0));

    const startDotAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(dotAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(dotAnimation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        if (isListening) {
            startDotAnimation();
        }
    }, [isListening]);

    const dotColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

    return (
        <View style={styles.dotsContainer}>
            {[...Array(4)].map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            backgroundColor: dotColors[index],
                            opacity: dotAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.5],
                            }),
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = {
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
};

export default AnimatedDots;