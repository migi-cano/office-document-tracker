import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import ReceiveDocumentForm from "../components/ReceiveDocumentForm";

export default function ReceiveDocumentScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Receive Document"
          subtitle="Create a new incoming document"
        />

        <ReceiveDocumentForm />
      </ScreenContainer>
    </SafeScreen>
  );
}