import { AppText } from "../../../components/common";
import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

export default function ScannerScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader title="Scanner" />
        <AppText>Coming Soon</AppText>
      </ScreenContainer>
    </SafeScreen>
  );
}