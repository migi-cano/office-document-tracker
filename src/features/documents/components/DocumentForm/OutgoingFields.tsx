import { Controller, Control } from "react-hook-form";

import { AppInput, AppText } from "../../../../components/common";

import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";

interface OutgoingFieldsProps {
  control: Control<ReceiveDocumentFormData>;
}

export default function OutgoingFields({
  control,
}: OutgoingFieldsProps) {
  return (
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
  );
}