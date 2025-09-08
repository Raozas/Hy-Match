import { DownloadSimple } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileActionButtonsProps {
  saveButtonText: string;
  onSaveEdit: () => void;
  onDownloadProfile: () => void;
}

export const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  saveButtonText,
  onSaveEdit,
  onDownloadProfile,
}) => {
  return (
    <View className="flex-row justify-center items-center gap-[11px]">
      <TouchableOpacity onPress={onSaveEdit}>
        <View className="h-[60px] w-[90px] bg-[#ECF7F8] border border-[#48A6AC] rounded-lg flex px-[16px] py-[8px]">
          <Text className="text-[#48A6AC] font-semibold text-[28px]">
            {saveButtonText}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDownloadProfile}>
        <View className="h-[60px] w-[90px] bg-[#EFEDFF] border border-[#555AE9] rounded-lg flex-row px-[11px] py-[12px]">
          <Text className="text-[#555AE9] font-semibold text-[28px] mt-[-4px]">
            DL
          </Text>
          <DownloadSimple size={32} color="#555AE9" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
