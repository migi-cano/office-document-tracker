import { StyleSheet } from "react-native";
import { Spacing } from "../../../theme";

export const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: Spacing.xs,

    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,

    borderRadius: 999,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});