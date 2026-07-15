import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    ...Shadows.sm,
  },
});