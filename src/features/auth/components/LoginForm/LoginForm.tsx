import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../../../../components/common/AppButton";
import AppInput from "../../../../components/common/AppInput";
import { AppText } from "../../../../components/common";

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

  async function onSubmit(
    data: LoginFormData
  ) {
    await login(data);
  }

  return (
    <View style={styles.container}>

      {/* Logo / App Icon */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Ionicons
            name="documents-outline"
            size={34}
            color="#FFFFFF"
          />
        </View>
      </View>

      {/* Heading */}
      <View style={styles.heading}>
        <AppText style={styles.title}>
          Welcome Back
        </AppText>

        <AppText style={styles.subtitle}>
          Sign in to continue to your document tracker
        </AppText>
      </View>

      {/* Login Card */}
      <View style={styles.card}>

        <AppInput
          label="Username"
          placeholder="Enter username"
          value={watch("username")}
          onChangeText={(text) =>
            setValue("username", text, {
              shouldValidate: true,
            })
          }
          error={errors.username?.message}
        />

        <View style={styles.passwordField}>
          <AppInput
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            value={watch("password")}
            onChangeText={(text) =>
              setValue("password", text, {
                shouldValidate: true,
              })
            }
            error={errors.password?.message}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Login"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

      </View>

    </View>
  );
}