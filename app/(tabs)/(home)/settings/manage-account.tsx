import { colors } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const Page = (props: Props) => {
  return (
    <View style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
        }}
      >
        <Text>Email</Text>
        <Text>willam1234@gmail.com</Text>
      </View>
      <View style={{ height: 1, backgroundColor: colors.neutral["300"] }} />
    </View>
  );
};

export default Page;
