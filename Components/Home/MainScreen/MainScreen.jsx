import React from "react";
import { View, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { signOutUser } from "../../AuthComps/Auth";
import { useNavigation } from "@react-navigation/native";
export const MainScreen = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text style={{ color: colors.onBackground }}>MainScreen</Text>
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
      </Button>
    </View>
  );
};
