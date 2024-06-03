import useAuth from "@/components/hooks/useAuth";
import { colors } from "@/constants/Colors";
import { signUp } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
type Props = {};

const SignUpScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, decode } = useAuth();
  const { width } = useWindowDimensions();
  const router = useRouter();

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
        <Text style={styles.title}>Create Account</Text>
        <View
          style={{ width: width, padding: 8, gap: 20, paddingHorizontal: 20 }}
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontFamily: "JakartaRegular", fontSize: 16 }}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email..."
              placeholderTextColor={colors.neutral["300"]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoComplete="email"
              textContentType="oneTimeCode"
            />
          </View>
          <View style={{ gap: 12 }}>
            <Text style={{ fontFamily: "JakartaRegular", fontSize: 16 }}>
              Password
            </Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password..."
              placeholderTextColor={colors.neutral["300"]}
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoComplete="password"
              textContentType="oneTimeCode"
            />
          </View>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
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
    backgroundColor: colors.primary["100"],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Zodiak",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.neutral["200"],
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.neutral["200"],
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
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
});

export default SignUpScreen;
