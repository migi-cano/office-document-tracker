import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

export default function EditDocumentScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Edit Document"
        />

        <AppText>
          Coming Soon
        </AppText>
      </ScreenContainer>
    </SafeScreen>
  );
}