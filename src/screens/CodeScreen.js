import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from 'expo-barcode-scanner';

const CodeScreen = () => {
  const [imageCamera, setImageCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async (type) => {
    await setisLoadingCamera(true);
    if (camera) {
      const options = { base64: true };
      let photo = await camera.takePictureAsync();
      setImageCamera(photo);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.root}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ratio={"16:9"}
        barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleBarCodeScanned}
      >
      </Camera>
    </View>
  );
};

export default CodeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // backgroundColor: "#ffffff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
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
});
