import HeaderComponent from "@/components/HeaderComponent";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ListComponent from "@/components/ListComponent";

export default function TabTwoScreen() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
        <HeaderComponent
          leftButton="List"
          title="選択した仕事"
          rightButton="Filter"
          onLeftPress={() => console.log("List pressed")}
          onRightPress={() => console.log("Filter pressed")}
        />
        <ListComponent />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
