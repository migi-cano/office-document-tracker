import { View } from "react-native";

import AppButton from "../../common/AppButton";

import { DocumentStatus } from "../../../features/documents/types/document.types";

import { StatusSelectorProps } from "./StatusSelector.types";
import { styles } from "./StatusSelector.styles";

const statuses: DocumentStatus[] = [
  DocumentStatus.RECEIVED,
  DocumentStatus.PENDING,
  DocumentStatus.RELEASED,
  DocumentStatus.COMPLETED,
];

export default function StatusSelector({
  value,
  onChange,
}: StatusSelectorProps) {
  return (
    <View style={styles.container}>
      {statuses.map((status) => (
        <AppButton
          key={status}
          title={
            status === value
              ? `✓ ${status}`
              : status
          }
          onPress={() => onChange(status)}
          style={styles.button}
        />
      ))}
    </View>
  );
}