import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

import useAuth from "@/components/hooks/useAuth";
import { colors } from "@/constants/Colors";
import { Text, View } from "react-native";

type Props = {};

const Layout = (props: Props) => {
  const { loaded, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(token, "THIS IS THE TOKEN", loaded, "THIS IS LOADED");
    if (loaded && !token) {
      router.replace("/(auth)/login");
    }
  }, [loaded]);
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
