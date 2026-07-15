import { StyleSheet } from "react-native";

import { Colors, Radius, Spacing } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Spacing.md,
  },

  label: {
    marginBottom: Spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.textPrimary,
  },

  error: {
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});