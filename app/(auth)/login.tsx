import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import useAuth from "@/components/hooks/useAuth";

type Props = {};

const Page = (props: Props) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken, decode } = useAuth();

  const loginPressed = async () => {
    setLoading(true);
    const credentials = {
      email,
      password,
    };
    const result = await login(credentials);
    decode(result);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/YumYap.png")}
        style={[styles.logo, { width: width / 2 }]}
      />
      <Text style={styles.description}>
        Simplifies cooking by magically transforming your cravings into detailed
        recipes.
      </Text>

      <View
        style={[
          styles.card,
          {
            width: width,
            justifyContent: "space-evenly",
            paddingBottom: 80,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: 500,
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
            />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary["100"],
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80,
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

export default Page;
