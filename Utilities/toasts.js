import { ToastAndroid } from "react-native";

export const showCustomToast = (
  message,
  type = "info",
  duration = 4000,
  backgroundColor = "blue",
  textColor = "white"
) => {
  ToastAndroid.show({
    type: type,
    text1: message,
    position: "bottom",
    visibilityTime: duration,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    customStyles: {
      backgroundColor: backgroundColor,
      color: textColor,
    },
  });
};
