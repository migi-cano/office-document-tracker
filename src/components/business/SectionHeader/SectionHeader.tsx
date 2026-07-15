import AppText from "../../common/AppText";

import { styles } from "./SectionHeader.styles";
import { SectionHeaderProps } from "./SectionHeader.types";

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <AppText style={styles.title}>
      {title}
    </AppText>
  );
}