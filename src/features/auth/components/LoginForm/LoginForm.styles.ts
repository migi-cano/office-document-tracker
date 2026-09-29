import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
  },

  heading: {
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 7,
    maxWidth: 300,
    fontSize: 14,
    lineHeight: 20,
    color: "#CBD5E1",
    textAlign: "center",
  },

  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  passwordField: {
    marginTop: 4,
  },

  buttonContainer: {
    marginTop: 8,
  },
});