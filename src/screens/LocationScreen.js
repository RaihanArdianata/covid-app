import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Maps from '../components/maps'

const LocationScreen = () => {
    return (
        <View style={styles.root}>
            <Maps/>
        </View>
    )
}

export default LocationScreen

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
