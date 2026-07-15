import { TextInput, View } from "react-native";

import AppText from "../AppText";
import { styles } from "./AppInput.styles";
import { AppInputProps } from "./AppInput.types";

export default function AppInput({
  label,
  error,
  required,
  style,
  ...props
}: AppInputProps) {
  return (
    <View style={styles.container}>
      {label && (
  <AppText style={styles.label}>
    {label}
    {required && (
      <AppText color="red">
        {" *"}
      </AppText>
    )}
  </AppText>
)}
      <TextInput
        {...props}
        style={[styles.input, style]}
      />

      {error && (
        <AppText style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
}