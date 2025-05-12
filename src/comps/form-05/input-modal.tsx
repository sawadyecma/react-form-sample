import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

export const InputModal = ({
  isOpen,
  onClose,
  defaultValues = ["", ""],
  schema,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: [string, string];
  schema: z.ZodObject<{
    first: z.ZodString;
    second: z.ZodString;
  }>;
}) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      first: defaultValues[0],
      second: defaultValues[1],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <dialog open={isOpen}>
      <p>Input Modal</p>
      <Controller
        name="first"
        control={control}
        render={({ field }) => <input type="text" {...field} />}
      />
      {formState.errors.first && (
        <p className="error-msg">{formState.errors.first.message}</p>
      )}
      <Controller
        name="second"
        control={control}
        render={({ field }) => <input type="text" {...field} />}
      />
      {formState.errors.second && (
        <p className="error-msg">{formState.errors.second.message}</p>
      )}

      <button
        onClick={handleSubmit((data) => {
          console.log(data);
        })}
      >
        Submit
      </button>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
};
