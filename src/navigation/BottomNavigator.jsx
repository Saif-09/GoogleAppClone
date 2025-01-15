import React from 'react';
import { View } from 'react-native';
import { isIOS, rw } from '../utils/helpers/responsiveHelper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeScreen,
    SearchScreen,
    NotificationsScreen,
    OptionsScreen,
} from '../features/Home/screens';
import {
    HomeIcon,
    SearchIcon,
    NotificationIcon,
    OptionsIcon,
} from '../assets/icons/svgs';


const Tab = createBottomTabNavigator();

function BottomNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let Icon;

                    if (route.name === 'Home') {
                        Icon = HomeIcon;
                    } else if (route.name === 'Search') {
                        Icon = SearchIcon;
                    } else if (route.name === 'Notifications') {
                        Icon = NotificationIcon;
                    } else if (route.name === 'Options') {
                        Icon = OptionsIcon;
                    }

                    return (
                        <View style={{
                            backgroundColor: focused ? 'rgba(66, 133, 244, 0.2)' : 'transparent',
                            padding: 10,
                            paddingHorizontal:22,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon width={28} height={28} stroke={color} fill={focused ? color : 'gray'} />
                        </View>
                    );
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#8db2f8',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#303134',
                    borderTopWidth: 0,
                    height: isIOS ? rw(80) : rw(54),
                    paddingVertical: 8,
                    paddingHorizontal:4,
                    paddingTop:10,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Options" component={OptionsScreen} />
        </Tab.Navigator>
    );
}

export default BottomNavigator;