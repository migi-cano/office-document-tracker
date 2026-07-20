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
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
});