import { View } from "react-native";

import { AppText } from "../../common";

import { styles } from "./HistoryItem.styles";
import { HistoryItemProps } from "./HistoryItem.types";
import { formatDateTime } from "../../../utils/date";

export default function HistoryItem({
  history,
  isLast,
}: HistoryItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.timeline}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.card}>
        <AppText style={styles.action}>
          {history.action}
        </AppText>

        {history.oldStatus &&
          history.newStatus && (
            <AppText style={styles.status}>
              {history.oldStatus} → {history.newStatus}
            </AppText>
          )}

        {history.department && (
          <AppText style={styles.meta}>
            Department: {history.department}
          </AppText>
        )}

        {history.remarks && (
          <AppText style={styles.meta}>
            {history.remarks}
          </AppText>
        )}

        <AppText style={styles.date}>
          {formatDateTime(history.createdAt)}
        </AppText>
      </View>
    </View>
  );
}