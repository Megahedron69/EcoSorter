import { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import MyChips from "./MyChips";
import CustomCallout from "./Callouts";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";
import LottieView from "lottie-react-native";
import * as Linking from "expo-linking";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
const mapBoxDark = require("../../../Utilities/Maps/MapBoxDark.json");
const mapBoxLight = require("../../../Utilities/Maps/MapBoxLight.json");

export const MapBox = () => {
  const { colors } = useTheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [wMode, setWmode] = useState({
    all: true,
    paper: false,
    plastic: false,
    ewaste: false,
    metal: false,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        toast(`${errorMsg}`, {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          styles: {
            view: { backgroundColor: colors.errorContainer, borderRadius: 21 },
            text: { color: colors.onErrorContainer },
            pressable: { borderRadius: 21 },
          },
        });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  if (errorMsg) {
    toast(`${errorMsg}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: colors.errorContainer, borderRadius: 21 },
        text: { color: colors.onErrorContainer },
        pressable: { borderRadius: 21 },
      },
    });
  }
  const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const latitude = location ? location.coords.latitude : 28.6779;
  const longitude = location ? location.coords.longitude : 77.2611;

  const handleChipClick = (selectedCategory) => {
    setWmode((prevWMode) => {
      const newFilter = { ...prevWMode };
      Object.keys(newFilter).forEach(
        (v) => (newFilter[v] = v === selectedCategory)
      );
      return newFilter;
    });
  };

  async function fet(...args) {
    try {
      const res = await fetch(...args);
      return await res.json();
    } catch (err) {
      throw err;
    }
  }
  let keywrd = "waste";
  if (wMode.all) keywrd = "waste";
  else if (wMode.ewaste) keywrd = "e-waste";
  else if (wMode.metal) keywrd = "metal scrapyard";
  else if (wMode.paper) keywrd = "paper recycle";
  else if (wMode.plastic) keywrd = "plastic waste";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Dwaste", latitude, longitude, keywrd],
    queryFn: () =>
      fet(
        `${baseUrl}keyword=${keywrd}&location=${latitude}%2C${longitude}&radius=1500&key=${process.env.EXPO_PUBLIC_mapi}`
      ),
    staleTime: 2592000,
  });

  if (isError) {
    toast("Unable to locate any establishment nearby", {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: colors.errorContainer, borderRadius: 21 },
        text: { color: colors.onErrorContainer },
        pressable: { borderRadius: 21 },
      },
    });
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {location && !isLoading ? (
        <View>
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            customMapStyle={
              colors.primary === "rgb(120, 220, 119)" ? mapBoxDark : mapBoxLight
            }
            style={{ width: "100%", height: "100%" }}
          >
            {data.results.map((markDat, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: markDat.geometry.location.lat,
                  longitude: markDat.geometry.location.lng,
                }}
              >
                <Callout
                  tooltip={true}
                  onPress={() => {
                    const origin = `${location.coords.latitude},${location.coords.longitude}`;
                    const destination = `${markDat.geometry.location.lat},${markDat.geometry.location.lng}`;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                      origin
                    )}&destination=${encodeURIComponent(destination)}`;
                    Linking.openURL(url);
                  }}
                >
                  <CustomCallout
                    locName={markDat.name}
                    address={markDat.vicinity}
                    isOpenNow={true}
                    rating={markDat.rating}
                  />
                </Callout>
              </Marker>
            ))}
          </MapView>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              position: "absolute",
              top: 50,
              left: 10,
              flex: 1,
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <MyChips
              iconName="recycle"
              selected={wMode.all}
              chipText="All"
              onPress={() => handleChipClick("all")}
            />
            <MyChips
              iconName="newspaper-variant"
              selected={wMode.paper}
              chipText="Paper Waste"
              onPress={() => handleChipClick("paper")}
            />
            <MyChips
              iconName="devices"
              selected={wMode.ewaste}
              chipText="E-Waste"
              onPress={() => handleChipClick("ewaste")}
            />
            <MyChips
              iconName="bottle-soda-classic"
              selected={wMode.plastic}
              chipText="Plastic Waste"
              onPress={() => handleChipClick("plastic")}
            />
            <MyChips
              iconName="hammer-wrench"
              selected={wMode.metal}
              chipText="Metal Waste"
              onPress={() => handleChipClick("metal")}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <LottieView
            loop={true}
            autoPlay={true}
            source={require("../../../assets/lotties/locate.json")}
          />
        </View>
      )}
    </View>
  );
};
