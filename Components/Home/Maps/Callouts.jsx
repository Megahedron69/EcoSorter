import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

function CustomCallout({ locName, address, isOpenNow, rating }) {
  const { colors } = useTheme();
  const styles = {
    calloutContainer: {
      backgroundColor: colors.surface,
      width: 250,
      padding: 10,
      borderRadius: 18,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    topPart: {
      marginBottom: 10,
    },
    locationName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.onSurface,
    },
    address: {
      color: colors.outline,
    },
    middlePart: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    column: {
      flex: 1,
    },
    openNowGreen: {
      color: "green",
    },
    openNowRed: {
      color: "red",
    },
    rating: {
      fontSize: 16,
      color: colors.tertiary,
    },
    bottomPart: {
      alignItems: "center",
    },
    navigateButton: {
      backgroundColor: colors.secondary, // Replace with your color
      padding: 10,
      borderRadius: 9,
    },
    navigateButtonText: {
      color: colors.onSecondary,
      fontWeight: "bold",
    },
  };
  return (
    <View style={styles.calloutContainer}>
      {/* Top Part */}
      <View style={styles.topPart}>
        <Text style={styles.locationName}>{locName}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      {/* Middle Part */}
      <View style={styles.middlePart}>
        <View style={styles.column}>
          <Text style={isOpenNow ? styles.openNowGreen : styles.openNowRed}>
            Open Now: {isOpenNow ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.rating}>Ratings: {rating}</Text>
        </View>
      </View>

      {/* Bottom Part */}
      <View style={styles.bottomPart}>
        <TouchableOpacity style={styles.navigateButton}>
          <Text style={styles.navigateButtonText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomCallout;
