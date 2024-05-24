import { colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { fetchImages } from "@/services/photoService";
import { useSavedMeals } from "./providers/SavedProvider";

const ResultDisplay = (props: {
  recipe: Recipe | null;
  dismiss: () => void;
}) => {
  const { recipe, dismiss } = props;
  const { user, token } = useAuth();
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const { refreshMeals } = useSavedMeals();

  useEffect(() => {
    if (recipe && recipe.name) {
      fetchImages(recipe.name)
        .then((images) => {
          if (images && images.length > 0) {
            setImageUrl(images[0].urls.regular); // Setting the image URL from the fetched data
            setImageLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [recipe]);

  const saveUserRecipe = async () => {
    if (!recipe || !token) return;

    const updatedRecipe = { ...recipe, image: imageUrl ? imageUrl : "" };
    const args = { recipe: updatedRecipe, userId: user.user.id, token: token };
    try {
      await saveRecipe(args);
      refreshMeals();
      setSaved(true);
    } catch (err) {
      console.log("Unable to save the recipe", err);
    }
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
              saveUserRecipe();
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
              name={saved ? "bookmark" : "bookmark-outline"}
              color={"black"}
              size={24}
            />
          </Pressable>
        </View>
        {imageLoading ? (
          <View style={styles.image}>
            <ActivityIndicator />
          </View>
        ) : (
          <Image
            source={{ uri: imageUrl ? imageUrl : "" }} // Using the state imageUrl to display the image
            style={styles.image}
            defaultSource={require("@/assets/images/food.png")} // Optional: Placeholder image while loading or if no image
          />
        )}
        <Text style={styles.header}>{recipe.name}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.cuisine}>{recipe.cuisine}</Text>
          {/* <Text style={styles.cuisine}>Serves {recipe.people}</Text> */}
          <View style={styles.preparationTime}>
            <Text style={styles.preparationTimeText}>{recipe.cookTime}</Text>
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
        {Object.entries(recipe.ingredients).map(
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
  title: {
    fontFamily: "JakartaMedium",
    fontSize: 14,
    color: colors.neutral["800"],
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
    fontFamily: "SFProTextRegular",
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
