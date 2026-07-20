import { Pressable, View } from "react-native";

import { AppText } from "../../common";

import { styles } from "./StatCard.styles";
import { StatCardProps } from "./StatCard.types";

export default function StatCard({
  title,
  value,
  icon,
  onPress,
}: StatCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <AppText variant="heading">
          {icon}
        </AppText>

        <AppText variant="title">
          {value}
        </AppText>

        <AppText variant="caption">
          {title}
        </AppText>
      </View>
    </Pressable>
  );
}