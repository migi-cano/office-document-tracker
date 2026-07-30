import { Controller, Control } from "react-hook-form";

import { AppInput, AppText } from "../../../../components/common";

import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";
import { useDepartments } from "../../../departments/hooks/useDepartments";
import AppDropdown from "../../../../components/ui/AppDropdown";

interface OutgoingFieldsProps {
  control: Control<ReceiveDocumentFormData>;
}

export default function OutgoingFields({
  control,
}: OutgoingFieldsProps) {

  const { departments } = useDepartments();

const departmentOptions = departments.map((department) => ({
  label: department.name,
  value: department.name,
}));

  return (
    <>
      <Controller
            control={control}
            name="destination"
            render={({ field, fieldState }) => (
              <AppDropdown
                label="Destination"
                placeholder="Select destination"
                data={departmentOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
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