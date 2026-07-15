import { TextInput } from "react-native";

import { styles } from "./SearchBar.styles";
import { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search documents...",
}: SearchBarProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}