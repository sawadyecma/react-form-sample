import { useForm, Controller } from "react-hook-form";

interface IFormInputs {
  isOk: boolean;
}

export function Form_02() {
  const { handleSubmit, control, formState } = useForm<IFormInputs>({
    defaultValues: {
      isOk: false,
    },
  });

  return (
    <div>
      <form className="form">
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
      <button
        // form tagの外でもsubmitできる
        onClick={handleSubmit((data) => {
          console.log(data);
        })}
      >
        クリック
      </button>
    </div>
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
