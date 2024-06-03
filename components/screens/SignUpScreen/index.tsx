import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import useAuth from "@/components/hooks/useAuth";
import { signUp } from "@/services/authService";

type Props = {};

const SignUpScreen = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, decode } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    const credentials = {
      email,
      password,
    };

    try {
      const result = await signUp(credentials);
      setToken(result);
      decode(result);
      router.replace("/");
    } catch (err) {
      Alert.alert(`${err}`);
      throw err;
    }

    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("");
    }, 2000);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        // keyboardVerticalOffset={80}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingVertical: 60,
          }}
        >
          <View
            style={{
              height: height * 0.5,
              justifyContent: "center",
              gap: 40,
              marginTop: 40,
            }}
          >
            <View style={{ gap: 16 }}>
              <Text style={styles.title}>Let's Create An Account For You</Text>
              <Text style={styles.description}>It won't take too long.</Text>
            </View>
            <View style={{ gap: 20 }}>
              <View
                style={{
                  borderColor: colors.neutral["200"],
                  borderWidth: 1,
                  height: 100,
                  width: width * 0.9,
                  alignSelf: "center",
                  borderRadius: 16,
                  justifyContent: "center",
                  paddingHorizontal: 12,
                  gap: 12,
                }}
              >
                <Text>Email Address</Text>
                <TextInput
                  placeholder="hello@yumyap.co"
                  placeholderTextColor={colors.neutral["300"]}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  textContentType="oneTimeCode"
                />
              </View>
              <View
                style={{
                  borderColor: colors.neutral["200"],
                  borderWidth: 1,
                  height: 100,
                  width: width * 0.9,
                  alignSelf: "center",
                  borderRadius: 16,
                  justifyContent: "center",
                  paddingHorizontal: 12,
                  gap: 12,
                }}
              >
                <Text>Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 12,
                  }}
                >
                  <TextInput
                    placeholder="**********"
                    secureTextEntry={showPassword ? false : true}
                    placeholderTextColor={colors.neutral["300"]}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? "Hide" : "Show"}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={{ gap: 12, width: width, alignItems: "center" }}>
            <Pressable style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(auth)/login")}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 16,
                  lineHeight: 24,
                  fontFamily: "Inter",
                }}
              >
                Log in
              </Text>
            </Pressable>
          </View>
        </View>
        {isLoading && (
          <ActivityIndicator size="large" color={colors.primary["700"]} />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  button: {
    width: "90%",
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary["700"],
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.whiteBlack["50"],
    fontFamily: "InterSemibold",
    fontSize: 16,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    fontFamily: "Zodiak",
    marginHorizontal: 20,
    maxWidth: 300,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 20,
    fontFamily: "JakartaRegular",
    color: colors.neutral["700"],
  },
  errorText: {
    color: "red",
    alignSelf: "center",
  },
});

export default SignUpScreen;
