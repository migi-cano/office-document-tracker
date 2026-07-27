import { Pressable, View } from "react-native";
import { AppText } from "../../common";
import StatusBadge from "../StatusBadge";
import {formatDateTime,} from "../../../utils/date";
import { styles } from "./DocumentCard.styles";
import { DocumentCardProps } from "./DocumentCard.types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../theme";

export default function DocumentCard({
  document,
  onPress,
}: DocumentCardProps) {
  const isIncoming = document.direction === "IN";

  return (
    <Pressable onPress={onPress}>
  <View style={styles.container}>

    {/* Header */}
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Ionicons
          name={isIncoming ? "download-outline" : "paper-plane-outline"}
          size={18}
          color={Colors.primary}
        />

        <AppText variant="caption">
          {isIncoming ? "Incoming" : "Outgoing"}
        </AppText>
      </View>
    </View>

    {/* Body */}
    <View style={styles.body}>
        <AppText
          variant="heading"
          style={styles.title}
          numberOfLines={2}
        >
          {document.title}
        </AppText>

        <AppText
          variant="body"
          style={styles.subject}
          numberOfLines={2}
        >
          {document.subject}
        </AppText>
      </View>


    {/* Footer */}
    <View style={styles.footer}>
      <AppText variant="caption">
        {formatDateTime(document.documentDate)}
      </AppText>

      <StatusBadge status={document.status} />
    </View>

  </View>
</Pressable>
  );
}