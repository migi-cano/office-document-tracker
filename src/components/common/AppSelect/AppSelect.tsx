import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

import { styles } from "./AppSelect.styles";
import { AppSelectProps } from "./AppSelect.types";

export default function AppSelect({
  label,
  value,
  options,
  onChange,
  error,
  enabled = true,
  placeholder = "Select...",
  
}: AppSelectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.pickerContainer}>
        <Picker
          enabled={enabled}
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item
            label={placeholder}
            value=""
            enabled={false}
          />

          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}