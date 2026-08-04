import { Pressable, View } from "react-native";
import dayjs from "dayjs";

import { AppText } from "../../../../components/common";

import { styles } from "./DepartmentCard.styles";
import { DepartmentCardProps } from "./DepartmentCard.types";

export default function DepartmentCard({
  department,
  onEdit,
  onDelete,
}: DepartmentCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.content}>
          <AppText style={styles.name}>
            {department.name}
          </AppText>

          <AppText style={styles.created}>
            Created {dayjs(department.created_at).format("MMM D, YYYY")}
          </AppText>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => onEdit?.(department)}
            >
            <AppText style={styles.action}>
              ✏️
            </AppText>
          </Pressable>

          <Pressable
            onPress={() => onDelete?.(department)}
            >
            <AppText style={styles.action}>
              🗑️
            </AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}