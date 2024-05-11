import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native"; // Import Keyboard module

import { Text, View } from "@/components/Themed";
import { colors } from "@/constants/Colors";
import { getRecipe } from "@/services/recipeService";
import ResultDisplay from "@/components/ResultDisplay";
import { Recipe } from "@/types";

export default function Index() {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Recipe | null>(null);

  const onChange = (text: any) => {
    setChat(text.nativeEvent.text);
  };

  const onSubmitEditing = () => {
    console.log("Chat submitted:", chat);
    Keyboard.dismiss();
  };

  const handleClick = async () => {
    console.log("clicked");
    setLoading(true);
    setChat("");

    try {
      const result = await getRecipe(chat);
      console.log(JSON.stringify(result));
      setResult(result);
      setShowResult(true);
    } catch {
      console.log("Error getting result");
    } finally {
      setLoading(false);
    }
  };

  const dismissModal = () => {
    console.log("DISMISS MODAL BEING CALLED");
    setResult(null);

    setShowResult(false);
  };

  const saveRecipe = () => {};

  return (
    <>
      <Modal
        visible={showResult}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ResultDisplay recipe={result} dismiss={dismissModal} />
      </Modal>
      <View style={styles.container}>
        {loading ? (
          <View style={{ gap: 20 }}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.subTitle}>Generating Recipe</Text>
          </View>
        ) : (
          <>
            <View style={{ gap: 16, marginHorizontal: 16 }}>
              <>
                <View>
                  <Text style={styles.title}>When Yappers</Text>
                  <Text style={styles.title}>Meet Food Cravings</Text>
                </View>

                <Text style={styles.subTitle}>Ask, we suggest, you cook.</Text>
              </>
            </View>

            <TextInput
              placeholder="What's your craving..."
              style={{
                backgroundColor: colors.neutral["50"],
                padding: 14,
                alignSelf: "center",
                position: "absolute",
                bottom: 40,
                left: 20,
                right: 20,
                borderRadius: 18,
                height: 44,
                paddingLeft: 20,
                fontFamily: "JakartaMedium",
              }}
              placeholderTextColor={colors.neutral["500"]}
              value={chat}
              onChange={(text) => onChange(text)}
              onSubmitEditing={onSubmitEditing}
            />
            <Pressable style={{ height: 30, width: 60 }} onPress={handleClick}>
              <Text>Generate</Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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
  },
});
