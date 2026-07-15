import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },

  text: {
    color: Colors.white,
    fontWeight: "600",
  },
});