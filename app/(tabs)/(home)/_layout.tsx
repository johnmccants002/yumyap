// Simplify Layout by removing local state management of isOnboarded
import useAuth from "@/components/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  const { loaded, token, isOnboarded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !token) {
      if (!isOnboarded) {
        router.replace("/(auth)/onboarding");
      } else {
        console.log("IN ELSE GO TO LOGIN");
        router.replace("/(auth)/login");
      }
    }
  }, [loaded, isOnboarded, token]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{}} />
    </Stack>
  );
};

export default Layout;
