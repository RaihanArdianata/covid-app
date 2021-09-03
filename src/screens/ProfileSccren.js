import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Switch } from "react-native-elements";
import SwitchComponents from "../components/switch";

const ProfileScreen = () => {
  const [showLocation, setShowLocation] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  return (
    <ScrollView
      style={[styles.root]}
      contentContainerStyle={{
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <View
        style={[
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          },
          tw`my-10`,
        ]}
      >
        <Image
          source={require("../assets/image/qr-code.png")}
          style={[
            {
              height: 200,
              width: 200,
            },
          ]}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={[tw`font-bold	`]}>Share my code </Text>
          <Image
            source={require("../assets/icon/share.png")}
            style={[
              {
                height: 20,
                width: 20,
              },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: "#e3e6f0",
          paddingLeft: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text style={[tw`text-base`, { color: "#b5bac4" }]}>Settings</Text>
      </View>
      <View style={[tw`my-5`, { paddingLeft: 20, paddingRight: 20,display: 'flex', justifyContent: 'center', flexDirection: 'column'}]}>
        <SwitchComponents switchVal={showLocation} switchAction={setShowLocation} title={'Location'} icon={require('../assets/icon/gps.png')} />
        <SwitchComponents switchVal={showStatus} switchAction={setShowStatus} title={'Status'} icon={require('../assets/icon/cardiogram.png')} />
        <SwitchComponents title={'Faq'} icon={require('../assets/icon/faq.png')} useSwitch={false} />
      </View>
      <Text style={[tw`text-base`, { color: "#000000", marginLeft: 20}]}>About The App</Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#ffffff",
  },
});
