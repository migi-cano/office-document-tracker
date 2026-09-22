import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { ReportsHeaderProps } from "./ReportsHeader.types";
import { styles } from "./ReportsHeader.styles";

export default function ReportsHeader({
  title = "Reports"
}: ReportsHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}