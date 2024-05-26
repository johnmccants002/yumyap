import useAuth from "@/components/hooks/useAuth";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { colors } from "@/constants/Colors";
import { login } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";

type Props = {};

const LoginScreen = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { decode, setToken } = useAuth();

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
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@/assets/images/YumYap.png")}
            style={[styles.logo, { width: width / 2 }]}
          />
          <Text style={styles.description}>
            Simplifies cooking by magically transforming your cravings into
            detailed recipes.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              width: width,
              flexGrow: 1,
            },
          ]}
        >
          <View style={{ width: width, padding: 8, gap: 20 }}>
            <View>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email..."
                placeholderTextColor={colors.neutral["300"]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType="oneTimeCode"
              />
            </View>
            <View>
              <Text style={styles.text}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Enter password..."
                placeholderTextColor={colors.neutral["300"]}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Pressable style={styles.button} onPress={loginPressed}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable
              style={styles.signUp}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={styles.signUpText}>
                Don't have an account?{" "}
                <Text style={styles.signUpLink}>Sign Up</Text>
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
    backgroundColor: colors.primary["100"],
    justifyContent: "flex-start",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: colors.neutral["800"],
    paddingHorizontal: 20,
    fontFamily: "JakartaRegular",
  },
  text: {
    fontSize: 16,
    color: colors.neutral["800"],

    fontFamily: "JakartaMedium",
  },
  card: {
    backgroundColor: colors.neutral["50"],
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  input: {
    width: "90%",
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 10,
    paddingLeft: 12,

    backgroundColor: colors.neutral["200"],
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
  signUp: {
    marginTop: 15,
  },
  signUpText: {
    color: colors.neutral["600"],
    fontFamily: "JakartaMedium",
  },
  signUpLink: {
    color: colors.primary["700"],
    fontWeight: "bold",
  },
});

export default LoginScreen;
