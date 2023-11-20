import { memo, useState } from "react";
import { View, ScrollView, Platform, LogBox } from "react-native";
import {
  useTheme,
  Surface,
  Text,
  Portal,
  Modal,
  TouchableRipple,
} from "react-native-paper";
import RadarChart from "./RadarChart";
import ActRings from "./Activityrings";
import FourInstancesView from "./FourText";
import { ImageBackground } from "react-native";
import { catos, colorScale, vals } from "../../../Utilities/constants";
import WebView from "react-native-webview";
export const ChartBox = () => {
  LogBox.ignoreAllLogs();
  const { colors } = useTheme();
  const MemoizedRadarChart = memo(RadarChart);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        display: "flex",
        contentContainerStyle: { alignItems: "centre" },
      }}
      showsVerticalScrollIndicator={false}
    >
      <Surface
        elevation={5}
        style={{
          margin: 15,
          marginLeft: Platform.OS === "ios" ? 5 : 15,
          width: 380,
          height: 400,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <MemoizedRadarChart />
      </Surface>
      <View>
        <Surface
          elevation={5}
          style={{
            margin: 15,
            marginLeft: Platform.OS === "ios" ? 5 : 15,
            width: 385,
            height: 500,
            borderRadius: 18,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 8,
            }}
          >
            <Text
              variant="headlineLarge"
              style={{ textAlign: "center", fontWeight: 700 }}
            >
              Track your progress
            </Text>
          </View>
          <View style={{ position: "absolute", top: 70, left: 10 }}>
            <FourInstancesView
              cols={colorScale.slice(0, 4)}
              vals={vals.slice(0, 4)}
              cato={catos.slice(0, 4)}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 3,
              alignItems: "center",
              margin: 6,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: "50%",
                width: "50%",
                marginTop: 5,
                display: "flex",
                marginRight: -159,
                alignItems: "flex-start",
              }}
            >
              <ActRings
                colos={colorScale.slice(0, 4)}
                vals={vals.slice(0, 4)}
                isclockwise={true}
              />
            </View>
            <View
              style={{
                height: "50%",
                width: "50%",
                margin: 5,
                alignItems: "flex-end",
                marginLeft: -159,
                marginTop: -50,
              }}
            >
              <ActRings
                colos={colorScale.slice(4, colorScale.length)}
                vals={vals.slice(4, vals.length)}
                isclockwise={false}
              />
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 50, right: 10 }}>
            <FourInstancesView
              cols={colorScale.slice(4, colorScale.length)}
              vals={vals.slice(4, vals.length)}
              cato={catos.slice(4, catos.length)}
            />
          </View>
        </Surface>
      </View>
      <TouchableRipple rippleColor="rgba(0, 0, 0, .18)" onPress={showModal}>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 18,
          }}
        >
          <Surface
            style={{
              height: 150,
              width: 385,
              borderRadius: 18,
              overflow: "hidden",
            }}
            elevation={5}
          >
            <ImageBackground
              style={{
                flex: 1,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3df51OT4iZABtnC-UHk2BckXPuJfTSw8psg&usqp=CAU",
              }}
              blurRadius={2}
            >
              <View>
                <Text
                  variant="titleMedium"
                  style={{
                    fontSize: 32,
                    lineHeight: 56,
                    color: "black",
                    textShadowColor: "lime",
                    textShadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    textShadowRadius: 4.65,
                    fontWeight: 900,
                  }}
                >
                  Waste Facilities Heatmap
                </Text>
              </View>
            </ImageBackground>
          </Surface>
        </View>
      </TouchableRipple>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            flex: 1,
            borderRadius: 18,
            backgroundColor: colors.inverseSurface,
            display: "flex",
            overflow: "scroll",
          }}
        >
          <WebView
            source={{
              uri: "https://visualize.data.gov.in/?inst=76436cb1-4fab-42d5-92f9-30a5d41ff187&vid=108482&embed=1",
            }}
            scrollEnabled={true}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              overflow: "scroll",
            }}
            limitsNavigationsToAppBoundDomains={true}
            javaScriptEnabled={true}
            thirdPartyCookiesEnabled={true}
            scalesPageToFit={true}
            overScrollMode="always"
            setBuiltInZoomControls
            nestedScrollEnabled={true}
            autoManageStatusBarEnabled
            directionalLockEnabled={false}
            showsHorizontalScrollIndicator={false}
            sharedCookiesEnabled={true}
            cacheEnabled={true}
            cacheMode="LOAD_CACHE_ELSE_NETWORK"
          />
        </Modal>
      </Portal>
      <View
        style={{
          flex: 1,
          height: 150,
        }}
      ></View>
    </ScrollView>
  );
};
