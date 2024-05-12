import { Redirect, Stack } from "expo-router";
import React from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";

type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
