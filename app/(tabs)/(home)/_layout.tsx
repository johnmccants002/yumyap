// Simplify Layout by removing local state management of isOnboarded
import useAuth from "@/components/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
