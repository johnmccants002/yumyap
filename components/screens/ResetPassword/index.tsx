import { colors } from "@/constants/Colors";
import React from "react";
import { useWindowDimensions } from "react-native";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

type Props = {};

const ResetPassword = (props: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <View style={{ flex: 1, justifyContent: "center", gap: 20 }}>
        <View style={{ width: width, paddingHorizontal: 12, gap: 8 }}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.description}>Change Your Password</Text>
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
          <Text>New Password</Text>
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
          <Text>Repeat Password</Text>
          <TextInput placeholder="hello@yumyap.co" />
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => console.log("Pressed")}>
        <Text style={styles.buttonText}>Change Password</Text>
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
    maxWidth: 400,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 20,
    fontFamily: "JakartaRegular",
    color: colors.neutral["700"],
  },
  linkTitle: {},
});

export default ResetPassword;
