import { Controller, Control } from "react-hook-form";

import { AppInput, AppText } from "../../../../components/common";

import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";
import AppDropdown from "../../../../components/ui/AppDropdown";
import { useDepartments } from "../../../departments/hooks/useDepartments";
import { useAuth } from "../../../../providers/AuthProvider";

interface IncomingFieldsProps {
  control: Control<ReceiveDocumentFormData>;
}

export default function IncomingFields({
  control,
}: IncomingFieldsProps) {
  const { departments } = useDepartments();
  const { user } = useAuth();

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    value: department.name,
  }));

  const receivedBy = user
    ? `${user.firstName} ${user.lastName}`
    : "";

  return (
    <>
      <Controller
        control={control}
        name="departmentFrom"
        render={({ field, fieldState }) => (
          <AppDropdown
            label="Department From"
            placeholder="Select department"
            data={departmentOptions}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
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
              value={field.value || receivedBy}
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