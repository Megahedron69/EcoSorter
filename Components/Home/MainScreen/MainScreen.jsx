import React from "react";
import { View, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { signOutUser } from "../../AuthComps/Auth";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AppleHeader from "react-native-apple-header";
export const MainScreen = () => {
  const { colors } = useTheme();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigation();
  const myName =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <AppleHeader
        dateTitle={"Welcome Back,"}
        largeTitle={`${myName}`}
        imageSource={{
          uri: `https://ui-avatars.com/api/?name=${myName}&bold=true&rounded=true`,
        }}
        style={{
          backgroundColor: colors.surface,
          color: colors.onPrimaryContainer,
          right: 15,
          padding: 20,
          borderBottomLeftRadius: 17,
          borderBottomRightRadius: 17,
          borderBottomWidth: 0,
          width: "100%",
          shadowColor: colors.inverseSurface,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 17,
        }}
        dateTitleTextStyle={{
          color: colors.onSurface,
        }}
        largeTitleTextStyle={{
          color: colors.onSurface,
          textAlign: "center",
        }}
        onPress={() => {
          navigate.navigate("Profile");
        }}
      />

      {/* <Text style={{ color: colors.onBackground }}>MainScreen</Text>
      <Button
        onPress={() => {
          const signMeOut = () => {
            signOutUser(
              navigate,
              colors.primaryContainer,
              colors.onPrimaryContainer,
              colors.errorContainer,
              colors.onErrorContainer
            );
          };
          signMeOut();
        }}
      >
        SignOut
      </Button> */}
    </View>
  );
};
