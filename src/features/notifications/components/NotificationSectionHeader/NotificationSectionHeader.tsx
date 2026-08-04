import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "../../../../components/common";

import { styles } from "./NotificationSectionHeader.styles";
import { NotificationSectionHeaderProps } from "./NotificationSectionHeader.types";

export default function NotificationSectionHeader({
  title,
  count,
  expanded,
  onPress,
}: NotificationSectionHeaderProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Ionicons
          name={
            expanded
              ? "chevron-down"
              : "chevron-forward"
          }
          size={18}
          color="#6B7280"
        />

        <AppText style={styles.title}>
          {title}
        </AppText>
      </View>

      <AppText style={styles.count}>
        {count}
      </AppText>
    </Pressable>
  );
}