import { Controller, useForm, type UseControllerProps } from "react-hook-form";

type FormProp = {
  label: string;
  rule?: Rule;
};

type Rule = UseControllerProps<{
  first: string;
  second: string;
}>["rules"];

export const InputModal = ({
  isOpen,
  onClose,
  defaultValues = ["", ""],
  formProps,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: [string, string];
  formProps: [FormProp, FormProp];
}) => {
  const { control, handleSubmit, formState } = useForm(
    {
      defaultValues: {
        first: defaultValues[0],
        second: defaultValues[1],
      },
      mode: "onBlur",
      reValidateMode: "onChange",
    } // zodResolver(schema)
  );
  return (
    <dialog open={isOpen}>
      <p>Input Modal</p>
      <Controller
        name="first"
        control={control}
        render={({ field }) => <input type="text" {...field} />}
        rules={formProps[0].rule}
      />
      {formState.errors.first && (
        <p className="error-msg">{formState.errors.first.message}</p>
      )}
      <Controller
        name="second"
        control={control}
        render={({ field }) => <input type="text" {...field} />}
        rules={formProps[1].rule}
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
