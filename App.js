import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LiquidSwipe from "./Components/IntroScreen/LiquidSwipe";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import lightTheme from "./Utilities/theme/lightTheme.json";
import darkTheme from "./Utilities/theme/darkTheme.json";
import Heloo from "./Components/Home/heloo";
import SignIn from "./Components/AuthComps/SignIn";
import { Toasts } from "@backpackapp-io/react-native-toast";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();

  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkTheme.colors }
      : { ...MD3LightTheme, colors: lightTheme.colors };

  const [fontsLoaded] = useFonts({
    "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
    "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
    "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
    "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
    "SFProRounded-Semibold": require("./assets/fonts/SFProRounded/SF-Pro-Rounded-Semibold.otf"),
    "SFProRounded-Medium": require("./assets/fonts/SFProRounded/SF-Pro-Rounded-Medium.otf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "GothamRounded-Medium": require("./assets/fonts/GothamRounded/GothamRounded-Medium.otf"),
    "GothamRounded-Bold": require("./assets/fonts/GothamRounded/GothamRounded-Bold.otf"),
    "GothamRounded-Light": require("./assets/fonts/GothamRounded/GothamRounded-Light.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  //'none' | 'simple_push' | 'slide_from_bottom' | 'slide_from_right' | 'slide_from_left'
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <SafeAreaProvider style={{ flex: 1 }}>
          <PaperProvider theme={paperTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="Onboarding"
                component={LiquidSwipe}
                options={{
                  header: ({ navigation }) => {
                    return null;
                  },
                }}
              />
              <Stack.Screen
                name="SignUp"
                options={{
                  header: ({ navigation }) => {
                    return null;
                  },
                  animation: "slide_from_right",
                }}
              >
                {(props) => <SignIn {...props} mode={"signUp"} />}
              </Stack.Screen>
              <Stack.Screen
                name="SignIn"
                options={{
                  header: ({ navigation }) => {
                    return null; // Hide the entire header
                  },
                  animation: "slide_from_left",
                }}
              >
                {(props) => <SignIn {...props} mode={"signIn"} />}
              </Stack.Screen>
              <Stack.Screen
                name="Home"
                options={{
                  header: ({ navigation }) => {
                    return null; // Hide the entire header
                  },
                  animation: "slide_from_bottom",
                }}
                component={Heloo}
              ></Stack.Screen>
            </Stack.Navigator>
            <Toasts />
          </PaperProvider>
          <StatusBar
            style="auto"
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            animated={true}
            translucent={true}
          />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
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
