import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  increment,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";

export const NotifToks = async (username, userId, expoToken, ebg, etxt) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("expoPushToken", "==", expoToken));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      console.log("Document with expoToken already exists");
    } else {
      const docRef = await addDoc(usersCollection, {
        username: username === null ? "NA" : username,
        userId: userId,
        expoPushToken: expoToken,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    toast(`${e}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: ebg, borderRadius: 21 },
        text: { color: etxt },
        pressable: { borderRadius: 21 },
      },
    });
  }
};

export const increMyScr = async (userId, category, userName, displayUrl) => {
  try {
    const scoresDocRef = doc(db, "scores", userId);
    const scoresDoc = await getDoc(scoresDocRef);
    if (scoresDoc.exists()) {
      await updateDoc(scoresDocRef, {
        [`scores.${category}`]: increment(2),
        timestamp: serverTimestamp(),
      });
    } else {
      await setDoc(scoresDocRef, {
        userId: userId,
        scores: {
          Tech: 0,
          Baggy: 0,
          Metal: 0,
          Plastic: 0,
          Food: 0,
          Leaf: 0,
          Paper: 0,
          Wood: 0,
          [category]: increment(2),
        },
        timestamp: serverTimestamp(),
        name: userName,
        photo: displayUrl,
      });
    }
  } catch (e) {
    toast(`${e}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: ebg, borderRadius: 21 },
        text: { color: etxt },
        pressable: { borderRadius: 21 },
      },
    });
  }
};

export const GetUserScores = async (userId, ebg, etxt) => {
  try {
    const scoresDocRef = doc(db, "scores", userId);
    const scoresDoc = await getDoc(scoresDocRef);
    if (scoresDoc.exists()) {
      const userScores = scoresDoc.data().scores || {};
      return userScores;
    } else {
      console.log("Document with userId does not exist in scores collection");
      return {};
    }
  } catch (e) {
    toast(`${e}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: ebg, borderRadius: 21 },
        text: { color: etxt },
        pressable: { borderRadius: 21 },
      },
    });
    return {};
  }
};

export const GetUserLeaderboard = async (ebg, etxt) => {
  try {
    const scoresCollection = collection(db, "scores");
    const querySnapshot = await getDocs(scoresCollection);
    const userLeaderboard = [];
    for (const docSnapshot of querySnapshot.docs) {
      const userId = docSnapshot.id;
      const userScoresDocRef = doc(scoresCollection, userId);
      const userScoresDoc = await getDoc(userScoresDocRef);
      if (userScoresDoc.exists()) {
        const userScoresData = userScoresDoc.data();
        const userScores = userScoresDoc.data().scores || {};
        const totalScore = Object.values(userScores).reduce(
          (acc, score) => acc + score,
          0
        );
        userLeaderboard.push({
          userId: userId,
          totalScore: totalScore,
          name: userScoresData.name,
          photo: userScoresData.photo,
        });
      }
    }
    return userLeaderboard;
  } catch (e) {
    toast(`${e}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: ebg, borderRadius: 21 },
        text: { color: etxt },
        pressable: { borderRadius: 21 },
      },
    });
    return [];
  }
};
