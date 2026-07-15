import { View } from "react-native";
import { Controller } from "react-hook-form";

import {
  AppButton,
  AppInput,
  AppText,
} from "../../../../components/common";

import { useReceiveDocument } from "../../hooks/useReceiveDocument";

import { styles } from "./ReceiveDocumentForm.styles";

export default function ReceiveDocumentForm() {
  const {
  control,
  handleSubmit,
  submit,
} = useReceiveDocument();

  return (
    <View style={styles.container}>

      <AppInput
        label="Tracking Number"
        value="Auto Generated"
        editable={false}
      />

      <Controller
  control={control}
  name="subject"
  render={({ field, fieldState }) => (
    <>
      <AppInput
        label="Subject"
        value={field.value}
        onChangeText={field.onChange}
        placeholder="Enter subject"
      />

      {fieldState.error && (
        <AppText
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {fieldState.error.message}
        </AppText>
      )}
    </>
  )}
/>

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
        <AppText
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {fieldState.error.message}
        </AppText>
      )}
    </>
  )}
/>

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
        <AppText
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {fieldState.error.message}
        </AppText>
      )}
    </>
  )}
/>

      <Controller
  control={control}
  name="department"
  render={({ field, fieldState }) => (

    <AppInput
      label="Department"
      placeholder="Enter department"
      value={field.value}
      onChangeText={field.onChange}
    />
  )}
/>

      <Controller
  control={control}
  name="remarks"
  render={({ field, fieldState }) => (
    <>
      <AppInput
        label="Remarks"
        placeholder="Enter remarks"
        multiline
        numberOfLines={4}
        value={field.value}
        onChangeText={field.onChange}
      />

      {fieldState.error && (
        <AppText
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {fieldState.error.message}
        </AppText>
      )}
    </>
  )}
/>

      <AppButton
  title="Save Document"
  onPress={handleSubmit(submit)}
/>
    </View>
  );
}