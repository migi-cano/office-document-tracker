import { useState } from "react";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ImageViewing from "react-native-image-viewing";

import { DocumentsStackParamList } from "../../../navigation/navigation.types";

type RouteProps = RouteProp<
  DocumentsStackParamList,
  "DocumentImage"
>;

type NavigationProps =
  NativeStackNavigationProp<DocumentsStackParamList>;

export default function DocumentImageScreen() {
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute<RouteProps>();

  const [visible, setVisible] = useState(true);

  return (
    <ImageViewing
      images={[
        {
          uri: route.params.imageUrl,
        },
      ]}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
        navigation.goBack();
      }}
    />
  );
}