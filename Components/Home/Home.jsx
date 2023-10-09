import { useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Button, Text, BottomNavigation } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "./BottomNavBar";

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <BottomNav />
    </SafeAreaView>
  );
};

export default Home;
