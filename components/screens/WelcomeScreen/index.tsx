import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

type Props = {};

const WelcomeScreen = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary["50"],
        }}
      >
        <Image
          source={require("@/assets/images/YumYap.png")}
          style={[styles.logo, { width: width / 2 }]}
        />
      </View>
      <View
        style={{
          height: height * 0.45,
          borderTopWidth: 1,
          borderTopColor: colors.neutral["100"],

          alignItems: "center",
          gap: 20,
          paddingTop: 20,
        }}
      >
        <View style={{ width: width, paddingHorizontal: 12, gap: 8 }}>
          <Text style={styles.title}>One More Step Before We Begin</Text>
          <Text style={styles.description}>
            We need to set up an account for you!
          </Text>
        </View>
        <View style={{ gap: 12, width: width, alignItems: "center" }}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/(auth)/signup")}
          >
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
              Log In
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default WelcomeScreen;
