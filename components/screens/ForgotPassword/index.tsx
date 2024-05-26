import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";

type Props = {};

const ForgotPassword = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", gap: 20 }}>
        <View style={{ width: width, paddingHorizontal: 12, gap: 8 }}>
          <Text style={styles.title}>Let's Help You Get Back To Us</Text>
          <Text style={styles.description}>
            Let's help you reset your password
          </Text>
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
          <Text>Email Address</Text>
          <TextInput placeholder="hello@yumyap.co" />
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
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

export default ForgotPassword;
