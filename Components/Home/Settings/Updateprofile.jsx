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
import * as Linking from "expo-linking";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { updateUserProfile } from "../../AuthComps/Auth";

export const UpdateModal = ({ route }) => {
  const { colors } = useTheme();
  const { scrName } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigation();
  const myName =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;

  const [text, setText] = useState({
    userName: "",
    displayUrl: "",
    gender: "",
    dob: "",
    phoneNo: "",
    genAv: false,
  });
  const handUpdate = () => {
    text.genAv
      ? setText({
          ...text,
          displayUrl: `https://api.multiavatar.com/${text.userName}.png`,
        })
      : null;
    updateUserProfile(
      user,
      text.userName,
      text.displayUrl
        ? text.displayUrl
        : `https://api.multiavatar.com/${myName}.png`,
      navigate,
      colors.errorContainer,
      colors.onErrorContainer,
      colors.primaryContainer,
      colors.onPrimaryContainer
    );
  };

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
            onPress={handUpdate}
            disabled={
              !text.userName || !text.phoneNo || text.phoneNo.length >= 10
            }
          >
            Update Profile
          </Button>
        </View>
      ) : null}
      {scrName === "About Us" ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            variant="headlineLarge"
            style={{ textAlign: "center", marginTop: 20 }}
            onPress={() =>
              Linking.openURL("https://github.com/Megahedron69/EcoSorter")
            }
          >
            Made with love using react native.Click on text to know more
          </Text>
        </View>
      ) : null}
      {scrName === "Privacy Policy" ? (
        <View>
          <Text
            variant="bodyMedium"
            style={{ textAlign: "justify", margin: 12 }}
          >
            Privacy Policy Effective Date: [Date] Welcome to [Your
            Company/Website] (the "Service"). We respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy is intended to help you understand how we collect, use,
            disclose, and safeguard your personal data. By using our Service,
            you agree to the terms and practices described in this Privacy
            Policy. 1. Information We Collect: We may collect various types of
            information, including but not limited to: - Personal Information:
            This may include your name, email address, postal address, phone
            number, and other information that identifies you personally. -
            Usage Data: We collect data about how you interact with our Service,
            such as the pages you visit, the features you use, and the actions
            you take. - Device Information: We gather information about the
            device you use to access our Service, such as the device type,
            operating system, and unique identifiers. - Log Data: Our servers
            automatically record information when you use our Service, including
            your IP address, browser type, and access times. 2. How We Use Your
            Information: We use the information we collect for various purposes,
            including: - Providing and maintaining the Service. - Personalizing
            your experience. - Improving our products and services. - Responding
            to your inquiries and requests. - Sending promotional and We may
            update this Privacy Policy to reflect changes to our information
            practices. We encourage you to periodically review this page for the
            latest information on our privacy practices. Contact Us: If you have
            any Queries
          </Text>
        </View>
      ) : null}
    </View>
  );
};
