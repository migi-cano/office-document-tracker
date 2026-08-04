import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

export default function EditUserScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Edit User"
        />

        <AppText>
          Edit User Screen
        </AppText>
      </ScreenContainer>
    </SafeScreen>
  );
}