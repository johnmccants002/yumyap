import { Stack, useRouter } from "expo-router";
import React from "react";

import { SavedProvider } from "@/components/providers/SavedProvider";
import { colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

const Layout = (props: Props) => {
  const router = useRouter();
  return (
    <SavedProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <></>,
            headerLeft: () => (
              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: "SFProTextSemibold",
                    color: colors.whiteBlack["100"],
                  }}
                >
                  Saved
                </Text>
              </View>
            ),
            headerRight: () => (
              <Pressable
                style={{ marginRight: 20 }}
                onPress={() => router.push("/(tabs)/saved/settings")}
              >
                <MaterialCommunityIcons name="cog" color="gray" size={24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="[detail]"
          options={{
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{ title: "Settings", headerBackTitleVisible: false }}
        />
      </Stack>
    </SavedProvider>
  );
};

export default Layout;
