import { Controller, Control } from "react-hook-form";

import { AppInput, AppText } from "../../../../components/common";

import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";

interface IncomingFieldsProps {
  control: Control<ReceiveDocumentFormData>;
}

export default function IncomingFields({
  control,
}: IncomingFieldsProps) {
  return (
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
  );
}