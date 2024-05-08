import useAuth from "@/components/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
