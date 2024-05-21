import useAuth from "@/components/hooks/useAuth";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          backgroundColor: colors.whiteBlack["50"],
          height: 80,
          width: 80,
          borderRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.neutral["400"],
        }}
      >
        <Text
          style={{
            fontFamily: "JakartaRegular",
            fontSize: 20,
            color: colors.neutral["700"],
          }}
        >
          {currentUser ? currentUser.email[0] : ""}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 16,
          paddingTop: 40,
        }}
      >
        <Text style={{ fontSize: 14, fontFamily: "SFProTextRegular" }}>
          Email
        </Text>
        <Text
          style={{
            fontFamily: "SFProTextRegular",
            fontSize: 14,
            color: colors.neutral["700"],
          }}
        >
          {currentUser ? currentUser.email : ""}
        </Text>
      </View>
      <View style={{ height: 1, backgroundColor: colors.neutral["300"] }} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View></View>
        <View>
          <Pressable
            style={styles.deleteButton}
            onPress={() =>
              router.push("/(tabs)/(home)/settings/delete-account")
            }
          >
            <Text style={styles.logoutText}>Delete Account</Text>
          </Pressable>
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
    color: "white",
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
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});

export default Page;
