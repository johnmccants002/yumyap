import React from "react";
import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
    fontFamily: "Jakarta",
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
  const router = useRouter();
  const renderItem: React.FC<{ item: Item }> = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        router.push({
          pathname: `/(tabs)/saved/${item.title}`,
          params: { title: item.title },
        });
      }}
    >
      <Text style={styles.item}>{item.title}</Text>
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

  const renderSectionHeader: React.FC<{ section: { title: string } }> = ({
    section: { title },
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  const sectionData: { [key: string]: Item[] } = dummyData.reduce(
    (acc, curr) => {
      const date = new Date(curr.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let sectionTitle = "";
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
      acc[sectionTitle].push(curr);
      return acc;
    },
    {}
  );

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
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginHorizontal: 20, gap: 10 }}
      />
    </View>
  );
};

export default Index;
