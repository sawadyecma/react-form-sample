import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import {
  Controller,
  useForm,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { z } from "zod";

export const Form_06 = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
        .object({ email: z.string().email("Please enter a valid email") })
        .required()
    ),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <div className="form">
      <p className="text-white">
        バリデーションメッセージの表示機能付きControl
      </p>
      <ControlledInput
        name="email"
        label="Email"
        control={control}
        renderInput={(field) => {
          return (
            <input
              type="email"
              {...field}
              value={field.value ?? ""}
              placeholder="Email"
              onChange={field.onChange}
            />
          );
        }}
      />
      <button
        // disabled={!formState.isDirty || !formState.isValid}
        onClick={handleSubmit((data) => {
          console.log(data);
        })}
      >
        submit
      </button>
    </div>
  );
};

type ControlledInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  renderInput: (field: ControllerRenderProps<T, Path<T>>) => JSX.Element;
};

export function ControlledInput<T extends FieldValues>({
  name,
  label,
  control,
  renderInput,
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label>{label}</label>
          {renderInput(field)}
          {fieldState.error && (
            <p className="error-msg">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
