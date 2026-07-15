import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl,
  },

  title: {
    marginTop: Spacing.md,
  },

  description: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});