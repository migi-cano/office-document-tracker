import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../../theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },

  timeline: {
    width: 28,
    alignItems: "center",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2563EB",
    marginTop: 6,
  },

  line: {
    flex: 1,
    width: 2,
    backgroundColor: "#CBD5E1",
    marginTop: 4,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginLeft: Spacing.sm,
    ...Shadows.sm,
  },

  action: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  status: {
    fontSize: 14,
    color: "#2563EB",
    marginBottom: 6,
  },

  meta: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#94A3B8",
  },
});