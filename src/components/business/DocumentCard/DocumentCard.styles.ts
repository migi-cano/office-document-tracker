import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },

  header: {
    marginBottom: Spacing.sm,
  },

  subject: {
    marginBottom: Spacing.sm,
  },

  footer: {
    marginTop: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});