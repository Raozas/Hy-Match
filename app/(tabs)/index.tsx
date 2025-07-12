import CardComponent from "@/components/CardComponent";
import HeaderComponent from "@/components/HeaderComponent";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function HomeScreen() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView>
        <HeaderComponent
          leftButton="List"
          title="仕事一覧"
          rightButton="Filter"
          onLeftPress={() => console.log("List pressed")}
          onRightPress={() => console.log("Filter pressed")}
        />
        <CardComponent className="ml-[16px]" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 130,
    width: 290,
    bottom: 0,
    left: 0,
  },
});
