import { useState } from "react";
import { View } from "react-native";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportDocumentTypesProps } from "./ReportDocumentTypes.types";
import { styles } from "./ReportDocumentTypes.styles";

export default function ReportDocumentTypes({
  documentTypes,
}: ReportDocumentTypesProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleTypes = expanded
    ? documentTypes
    : documentTypes.slice(0, 5);

  const hasMore = documentTypes.length > 5;

  const maxCount = Math.max(
    ...documentTypes.map((item) => item.count),
    1
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>
          Documents by Type
        </AppText>

        {hasMore && (
          <AppText
            style={styles.seeMore}
            onPress={() => setExpanded((value) => !value)}
          >
            {expanded ? "See Less" : "See More"}
          </AppText>
        )}
      </View>

      <AppCard style={styles.card}>
        {visibleTypes.length === 0 ? (
          <AppText style={styles.emptyText}>
            No document type data available.
          </AppText>
        ) : (
          visibleTypes.map((item, index) => {
            const percentage =
              (item.count / maxCount) * 100;

            return (
              <View
                key={`${item.type}-${index}`}
                style={[
                  styles.row,
                  index === visibleTypes.length - 1 &&
                    styles.rowLast,
                ]}
              >
                <View style={styles.rowHeader}>
                  <AppText style={styles.typeName}>
                    {item.type}
                  </AppText>

                  <AppText style={styles.count}>
                    {item.count}
                  </AppText>
                </View>

                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${percentage}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}
      </AppCard>
    </View>
  );
}