import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSavedMeals } from "@/components/providers/SavedProvider";

type Props = {};

const recipeData = {
  title: "Blaze & Honey Twist",
  cuisine: "Italian",
  rating: 4.5,
  preparationTime: "25min",
  steps: [
    {
      title: "Ingredients",
      content: [
        "Spaghetti - 400 grams",
        "Pancetta - 150 grams, diced",
        "Free Range Egg - preferably free-range",
        "Parmesan Cheese - 100 grams, freshly grated",
        "Pecorino Cheese - 50 grams, freshly grated",
        "Black Pepper - freshly ground, to taste",
        "Garlic - 1 clove (optional)",
        "Parsley - A small handful, finely chopped (for garnish)",
        "Salt - to taste",
      ],
    },
    {
      title: "Prepare the ingredients",
      content: [
        "Boil a large pot of salted water for the spaghetti.",
        "While the water is heating, dice the pancetta into small cubes.",
      ],
    },
    {
      title: "Cook the Spaghetti",
      content: [
        "Once the water is boiling, add the spaghetti and cook according to the package instructions until al dente.",
        "Remove about a cup of pasta water and then drain the pasta.",
      ],
    },
    {
      title: "Cook the Pancetta",
      content: [
        "While the pasta is cooking, heat a large skillet over medium heat.",
        "Add the diced pancetta and cook until it is crispy and golden.",
        "If you like, you can add minced garlic in the skillet to cook for extra flavor.",
        "Remove the garlic before proceeding if you've used it.",
      ],
    },
    {
      title: "Combine Pasta and Pancetta",
      content: [
        "Add the drained spaghetti directly to the skillet with the pancetta.",
        "Toss well to coat the pasta in the pancetta fat.",
        "Remove skillet from heat to prevent the eggs from scrambling.",
      ],
    },
    {
      title: "Add the Egg and Cheese Mixture",
      content: [
        "Quickly pour the egg and cheese mixture over the hot pasta, stirring rapidly to coat the spaghetti without cooking the egg.",
        "The heat of the pasta will gently cook the egg to create a creamy sauce.",
        "If the sauce is too thick, add a little of the reserved pasta water to loosen it up.",
      ],
    },
    {
      title: "Garnish and Serve",
      content: [
        "Taste and adjust the seasoning with salt and more black pepper if needed.",
        "Serve immediately, garnished with finely chopped parsley and extra grated cheese if desired.",
      ],
    },
  ],
};

const Page = (props: Props) => {
  const params = useLocalSearchParams();
  const { savedMeals, getMealById } = useSavedMeals();

  const meal = getMealById(`${params.detail}`)?.meal;
  console.log("THIS IS THE MEAL", meal);

  return (
    <>
      <Stack.Screen options={{ title: `${meal?.name}` }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Image
          source={require("@/assets/images/food.png")}
          style={styles.image}
        />
        <Text style={styles.header}>{meal?.name}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.cuisine}>{meal?.cuisine}</Text>
          <View style={styles.rating}>
            <Text style={styles.cuisine}>{recipeData.rating}</Text>
            <FontAwesome name="star" size={24} color={colors.orange["700"]} />
          </View>
        </View>
        <View style={styles.preparationTime}>
          <Text
            style={{
              color: colors.neutral["900"],
              fontFamily: "SFProTextRegular",
              fontSize: 13,
            }}
          >
            {meal?.cookTime}
          </Text>
        </View>
        <Text>Ingredients</Text>
        {Object.entries(meal?.ingredients).map(
          ([stepNumber, stepDescription], idx) => (
            <View key={idx} style={styles.stepContainer}>
              <Text key={idx} style={styles.stepContent}>
                {stepDescription}
              </Text>
            </View>
          )
        )}
        <Text style={styles.description}>
          {`To prepare ${meal?.name} follow these step-by-step instructions:`}
        </Text>
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
    width: 60,
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
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
});

export default Page;
