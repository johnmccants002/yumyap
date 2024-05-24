import { Stack, useRouter, Link } from "expo-router";
import React from "react";

import { SavedProvider } from "@/components/providers/SavedProvider";
import { colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

const Layout = (props: Props) => {
  const router = useRouter();
  return (
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
        }}
      />
      <Stack.Screen
        name="[detail]"
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
