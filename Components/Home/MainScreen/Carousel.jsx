import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  BottomSheetModal,
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-native-reanimated-carousel";
import WastDets from "./WastDets";
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
const colores = [
  "#F2A1AD",
  "#6495ED",
  "#FFD1DC",
  "#FB3A4D",
  "#F2AD62",
  "#977AB1",
  "#8B4513",
  "#FF6347",
];

const PAGE_WIDTH = Dimensions.get("screen").width;
const PAGE_HEIGHT = Dimensions.get("screen").width * 1.2;

function Index() {
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  };

  const { colors } = useTheme();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 8,
    overshootClamping: false,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 100,
  });
  const bottomSheetModalRef = useRef(null);
  const snapPoints =
    Platform.OS === "android"
      ? useMemo(() => ["34%", "80%"], [])
      : useMemo(() => ["25%", "70%"], []);
  const [activeInd, setActiveIndex] = useState();
  const handlePresentModalPress = useCallback((index) => {
    setActiveIndex(index);
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {}, []);

  async function fet(...args) {
    try {
      const res = await fetch(...args);
      return await res.json();
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["SheetDat"],
    queryFn: () =>
      fet("https://api.myjson.online/v1/records/396b60c2-a672-4f16-9adb-63676b7e3e8c"),
    staleTime: Infinity,
  });
  if(isError)console.log("error")
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
        data={colores}
        renderItem={({ index, animationValue }) => (
          <Card
            animationValue={animationValue}
            key={index}
            index={index}
            fun={() => {
              handlePresentModalPress(index);
            }}
          />
        )}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        backgroundStyle={{ backgroundColor: colors.bottomSheetContainer }}
        style={{
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          shadowColor: colors.elevation.level2,
          elevation: 7,
          borderRadius: 18,
          borderColor:
            colors.primary === "rgb(0, 110, 28)"
              ? "black"
              : colors.outlineVariant,
          borderWidth: 1,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.onbottomSheetContainer,
        }}
      >
        <BottomSheetScrollView>
        {isLoading ? (
  <View style={{ flex: 1 }}>
    <LottieView
      loop={true}
      autoPlay={true}
      source={require("../../../assets/lotties/locate.json")}
    />
  </View>
) : (
  <WastDets
    loading={isLoading}
    ind={activeInd}
    dataz={data ? data.data[activeInd] : null} // Access data using square brackets
  />
)}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}

const Card = ({ index, animationValue, fun }) => {
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
    <TouchableWithoutFeedback
      onPress={() => {
        fun(index);
      }}
    >
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
              backgroundColor: colores[index],
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
            color: colores[index % 8],
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
    </TouchableWithoutFeedback>
  );
};

export default Index;
