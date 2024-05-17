import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const deleteAccount = () => {};

  return (
    <View style={styles.container}>
      {/* Header with back button and title would be here */}
      <View style={{ gap: 20 }}>
        <Text style={styles.warningText}>
          Before you go ahead with deleting your account, please take a moment
          to understand what will happen to your data:
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Your profile details, recipes, and settings will be removed.
          </Text>
          <Text style={styles.bulletPoint}>
            • Your search history, threads, and any other content you've shared
            will be deleted.
          </Text>
          <Text style={styles.bulletPoint}>
            • All data will be permanently deleted 30 days after account
            deletion. Once deleted, your data will not be used in YumYap. Keep
            in mind that deleting your account can't be undone.
          </Text>
        </View>
        <Text style={styles.confirmationText}>
          Please confirm that you would like to delete your account by typing
          your email again below.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <Pressable style={styles.deleteButton} onPress={deleteAccount}>
          <Text style={styles.logoutText}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingTop: 80,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  warningText: {
    fontSize: 16,
    marginBottom: 16,
  },
  bulletPoints: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Page;
