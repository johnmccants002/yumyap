import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSavedRecipes } from "@/services/recipeService";
import useAuth from "@/components/hooks/useAuth";
import { SavedMealsObject, SavedMealsResponse } from "@/types";
interface Item {
  title: string;
  date: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: colors.whiteBlack["50"],
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: colors.neutral["500"],
  },
  item: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
  },
  itemContainer: {
    backgroundColor: colors.neutral["50"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,

    borderRadius: 8,
  },
});

const dummyData: Item[] = [
  { title: "Pancetta Paradiso", date: "2024-05-06" },
  { title: "Duck Delight", date: "2024-05-06" },
  { title: "Spaghetti w/ Rich Meat Sauce", date: "2024-05-05" },
  { title: "Beef Wellington", date: "2024-05-04" },
  // Add more dummy data as needed
];

const Index: React.FC = () => {
  const { user, token } = useAuth();
  const [recipes, setRecipes] = useState<SavedMealsObject[] | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to track loading status

  const getSaved = async () => {
    if (!token || !user.user.id) {
      setLoading(false);
      return;
    }
    const args = { userId: user.user.id, token: token };
    const result = await getSavedRecipes(args);
    setRecipes(result);
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    getSaved();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        router.push(`/(tabs)/saved/${item.name}`);
      }}
    >
      <Text style={styles.item}>{item.name}</Text>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color={colors.neutral["900"]}
        />
      </Pressable>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No recipes found.</Text>
      </View>
    );
  }

  const sectionData = recipes.reduce((acc, curr) => {
    const date = new Date(curr.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let sectionTitle;
    if (date.toDateString() === today.toDateString()) {
      sectionTitle = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      sectionTitle = "Yesterday";
    } else {
      sectionTitle = date.toLocaleDateString();
    }

    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push({
      id: curr._id,
      name: curr.meal.name,
    });
    return acc;
  }, {});

  const sections = Object.keys(sectionData).map((key) => ({
    title: key,
    data: sectionData[key],
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={{ marginHorizontal: 20, gap: 10 }}
      />
    </View>
  );
};

export default Index;
