import { useForm, Controller, type SubmitHandler } from "react-hook-form";

interface IFormInputs {
  isOk: boolean;
}

export function Form_02() {
  const { handleSubmit, control, formState, watch } = useForm<IFormInputs>({
    defaultValues: {
      isOk: false,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  console.log(watch("isOk")); // you can watch individual input by pass the name of the input

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="isOk"
        control={control}
        rules={{ required: "Please check it!" }}
        render={({ field }) => (
          <Checkbox checked={field.value} onChange={field.onChange} />
        )}
      />
      {formState.errors.isOk && (
        <p className="error-msg">{formState.errors.isOk.message}</p>
      )}
      <input type="submit" />
    </form>
  );
}

const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
  );
};
