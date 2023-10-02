import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import { signOutUser } from "../AuthComps/Auth";

const Heloo = ({ navigation }) => {
  const { colors } = useTheme();
  const signMeOut = () => {
    signOutUser(
      navigation,
      colors.primaryContainer,
      colors.onPrimaryContainer,
      colors.errorContainer,
      colors.onErrorContainer
    );
  };
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text variant="displayLarge" style={{ color: colors.onBackground }}>
        Display Large
      </Text>
      <Button
        mode="contained"
        onPress={() => signMeOut()}
        buttonColor={colors.primary}
      >
        Hi sir how do
      </Button>
    </View>
  );
};

export default Heloo;
