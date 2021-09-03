import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Maps from '../components/maps'

const HomeSreen = () => {
    return (
        <KeyboardAvoidingView
        behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        <SafeAreaView >
            <View style={{position: 'relative'}}>
                <Maps />
                <View style={[{
                        backgroundColor: "#ffffff", 
                        borderTopRightRadius: 20, 
                        borderTopLeftRadius: 20, 
                        position: 'absolute',
                        paddingTop: 20,
                        bottom: 0,
                        },tw`w-full h-2/5 flex `]}>
                    <ScrollView style={[{
                        },tw`w-full flex`]}>
                        <View style={tw`mx-10`}>
                            <Text style={[tw`text-base text-black font-bold leading-6 tracking-wider`]}>
                                My address
                            </Text>
                            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={[{backgroundColor: 'white', borderRadius: 10},tw`w-full h-12 flex px-5 items-center flex-row mt-5`,styles.shadow]}>
                                    <Image
                                        source={require('../assets/icon/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 18,
                                            height:18,
                                            tintColor: '#01b1ac' 
                                        }}
                                    />
                                    <Text style={[{}, tw`flex-grow px-5 `]} >Home</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={tw`mx-10 my-10`}>
                            <Text style={[tw`text-base text-black font-bold leading-6 tracking-wider`]}>
                                Other
                            </Text>
                            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={[{backgroundColor: 'white', borderRadius: 10},tw`w-full h-12 flex px-5 items-center flex-row`,styles.shadow]}>
                                    <Image
                                        source={require('../assets/icon/add.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 18,
                                            height:18,
                                            tintColor: '#01b1ac' 
                                        }}
                                    />
                                    <Text style={[{color: '#01b1ac'}, tw`flex-grow px-5 `]} >Add address</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default HomeSreen

const styles = StyleSheet.create({
    root:{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor:'#ffffff'
    },
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
