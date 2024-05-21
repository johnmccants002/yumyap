import { useSavedMeals } from "@/components/providers/SavedProvider";
import { colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {};

const Page = (props: Props) => {
  const params = useLocalSearchParams();
  const { getMealById } = useSavedMeals();
  const [imageLoading, setImageLoading] = useState(false);

  const meal = getMealById(`${params.detail}`)?.meal;

  return (
    <>
      <Stack.Screen options={{ title: `${meal?.name}` }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Image
          source={{ uri: meal?.image }} // Using the state imageUrl to display the image
          style={styles.image}
          defaultSource={require("@/assets/images/food.png")} // Optional: Placeholder image while loading or if no image
        />

        <Text style={styles.header}>{meal?.name}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.cuisine}>{meal?.cuisine}</Text>
          <View style={styles.preparationTime}>
            <Text style={styles.preparationTimeText}>{meal?.cookTime}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#EAECFF",
            width: 120,
            padding: 8,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Ingredients</Text>
        </View>
        {Object.entries(meal?.ingredients).map(
          ([stepNumber, stepDescription], idx) => (
            <View key={idx} style={styles.stepContainer}>
              <Text key={idx} style={styles.stepContent}>
                {stepDescription}
              </Text>
            </View>
          )
        )}
        <View
          style={{
            backgroundColor: "#EAECFF",
            width: 80,
            padding: 12,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>{`Steps`}</Text>
        </View>
        {Object.entries(meal.steps).map(
          ([stepNumber, stepDescription], idx) => (
            <View key={idx} style={styles.stepContainer}>
              <Text key={idx} style={styles.stepContent}>
                {stepNumber}. {stepDescription}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 8,
    fontFamily: "Zodiak",
  },
  subHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  cuisine: {
    fontSize: 18,
    fontFamily: "SFProTextRegular",
    color: colors.neutral["700"],
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  preparationTime: {
    backgroundColor: colors.neutral["100"],
    width: 80,
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    fontFamily: "JakartaMedium",
    fontSize: 14,
    color: colors.neutral["800"],
  },
  title: {
    fontFamily: "JakartaMedium",
    fontSize: 14,
    color: colors.neutral["800"],
  },
  stepContainer: {
    marginBottom: 10,
    gap: 8,
  },
  stepHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepContent: {
    paddingLeft: 20,
    fontFamily: "JakartaMedium",
    fontSize: 14,
    color: colors.neutral["800"],
    paddingTop: 8,
  },
  preparationTimeText: {
    fontSize: 13,
    color: colors.neutral["900"],
    fontFamily: "SFProTextRegular",
  },
});

export default Page;
