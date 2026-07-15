import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";

import { Colors } from "../../../theme";

import { styles } from "./EmptyState.styles";
import { EmptyStateProps } from "./EmptyState.types";

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="document-outline"
        size={64}
        color={Colors.textSecondary}
      />

      <AppText
        variant="heading"
        style={styles.title}
      >
        {title}
      </AppText>

      {description && (
        <AppText
          variant="body"
          style={styles.description}
        >
          {description}
        </AppText>
      )}
    </View>
  );
}