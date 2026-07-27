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
  marginBottom: Spacing.md, // increase from sm

  borderWidth: 1,
  borderColor: Colors.border,

  ...Shadows.md,
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: Spacing.md, // slightly more space
},

body: {
  gap: Spacing.xs, // instead of marginBottom
},

title: {
  flexShrink: 1,
},

subject: {
  color: Colors.textSecondary,
},

footer: {
  marginTop: Spacing.lg,
  paddingTop: Spacing.sm,

  borderTopWidth: 1,
  borderTopColor: Colors.border,

  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

headerLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.xs,
},
  });