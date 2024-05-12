import useLocalStorage from "@/components/hooks/useLocalStorage";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  useWindowDimensions,
  Button,
  Pressable,
} from "react-native";

// onboardingData.ts
type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Get Cooking In Seconds",
    description: "Turn your cravings into recipes instantly.",
    image: require("@/assets/images/imageOne.png"), // Update with your image path
  },
  {
    id: "2",
    title: "Your Culinary Canvas",
    description: "Type, tap, and taste your creations.",
    image: require("@/assets/images/imageTwo.png"), // Update with your image path
  },
  {
    id: "3",
    title: "Save And Share Your Creations",
    description: "Keep your recipes close, share them far.",
    image: require("@/assets/images/imageThree.png"), // Update with your image path
  },
];

type Props = {};

const Page = (props: Props) => {
  const { height, width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useLocalStorage("onboarded", "false");

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      setIsOnboarded("true");
      router.push("/(auth)/login");
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => (
          <View style={{ width: width, height: height / 1.75, gap: 16 }}>
            <Image source={item.image} style={styles.image} />
            <View style={{ gap: 12 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        scrollEnabled
        style={{ height: height / 1.5 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Good for smooth performance
      />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1.8,
        }}
      >
        <View style={styles.dotView}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <Pressable
          style={{
            width: width * 0.9,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary["700"],
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={scrollToNext}
        >
          <Text
            style={{
              color: colors.whiteBlack["50"],
              fontFamily: "InterSemibold",
              fontSize: 16,
            }}
          >
            {currentIndex === 2 ? "Get Started" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    fontFamily: "Zodiak",
    marginHorizontal: 20,
    maxWidth: 300,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 20,
    fontFamily: "JakartaRegular",
    color: colors.neutral["700"],
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000000",
  },
});

export default Page;
