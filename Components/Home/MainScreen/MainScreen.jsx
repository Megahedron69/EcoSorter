import React from "react";
import { Image, View, LogBox } from "react-native";
import { Surface, useTheme, Text, IconButton } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AppleHeader from "react-native-apple-header";
import Index from "./Carousel";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export const MainScreen = () => {
  const { colors } = useTheme();
  LogBox.ignoreAllLogs();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigation();
  const myName =
    user.displayName == null
      ? user.email.split("@")[0].charAt(0).toUpperCase() +
        user.email.split("@")[0].slice(1)
      : user.displayName;
  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <AppleHeader
          dateTitle={"Welcome Back,"}
          largeTitle={`${myName}`}
          imageSource={{
            uri: user.photoURL
              ? user.photoURL
              : `https://ui-avatars.com/api/?name=${myName}&bold=true&rounded=true`,
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
            paddingBottom: 30,
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
      </View>
      <View>
        <Index />
      </View>
      <View
        style={{
          width: 357,
          height: 369,
          margin: 30,
          marginTop: -56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Surface
          elevation={5}
          style={{
            width: 355,
            height: 367,
            borderRadius: 18,
            position: "absolute",
            zIndex: 6,
            overflow: "hidden",
          }}
        >
          <IconButton
            icon={"chevron-right-circle"}
            size={32}
            iconColor="#81ca55"
            style={{ top: 10, left: 290, zIndex: 7 }}
            onPress={() => {
              navigate.navigate("Leader");
            }}
          />
          <View
            style={{
              marginLeft: 37,
              marginTop: 36,
              marginRight: 112,
              width: 186,
              height: 106,
              zIndex: 5,
            }}
          >
            <Text
              style={{
                color: colors.onSurface,
                fontSize: 32,
                fontWeight: 700,
                textAlign: "left",
                marginTop: -15,
              }}
              variant="headlineSmall"
              numberOfLines={4}
            >
              Compete globally by sorting waste
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/leaderboard/intVec.png")}
            style={{
              position: "relative",
              transform: [{ rotate: "-15deg" }],
              width: 302,
              height: 270,
              bottom: 60,
              right: -38,
            }}
          />
        </Surface>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Surface
            style={{
              display: "flex",
              width: 173,
              height: 148,
              borderRadius: 18,
              marginLeft: 22,
              marginBottom: 15,
              marginRight: 18,
            }}
            elevation={5}
          >
            <View style={{ padding: 15 }}>
              <Text
                variant="titleMedium"
                numberOfLines={4}
                style={{ fontWeight: 700, fontSize: 21, textAlign: "auto" }}
              >
                Let Professionals handle your waste
              </Text>
            </View>
            <IconButton
              icon={"chevron-right-circle"}
              size={32}
              iconColor="#81ca55"
              style={{ bottom: 30, left: 115 }}
              onPress={() => {
                navigate.navigate("Locate");
              }}
            />
          </Surface>
          <Surface
            style={{
              display: "flex",
              width: 173,
              height: 148,
              borderRadius: 18,
              marginLeft: 22,
              marginBottom: 12,
              marginRight: 18,
            }}
            mode="elevated"
            elevation={5}
          >
            <View style={{ padding: 15 }}>
              <Text
                variant="titleMedium"
                numberOfLines={4}
                style={{ fontWeight: 700, fontSize: 20, textAlign: "auto" }}
              >
                Detailed garbage insights at your fingertips
              </Text>
            </View>
            <IconButton
              icon={"chevron-right-circle"}
              size={32}
              iconColor="#81ca55"
              style={{ bottom: 30, left: 115 }}
              onPress={() => {
                navigate.navigate("Chart");
              }}
            />
          </Surface>
        </View>
        <Surface
          style={{
            width: 155,
            height: 311,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            backgroundColor: colors.primaryContainer,
            borderRadius: 18,
            marginRight: 22,
            padding: 27,
          }}
          mode="elevated"
          elevation={5}
        >
          <Text
            variant="headlineLarge"
            style={{ fontWeight: 800, fontSize: 37 }}
          >
            8
          </Text>
          <Text variant="titleSmall" style={{ marginTop: -17 }}>
            Categories
          </Text>
          <Text
            variant="headlineLarge"
            style={{ fontWeight: 800, fontSize: 37 }}
          >
            1
          </Text>
          <Text variant="titleSmall" style={{ marginTop: -17 }}>
            Earth
          </Text>
          <Text
            variant="headlineLarge"
            style={{ fontWeight: 800, fontSize: 37 }}
          >
            <FontAwesome5 name="infinity" size={37} color={colors.onSurface} />
          </Text>
          <Text variant="titleSmall" style={{ marginTop: -17 }}>
            Solutions
          </Text>
        </Surface>
      </View>
      <View
        style={{
          flex: 1,
          height: 150,
        }}
      ></View>
    </ScrollView>
  );
};
