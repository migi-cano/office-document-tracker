import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

export default function AddUserScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Add User"
        />

        <AppText>
          Add User Screen
        </AppText>
      </ScreenContainer>
    </SafeScreen>
  );
}