import { Stack } from "expo-router";
import React from "react";

type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="welcome"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default Layout;
