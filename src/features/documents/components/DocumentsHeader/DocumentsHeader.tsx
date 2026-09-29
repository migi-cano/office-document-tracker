import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { DocumentsHeaderProps } from "./DocumentsHeader.types";
import { styles } from "./DocumentsHeader.styles";

export default function DocumentsHeader({
  title = "Documents",
}: DocumentsHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}