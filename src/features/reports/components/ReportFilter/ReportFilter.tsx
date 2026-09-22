import { Pressable, View } from "react-native";

import { AppText } from "../../../../components/common";

import { ReportPeriod } from "../../types/report.types";
import { ReportFilterProps } from "./ReportFilter.types";
import { styles } from "./ReportFilter.styles";

const options: {
  label: string;
  value: ReportPeriod;
}[] = [
  {
    label: "Today",
    value: "day",
  },
  {
    label: "This Week",
    value: "week",
  },
  {
    label: "This Month",
    value: "month",
  },
  {
    label: "This Year",
    value: "year",
  },
];

export default function ReportFilter({
  value,
  onChange,
}: ReportFilterProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>
        Report Period
      </AppText>

      <View style={styles.options}>
        {options.map((option) => {
          const active = option.value === value;

          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                active && styles.optionActive,
              ]}
              onPress={() => onChange(option.value)}
            >
              <AppText
                style={[
                  styles.optionText,
                  active && styles.optionTextActive,
                ]}
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}