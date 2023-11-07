import React from "react";
import { View, Button, Text } from "react-native";

const SButton = (props) => {
  const { children, visible = true } = props;

  if (!visible) {
    return <></>;
  }

  return (
    <View
      style={{ display: "flex", alignItems: "centre", flexDirection: "row" }}
    >
      <Button {...props} style={{ backgroundColor: "#26292E", marginTop: 20 }}>
        <Text style={{ color: "white" }}>{children}</Text>
      </Button>
    </View>
  );
};

export default SButton;
