import { View } from "react-native";

import { DetailRow } from "../../../../components/business";

import { formatDateTime } from "../../../../utils/date";

import { AppText } from "../../../../components/common";

import { DocumentInformationProps } from "./DocumentInformation.types";
import { styles } from "./DocumentInformation.styles";

export default function DocumentInformation({
  document,
}: DocumentInformationProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        General Information
      </AppText>

      <DetailRow
        label="Document Type"
        value={document.documentType}
      />

      <DetailRow
        label="Subject"
        value={document.subject}
      />

      <DetailRow
            label="Remarks"
            value={document.remarks ?? "-"}
            />

      <DetailRow
        label="Document Date"
        value={formatDateTime(document.documentDate)}
      />
    </View>
  );
}