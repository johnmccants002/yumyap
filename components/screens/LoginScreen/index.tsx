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
} from "react-native";

type Props = {};

const LoginScreen = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", paddingVertical: 60 }}
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
          <Text style={styles.description}>To access all the features.</Text>
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
            <TextInput placeholder="hello@yumyap.co" />
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
              <TextInput placeholder="**********" />
              <Pressable>
                <Text>Show</Text>
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
        <Pressable
          style={styles.button}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={styles.buttonText}>Log In</Text>
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
            Don't have an account?
          </Text>
        </Pressable>
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

export default LoginScreen;
