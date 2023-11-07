import * as React from "react";
import { View, Dimensions, Platform } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { withAnchorPoint } from "../../../Utilities/anchor-point";

const paper = require("../../../assets/images/carousel/paper.png");
const ewaste = require("../../../assets/images/carousel/ewaste.png");
const foodWaste = require("../../../assets/images/carousel/food.png");
const leafWaste = require("../../../assets/images/carousel/leaf.png");
const metalWaste = require("../../../assets/images/carousel/metal.png");
const plastBot = require("../../../assets/images/carousel/plastbott.png");
const wood = require("../../../assets/images/carousel/wood.png");
const plastbag = require("../../../assets/images/carousel/plasticbag.png");

const fruits = [
  paper,
  ewaste,
  foodWaste,
  leafWaste,
  metalWaste,
  plastBot,
  wood,
  plastbag,
];

const categories = [
  "paper",
  "tech",
  "food",
  "leaf",
  "metal",
  "plastic",
  "wood",
  "baggy",
];
const colors = [
  "#F2A1AD", // Peach (Paper)
  "#6495ED", // Medium Aquamarine (E-Waste)
  "#FFD1DC", // Gold (Food Waste)
  "#FB3A4D", // Lime Green (Leaf Waste)
  "#F2AD62", // Powder Blue (Metal Waste)
  "#977AB1", // Royal Blue (Plastic Bottles)
  "#8B4513", // Saddle Brown (Wood)
  "#FF6347", // Tomato Red (Plastic Bags)
];

const PAGE_WIDTH = Dimensions.get("screen").width;
const PAGE_HEIGHT = Dimensions.get("screen").width * 1.2;

function Index() {
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  };

  return (
    <View style={{ flex: 1, marginTop: -65 }}>
      <Carousel
        {...baseOptions}
        loop={true}
        autoPlay={true}
        withAnimation={{
          type: "spring",
          config: {
            damping: 13,
          },
        }}
        autoPlayInterval={1500}
        data={colors}
        renderItem={({ index, animationValue }) => (
          <Card animationValue={animationValue} key={index} index={index} />
        )}
      />
    </View>
  );
}

const Card = ({ index, animationValue }) => {
  const WIDTH = PAGE_WIDTH / 1.123;
  const HEIGHT = PAGE_HEIGHT / 2.04;
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolate.CLAMP
    );

    const translateX = interpolate(
      animationValue.value,
      [-1, -0.2, 0, 1],
      [0, WIDTH * 0.3, 0, 0]
    );

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [30, 0, -25, -25],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(
        transform,
        { x: 0.5, y: 0.5 },
        { width: WIDTH, height: HEIGHT }
      ),
    };
  }, [index]);

  const blockStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, 60, 60]
    );

    const translateY = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, -40, -40]
    );

    const rotateZ = interpolate(animationValue.value, [-1, 0, 1], [0, 0, -25]);

    return {
      transform: [{ translateX }, { translateY }, { rotateZ: `${rotateZ}deg` }],
    };
  }, [index]);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: colors[index],
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            width: WIDTH,
            height: HEIGHT,
            shadowColor: "gray",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
          },
          cardStyle,
        ]}
      />
      <Animated.Image
        source={fruits[index % 8]}
        style={[
          {
            width: 256,
            height: 256,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 999,
            top: 95,
            left: Platform.OS === "android" ? 122 : 101,
          },
          blockStyle,
        ]}
        resizeMode={"contain"}
      />
      <Animated.Text
        style={{
          position: "absolute",
          zIndex: 999,
          fontSize: 84,
          color: "white",
          fontWeight: 800,
          fontFamily: "GothamRounded-Bold",
          textShadowColor: "#000",
          textShadowOffset: {
            width: 6,
            height: 8,
          },
          textShadowRadius: 4.65,
          elevation: 14,
          textAlign: "left",
          top: 156,
          left: 52,
          textTransform: "lowercase",
        }}
      >
        {categories[index % 8]}
      </Animated.Text>
      <Animated.Text
        style={{
          position: "absolute",
          zIndex: 1000,
          fontSize: 84,
          color: colors[index % 8],
          fontWeight: 800,
          fontFamily: "GothamRounded-Bold",
          textShadowColor: "#000",
          textShadowOffset: {
            width: 4.6,
            height: 3,
          },
          paddingTop: 72,
          marginLeft: 5,
          textShadowRadius: 12.65,
          textAlign: "right",
          textTransform: "lowercase",
          elevation: 16,
        }}
      >
        Waste
      </Animated.Text>
    </Animated.View>
  );
};

export default Index;
