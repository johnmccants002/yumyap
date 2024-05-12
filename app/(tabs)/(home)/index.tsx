import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  Pressable,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native"; // Import Keyboard module

import { Text, View } from "@/components/Themed";
import { colors } from "@/constants/Colors";
import { getRecipe } from "@/services/recipeService";
import ResultDisplay from "@/components/ResultDisplay";
import { Recipe } from "@/types";
import axios from "axios";

const fetchImages = async (searchQuery: string) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: searchQuery,
        client_id: process.env.EXPO_PUBLIC_UNSPLASH_API_KEY,
        per_page: 1,
      },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

// Usage

export default function Index() {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Recipe | null>(null);
  const { width } = useWindowDimensions();

  const onChange = (text: any) => {
    setChat(text.nativeEvent.text);
  };

  const onSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const handleClick = async () => {
    if (chat.length < 1) return;
    setLoading(true);
    setChat("");

    try {
      const result = await getRecipe(chat);
      setResult(result);
      setShowResult(true);
    } catch {
      console.log("Error getting result");
    } finally {
      setLoading(false);
    }
  };

  const dismissModal = () => {
    setResult(null);

    setShowResult(false);
  };

  const saveRecipe = () => {};

  useEffect(() => {
    fetchImages("Apple Pie").then((images) => {
      // handle images here
    });
  }, []);

  return (
    <>
      <Modal
        visible={showResult}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ResultDisplay recipe={result} dismiss={dismissModal} />
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={80}
      >
        {loading ? (
          <View
            style={{
              gap: 20,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.subTitle}>Generating Recipe</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                gap: 16,
                marginHorizontal: 16,
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <>
                <View>
                  <Text style={styles.title}>When Yappers</Text>
                  <Text style={styles.title}>Meet Food Cravings</Text>
                  <Text style={styles.subTitle}>
                    Ask, we suggest, you cook.
                  </Text>
                </View>
              </>
            </View>
            <Pressable
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25, // half of the height to create a pill shape
                paddingHorizontal: 40, // horizontal padding }} onPress={handleClick}>
                backgroundColor:
                  chat.length > 0 ? colors.primary["400"] : "grey",
              }}
              onPress={handleClick}
            >
              <Text
                style={{
                  color: colors.whiteBlack["50"],
                  fontFamily: "JakartaMedium",
                }}
              >
                Generate
              </Text>
            </Pressable>

            <TextInput
              placeholder="What's your craving..."
              style={{
                backgroundColor: colors.neutral["50"],
                padding: 14,
                alignSelf: "center",
                marginVertical: 40,

                width: width * 0.9,
                borderRadius: 18,
                height: 44,

                fontFamily: "JakartaMedium",
              }}
              placeholderTextColor={colors.neutral["500"]}
              value={chat}
              onChange={(text) => onChange(text)}
              onSubmitEditing={onSubmitEditing}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.whiteBlack["50"],
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
    fontFamily: "JakartaRegular",
    fontSize: 16,
    textAlign: "center",
    color: colors.neutral["600"],
    marginTop: 12,
  },
});
