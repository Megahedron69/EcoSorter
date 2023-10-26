import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ChartBox } from "./Charts/ChartBox";
import { Settings } from "./Settings/Settings";
import { MapBox } from "./Maps/MapBox";
import { MainScreen } from "./MainScreen/MainScreen";
import { Scanner } from "./Scanner/Scanner";
import { useTheme } from "react-native-paper";

export default function BottomNav() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    button: {
      flex: 1,
      justifyContent: "center",
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      bottom: 30,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: "gray",
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 30,
      height: 30,
    },
  });
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Homez":
        icon = "md-home";
        break;
      case "Locate":
        icon = "compass-outline";
        break;
      case "Sort":
        icon = "scan-sharp";
        break;
      case "Chart":
        icon = "stats-chart-outline";
        break;
      case "Profile":
        icon = "person-outline";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={26}
        color={routeName === selectedTab ? colors.primary : "#9D9D9D"}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type="UP"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={75}
      circleWidth={52}
      bgColor={colors.inversePrimary}
      initialRouteName="Homez"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Sort")}
          >
            <Ionicons name={"scan-sharp"} color={"white"} size={26} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="Homez"
        position="LEFT"
        component={() => <MainScreen />}
      />
      <CurvedBottomBarExpo.Screen
        name="Locate"
        component={() => <MapBox />}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="Sort"
        component={() => <Scanner />}
        position="CIRCLE"
      />
      <CurvedBottomBarExpo.Screen
        name="Chart"
        component={() => <ChartBox />}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="Profile"
        component={() => <Settings />}
        position="RIGHT"
      />
    </CurvedBottomBarExpo.Navigator>
  );
}
