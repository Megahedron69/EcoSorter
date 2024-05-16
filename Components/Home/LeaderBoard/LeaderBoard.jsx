import { View, Image } from "react-native";
import { useTheme, Text, Avatar } from "react-native-paper";
import { ImageBackground } from "react-native";
import { getAuth } from "firebase/auth";
import { GetUserLeaderboard } from "../../../Utilities/database/firestore";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

const LeaderboardItem = ({ item, index }) => {
  const serialNumber = index + 1;
  const { colors } = useTheme();
  const name = item.name
    ? item.name
    : item.userId.split("@")[0].charAt(0).toUpperCase() +
      item.userId.split("@")[0].slice(1);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.outlineVariant,
      }}
    >
      <Text style={{ marginRight: 10, fontWeight: 500, fontSize: 15 }}>
        {serialNumber}
      </Text>
      <Avatar.Image
        size={42}
        source={{
          uri: item.photo,
        }}
      />
      <Text style={{ marginLeft: 14, flex: 1, fontWeight: 700, fontSize: 15 }}>
        {name}
      </Text>
      <Text style={{ marginRight: 5, fontWeight: 600, fontSize: 15 }}>
        {item.totalScore}
      </Text>
    </View>
  );
};

export const Leaderboard = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = getAuth();
  const user = auth.currentUser;
  const [data, setData] = useState();
  const [top3Users, settop3users] = useState([
    {
      name: "sheila",
      photo: "https://api.multiavatar.com/sheila.png",
      totalScore: 23,
    },
    {
      name: "sheila",
      photo: "https://api.multiavatar.com/sheila.png",
      totalScore: 23,
    },
    {
      name: "sheila",
      photo: "https://api.multiavatar.com/sheila.png",
      totalScore: 23,
    },
  ]);
  useEffect(() => {
    const fetMyScr = async () => {
      try {
        const scores = await GetUserLeaderboard(
          colors.errorContainer,
          colors.onErrorContainer
        );
        const sortedData = scores.sort((a, b) => b.totalScore - a.totalScore);
        setData(sortedData);
        const top3Userz = sortedData.slice(0, 3);
        settop3users(top3Userz);
      } catch {}
    };
    fetMyScr();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        zIndex: -10,
      }}
    >
      <View
        style={{
          backgroundColor: "#805AC6",
          zIndex: 25,
          height: 394,
          borderBottomRightRadius: 22,
          borderBottomLeftRadius: 22,
        }}
      >
        <ImageBackground
          source={require("../../../assets/images/leaderboard/Mask_Group.png")}
          style={{ flex: 1 }}
          resizeMode="contain"
          resizeMethod="scale"
          blurRadius={1}
        >
          <Image
            source={require("../../../assets/images/leaderboard/vs_party.png")}
            style={{ height: 78, width: 78, top: 60, left: 30 }}
          />
          <Image
            source={require("../../../assets/images/leaderboard/ball.png")}
            style={{ height: 78, width: 78, top: 159, left: 355 }}
          />
          <Text
            variant="headlineMedium"
            style={{
              marginLeft: 20,
              textAlign: "center",
              fontWeight: 700,
              marginTop: -70,
              zIndex: 2,
              bottom: 45,
            }}
          >
            Leaderboards
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 362,
                height: 113,
                zIndex: 5,
                margin: 21,
                left: 70,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: "rgba(158, 120, 214, 1)",
                marginTop: 40,
                shadowColor: "pink",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Avatar.Image
                  size={96}
                  source={{
                    uri: top3Users[1].photo,
                  }}
                  style={{ bottom: 40, zIndex: 11, marginLeft: 10 }}
                />
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    bottom: 30,
                    textAlign: "center",
                  }}
                >
                  {top3Users[1].name}
                </Text>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    bottom: 10,
                    color: "#009BD6",
                    textAlign: "center",
                  }}
                >
                  {top3Users[1].totalScore}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={96}
                  source={{
                    uri: top3Users[2].photo,
                  }}
                  style={{
                    bottom: 40,
                    zIndex: 11,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    bottom: 30,
                    textAlign: "center",
                  }}
                >
                  {top3Users[2].name}
                </Text>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    bottom: 10,
                    textAlign: "center",
                    color: "#00D95F",
                    shadowColor: "black",
                  }}
                >
                  {top3Users[2].totalScore}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: 129,
                height: 159,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                zIndex: 15,
                backgroundColor: "rgb(149, 107, 210)",
                right: "110%",
                bottom: 13,
                alignItems: "center",
                shadowColor: "rgb(139, 94, 206)",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12,
              }}
            >
              <Avatar.Image
                size={108}
                source={{
                  uri: top3Users[0].photo,
                }}
                style={{ bottom: 40, zIndex: 11 }}
              />
              <Text style={{ fontWeight: 600, fontSize: 17, bottom: 25 }}>
                {top3Users[0].name}
              </Text>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#FFB800",
                  textAlign: "center",
                  bottom: 10,
                }}
              >
                {top3Users[0].totalScore}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          width: Platform.OS === "android" ? 379 : 360,
          height: 911,
          minHeight: 2,
          minWidth: 2,
          zIndex: 45,
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          margin: 16,
          marginTop: -96,
          borderRadius: 16,
          display: "flex",
          elevation: 9,
          flexGrow: 1,
          flexDirection: "row",
        }}
      >
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <LeaderboardItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
        />
      </View>
    </View>
  );
};
