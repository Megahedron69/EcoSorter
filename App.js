import { useCallback, useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LiquidSwipe from "./Components/IntroScreen/LiquidSwipe";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import lightTheme from "./Utilities/theme/lightTheme.json";
import darkTheme from "./Utilities/theme/darkTheme.json";
import Home from "./Components/Home/Home";
import SignIn from "./Components/AuthComps/SignIn";
import { getAuth } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { UpdateModal } from "./Components/Home/Settings/Updateprofile";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./Utilities/Notifs";
import { Leaderboard } from "./Components/Home/LeaderBoard/LeaderBoard";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
export default function App() {
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();
  const auth = getAuth();
  const user = auth.currentUser;
  const [authe, setAuthe] = useState("Onboarding");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (user) setAuthe("Home");
    else setAuthe("Onboarding");
  }, []);
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
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaProvider style={{ flex: 1 }}>
            <PaperProvider theme={paperTheme}>
              <BottomSheetModalProvider>
                <Stack.Navigator initialRouteName={authe}>
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
                    component={Home}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="Miscell"
                    options={{
                      header: ({ navigation }) => {
                        return null; // Hide the entire header
                      },
                      animation: "slide_from_right",
                    }}
                  >
                    {(props) => <UpdateModal {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="Leader"
                    options={{
                      header: ({ navigation }) => {
                        return null; // Hide the entire header
                      },
                      animation: "slide_from_bottom",
                    }}
                  >
                    {(props) => <Leaderboard {...props} />}
                  </Stack.Screen>
                </Stack.Navigator>
              </BottomSheetModalProvider>
              <Toasts />
            </PaperProvider>
            <StatusBar
              style="auto"
              barStyle={
                colorScheme === "dark" ? "light-content" : "dark-content"
              }
              animated={true}
              translucent={true}
              backgroundColor="transparent"
            />
          </SafeAreaProvider>
        </NavigationContainer>
      </QueryClientProvider>
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
