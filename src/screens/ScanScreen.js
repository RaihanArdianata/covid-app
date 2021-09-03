import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Overlay } from "react-native-elements";
import { Camera } from "expo-camera";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import {
  RESULT_MATCHING,
} from "../services/hyperverge-service/hv_service";
import {
  selectHvLoading,
  selectResultMatching,
  selectErrorMsg
} from "../redux/hyperverge/selector";
import {setHvLoading, setResultMatching, setErrorMsg} from "../redux/hyperverge/actions"
import { useDispatch, useSelector } from "react-redux";
import { _cropImage, _photoURItoFormData } from "../helpers";
import Hv from "../components/hv";

const ScanScreen = () => {
  const dispatch = useDispatch();
  const resultMatching = useSelector(selectResultMatching);
  const hvLoading = useSelector(selectHvLoading);
  const errorMsg = useSelector(selectErrorMsg);

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(false);
  const [camera, setCamera] = useState(null);
  const [frame, setFrame] = useState(true);
  const [isLoadingCamera, setisLoadingCamera] = useState(false);
  const [imageCamera, setImageCamera] = useState({
    faceImage: null,
    IDCard: null,
  });
  const [visible, setVisible] = useState(false);
  const [visibleHvData, setVisibleHvData] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async (type) => {
    await setisLoadingCamera(true)
    if (camera) {
      const options = { base64: true };
      let photo = await camera.takePictureAsync();
      switch (type) {
        case 1:
          setImageCamera({
            ...imageCamera,
            IDCard: await _cropImage(photo),
          });
          return setisLoadingCamera(false)
        case 2:
          setImageCamera({ ...imageCamera, faceImage: photo });
          return setisLoadingCamera(false)
        default:
          return;
      }
    }
  };

  const matchingData = async (payload) => {
    await dispatch(setHvLoading(true));
    await RESULT_MATCHING({
      idImage: _photoURItoFormData(payload, 1),
      faceImage: _photoURItoFormData(payload, 2),
    });
    dispatch(setHvLoading(false));
  };

  const reset = async () => {
    await dispatch(setHvLoading(false));
    await dispatch(setResultMatching(null));
    await setImageCamera({
      ...imageCamera,
      IDCard: null,
      faceImage: null,
    });
    await dispatch(setErrorMsg(null))
    await setisLoadingCamera(false)
  };

  return (
    <View style={[styles.root, { position: "relative" }]}>
      <Overlay
        isVisible={visibleHvData}
        overlayStyle={[
          { borderRadius: 10, backgroundColor: "#ffffff" },
          tw`h-5/6	 w-11/12	`,
        ]}
        onBackdropPress={() => setVisibleHvData(!visibleHvData)}
      >
        <Hv
          data={resultMatching}
          idImage={imageCamera.IDCard}
          faceImage={imageCamera.faceImage}
        ></Hv>
      </Overlay>
      <Overlay
        isVisible={visible}
        overlayStyle={[{ borderRadius: 10 }, tw`h-5/6	 w-11/12`]}
        onBackdropPress={() => setVisible(!visible)}
      >
        <ScrollView
          style={[{ flex: 1 }, tw`w-full	h-4/5	py-10`]}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[{ fontWeight: "bold" }]}>ID Card</Text>
          <Image
            source={
              imageCamera.IDCard
                ? { uri: imageCamera.IDCard.uri }
                : require("../assets/image/empty-photo.png")
            }
            resizeMode="contain"
            style={{
              width: 250,
              height: 250,
            }}
          />
          <Text style={[{ fontWeight: "bold" }]}>Face</Text>
          <Image
            source={
              imageCamera.faceImage
                ? { uri: imageCamera.faceImage.uri }
                : require("../assets/image/empty-photo.png")
            }
            resizeMode="contain"
            style={{
              width: 250,
              height: 250,
            }}
          />
        </ScrollView>
      </Overlay>
      {hasPermission ? (
        <Camera
          style={[styles.camera, tw`h-5/6`]}
          type={type ? Camera.Constants.Type.front : Camera.Constants.Type.back}
          ratio={"16:9"}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={[styles.cameraContainer]}>
            <View
              style={[
                tw`w-full`,
                { display: "flex", flexDirection: "row-reverse" },
              ]}
            >
              <TouchableOpacity
                style={{ right: 0 }}
                onPress={() => {
                    reset()
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "HomeScreen" }],
                    })
                  }
                }
              >
                <Image
                  source={require("../assets/icon/close.png")}
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: "#ffffff",
                    marginTop: StatusBar.currentHeight,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={[tw`w-full`]}>
              <View style={[frame ? styles.cardFrame : "", tw`h-3/5`]}></View>
            </View>
            <View
              style={[
                tw`w-full`,
                {
                  display: "flex",
                  flexDirection: "row",
                  bottom: 20,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                },
              ]}
            >
              <TouchableOpacity
                style={{ right: 0 }}
                onPress={() => setType(!type)}
              >
                <Image
                  source={require("../assets/icon/flip.png")}
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: "#ffffff",
                    marginTop: StatusBar.currentHeight,
                  }}
                />
              </TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <TouchableOpacity
                  style={{ right: 0 }}
                  onPress={() => setVisible(!visible)}
                >
                  <Image
                    source={require("../assets/icon/visibility.png")}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: "#ffffff",
                      marginTop: StatusBar.currentHeight,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ right: 0 }}
                  onPress={() => setFrame(!frame)}
                >
                  <Image
                    source={
                      frame
                        ? require("../assets/icon/forbidden.png")
                        : require("../assets/icon/frame.png")
                    }
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: "#ffffff",
                      marginTop: StatusBar.currentHeight,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      ) : (
        <View style={[styles.emptyContainer, tw`h-5/6`]}>
          <Text>No access to camera</Text>
        </View>
      )}
      <View
        style={[
          {
            backgroundColor: "#ffffff",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            position: "absolute",
            bottom: 0,
            height: "20%",
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          },
          tw`w-full flex `,
        ]}
      >
        <View
          style={[
            {
              backgroundColor: "#ffffff",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              bottom: 0,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            },
            tw`w-full flex `,
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              resultMatching || hvLoading || isLoadingCamera? null : takePicture(1)
            }
            style={[
              tw`h-10	w-2/6`,
              imageCamera.IDCard ? styles.success : styles.failed,
              {
                borderRadius: 10,
              },
            ]}
          >
            <Image
              source={isLoadingCamera? require("../assets/icon/92.gif") : require("../assets/icon/idcard.png")}
              resizeMode="contain"
              style={{
                width: 18,
                height: 18,
                tintColor: "#ffffff",
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontWeight: "bold", fontSize: 18, color: "#ffffff" }}
            >
              ID Card
            </Text>
          </TouchableOpacity>
          <View
            style={[
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                resultMatching &&
                imageCamera.IDCard &&
                imageCamera.faceImage &&
                !hvLoading
                  ? setVisibleHvData(!visibleHvData)
                  : imageCamera.IDCard && imageCamera.faceImage && !hvLoading
                  ? matchingData(imageCamera)
                  : null
              }
              style={[
                {
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  top: -50,
                },
                styles.shadow,
                imageCamera.IDCard && imageCamera.faceImage
                  ? styles.success
                  : styles.failed,
              ]}
            >
              <Animated.Image
                source={
                  resultMatching && imageCamera.IDCard && imageCamera.faceImage
                    ? require("../assets/icon/file.png")
                    : hvLoading
                    ? require("../assets/icon/92.gif")
                    : imageCamera.IDCard && imageCamera.faceImage
                    ? require("../assets/icon/check.png")
                    : require("../assets/icon/close.png")
                }
                resizeMode="contain"
                style={[
                  {
                    width: 35,
                    height: 35,
                    tintColor: "#ffffff",
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ top: -40 }}
              onPress={() => (hvLoading ? null : reset())}
            >
              <Text style={{ color: "#cb2027" }}>Reset</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              resultMatching || hvLoading || isLoadingCamera? null : takePicture(2)
            }
            style={[
              tw`h-10	w-2/6`,
              {
                borderRadius: 10,
              },
              imageCamera.faceImage ? styles.success : styles.failed,
            ]}
          >
            <Image
              source={isLoadingCamera?require("../assets/icon/92.gif"):  require("../assets/icon/user-images.png")}
              resizeMode="contain"
              style={{
                width: 18,
                height: 18,
                tintColor: "#ffffff",
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontWeight: "bold", fontSize: 18, color: "#ffffff" }}
            >
              Face
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{color :"#cb2027"}}>
          {
            errorMsg? errorMsg.error : ''
          }
        </Text>
        <Text>
          Make sure the object is{" "}
          <Text style={{ color: "#01b1ac", fontWeight: "bold" }}>clear</Text>{" "}
          with{" "}
          <Text style={{ color: "#01b1ac", fontWeight: "bold" }}>
            good lighting
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  camera: {
    // flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    // backgroundColor: "black",
    flexDirection: "column",
    margin: 20,
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  cardFrame: {
    width: "100%",
    height: "40%",
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
  faceFrame: {
    width: "100%",
    height: "65%",
    borderColor: "#ffffff",
    // borderWidth: 1,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  success: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#01b1ac",
  },
  failed: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#cb2027",
  },
  empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    color: "#01b1ac",
    borderColor: "#01b1ac",
    borderWidth: 1,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffdd1e",
  },
});
