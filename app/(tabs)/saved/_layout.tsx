import { Stack, useRouter } from "expo-router";
import React from "react";

import useAuth from "@/components/hooks/useAuth";
import { SavedProvider } from "@/components/providers/SavedProvider";
import { colors } from "@/constants/Colors";
import { Text, View } from "react-native";

type Props = {};

const Layout = (props: Props) => {
  return (
    <SavedProvider>
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
    </SavedProvider>
  );
};

export default Layout;
