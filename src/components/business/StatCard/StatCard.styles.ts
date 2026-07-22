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
  alignItems: "center",
  justifyContent: "center",
  minHeight: 110,
  ...Shadows.sm,
}
});