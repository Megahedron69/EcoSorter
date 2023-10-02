import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";
export const signUpWithEmailAndPassword = async (
  email,
  password,
  navigation,
  ebg,
  etxt,
  sbg,
  stxt
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast("created account Successfully", {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: sbg, borderRadius: 21 },
        text: { color: stxt },
        pressable: { borderRadius: 21 },
      },
    });
    navigation.navigate("SignIn");
  } catch (error) {
    toast(`${error.message}`, {
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

export const signInWithEmailzAndPassword = async (
  email,
  password,
  navigation,
  ebg,
  etxt,
  sbg,
  stxt
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    navigation.navigate("Home");
    toast(`${user.email} Logged In`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: sbg, borderRadius: 21 },
        text: { color: stxt },
        pressable: { borderRadius: 21 },
      },
    });
    return user;
  } catch (error) {
    toast(`${error.message}`, {
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

const updateUserProfile = async (user, displayName, photoURL) => {
  try {
    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });
    console.log("User profile updated");
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (navigation, bg, txt, ebg, etxt) => {
  try {
    await signOut(auth);
    navigation.navigate("SignIn");
    toast("Logged Out", {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: bg, borderRadius: 21 },
        text: { color: txt },
        pressable: { borderRadius: 21 },
      },
    });
  } catch (error) {
    toast("Logged Out", {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: ebg, borderRadius: 21 },
        text: { color: etxt },
        pressable: { borderRadius: 21 },
      },
    });
    throw error;
  }
};
