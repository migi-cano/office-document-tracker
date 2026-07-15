import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppButton from "../../../../components/common/AppButton";
import AppCard from "../../../../components/common/AppCard";
import AppInput from "../../../../components/common/AppInput";

import { styles } from "./LoginForm.styles";

import {
  loginSchema,
  LoginFormData,
} from "../../validation/login.schema";

import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, loading } = useLogin();

  async function onSubmit(data: LoginFormData) {
    await login(data);
  }

  return (
    <AppCard style={styles.container}>
      <AppInput
        label="Username"
        placeholder="Enter username"
        value={watch("username")}
        onChangeText={(text) =>
          setValue("username", text)
        }
        error={errors.username?.message}
      />

      <AppInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        value={watch("password")}
        onChangeText={(text) =>
          setValue("password", text)
        }
        error={errors.password?.message}
      />

      <AppButton
        title="Login"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </AppCard>
  );
}