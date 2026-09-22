import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportProcessingProps } from "./ReportProcessing.types";
import { styles } from "./ReportProcessing.styles";

const SIZE = 120;
const STROKE_WIDTH = 16;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ReportProcessing({
  summary,
}: ReportProcessingProps) {
  const total = summary.total;
  const completed = summary.completed;

  const completionRate =
    total > 0
      ? (completed / total) * 100
      : 0;

  const remaining = Math.max(
    total - completed,
    0
  );

  const completedLength =
    (completionRate / 100) * CIRCUMFERENCE;

  const remainingLength =
    (remaining / total) * CIRCUMFERENCE;

  return (
    <View style={styles.cardWrapper}>
      <AppCard style={styles.card}>
        <AppText style={styles.title}>
          Processing Progress
        </AppText>

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

              {/* Completed */}
              {completed > 0 && total > 0 && (
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="#10B981"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={`${completedLength} ${CIRCUMFERENCE}`}
                />
              )}

              {/* Remaining */}
              {remaining > 0 && total > 0 && (
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="#E5E7EB"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={`${remainingLength} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-completedLength}
                />
              )}
            </G>
          </Svg>

          <View style={styles.centerContent}>
            <AppText style={styles.centerValue}>
              {completionRate.toFixed(0)}%
            </AppText>

            <AppText style={styles.centerLabel}>
              Completed
            </AppText>
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <View
                style={[
                  styles.indicator,
                  styles.completed,
                ]}
              />

              <AppText style={styles.label}>
                Completed
              </AppText>
            </View>

            <AppText style={styles.value}>
              {completed}
            </AppText>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <View
                style={[
                  styles.indicator,
                  styles.remaining,
                ]}
              />

              <AppText style={styles.label}>
                Remaining
              </AppText>
            </View>

            <AppText style={styles.value}>
              {remaining}
            </AppText>
          </View>
        </View>
      </AppCard>
    </View>
  );
}