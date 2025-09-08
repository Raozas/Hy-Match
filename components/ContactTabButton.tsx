import { useTheme } from "@/contexts/ThemeContext";
import { Phone } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

interface ContactTabButtonProps {
  onPress: () => void;
  focused: boolean;
}

export const ContactTabButton: React.FC<ContactTabButtonProps> = ({
  onPress,
  focused,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
      }}
    >
      <Phone
        size={28}
        color={focused ? colors.primary : colors.textSecondary}
        weight="fill"
      />
    </TouchableOpacity>
  );
};
