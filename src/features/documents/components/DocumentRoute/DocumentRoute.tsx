import { View } from "react-native";

import { AppText } from "../../../../components/common";
import { DetailRow } from "../../../../components/business";

import { DocumentRouteProps } from "./DocumentRoute.types";
import { styles } from "./DocumentRoute.styles";

export default function DocumentRoute({
  document,
}: DocumentRouteProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Document Route
      </AppText>

      <DetailRow
        label="From"
        value={document.departmentFrom ?? "-"}
      />

      <DetailRow
        label="To"
        value={document.destination ?? "-"}
      />
    </View>
  );
}