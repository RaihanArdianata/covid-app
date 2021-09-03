import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import ProgressCircle from "react-native-progress-circle";

const Hv = ({ data, idImage, faceImage }) => {
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
        }}
      >
        <Image
          source={
            faceImage
              ? { uri: faceImage.uri }
              : require("../../assets/image/empty-photo.png")
          }
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
        {/* <Image
          source={
            idImage
              ? { uri: idImage.uri }
              : require("../../assets/image/empty-photo.png")
          }
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        /> */}
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text style={[tw`py-5`]}>Match Score</Text>
          <ProgressCircle
            percent={data.faceExtract.result.match_score || 0}
            radius={50}
            borderWidth={8}
            color="#01b1ac"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>
              {data.faceExtract.result.match_score + "%" || 0 + "%"}
            </Text>
          </ProgressCircle>
        </View>
        <View
          style={[
            {
              display: "flex",
              // justifyContent: "center",
            //   alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#01b1ac",
              height: 180,
              borderRadius: 20,
              padding: 15,
            marginBottom: 50
            },
            tw`w-5/6 mt-5`,
          ]}
        >
          <View style={[tw`text-white`,{display: 'flex', justifyContent:'center', flexDirection: 'column'}]}>
            <Text style={[tw`text-sm text-white`]}>
              NIK : {data.idExtract.result[0].details.id.value || ""}
            </Text>
            <View style={[tw`py-1`]}>
              <Text style={[tw`text-xs text-white`]}>
                Name : {data.idExtract.result[0].details.name.value || ""}
              </Text>
              <Text style={[tw`text-xs text-white`]}>
                Date of Birth :{" "}
                {data.idExtract.result[0].details.dob.value || ""}
              </Text>
              <Text style={[tw`text-xs text-white`]}>
                Gender : {data.idExtract.result[0].details.gender.value || ""}
              </Text>
              {/* <Text style={[tw`text-xs text-white`]}>Address : {data.idExtract.result[0].details.id.value || ''}</Text> */}
              <Text style={[tw`text-xs text-white`]}>
                Religion :{" "}
                {data.idExtract.result[0].details.religion.value || ""}
              </Text>
              <Text style={[tw`text-xs text-white`]}>
                Profession : {data.idExtract.result[0].details.work.value || ""}
              </Text>
              <Text style={[tw`text-xs text-white`]}>
                Citizenship :{" "}
                {data.idExtract.result[0].details.citizenship.value || ""}
              </Text>
            </View>
          </View>
          <View style={[tw`mt-5`]}>
            <Image
              source={
                idImage
                  ? { uri: idImage.uri }
                  : require("../../assets/image/empty-photo.png")
              }
              resizeMode="contain"
              style={{
                width: 55,
                height: 55,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Hv;

const styles = StyleSheet.create({
  textOverflow: {},
});
