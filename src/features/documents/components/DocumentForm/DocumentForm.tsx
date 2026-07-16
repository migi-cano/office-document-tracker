import { View } from "react-native";
import { Controller } from "react-hook-form";

import {
  AppButton,
  AppInput,
  AppText,
} from "../../../../components/common";

import { useReceiveDocument } from "../../hooks/useReceiveDocument";
import { DocumentFormProps } from "./DocumentForm.types";

import { styles } from "./DocumentForm.styles";

export default function DocumentForm({
  initialValues,
  submitButtonTitle = "Save Document",
  onSubmit,
}: DocumentFormProps) {
  
  
  const {
  control,
  handleSubmit,
} = useReceiveDocument(initialValues);

  return (
    <View style={styles.container}>
      <AppInput
        label="Tracking Number"
        value="Auto Generated"
        editable={false}
      />

      {/* Subject */}
      <Controller
        control={control}
        name="subject"
        render={({ field, fieldState }) => (
          <>
            <AppInput
              label="Subject"
              placeholder="Enter subject"
              value={field.value}
              onChangeText={field.onChange}
            />

            {fieldState.error && (
              <AppText style={{ color: "red" }}>
                {fieldState.error.message}
              </AppText>
            )}
          </>
        )}
      />

      {/* Sender */}
      <Controller
        control={control}
        name="sender"
        render={({ field, fieldState }) => (
          <>
            <AppInput
              label="Sender"
              placeholder="Enter sender"
              value={field.value}
              onChangeText={field.onChange}
            />

            {fieldState.error && (
              <AppText style={{ color: "red" }}>
                {fieldState.error.message}
              </AppText>
            )}
          </>
        )}
      />

      {/* Receiver */}
      <Controller
        control={control}
        name="receiver"
        render={({ field, fieldState }) => (
          <>
            <AppInput
              label="Receiver"
              placeholder="Enter receiver"
              value={field.value}
              onChangeText={field.onChange}
            />

            {fieldState.error && (
              <AppText style={{ color: "red" }}>
                {fieldState.error.message}
              </AppText>
            )}
          </>
        )}
      />

      {/* Department */}
      <Controller
        control={control}
        name="department"
        render={({ field, fieldState }) => (
          <>
            <AppInput
              label="Department"
              placeholder="Enter department"
              value={field.value}
              onChangeText={field.onChange}
            />

            {fieldState.error && (
              <AppText style={{ color: "red" }}>
                {fieldState.error.message}
              </AppText>
            )}
          </>
        )}
      />

      {/* Remarks */}
      <Controller
        control={control}
        name="remarks"
        render={({ field }) => (
          <AppInput
            label="Remarks"
            placeholder="Enter remarks"
            value={field.value}
            onChangeText={field.onChange}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <AppButton
        title={submitButtonTitle}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}