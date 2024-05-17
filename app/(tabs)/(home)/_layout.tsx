// Simplify Layout by removing local state management of isOnboarded
import useAuth from "@/components/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          headerBackTitleVisible: false,
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
};

export default Layout;
