import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getRandomWittyString } from "./constants";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";

export async function sendPushNotification(expoPushToken, user) {
  const em =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;
  const message = {
    to: expoPushToken,
    sound: "default",
    title: `Welcome ${em}`,
    body: "Keep sorting to save Earth!",
    android: {
      icon: "notif-icon.png",
    },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      toast("Enable notifications to never miss the fun", {
        duration: 4000,
        position: ToastPosition.BOTTOM,
        styles: {
          view: { backgroundColor: "rgb(147, 0, 10)", borderRadius: 21 },
          text: { color: "rgb(255, 180, 171)" },
          pressable: { borderRadius: 21 },
        },
      });
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "7e55f24f-ba67-47e0-b5b0-d8a0ad40c829",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: getRandomWittyString("title"),
      body: getRandomWittyString("body"),
    },
    trigger: {
      seconds: 60 * 2,
    },
  });
}

export async function cancelMyNotifs() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
