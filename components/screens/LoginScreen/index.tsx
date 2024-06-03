import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { login } from "@/services/authService";
import useAuth from "@/components/hooks/useAuth";

type Props = {};

const LoginScreen = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { decode, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const loginPressed = async () => {
    if (loading) return;
    setLoading(true);

    const credentials = {
      email,
      password,
    };

    try {
      const result = await login(credentials);
      setToken(result);
      decode(result);

      router.replace("/");
    } catch (err) {
      console.log("Error Logging in ", err);
      Alert.alert(`Error Logging in, ${err}`);
      throw err;
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.title}>Let's Login To Your Account</Text>
              <Text style={styles.description}>
                To access all the features.
              </Text>
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
              <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontSize: 16,
                    lineHeight: 24,
                    fontFamily: "Inter",
                    alignSelf: "flex-end",
                    paddingRight: 20,
                  }}
                >
                  Forgot Password?
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ gap: 12, width: width, alignItems: "center" }}>
            <Pressable style={styles.button} onPress={loginPressed}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 16,
                  lineHeight: 24,
                  fontFamily: "Inter",
                }}
              >
                Don't have an account?
              </Text>
            </Pressable>
          </View>
        </View>
        {loading && (
          <ActivityIndicator
            style={{ position: "absolute", top: height / 2, left: width / 2 }}
            size="large"
            color={colors.primary["700"]}
          />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
});

export default LoginScreen;
