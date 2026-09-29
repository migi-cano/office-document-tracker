import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { ScannerHeaderProps } from "./ScannerHeader.types";
import { styles } from "./ScannerHeader.styles";

export default function ScannerHeader({
  title = "Scanner",
}: ScannerHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}