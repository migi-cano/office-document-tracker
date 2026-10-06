import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../../../../components/common/AppButton";
import AppInput from "../../../../components/common/AppInput";
import { AppText } from "../../../../components/common";

import {
  loginSchema,
  LoginFormData,
} from "../../validation/login.schema";

import { useLogin } from "../../hooks/useLogin";

import { styles } from "./LoginForm.styles";

const logo = require("../../../../../assets/images/onencr.png");

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const { height: screenHeight } =
    useWindowDimensions();

  const logoAnimation =
    useRef(new Animated.Value(0)).current;

  const formAnimation =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnimation, {
        toValue: 1,
        duration: 1000,
        delay: 2000,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(formAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [formAnimation, logoAnimation]);

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

  const {
    login,
    loading,
    error,
  } = useLogin();

  async function onSubmit(data: LoginFormData) {
    await login(data);
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              {
                translateY:
                  logoAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      -46,
                      24 - screenHeight / 2,
                    ],
                  }),
              },
            ],
          },
        ]}
      >
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: formAnimation,
            transform: [
              {
                translateY:
                  formAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
              },
            ],
          },
        ]}
      >
        {/* Welcome Message */}
        <View style={styles.heading}>
          <AppText style={styles.title}>
            Welcome back!
          </AppText>

          <AppText style={styles.subtitle}>
            Enter your credentials to access your account
          </AppText>
        </View>

        {/* Login Panel */}
        <View style={styles.loginPanel}>
          {/* Username */}
          <View style={styles.field}>
            <AppText style={styles.label}>
              Email Address
            </AppText>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9CA3AF"
                style={styles.inputIcon}
              />

              <AppInput
                placeholder="name@company.com"
                value={watch("username")}
                onChangeText={(text) =>
                  setValue("username", text, {
                    shouldValidate: true,
                  })
                }
                error={errors.username?.message}
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <AppText style={styles.label}>
              Password
            </AppText>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
                style={styles.inputIcon}
              />

              <AppInput
                placeholder="••••••••••••"
                secureTextEntry={!passwordVisible}
                value={watch("password")}
                onChangeText={(text) =>
                  setValue("password", text, {
                    shouldValidate: true,
                  })
                }
                error={errors.password?.message}
                style={[
                  styles.input,
                  styles.passwordInput,
                ]}
              />

              <Pressable
                accessibilityLabel={
                  passwordVisible
                    ? "Hide password"
                    : "Show password"
                }
                accessibilityRole="button"
                hitSlop={8}
                onPress={() =>
                  setPasswordVisible(
                    (visible) => !visible
                  )
                }
                style={styles.passwordToggle}
              >
                <Ionicons
                  name={
                    passwordVisible
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>

            {/* Login Error */}
            {error ? (
              <AppText style={styles.loginError}>
                {error}
              </AppText>
            ) : null}
          </View>

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <AppButton
              title="Login"
              loading={loading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </Animated.View>

      {/* Login Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <Image
            source={logo}
            style={styles.loadingLogo}
            resizeMode="contain"
          />

          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="small"
              color="#07079A"
            />

            <AppText style={styles.loadingText}>
              Logging in...
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
}