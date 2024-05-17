import { Stack } from "expo-router";
import React from "react";

type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="manage-account"
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: "Account",
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ title: "Privacy Policy" }}
      />
      <Stack.Screen
        name="terms-of-service"
        options={{ title: "Terms of Service" }}
      />
    </Stack>
  );
};

export default Layout;
