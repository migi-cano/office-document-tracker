import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
  flexBasis: "47%",
  minHeight: 110,
},

  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

title: {
  fontSize: 14,
  opacity: 0.75,
},

value: {
  marginTop: 18,
  fontSize: 30,
  fontWeight: "700",
},

  pressed: {
    opacity: 0.8,
  },
});