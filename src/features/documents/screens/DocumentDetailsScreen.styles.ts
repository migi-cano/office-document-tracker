import { StyleSheet } from "react-native";
import { Radius, Spacing } from "../../../theme";

export const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  
  actions: {
  gap: Spacing.md,
},
});