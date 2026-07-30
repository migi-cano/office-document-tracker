import { TouchableOpacity, View } from "react-native";

import { AppText } from "../../../../components/common";
import { RecentDocumentCard } from "../RecentDocumentCard";

import { styles } from "./RecentDocumentsSection.styles";
import { RecentDocumentsSectionProps } from "./RecentDocumentsSection.types";

export default function RecentDocumentsSection({
  documents,
  onViewAll,
  onPressDocument,
}: RecentDocumentsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>
          Recent Documents
        </AppText>

        <TouchableOpacity onPress={onViewAll}>
          <AppText style={styles.viewAll}>
            View All
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {documents.map((document) => (
          <RecentDocumentCard
            key={document.id}
            document={document}
            onPress={() => onPressDocument?.(document.id)}
          />
        ))}
      </View>
    </View>
  );
}