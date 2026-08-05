import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

interface StatusBadgeProps {
  label: string;
  color: string;
  backgroundColor: string;
}

export default function StatusBadge({
  label,
  color,
  backgroundColor,
}: StatusBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
        },
      ]}
    >
      <AppText
        style={[
          styles.text,
          {
            color,
          },
        ]}
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  text: {
    fontWeight: "600",
    fontSize: 12,
  },
});