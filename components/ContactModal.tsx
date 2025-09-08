import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ChatCircle, EnvelopeSimple, Phone, X } from "phosphor-react-native";
import React from "react";
import { Linking, Modal, Text, TouchableOpacity, View } from "react-native";

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
  jobTitle?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    company?: string;
  };
}

const ContactModal: React.FC<ContactModalProps> = ({
  visible,
  onClose,
  jobTitle,
  contactInfo,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handlePhonePress = () => {
    if (contactInfo?.phone) {
      Linking.openURL(`tel:${contactInfo.phone}`);
    } else {
      // Default phone number or show message
      Linking.openURL(`tel:+1234567890`);
    }
    onClose();
  };

  const handleEmailPress = () => {
    const subject = `${t("contact.emailSubject")} ${jobTitle || t("contact.job")}`;
    if (contactInfo?.email) {
      Linking.openURL(
        `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}`
      );
    } else {
      // Default email or show message
      Linking.openURL(
        `mailto:contact@example.com?subject=${encodeURIComponent(subject)}`
      );
    }
    onClose();
  };


  const contactOptions = [
    {
      icon: Phone,
      label: t("contact.phone"),
      onPress: handlePhonePress,
      color: "#10B981", // Green
    },
    {
      icon: EnvelopeSimple,
      label: t("contact.email"),
      onPress: handleEmailPress,
      color: "#3B82F6", // Blue
    }
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 24,
            width: "100%",
            maxWidth: 350,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {t("contact.howToContact")}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: colors.background,
                borderRadius: 20,
                padding: 6,
              }}
            >
              <X size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Job Title */}
          {jobTitle && (
            <View className="mb-2">
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {jobTitle}
              </Text>
            </View>
          )}

          {/* Company Name */}
          {contactInfo?.company && (
            <View className="mb-4">
              <Text
                style={{
                  color: colors.text + "80",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {contactInfo.company}
              </Text>
            </View>
          )}

          {/* Contact Options */}
          <View className="space-y-3 flex-row">
            {contactOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  width: "50%",
                }}
                className="mb-3"
              >
                <View
                  style={{
                    backgroundColor: option.color + "20",
                    borderRadius: 8,
                    padding: 8,
                    marginRight: 12,
                  }}
                >
                  <option.icon
                    size={20}
                    color={option.color}
                    weight="regular"
                  />
                </View>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;
