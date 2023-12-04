import { useState, useCallback } from "react";
import { Image, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import SegmentedControl from "react-native-segmented-control-2";
import { FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import YoutubePlayer from "react-native-youtube-iframe";
import { ZoomImage } from "react-native-zoom-lightbox";

const MasonLayout = ({ relatedImages }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ZoomImage
          style={{
            display: "flex",
            width: 173,
            height: 148,
            borderRadius: 18,
            marginBottom: 15,
            marginRight: 18,
          }}
          source={{ uri: relatedImages[0] }}
        />
        <ZoomImage
          style={{
            display: "flex",
            width: 173,
            height: 148,
            borderRadius: 18,
            marginBottom: 12,
            marginRight: 18,
          }}
          source={{ uri: relatedImages[1] }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <ZoomImage
          style={{
            flex: 1,
            width: 185,
            height: 311,
            borderRadius: 18,
          }}
          source={{ uri: relatedImages[2] }}
        />
      </View>
    </View>
  );
};

const WasteDets = ({ ind, imageURI, catName, loading, dataz }) => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChange = (index) => {
    setActiveIndex(index);
  };
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const steps = [
    "Repurpose metal containers for storage or organization.",
    "Transform old metal furniture into unique pieces through DIY projects.",
    "Create art or sculptures using discarded metal items for a creative and sustainable touch.",
  ];

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
      }}
    >
      <View style={{ marginBottom: 15 }}>
        <Surface
          style={{
            display: "flex",
            height: 268,
            borderRadius: 18,
            backgroundColor: colors.secondaryContainer,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 8,
          }}
          elevation={4}
        >
          <FontAwesome5
            name="info-circle"
            size={24}
            color="white"
            style={{ position: "absolute", top: 10, right: 20 }}
          />
          <Text
            variant="labelMedium"
            style={{
              fontWeight: 800,
              fontSize: 28,
              margin: 11,
              lineHeight: 28,
            }}
          >
            Did You Know?
          </Text>
          <Text
            style={{
              color: colors.onSecondaryContainer,
              fontSize: 16,
              fontWeight: 600,
              textAlign: "justify",
            }}
          >
            {dataz.doYouKnow}
          </Text>
        </Surface>
      </View>
      <View
        style={{
          shadowColor: colors.elevation.level4,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
          borderRadius: 18,
          borderWidth: 0.75,
          borderColor: colors.outlineVariant,
          marginTop: 20,
        }}
      >
        <SegmentedControl
          tabs={["Reuse", "Recycle", "Reduce"]}
          activeTabColor={colors.primary}
          style={{
            borderRadius: 18,
            padding: 9,
            backgroundColor: colors.surface,
            shadowColor: colors.elevation.level5,
            shadowOffset: {
              width: 13,
              height: 18,
            },
            shadowOpacity: 13,
            shadowRadius: 4.65,
            elevation: 18,
            zIndex: 20,
            border: 10,
          }}
          tabStyle={{
            borderRadius: 18,
            border: 2,
            borderColor: colors.outlineVariant,
          }}
          activeTextColor={colors.onPrimary}
          extraSpacing={2}
          selectedTabStyle={{
            borderRadius: 18,
            shadowColor: colors.shadow,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          textStyle={{
            fontWeight: 800,
            fontSize: 16,
            color: colors.onSurface,
            textAlign: "center",
          }}
          activeTab={activeIndex}
          onChange={handleChange}
        />
        <View
          style={{
            borderBottomRightRadius: 18,
            borderBottomLeftRadius: 18,
            backgroundColor:
              colors.primary === "rgb(120, 220, 119)"
                ? "rgb(34, 37, 33)"
                : "rgb(255, 255, 231)",
            height: 300,
            width: SCREEN_WIDTH * 0.93,
            zIndex: 5,
            marginTop: -19,
            shadowColor: colors.elevation.level4,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 4.65,
            elevation: 8,
            padding: 18,
            paddingTop: 40,
          }}
        >
          {dataz.tips[Object.keys(dataz.tips)[activeIndex]].steps.map(
            (step, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  marginVertical: activeIndex === 2 ? 2 : 9,
                  marginRight: 15,
                }}
              >
                <Image
                  source={{
                    uri: dataz.tips[Object.keys(dataz.tips)[activeIndex]].icon,
                  }}
                  style={{ width: 24, height: 24, marginRight: 5 }}
                />
                <Text
                  variant="bodyLarge"
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    color: colors.onSurface,
                  }}
                >
                  {step}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
      <View style={{ marginTop: 15, borderRadius: 18, overflow: "hidden" }}>
        <YoutubePlayer
          height={215}
          width={SCREEN_WIDTH * 0.93}
          play={false}
          videoId={dataz.ytVideoUrl.split("v=")[1]}
          onChangeState={onStateChange}
        />
      </View>
      <View
        style={{
          marginTop: 35,
          flex: 1,
          width: SCREEN_WIDTH * 0.93,
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <MasonLayout relatedImages={dataz.relatedImages} />
        </View>
      </View>
    </View>
  );
};
export default WasteDets;
