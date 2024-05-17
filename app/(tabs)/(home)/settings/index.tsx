import useAuth from "@/components/hooks/useAuth";
import { colors } from "@/constants/Colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
} from "react-native";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { signout } = useAuth();

  const deleteAccount = () => {
    if (Platform.OS === "web") {
      // Implement a web-specific alert/dialog
      // This could be a custom modal or using a library like `react-modal`
      console.log(
        "Web alert not supported by default. Consider implementing a modal."
      );
      // Example of a simple confirm dialog in web environment:
      if (window.confirm("Are you sure you want to delete your account?")) {
        console.log("Delete Pressed");
      } else {
        console.log("Cancelled");
      }
    } else {
      // Use React Native's Alert for iOS and Android
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => console.log("Delete Pressed"),
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    }
  };

  const logout = () => {
    signout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, fontFamily: "JakartaMedium" }}>
          Account
        </Text>
        <Pressable
          style={{
            backgroundColor: colors.neutral["300"],
            borderRadius: 20,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => router.dismiss()}
        >
          <MaterialCommunityIcons
            name="close"
            color={colors.whiteBlack["100"]}
            size={24}
          />
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View
          style={{
            height: 52,
            width: 52,
            borderRadius: 26,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.whiteBlack["50"],
            borderColor: colors.neutral["400"],
            borderWidth: 1,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "JakartaMedium" }}>A</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "JakartaMedium",
              color: colors.neutral["700"],
            }}
          >
            willam1234@gmail.com
          </Text>
          <Pressable
            onPress={() => {
              console.log("navigating to manage account");
              router.push("/(tabs)/(home)/settings/manage-account");
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textDecorationLine: "underline",
                fontFamily: "JakartaMedium",
              }}
            >
              Manage Account
            </Text>
          </Pressable>
        </View>
        <View></View>
      </View>
      <View style={{ marginTop: 20, gap: 24 }}>
        <Text style={{ fontFamily: "SFProTextRegular", fontSize: 16 }}>
          Legal
        </Text>
        <View style={{ gap: 16 }}>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() =>
              router.push("/(tabs)/(home)/settings/privacy-policy")
            }
          >
            <Text style={{ fontSize: 16, fontFamily: "SFProTextRegular" }}>
              Privacy Policy
            </Text>
            <AntDesign name="right" size={20} />
          </Pressable>
          <View style={{ height: 1, backgroundColor: colors.neutral["300"] }} />
        </View>
        <View style={{ gap: 16 }}>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() =>
              router.push("/(tabs)/(home)/settings/terms-of-service")
            }
          >
            <Text style={{ fontSize: 16, fontFamily: "SFProTextRegular" }}>
              Terms of Services
            </Text>
            <AntDesign name="right" size={20} />
          </Pressable>
          <View style={{ height: 1, backgroundColor: colors.neutral["300"] }} />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View></View>
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
            <Text style={styles.logoutText}>Delete Account</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
    paddingTop: 20,
    gap: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
  },
  closeText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#e9ecef",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  logoutButton: {
    marginBottom: 40,
    padding: 20,
    borderRadius: "50%",
    backgroundColor: "#FFCDD1",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#C3010E",
    fontWeight: "bold",
  },
  inputLabelTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
    color: "#333", // Dark color for the title
  },
  deleteButton: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
