import { colors } from "@/constants/Colors";
import { deleteRecipe } from "@/services/recipeService";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useAuth from "@/components/hooks/useAuth";
import { useSavedMeals } from "@/components/providers/SavedProvider";
import { useActionSheet } from "@expo/react-native-action-sheet";

interface Meal {
  _id: string;
  createdAt: string;
  meal: {
    name: string;
  };
}

interface Section {
  title: string;
  data: { id: string; name: string }[];
}

const Index: React.FC = () => {
  const { token } = useAuth();
  const router = useRouter();
  const { savedMeals, isLoading, refreshMeals } = useSavedMeals();
  const { showActionSheetWithOptions } = useActionSheet();

  const recipeOptionsPressed = (id: string) => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (i?: number) => {
        switch (i) {
          case 1:
            break;
          case 0:
            Alert.alert("Are you sure you want to delete this recipe?", "", [
              {
                text: "Cancel",
                onPress: () => console.log("Canceling"),
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: async () => {
                  await deleteRecipe(id, token ? `${token}` : "");

                  refreshMeals();
                },
                style: "destructive",
              },
            ]);
        }
      }
    );
  };

  useEffect(() => {
    refreshMeals();
  }, []);

  const renderItem = ({ item }: any) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        router.push(`/(tabs)/saved/${item.id}`);
      }}
    >
      <Text style={styles.item}>{item.name}</Text>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => recipeOptionsPressed(item.id)}
      >
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color={colors.neutral["900"]}
        />
      </Pressable>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!savedMeals || savedMeals.length === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingHorizontal: 60,
          gap: 20,
          backgroundColor: colors.whiteBlack["50"],
        }}
      >
        <Image source={require("@/assets/images/EmptySaved.png")} />
        <Text
          style={{ textAlign: "center", fontFamily: "Zodiak", fontSize: 32 }}
        >
          No Yummy Food Saved For Later
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "JakartaRegular",
            fontSize: 16,
            color: colors.neutral["600"],
          }}
        >
          Saved recipes will show here
        </Text>
      </View>
    );
  }
  const sectionData = Object.entries(
    savedMeals.reduce<Record<string, { id: string; name: string }[]>>(
      (acc, curr: Meal) => {
        const date = new Date(curr.createdAt);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        let sectionTitle: string;
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
      },
      {}
    )
  );

  const sortedSectionData: Section[] = sectionData
    .sort(([a], [b]) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === "Yesterday") return -1;
      if (b === "Yesterday") return 1;
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    })
    .map(([title, data]) => ({
      title,
      data,
    }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sortedSectionData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={{ marginHorizontal: 20, gap: 10 }}
      />
    </View>
  );
};

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

export default Index;
