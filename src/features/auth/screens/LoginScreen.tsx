import {
  AppButton,
  AppCard,
  AppInput,
  AppText,
} from "../../../components/common";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import LoginForm from "../components/LoginForm";

export default function LoginScreen() {
  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Welcome Back"
          subtitle="Sign in to continue"
        />

        <LoginForm />
      </ScreenContainer>
    </SafeScreen>
  );
}