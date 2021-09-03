import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView,{AnimatedRegion} from "react-native-maps";
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_APIKEY} from '@env'
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import {setDestination, setOrigin, selectOrigin } from "../../redux/slices/navSlice";

const Maps = ({}) => {
  const dispatch = useDispatch()
  const origin = useSelector(selectOrigin)
  const [initialRegion, setInitialRegion] = useState(null)
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setInitialRegion(location);
  //   })();
  // }, []);
  
  return (
    <View style={[{position:'relative'},tw`h-full`]}>
      <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,

        }}
        region={{
          latitude: origin?  origin.location.lat : 37.78825,
          longitude: origin? origin.location.lng: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={[{position: "absolute"}, tw`w-11/12 m-5`]}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          styles={{
            container:{
              flex: 0,
              zIndex: 999999,
            },
            textInput:{
              fontSize:18
            }
          }}
          onPress={(data, details=null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOGLE_APIKEY,
            language: 'ID',
          }}
        />
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({});
