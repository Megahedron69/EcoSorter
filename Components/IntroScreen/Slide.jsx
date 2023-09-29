import { useState, useEffect } from "react";
import Color from "color";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "SFProDisplay-Bold",
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "SFProDisplay-Regular",
  },
});

const Slide = ({ slide: { picture, color, title, description, button } }) => {
  const lighterColor = Color(color).lighten(0.8).toString();
  const navigation = useNavigation();
  const [butState, setbutState] = useState(button);
  useEffect(() => {
    if (button) {
      const timer = setTimeout(() => {
        navigation.navigate("SignUp");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigation]);
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <LottieView source={picture} autoPlay loop style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {button ? (
          <Button
            style={{ backgroundColor: "rgb(120, 220, 119)" }}
            mode={"elevated"}
            labelStyle={{ color: "rgb(0, 57, 10)" }}
          >
            EcoSort
          </Button>
        ) : null}
      </View>
    </>
  );
};

export default Slide;
