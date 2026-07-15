import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

export default function ReceiveDocumentScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader title="Receive Document" />

        <AppText>
          Coming Soon
        </AppText>
      </ScreenContainer>
    </SafeScreen>
  );
}