import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper"; // Import useTheme
import { Button, Text } from "react-native-paper";
const Heloo = () => {
  const { colors } = useTheme(); // Access the current theme's colors

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text variant="displayLarge" style={{ color: colors.onBackground }}>
        Display Large
      </Text>
      <Button
        mode="contained" // This sets the button style automatically based on the theme
        onPress={() => console.log("Pressed")}
        buttonColor={colors.primary} // You can still override specific properties if needed
      >
        Hi sir how do
      </Button>
    </View>
  );
};

export default Heloo;
