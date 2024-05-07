import { StyleSheet, TextInput, useWindowDimensions } from "react-native";

import { Text, View } from "@/components/Themed";
import { colors } from "@/constants/Colors";

export default function TabOneScreen() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ gap: 16 }}>
        <Text style={styles.title}>When Yappers Meet Food Cravings</Text>
        <Text style={styles.subTitle}>Ask, we suggest, you cook.</Text>
      </View>

      <TextInput
        placeholder="What's your craving..."
        style={{
          backgroundColor: colors.neutral["50"],

          padding: 14,
          alignSelf: "center",
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          borderRadius: 18,
          height: 36,
          paddingLeft: 20,
          fontFamily: "Jakarta",
        }}
        placeholderTextColor={colors.neutral["500"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontFamily: "Zodiak",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  subTitle: {
    fontFamily: "Jakarta",
    fontSize: 16,
    textAlign: "center",
    color: colors.neutral["600"],
  },
});
