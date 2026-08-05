import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { AppText } from "../../../../components/common";

import { RolePickerProps } from "./RolePicker.types";
import { styles } from "./RolePicker.styles";

export default function RolePicker({
  value,
  onChange,
}: RolePickerProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>
        Role
      </AppText>

      <View style={styles.picker}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) =>
            onChange(itemValue)
          }
        >
          <Picker.Item
            label="Staff"
            value="Staff"
          />

          <Picker.Item
            label="Admin"
            value="Admin"
          />
        </Picker>
      </View>
    </View>
  );
}