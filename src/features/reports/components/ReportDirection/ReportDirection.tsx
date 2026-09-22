import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportDirectionProps } from "./ReportDirection.types";
import { styles } from "./ReportDirection.styles";

const SIZE = 120;
const STROKE_WIDTH = 16;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ReportDirection({
  summary,
}: ReportDirectionProps) {
  const total =
    summary.incoming + summary.outgoing;

  const incomingPercentage =
    total > 0 ? summary.incoming / total : 0;

  const outgoingPercentage =
    total > 0 ? summary.outgoing / total : 0;

  const incomingLength =
    incomingPercentage * CIRCUMFERENCE;

  const outgoingLength =
    outgoingPercentage * CIRCUMFERENCE;

  return (
    <View style={styles.cardWrapper}>
      <AppCard style={styles.card}>
        <AppText style={styles.title}>
          Document Direction
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
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#E5E7EB"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {summary.incoming > 0 && (
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="#22C55E"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={`${incomingLength} ${CIRCUMFERENCE}`}
                />
              )}

              {summary.outgoing > 0 && (
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="#F97316"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={`${outgoingLength} ${CIRCUMFERENCE}`}
                  strokeDashoffset={
                    -incomingLength
                  }
                />
              )}
            </G>
          </Svg>

          <View style={styles.centerContent}>
            <AppText style={styles.centerValue}>
              {total}
            </AppText>

            <AppText style={styles.centerLabel}>
              Documents
            </AppText>
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <View
                style={[
                  styles.indicator,
                  styles.incoming,
                ]}
              />

              <AppText style={styles.label}>
                Incoming
              </AppText>
            </View>

            <AppText style={styles.value}>
              {summary.incoming}
            </AppText>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <View
                style={[
                  styles.indicator,
                  styles.outgoing,
                ]}
              />

              <AppText style={styles.label}>
                Outgoing
              </AppText>
            </View>

            <AppText style={styles.value}>
              {summary.outgoing}
            </AppText>
          </View>
        </View>
      </AppCard>
    </View>
  );
}