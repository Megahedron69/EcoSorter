import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
export const Scanner = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={{ color: colors.onBackground }}>Scanner</Text>
    </View>
  );
};
