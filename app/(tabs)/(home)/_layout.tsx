import useAuth from "@/components/hooks/useAuth";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

type Props = {};

const Layout = (props: Props) => {
  const { loaded, token } = useAuth();
  const [isOnboarded, setIsOnboarded, isOnboardedLoading] = useLocalStorage(
    "onboarded",
    "false"
  );
  const router = useRouter();

  useEffect(() => {
    console.log("IN THIS USE EFFECT LAYOUT HOME");
    if (!isOnboardedLoading && loaded && !token) {
      if (!isOnboarded) {
        router.replace("/(auth)/onboarding");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [loaded, isOnboardedLoading, isOnboarded, token]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
