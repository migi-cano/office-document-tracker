import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { AppText } from "../../../../components/common";

import { DashboardActivityChartProps } from "./DashboardActivityChart.types";
import { useState } from "react";
import { styles } from "./DashboardActivityChart.styles";

export default function DashboardActivityChart({
  title = "Activity Overview",
  data,
}: DashboardActivityChartProps) {
    const [chartWidth, setChartWidth] = useState(0);
  return (
    <View style={styles.container}>
        
      
      <View style={styles.header}>
        <View>
            <AppText style={styles.title}>
            Activity Overview
            </AppText>

            <AppText style={styles.subtitle}>
            Documents processed over the last 7 days
            </AppText>
        </View>

        <View style={styles.badge}>
            <AppText style={styles.badgeText}>
            This Week
            </AppText>
        </View>
        </View>

      <View style={styles.chartCard}>
        <View 
        onLayout={({ nativeEvent }) => {
  const width = nativeEvent.layout.width;

  if (width !== chartWidth) {
    setChartWidth(width);
  }
}}>
        {chartWidth > 0 && (
        <LineChart
            width={chartWidth}
                data={{
                    labels: data.map((item) => item.label),
                    datasets: [
                    {
                        data: data.map((item) => item.value),
                        strokeWidth: 4,
                    },
                    ],
                }}
                height={220}
                bezier
                withDots
                withShadow
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                fromZero
                chartConfig={{
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0,

                    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,

                    fillShadowGradient: "#2563EB",
                    fillShadowGradientOpacity: 1,

                    labelColor: () => "#64748B",

                    propsForDots: {
                    r: "5",
                    strokeWidth: "3",
                    stroke: "#2563EB",
                    },

                    propsForBackgroundLines: {
                    stroke: "#F1F5F9",
                    strokeDasharray: "",
                    },
                }}
                style={styles.chart}
                />)}
      </View>
      </View>

          <View style={styles.summary}>
                <AppText style={styles.summaryLabel}>
                    This Week
                </AppText>

                <AppText style={styles.summaryValue}>
                    {data.reduce((sum, item) => sum + item.value, 0)} Documents
                </AppText>
                </View>
                

    </View>
  );
}