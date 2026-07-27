import { Pressable, StyleSheet, Text } from "react-native";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export default function FilterChip({
  label,
  active = false,
  onPress,
}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        active && styles.activeContainer,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          active && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 90,
    height: 40,
    paddingHorizontal: 16,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,

    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  activeContainer: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  activeLabel: {
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.85,
  },
});