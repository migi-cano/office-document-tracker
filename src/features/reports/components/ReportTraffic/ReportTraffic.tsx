import { useMemo, useState } from "react";
import { View } from "react-native";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportTrafficProps } from "./ReportTraffic.types";
import { styles } from "./ReportTraffic.styles";

export default function ReportTraffic({
  departments,
}: ReportTrafficProps) {
  const [incomingExpanded, setIncomingExpanded] = useState(false);
  const [outgoingExpanded, setOutgoingExpanded] = useState(false);

  const incoming = useMemo(
    () =>
      departments
        .filter((item) => item.direction === "IN")
        .sort((a, b) => b.count - a.count),
    [departments]
  );

  const outgoing = useMemo(
    () =>
      departments
        .filter((item) => item.direction === "OUT")
        .sort((a, b) => b.count - a.count),
    [departments]
  );

  const visibleIncoming = incomingExpanded
    ? incoming
    : incoming.slice(0, 5);

  const visibleOutgoing = outgoingExpanded
    ? outgoing
    : outgoing.slice(0, 5);

  const incomingMax = Math.max(
    ...incoming.map((item) => item.count),
    1
  );

  const outgoingMax = Math.max(
    ...outgoing.map((item) => item.count),
    1
  );

  const renderTraffic = (
    items: typeof incoming,
    maxCount: number,
    direction: "IN" | "OUT"
  ) => {
    if (items.length === 0) {
      return (
        <AppText style={styles.emptyText}>
          No {direction === "IN" ? "incoming" : "outgoing"} traffic data
          available.
        </AppText>
      );
    }

    return items.map((item, index) => {
      const percentage = (item.count / maxCount) * 100;

      return (
        <View
          key={`${direction}-${item.name}-${index}`}
          style={[
            styles.row,
            index === items.length - 1 && styles.rowLast,
          ]}
        >
          <View style={styles.rowHeader}>
            <AppText style={styles.name}>
              {item.name}
            </AppText>

            <AppText style={styles.count}>
              {item.count}
            </AppText>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                direction === "IN"
                  ? styles.incomingFill
                  : styles.outgoingFill,
                {
                  width: `${percentage}%`,
                },
              ]}
            />
          </View>
        </View>
      );
    });
  };

  const hasMoreIncoming = incoming.length > 5;
  const hasMoreOutgoing = outgoing.length > 5;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>
          Document Traffic
        </AppText>
      </View>

      <AppCard style={styles.card}>
        {/* Incoming */}
        <View style={styles.trafficSection}>
          <View style={styles.trafficHeader}>
            <AppText style={styles.trafficTitle}>
              Incoming
            </AppText>

            {hasMoreIncoming && (
              <AppText
                style={styles.seeMore}
                onPress={() =>
                  setIncomingExpanded((value) => !value)
                }
              >
                {incomingExpanded ? "See Less" : "See More"}
              </AppText>
            )}
          </View>

          {renderTraffic(
            visibleIncoming,
            incomingMax,
            "IN"
          )}
        </View>

        {/* Divider */}
        {incoming.length > 0 && outgoing.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Outgoing */}
        <View style={styles.trafficSectionLast}>
          <View style={styles.trafficHeader}>
            <AppText style={styles.trafficTitle}>
              Outgoing
            </AppText>

            {hasMoreOutgoing && (
              <AppText
                style={styles.seeMore}
                onPress={() =>
                  setOutgoingExpanded((value) => !value)
                }
              >
                {outgoingExpanded ? "See Less" : "See More"}
              </AppText>
            )}
          </View>

          {renderTraffic(
            visibleOutgoing,
            outgoingMax,
            "OUT"
          )}
        </View>
      </AppCard>
    </View>
  );
}