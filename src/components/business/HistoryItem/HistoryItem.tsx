import { View } from "react-native";

import { AppText } from "../../common";

import { styles } from "./HistoryItem.styles";
import { HistoryItemProps } from "./HistoryItem.types";
import {
  formatDateTime,
} from "../../../utils/date";

export default function HistoryItem({
  history,
}: HistoryItemProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading">
        {history.action}
      </AppText>

      <AppText variant="caption">
        {formatDateTime(history.createdAt)}
      </AppText>

      {history.oldStatus &&
        history.newStatus && (
          <AppText variant="body">
            {history.oldStatus} → {history.newStatus}
          </AppText>
        )}

      {history.department && (
        <AppText variant="caption">
          Department: {history.department}
        </AppText>
      )}

      {history.remarks && (
        <AppText variant="caption">
          {history.remarks}
        </AppText>
      )}
    </View>
  );
}