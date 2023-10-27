import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  bundleResourceIO,
  cameraWithTensors,
} from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  LogBox,
  Platform,
} from "react-native";
import { useTheme, Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";
import { BlurView } from "expo-blur";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

LogBox.ignoreAllLogs(["Animated: `useNativeDriver`"]);
const CAM_PREVIEW_WIDTH = Dimensions.get("window").width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (9 / 16);
const OUTPUT_TENSOR_WIDTH = 280;
const OUTPUT_TENSOR_HEIGHT = 480;
const TensorCamera = cameraWithTensors(Camera);

const classNames = [
  "E-Waste",
  "Plastic bags",
  "Metal cans",
  "Plastic bottles",
  "Food waste",
  "Leaf waste",
  "Paper waste",
  "Wood waste",
];

export const Scanner = () => {
  const { colors } = useTheme();
  const rafId = useRef(null);

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      width: CAM_PREVIEW_WIDTH,
      height: CAM_PREVIEW_HEIGHT,
      marginTop: Dimensions.get("window").height / 2 - CAM_PREVIEW_HEIGHT / 2,
    },
    // Tensor camera requires z-index.
    camera: {
      flex: 1,
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    loadingMsg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    resultText: {
      fontSize: 40,
      fontWeight: "700",
      color: "white",
    },
  });

  const [tfReady, settfReady] = useState(false);
  const [model, setModel] = useState();
  const [preds, setPreds] = useState();

  useEffect(() => {
    const loadMyModel = async () => {
      try {
        rafId.current = null;
        await tf.ready();
        settfReady(true);
        await Camera.requestCameraPermissionsAsync();
        const modelJson = require("../../../model/model.json");
        const modelWeights = require("../../../model/weights.bin");
        const loadedModel = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeights)
        );
        setModel(loadedModel);
      } catch (error) {
        toast("Model loading failed", {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          styles: {
            view: { backgroundColor: colors.errorContainer, borderRadius: 21 },
            text: { color: colors.onErrorContainer },
            pressable: { borderRadius: 21 },
          },
        });
      }
    };
    loadMyModel();
  }, []);
  console.log("model loaded:" + tfReady);
  useEffect(() => {
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = (images) => {
    console.log("cam loadeded");
    const loop = async () => {
      if (rafId.current == 0) return;
      try {
        tf.tidy(() => {
          const imageTensor = images
            .next()
            .value.expandDims(0)
            .div(127.5)
            .sub(1);
          const f =
            (OUTPUT_TENSOR_HEIGHT - OUTPUT_TENSOR_WIDTH) /
            2 /
            OUTPUT_TENSOR_HEIGHT;
          const cropped = tf.image.cropAndResize(
            imageTensor,
            tf.tensor2d([f, 0, 1 - f, 1], [1, 4]),
            [0],
            [224, 224]
          );
          const result = model.predict(cropped);
          const logits = result.dataSync();
          if (logits && logits.length > 0) {
            let e = Math.max(...logits); // Spread the array to find the maximum value
            let ind = logits.indexOf(e);
            ind != -1 ? console.log(classNames[ind]) : "null";
            setPreds(classNames[ind]);
          } else {
            console.log("no data");
          }
        });
        rafId.current = requestAnimationFrame(loop);
      } catch (error) {
        toast("Camera Stream Interrupted", {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          styles: {
            view: { backgroundColor: colors.errorContainer, borderRadius: 21 },
            text: { color: colors.onErrorContainer },
            pressable: { borderRadius: 21 },
          },
        });
      }
    };
    loop();
  };
  console.log(preds);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {!tfReady ? (
        <View style={{ flex: 1 }}>
          <LottieView
            loop={true}
            autoPlay={true}
            source={require("../../../assets/lotties/mlmod.json")}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TensorCamera
            style={styles.camera}
            autorender={true}
            type={Camera.Constants.Type.back}
            resizeWidth={OUTPUT_TENSOR_WIDTH}
            resizeHeight={OUTPUT_TENSOR_HEIGHT}
            resizeDepth={3}
            onReady={handleCameraStream}
          />
          <View
            style={{
              overflow: "hidden",
              borderRadius: 16,
              position: "absolute",
              bottom: Platform.OS === "android" ? 80 : 125,
              left: 60,
              zIndex: 100,
              width: 290,
            }}
          >
            <BlurView
              intensity={35}
              tint="light"
              style={{
                padding: 10,
              }}
            >
              <CollapsibleView
                title={<Text style={styles.resultText}>{preds}</Text>}
                titleStyle={{ marginBottom: 9 }}
                duration={450}
                style={{ borderWidth: 0 }}
                collapsibleContainerStyle={{
                  borderWidth: 0,
                }}
                noArrow={true}
              >
                <Button
                  icon="navigation-variant-outline"
                  mode="elevated"
                  onPress={() => console.log("Pressed")}
                  compact={true}
                >
                  Find facilities
                </Button>
                <Button
                  icon="information-outline"
                  mode="elevated"
                  onPress={() => console.log("Pressed")}
                  compact={true}
                  style={{ marginTop: 7 }}
                >
                  Waste info
                </Button>
              </CollapsibleView>
              {/* <Text style={styles.resultText}>{preds}</Text> */}
            </BlurView>
          </View>
        </View>
      )}
    </View>
  );
};
