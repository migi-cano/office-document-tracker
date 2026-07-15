import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
});