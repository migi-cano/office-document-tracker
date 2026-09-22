import { View } from "react-native";
import Svg, {
  Circle,
  G,
} from "react-native-svg";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportOverviewProps } from "./ReportOverview.types";
import { styles } from "./ReportOverview.styles";

const SIZE = 190;
const STROKE_WIDTH = 24;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const statusColors = {
  pending: "#F59E0B",
  released: "#8B5CF6",
  received: "#06B6D4",
  completed: "#10B981",
};

export default function ReportOverview({
  summary,
}: ReportOverviewProps) {
  const statuses = [
    {
      label: "Pending",
      value: summary.pending,
      color: statusColors.pending,
    },
    {
      label: "Released",
      value: summary.released,
      color: statusColors.released,
    },
    {
      label: "Received",
      value: summary.received,
      color: statusColors.received,
    },
    {
      label: "Completed",
      value: summary.completed,
      color: statusColors.completed,
    },
  ];

  const statusTotal = statuses.reduce(
    (total, item) => total + item.value,
    0
  );

  let accumulatedPercentage = 0;

  return (
    <View>
      <AppText style={styles.sectionTitle}>
        Document Overview
      </AppText>

      <AppCard style={styles.card}>
        <View style={styles.chartContainer}>
          <Svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            <G
              rotation="-90"
              origin={`${SIZE / 2}, ${SIZE / 2}`}
            >
              {/* Background ring */}
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#E5E7EB"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {statuses.map((status) => {
                const percentage =
                  statusTotal > 0
                    ? status.value / statusTotal
                    : 0;

                const segmentLength =
                  percentage * CIRCUMFERENCE;

                const offset =
                  -accumulatedPercentage *
                  CIRCUMFERENCE;

                accumulatedPercentage += percentage;

                if (status.value === 0) {
                  return null;
                }

                return (
                  <Circle
                    key={status.label}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    stroke={status.color}
                    strokeWidth={STROKE_WIDTH}
                    fill="none"
                    strokeDasharray={`${segmentLength} ${CIRCUMFERENCE}`}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                  />
                );
              })}
            </G>
          </Svg>

          <View style={styles.centerContent}>
            <AppText style={styles.totalLabel}>
              Total Documents
            </AppText>

            <AppText style={styles.totalValue}>
              {summary.total}
            </AppText>
          </View>
        </View>

        <View style={styles.legend}>
          {statuses.map((status) => (
            <View
              key={status.label}
              style={styles.legendRow}
            >
              <View style={styles.legendLeft}>
                <View
                  style={[
                    styles.legendIndicator,
                    {
                      backgroundColor: status.color,
                    },
                  ]}
                />

                <AppText style={styles.legendLabel}>
                  {status.label}
                </AppText>
              </View>

              <AppText style={styles.legendValue}>
                {status.value}
              </AppText>
            </View>
          ))}
        </View>
      </AppCard>
    </View>
  );
}