import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import RollingNumberTicker from "react-native-rolling-number-ticker";
const FourInstancesView = ({ cols, vals, cato }) => {
  const { colors } = useTheme();
  return (
    <View style={{ display: "flex" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <RollingNumberTicker
            duration={2500}
            fromNumber={10}
            number={vals[0]}
            textSize={35}
            textStyle={{ fontSize: 35, fontWeight: 700, color: cols[0] }}
            style={{ margin: 10 }}
          />
          <Text
            style={{ fontSize: 14, fontWeight: 500, color: colors.onSurface }}
          >
            {cato[0]}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <RollingNumberTicker
            duration={2500}
            fromNumber={10}
            number={vals[1]}
            textSize={35}
            textStyle={{ fontSize: 35, fontWeight: 700, color: cols[1] }}
            style={{ margin: 10 }}
          />
          <Text
            style={{ fontSize: 14, fontWeight: 500, color: colors.onSurface }}
          >
            {cato[1]}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <RollingNumberTicker
            duration={2500}
            fromNumber={10}
            number={vals[2]}
            textSize={35}
            textStyle={{ fontSize: 35, fontWeight: 700, color: cols[2] }}
            style={{ margin: 10 }}
          />
          <Text
            style={{ fontSize: 14, fontWeight: 500, color: colors.onSurface }}
          >
            {cato[2]}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <RollingNumberTicker
            duration={2500}
            fromNumber={10}
            number={vals[1]}
            textSize={35}
            textStyle={{ fontSize: 35, fontWeight: 700, color: cols[3] }}
            style={{ margin: 10 }}
          />
          <Text
            style={{ fontSize: 14, fontWeight: 500, color: colors.onSurface }}
          >
            {cato[3]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FourInstancesView;
