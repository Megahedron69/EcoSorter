import { View } from "react-native";
import React, { useState } from "react";
import {
  useTheme,
  Avatar,
  Text,
  TextInput,
  Checkbox,
  Button,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";

export const UpdateModal = ({ route }) => {
  const { colors } = useTheme();
  const { scrName } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const [text, setText] = useState({
    userName: "",
    displayUrl: "",
    gender: "",
    dob: "",
    phoneNo: "",
    genAv: false,
  });
  const myName =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;
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
          borderBottomRightRadius: 42,
          borderBottomLeftRadius: 42,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {scrName === "Update" ? (
          <View style={{ display: "flex" }}>
            <Avatar.Image
              size={128}
              source={{
                uri: user.photoURL
                  ? user.photoURL
                  : `https://ui-avatars.com/api/?name=${myName}&bold=true&rounded=true`,
              }}
            />
            <Text
              variant="titleLarge"
              style={{
                textAlign: "center",
                marginTop: 7,
                fontWeight: 700,
                fontSize: 23,
              }}
            >
              {myName}
            </Text>
          </View>
        ) : (
          <Text variant="displayMedium">{scrName}</Text>
        )}
      </View>
      {scrName == "Update" ? (
        <View
          style={{
            marginTop: 10,
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TextInput
            value={text.userName}
            label={"Display Name"}
            mode="outlined"
            autoComplete="username"
            inputMode="text"
            autoCapitalize="none"
            onChangeText={(userName) => {
              setText({ ...text, userName });
            }}
            defaultValue={user.displayName ? user.displayName : myName}
            placeholder={"Set a display name"}
            style={{
              width: 315,
              height: 55,
            }}
          />
          <TextInput
            value={text.phoneNo}
            label={"Phone Number"}
            mode="outlined"
            autoComplete="tel"
            inputMode="tel"
            onChangeText={(phoneNo) => {
              setText({ ...text, phoneNo });
            }}
            defaultValue={user.displayName ? user.displayName : myName}
            placeholder={"Enter your phone Number"}
            style={{
              width: 315,
              height: 55,
              marginTop: 20,
            }}
            keyboardType="phone-pad"
            maxLength={12}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              margin: 16,
              padding: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Checkbox
                status={text.genAv ? "checked" : "unchecked"}
                onPress={() => {
                  setText({ ...text, genAv: !text.genAv });
                }}
              />
              <Text variant="labelMedium" style>
                Generate Unique Avatar
              </Text>
            </View>
          </View>
          <Button
            mode="contained"
            style={{
              padding: 6,
            }}
            buttonColor={colors.secondary}
            labelStyle={{ fontSize: 19, fontWeight: 700 }}
          >
            Update Profile
          </Button>
        </View>
      ) : null}
      {scrName === "About" ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text>EcoSorter is a minor project whose entire </Text>
        </View>
      ) : null}
    </View>
  );
};
