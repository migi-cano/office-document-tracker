import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  accountInfo: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    marginTop: 3,
    fontSize: 14,
    color: "#6B7280",
  },

  role: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  section: {
    marginTop: 24,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  passwordButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  passwordIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  passwordInfo: {
    flex: 1,
    marginLeft: 14,
  },

  passwordTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  passwordSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },
});