import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  label: {
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  value: {
    color: Colors.textPrimary,
  },
});