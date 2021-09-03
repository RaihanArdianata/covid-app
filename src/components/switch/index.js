import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Switch } from "react-native-elements";

const SwitchComponents = ({switchVal=false, switchAction=() => {}, icon, title="Test App", useSwitch=true}) => {
  return (
    <View
      style={[
        {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        tw`mt-10`,
      ]}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={icon?icon : require('../../assets/icon/gps.png')}
          style={[
            {
              height: 24,
              width: 24,
              marginRight: 10,
            },
          ]}
        />
        <Text style={[tw`text-base font-bold`]}>{title}</Text>
      </View>
      {
          useSwitch?
          <Switch
            value={switchVal}
            color="#01b1ac"
            style={{}}
            onChange={() => switchAction(!switchVal)}
          />
          :
          null
      }
    </View>
  );
};

export default SwitchComponents;

const styles = StyleSheet.create({});
