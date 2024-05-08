import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import useAuth from "@/components/hooks/useAuth";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
