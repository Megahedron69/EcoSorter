import { app } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";
import { sendPushNotification } from "../../Utilities/Notifs";
import * as Notifications from "expo-notifications";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { NotifToks } from "../../Utilities/database/firestore";

const auth = getAuth(app);
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
    sendPushNotification(
      (await Notifications.getDevicePushTokenAsync()).data,
      user
    );
    NotifToks(
      user.displayName,
      user.email,
      (await Notifications.getDevicePushTokenAsync()).data,
      ebg,
      etxt
    );
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

export const updateUserProfile = async (
  user,
  displayName,
  photoURL,
  navigate,
  ebg,
  etxt,
  sbg,
  stxt
) => {
  try {
    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });
    navigate.goBack();
    toast("Profile updated Successfully", {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: sbg, borderRadius: 21 },
        text: { color: stxt },
        pressable: { borderRadius: 21 },
      },
    });
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
    toast(`${error.message}`, {
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

export const resetPass = async (bg, txt, ebg, etxt, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast(`Reset email sent to ${email}`, {
      duration: 4000,
      position: ToastPosition.BOTTOM,
      styles: {
        view: { backgroundColor: bg, borderRadius: 21 },
        text: { color: txt },
        pressable: { borderRadius: 21 },
      },
    });
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
    throw error;
  }
};

// export const authWithGoogle = async (bg, txt, ebg, etxt) => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     toast(`Google Sign-in successfull`, {
//       duration: 4000,
//       position: ToastPosition.BOTTOM,
//       styles: {
//         view: { backgroundColor: bg, borderRadius: 21 },
//         text: { color: txt },
//         pressable: { borderRadius: 21 },
//       },
//     });
//     return userInfo;
//   } catch(error) {
//     toast(`${error.code}`, {
//       duration: 4000,
//       position: ToastPosition.BOTTOM,
//       styles: {
//         view: { backgroundColor: ebg, borderRadius: 21 },
//         text: { color: etxt },
//         pressable: { borderRadius: 21 },
//       },
//     });
//     throw error;
//   }
// };
