import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { useAuth } from "../providers/AuthProvider";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const router = useRouter();
  //   const { logout } = useAuth();

  const dismiss = () => {
    router.back();
  };

  const logout = () => {};

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

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
});

export default SettingsScreen;
