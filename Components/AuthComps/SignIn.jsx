import { useState, useRef, useEffect } from "react";
import { View, ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  useTheme,
  TextInput,
  Text,
  Checkbox,
  Button,
  Divider,
} from "react-native-paper";
import {
  signUpWithEmailAndPassword,
  signInWithEmailzAndPassword,
} from "../AuthComps/Auth";
import { AntDesign } from "@expo/vector-icons";
const SignIn = ({ mode, navigation }) => {
  const { colors } = useTheme();
  const emailInputRef = useRef(null); // Create a ref for the email input
  const isEmailAutofilled = useRef(false);

  const [text, setText] = useState({
    email: "",
    password: "",
    rememberMe: false,
    hidePass: true,
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isEmailAutofilled.current) {
      setError({ ...error, email: "" });
    }
  }, [text.email, error, isEmailAutofilled]);

  const signMeIn = async () => {
    signInWithEmailzAndPassword(
      text.email,
      text.password,
      navigation,
      colors.errorContainer,
      colors.onErrorContainer,
      colors.primaryContainer,
      colors.onPrimaryContainer
    );
  };
  const signMeUp = () => {
    signUpWithEmailAndPassword(
      text.email,
      text.password,
      navigation,
      colors.errorContainer,
      colors.onErrorContainer,
      colors.primaryContainer,
      colors.onPrimaryContainer
    );
  };
  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!isEmailAutofilled.current && !emailRegex.test(text.email)) {
      setError({ ...error, email: "Please enter a valid email" });
      return false;
    }
    setError({ ...error, email: "" }); // Clear the email error
    return true;
  };

  const validatePass = () => {
    if (text.password.trim() === "" || text.password.trim().length < 6) {
      setError({ ...error, password: "Weak password strength" });
      return false;
    }
    setError({ ...error, password: "" }); // Clear the password error
    return true;
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        display: "flex",
      }}
    >
      <View style={{ marginBottom: 37 }}>
        <ImageBackground
          style={{
            width: "100%",
            height: 400,
          }}
          resizeMode={"cover"}
          source={require("../../assets/images/signiIn/bgvec.png")}
        >
          {mode == "signIn" ? (
            <Text
              variant="displayLarge"
              style={{
                marginLeft: 30,
                marginTop: 90,
                color: colors.onPrimaryContainer,
              }}
            >
              Login
            </Text>
          ) : (
            <Text
              variant="displayLarge"
              style={{
                marginLeft: 25,
                marginTop: 90,
                color: colors.onPrimaryContainer,
              }}
            >
              SignUp
            </Text>
          )}
        </ImageBackground>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          value={text.email}
          ref={emailInputRef}
          label={"Email"}
          mode="outlined"
          autoComplete="email"
          inputMode="email"
          onChangeText={(email) => {
            setText({ ...text, email });
          }}
          onBlur={() => {
            validateEmail();
            if (emailInputRef.current.isFocused()) {
              isEmailAutofilled.current = true;
            }
          }}
          placeholder="Enter registered email"
          error={!!error.email}
          style={{
            width: 315,
            height: 55,
          }}
        />
        {error.email ? (
          <View
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginLeft: 52,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.error, marginTop: 2 }}>
              {error.email}
            </Text>
          </View>
        ) : null}
        <TextInput
          value={text.password}
          label="Password"
          mode="outlined"
          autoComplete="password"
          secureTextEntry={text.hidePass}
          onChangeText={(password) => {
            setText({ ...text, password });
          }}
          onBlur={() => {
            validatePass();
          }}
          right={<AntDesign name="eye" size={24} color="white" />}
          error={!!error.password}
          placeholder="Enter password"
          style={{
            width: 315,
            height: 55,
            marginTop: 13,
          }}
        />
        {error.password ? (
          <View
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginLeft: 52,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.error, marginTop: 2 }}>
              {error.password}
            </Text>
          </View>
        ) : null}
        {mode == "signIn" ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Checkbox
                status={text.rememberMe ? "checked" : "unchecked"}
                onPress={() => {
                  setText({ ...text, rememberMe: !text.rememberMe });
                }}
              />
              <Text>Remember Me</Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginLeft: 69,
              }}
            >
              <Button mode="text" compact={true}>
                Forgot Password?
              </Button>
            </View>
          </View>
        ) : null}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 40,
          marginTop: 25,
          marginBottom: 27,
        }}
      >
        {mode === "signIn" ? (
          <Button
            mode="contained"
            style={{ width: 313, height: 48, borderRadius: 10 }}
            onPress={() => signMeIn()}
            uppercase={true}
            labelStyle={{
              alignSelf: "center",
              margin: 13,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
              fontWeight: 500,
              marginTop: 16,
            }}
            disabled={error.email || error.password}
          >
            Login
          </Button>
        ) : (
          <Button
            mode="contained"
            style={{ width: 313, height: 48, borderRadius: 10 }}
            onPress={() => signMeUp()}
            uppercase={true}
            labelStyle={{
              alignSelf: "center",
              margin: 13,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
              fontWeight: 500,
              marginTop: 16,
            }}
            disabled={error.email || error.password}
          >
            SignUp
          </Button>
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Divider style={{ flex: 1, height: 1 }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
        </View>
        <Divider style={{ flex: 1, height: 1 }} />
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 7,
          marginBottom: 0,
        }}
      >
        <Button
          type="tonal"
          buttonColor={colors.secondary}
          style={{ width: 312, height: 48 }}
          icon={() => (
            <AntDesign name="google" size={24} color={colors.onSecondary} />
          )}
        >
          {mode === "signIn" ? (
            <Text
              variant="titleMedium"
              style={{
                color: colors.onSecondary,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Log In With Google
            </Text>
          ) : (
            <Text
              variant="titleMedium"
              style={{
                color: colors.onSecondary,
              }}
            >
              Sign Up With Google
            </Text>
          )}
        </Button>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mode === "signIn" ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row", // Set flexDirection to "row"
            }}
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Don't have an account?
            </Text>
            <Button
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              mode="text"
              compact={true}
            >
              SignUp
            </Button>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row", // Set flexDirection to "row"
            }}
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Already a user?
            </Text>
            <Button
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              mode="text"
              compact={true}
            >
              LogIn
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SignIn;
