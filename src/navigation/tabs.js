import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeSreen from '../screens/HomeSreen';
import LocationScreen from '../screens/LocationScreen';
import CodeScreen from '../screens/CodeScreen';
import ProfileScreen from '../screens/ProfileSccren';
import ScanScreen from '../screens/ScanScreen';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomeTabBarButton = ({children, onPress}) =>{
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...style.shadow
            }}
        >
            <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35, 
                  backgroundColor: '#01b1ac'
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle:{
                    // position: 'absolute',
                    // bottom: 25,
                    // left: 20,
                    // right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    shadowColor: '#000000',
                    // ...style.shadow
                }
                
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeSreen} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: "center", justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icon/bookmark.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height:25,
                                tintColor: focused? '#01b1ac' : '#748c94'
                            }}
                        />
                        {/* <Text
                            style={{
                                color: focused? '#01b1ac' : '#748c94',
                                fontSize: 12,
                                marginTop: 5
                            }}
                        >Home</Text> */}
                    </View>
                ),
            }} />
            <Tab.Screen name="LocationScreen" component={LocationScreen} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: "center", justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icon/pin.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height:25,
                                tintColor: focused? '#01b1ac' : '#748c94'
                            }}
                        />
                        {/* <Text
                            style={{
                                color: focused? '#01b1ac' : '#748c94',
                                fontSize: 12,
                                marginTop: 5
                            }}
                        >Location</Text> */}
                    </View>
                ),
            }}
            />
            <Tab.Screen name="ScanScreen" component={ScanScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/icon/qr-code-scan.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height:25,
                                tintColor: focused? '#ffffff' : '#ffffff',
                            }}
                        />
                    ),
                    tabBarButton: (props) =>(
                        <CustomeTabBarButton {...props} />
                    ),
                    tabBarStyle:{
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen name="CodeScreen" component={CodeScreen} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: "center", justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icon/qr-code.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height:25,
                                tintColor: focused? '#01b1ac' : '#748c94'
                            }}
                        />
                        {/* <Text
                            style={{
                                color: focused? '#01b1ac' : '#748c94',
                                fontSize: 12,
                                marginTop: 5
                            }}
                        >Home</Text> */}
                    </View>
                ),
            }}
            />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: "center", justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icon/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height:25,
                                tintColor: focused? '#01b1ac' : '#748c94'
                            }}
                        />
                        {/* <Text
                            style={{
                                color: focused? '#01b1ac' : '#748c94',
                                fontSize: 12,
                                marginTop: 5
                            }}
                        >Home</Text> */}
                    </View>
                ),
            }}
            />
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    shadow:{
        shadowColor: '#7f5df0',
        shadowOffset:{
            width:0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs