import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

interface Item {
  title: string;
  date: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const dummyData: Item[] = [
  { title: "Pancetta Paradiso", date: "2024-05-06" },
  { title: "Duck Delight", date: "2024-05-06" },
  { title: "Spaghetti w/ Rich Meat Sauce", date: "2024-05-05" },
  { title: "Beef Wellington", date: "2024-05-04" },
  // Add more dummy data as needed
];

const MySectionList: React.FC = () => {
  const renderItem: React.FC<{ item: Item }> = ({ item }) => (
    <Text style={styles.item}>{item.title}</Text>
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
      />
    </View>
  );
};

export default MySectionList;
