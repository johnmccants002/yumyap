import { colors } from "@/constants/Colors";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Recipe } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveRecipe } from "@/services/recipeService";
import useAuth from "./hooks/useAuth";

const recipeData = {
  name: "Spaghetti all'arrabbiata",
  cuisine: "Italian",
  image:
    "https://www.simplyrecipes.com/wp-content/uploads/2014/06/spaghetti-arrabbiata-horiz-a-1600.jpg",
  people: 4,
  cookTime: "35 minutes",
  ingredients: {
    "1": "1 pound spaghetti",
    "2": "4 tablespoons olive oil",
    "3": "4 garlic cloves, thinly sliced",
    "4": "1/2 teaspoon red pepper flakes (adjust to taste for desired spice level)",
    "5": "1 can (28 ounces) crushed tomatoes",
    "6": "Salt to taste",
    "7": "Freshly ground black pepper to taste",
    "8": "Fresh basil leaves, chopped (for garnish)",
    "9": "Freshly grated Parmesan cheese (optional, for serving)",
  },
  steps: {
    "1": "Cook the spaghetti according to the package instructions in a large pot of boiling salted water until al dente. Drain the spaghetti, reserving 1/2 cup of the pasta water.",
    "2": "In a large skillet, heat the olive oil over medium heat. Add the sliced garlic and red pepper flakes, and cook, stirring, until the garlic is golden but not browned, about 1-2 minutes.",
    "3": "Carefully add the crushed tomatoes to the skillet, and season with salt and pepper. Bring to a simmer and cook for 15-20 minutes, stirring occasionally, until the sauce thickens slightly.",
    "4": "Add the cooked spaghetti to the skillet with the sauce, along with the reserved pasta water. Toss to coat the spaghetti evenly with the sauce.",
    "5": "Garnish with chopped fresh basil leaves and serve hot. Offer freshly grated Parmesan cheese on the side, if desired.",
    "6": "Buon Appetito!",
  },
};

const ResultDisplay = (props: {
  recipe: Recipe | null;
  dismiss: () => void;
}) => {
  const { recipe, dismiss } = props;
  const { user } = useAuth();

  const saveUserRecipe = async () => {
    // const args = {recipe: recipe, userId: }
  };
  if (!recipe) return <></>;
  return (
    <>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={() => {
              dismiss();
            }}
            style={{ position: "relative", top: 0, alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              color={"black"}
              size={24}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("Saving recipe");
            }}
            style={{
              position: "relative",
              top: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Save Recipe</Text>
            <MaterialCommunityIcons
              name="bookmark-outline"
              color={"black"}
              size={24}
            />
          </Pressable>
        </View>
        <Image
          source={require("@/assets/images/food.png")}
          style={styles.image}
        />
        <Text style={styles.header}>{recipe.name}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.cuisine}>{recipe.cuisine}</Text>
          {/* <Text style={styles.cuisine}>Serves {recipe.people}</Text> */}
          <View style={styles.preparationTime}>
            <Text style={styles.preparationTimeText}>{recipe.cookTime}</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Follow these step-by-step instructions to prepare this delicious
          Italian dish:
        </Text>
        {Object.entries(recipe.steps).map(([index, step], idx) => (
          <View key={idx} style={styles.stepContainer}>
            <Text style={styles.stepContent}>{`${parseInt(
              index
            )}. ${step}`}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
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
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  cuisine: {
    fontSize: 18,
    color: colors.neutral["700"],
  },
  preparationTime: {
    backgroundColor: colors.neutral["100"],
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  preparationTimeText: {
    fontSize: 13,
    color: colors.neutral["900"],
  },
  description: {
    marginBottom: 10,
    fontSize: 14,
    color: colors.neutral["800"],
  },
  stepContainer: {
    marginBottom: 10,
  },
  stepContent: {
    paddingLeft: 20,
    fontSize: 14,
    color: colors.neutral["800"],
    paddingTop: 8,
  },
});

export default ResultDisplay;
