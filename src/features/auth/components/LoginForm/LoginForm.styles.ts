import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  logoContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  logo: {
    marginTop: 30,
    width: 300,
    height: 92,
  },

  content: {
    flex: 1,
    paddingTop: 136,
  },

  heading: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },

  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "700",
    color: "#202020",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
  },

  loginPanel: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#07079A",

    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },

  field: {
    marginBottom: 12,
  },

  label: {
    marginBottom: 7,
    fontSize: 13,
    fontWeight: "500",
    color: "#FFFFFF",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
    minHeight: 48,
  },

  inputIcon: {
    position: "absolute",
    top: 14,
    left: 16,
    zIndex: 2,
  },

  input: {
    width: "100%",
    minHeight: 48,
    margin: 0,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 10,

    borderWidth: 0,
    borderRadius: 24,

    backgroundColor: "#FFFFFF",

    color: "#374151",
  },

  passwordInput: {
    paddingRight: 48,
  },

  passwordToggle: {
    position: "absolute",
    top: 14,
    right: 16,
    zIndex: 2,
  },

  buttonContainer: {
    marginTop: 12,
  },
  loginError: {
  marginTop: 2,
  marginBottom: 8,
  fontSize: 13,
  color: "#FCA5A5",
},

loadingOverlay: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  zIndex: 100,
},

loadingLogo: {
  width: 280,
  height: 100,
},

loadingIndicator: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 18,
},

loadingText: {
  marginLeft: 10,
  fontSize: 14,
  fontWeight: "500",
  color: "#07079A",
},
});