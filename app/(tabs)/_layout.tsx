import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors, { colors } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { View, Text } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: "Yumyap",
          title: "Home",
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          ),
          headerTitle: () => <></>,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },

          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 34,
                  fontFamily: "SFProText",
                  color: colors.whiteBlack["100"],
                }}
              >
                Saved
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved/[detail]"
        options={{ tabBarButton: () => null }}
      />
    </Tabs>
  );
}
