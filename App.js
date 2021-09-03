import React from "react";
import { StyleSheet} from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/storeV2";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/navigation/tabs";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}
          <SafeAreaProvider>
            <Tabs />
          </SafeAreaProvider>
        {/* </KeyboardAvoidingView> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
