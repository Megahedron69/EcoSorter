import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, LogBox } from "react-native";
import { getAuth } from "firebase/auth";
import {
  useTheme,
  Text,
  Avatar,
  Divider,
  List,
  Button,
} from "react-native-paper";
import Toggle from "react-native-toggle-input";
import { signOutUser } from "../../AuthComps/Auth";
import { useNavigation } from "@react-navigation/native";
export const Settings = () => {
  LogBox.ignoreAllLogs(true);
  const { colors } = useTheme();
  const navigate = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const myName =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;

  const [toggleD, setToggleD] = useState(true);
  const [toggleN, setToggleN] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        zIndex: -10,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primaryContainer,
          zIndex: 25,
          height: 294,
          borderBottomRightRadius: 22,
          borderBottomLeftRadius: 22,
        }}
      >
        <Text variant="headlineLarge" style={{ marginLeft: 20, marginTop: 20 }}>
          Settings
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: 379,
          height: 911,
          zIndex: 45,
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          margin: 16,
          marginTop: -216,
          borderRadius: 16,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
          elevation: 9,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 25,
            marginTop: 19,
            marginBottom: 9,
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: user.photoURL
                ? user.photoURL
                : `https://ui-avatars.com/api/?name=${myName}&bold=true&rounded=true`,
            }}
          />
          <Text style={{ marginLeft: 24 }} variant="headlineMedium">
            {myName}
          </Text>
        </View>
        <Divider style={{ marginTop: 9 }} bold={true} />
        <View
          style={{
            marginLeft: 25,
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ color: colors.onSurfaceDisabled }}
            variant="labelLarge"
          >
            Account Settings
          </Text>

          <List.Item
            title="Update Profile"
            titleStyle={{ marginLeft: -16 }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            titleStyle={{ marginLeft: -16 }}
            title="Change Password"
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            titleStyle={{ marginLeft: -16 }}
            title="Push Notifications"
            right={() => (
              <Toggle
                toggle={toggleN}
                circleColor={colors.tertiary}
                filled={true}
                color={colors.primary}
                setToggle={() => {
                  setToggleN(!toggleN);
                }}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            titleStyle={{ marginLeft: -16 }}
            right={() => (
              <Toggle
                toggle={toggleD}
                circleColor={colors.tertiary}
                filled={true}
                color={colors.primary}
                setToggle={() => {
                  setToggleD(!toggleD);
                }}
              />
            )}
          />
        </View>
        <Divider style={{ marginTop: 9 }} bold={true} />
        <View
          style={{
            marginLeft: 25,
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ color: colors.onSurfaceDisabled }}
            variant="labelLarge"
          >
            More
          </Text>

          <List.Item
            title="About Us"
            titleStyle={{ marginLeft: -16 }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            titleStyle={{ marginLeft: -16 }}
            title="Privacy Policy"
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>
        <View
          style={{
            marginTop: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            mode="contained"
            style={{
              padding: 6,
            }}
            labelStyle={{ fontSize: 19, fontWeight: 700 }}
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
            Sign Out
          </Button>
        </View>
      </View>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
    </View>
  );
};
