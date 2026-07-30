import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownItem {
  label: string;
  value: string;
}

interface AppDropdownProps {
  label: string;
  placeholder?: string;
  data: DropdownItem[];
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
}

export default function AppDropdown({
  label,
  placeholder,
  data,
  value,
  onChange,
  error,
}: AppDropdownProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Dropdown
        style={[
            styles.dropdown,
            error && styles.dropdownError,
        ]}
        data={data}
        maxHeight={300}
        keyboardAvoiding
        autoScroll={false}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value ?? ""}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        onChange={(item) => onChange(item.value)}
        />

        {error && (
            <Text style={styles.errorText}>
                {error}
            </Text>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  dropdownError: {
  borderColor: "#EF4444",
},

errorText: {
  color: "#EF4444",
  fontSize: 12,
  marginTop: 4,
},

  label: {
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 14,
  },

dropdown: {
  height: 50,
  borderWidth: 1,
  borderColor: "#D9D9D9",
  borderRadius: 8,
  paddingHorizontal: 12,
  backgroundColor: "#FFFFFF",
},

  placeholder: {
    color: "#999",
  },

  selectedText: {
    fontSize: 16,
  },
});