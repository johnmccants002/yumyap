import useAuth from "@/components/hooks/useAuth";
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

  const dismiss = () => {
    router.back();
  };

  const logout = () => {
    signout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text style={styles.inputLabelTitle}>Name: </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.inputLabelTitle}>Email: </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
            <Text style={styles.logoutText}>Delete Account</Text>
          </TouchableOpacity>
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
    paddingTop: 80,
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
    borderRadius: 10,
    backgroundColor: "#5c6ac4",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#ffffff",
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
