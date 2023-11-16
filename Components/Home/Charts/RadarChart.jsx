import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLegend,
  VictoryLabel,
  VictoryTheme,
} from "victory-native";
import { useTheme } from "react-native-paper";
import { catos, colorScale, characterData } from "../../../Utilities/constants";
const RadarChart = () => {
  const { colors } = useTheme();

  const [data, setData] = useState([]);
  const [maxima, setMaxima] = useState({});

  useEffect(() => {
    setData(processData(characterData));
    setMaxima(getMaxima(characterData));
  }, []);

  const getMaxima = (data) => {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  };

  const processData = (data) => {
    const maxByGroup = getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  };

  return (
    <View style={styles.container}>
      <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
        <VictoryGroup
          colorScale={colorScale}
          animate={{
            duration: 1000,
            onLoad: { duration: 750 },
            onEnter: { duration: 500, before: () => ({ y: 0 }) },
          }}
          style={{ data: { fillOpacity: 0.3, strokeWidth: 3 } }}
        >
          {data.map((data, i) => (
            <VictoryArea key={i} data={data} />
          ))}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: {
                padding: 19,
                fill: colors.onSurface,
                fontSize: 13,
                fontWeight: 800,
              },
              axis: { stroke: "none" },
              grid: {
                stroke: colors.outline,
                strokeWidth: 0.65,
                opacity: 0.9,
              },
            }}
            tickLabelComponent={
              <VictoryLabel
                labelPlacement="vertical"
                style={{ fill: colors.onSurface }}
              />
            }
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => Math.ceil(t * maxima[key])}
            tickValues={[0.25, 0.5, 0.75]}
          />
        ))}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: colors.onSurfaceDisabled, opacity: 0.35 },
          }}
        />
        <View style={{ top: 330 }}>
          <VictoryLegend
            x={5}
            y={10}
            orientation="horizontal"
            symbolSpacer={10}
            style={{
              labels: { fill: colors.onSurface },
              title: { fontSize: 15 },
            }}
            gutter={50}
            itemsPerRow={4}
            colorScale={colorScale}
            data={[
              { name: "Tech" },
              { name: "Baggy" },
              { name: "Metal" },
              { name: "Plastic" },
              { name: "Food" },
              { name: "Leaf" },
              { name: "Paper" },
              { name: "Wood" },
            ]}
          />
        </View>
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RadarChart;
