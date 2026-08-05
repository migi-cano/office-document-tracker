import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppButton from "../../../../components/common/AppButton";
import AppCard from "../../../../components/common/AppCard";
import AppInput from "../../../../components/common/AppInput";

import {
  UserFormData,
} from "../../validation/user.schema";

import { UserFormProps } from "./UserForm.types";
import { RolePicker } from "../RolePicker";
import {
  userSchema,
} from "../../validation/user.schema";
import { Switch, View } from "react-native";
import { AppText } from "../../../../components";

export default function UserForm({
  loading,
  defaultValues,
  submitTitle,
  readOnlyEmail,
  showPassword = true,
  isActive = true,
  onStatusChange,
  onSubmit,
}: UserFormProps) {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),

    defaultValues: {
        firstName:
            defaultValues?.firstName ?? "",

        lastName:
            defaultValues?.lastName ?? "",

        email:
            defaultValues?.email ?? "",

        password: "",

        role:
            defaultValues?.role ?? "Staff",
        },
  });

  return (
    <AppCard>
      <AppInput
        label="First Name"
        value={watch("firstName")}
        onChangeText={(text) =>
          setValue("firstName", text)
        }
        error={errors.firstName?.message}
      />

      <AppInput
        label="Last Name"
        value={watch("lastName")}
        onChangeText={(text) =>
          setValue("lastName", text)
        }
        error={errors.lastName?.message}
      />

      <AppInput
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!readOnlyEmail}
        value={watch("email")}
        onChangeText={(text) =>
            setValue("email", text)
        }
        error={errors.email?.message}
        />

      {showPassword && (
            <AppInput
                label="Temporary Password"
                secureTextEntry
                value={watch("password")}
                onChangeText={(text) =>
                setValue("password", text)
                }
                error={errors.password?.message}
            />
            )}

      <RolePicker
            value={watch("role")}
            onChange={(value) =>
                setValue("role", value)
            }
            />
            
        {onStatusChange && (
            <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16,
                marginBottom: 20,
                }}
            >
                <AppText
                style={{
                    fontWeight: "600",
                }}
                >
                Active Account
                </AppText>

                <Switch
                value={isActive}
                onValueChange={onStatusChange}
                />
            </View>
            )}
      <AppButton
        title={submitTitle ?? "Create User"}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </AppCard>
  );
}