import AppCard from "../../common/AppCard";
import AppText from "../../common/AppText";

import { StatCardProps } from "./StatCard.types";
import { styles } from "./StatCard.styles";

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <AppCard>
      <AppText>{title}</AppText>

      <AppText style={styles.value}>
        {value}
      </AppText>
    </AppCard>
  );
}