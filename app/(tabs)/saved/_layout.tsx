import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import React from "react";

import { colors } from "@/constants/Colors";
import { Text, View } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

type Props = {};

const Layout = (props: Props) => {
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
