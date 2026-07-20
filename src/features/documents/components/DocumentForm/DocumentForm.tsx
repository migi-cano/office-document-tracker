import { View } from "react-native";
import { Controller } from "react-hook-form";
import {AppButton,AppInput,AppText,} from "../../../../components/common";
import { useReceiveDocument } from "../../hooks/useReceiveDocument";
import { DocumentFormProps } from "./DocumentForm.types";
import { styles } from "./DocumentForm.styles";


export default function DocumentForm({
  documentType,
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


      {documentType === "OUT" && (
  <>
    <Controller
      control={control}
      name="destination"
      render={({ field, fieldState }) => (
        <>
          <AppInput
            label="Destination"
            placeholder="Enter destination"
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

     <Controller
          control={control}
          name="processedBy"
          render={({ field, fieldState }) => (
            <>
              <AppInput
                label="Processed By"
                placeholder="Enter processor"
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
      </>
    )}

    {documentType === "IN" && (
  <>
    <Controller
      control={control}
      name="departmentFrom"
      render={({ field, fieldState }) => (
        <>
          <AppInput
            label="Department From"
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

    <Controller
      control={control}
      name="receivedBy"
      render={({ field, fieldState }) => (
        <>
          <AppInput
            label="Received By"
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
  </>
)}



      <AppButton
        title={submitButtonTitle}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}