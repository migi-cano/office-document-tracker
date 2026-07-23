import { View } from "react-native";
import { Controller } from "react-hook-form";
import {AppButton,AppInput,AppText,} from "../../../../components/common";
import { useReceiveDocument } from "../../hooks/useReceiveDocument";
import { DocumentFormProps } from "./DocumentForm.types";
import { styles } from "./DocumentForm.styles";
import IncomingFields from "./IncomingFields";
import OutgoingFields from "./OutgoingFields";


export default function DocumentForm({
  direction,
  initialValues,
  submitButtonTitle = "Save Document",
  onSubmit,
}: DocumentFormProps) {

  console.log("=== DOCUMENT FORM ===");
console.log(initialValues);
  
  
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
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <>
            <AppInput
              label="Document Title"
              placeholder="Enter document title"
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

      {/* Document Type */}
<Controller
  control={control}
  name="documentType"
  render={({ field, fieldState }) => (
    <>
      <AppInput
        label="Document Type"
        placeholder="Enter document type"
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

      {direction === "IN" && (
        <IncomingFields control={control} />
      )}

      {direction === "OUT" && (
        <OutgoingFields control={control} />
      )}



      <AppButton
        title={submitButtonTitle}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}