import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  isOk: z.boolean().refine((val) => val === true, {
    message: "Please check it!",
  }),
  text: z.string().min(3, {
    message: "Please enter at least 3 characters",
  }),
  email: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) => val === undefined || /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val),
      { message: "Invalid email format" }
    ),
});

export function Form_03() {
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      isOk: false,
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return (
    <div>
      <p>Controlled Component with zodResolver</p>
      <form className="form">
        <Controller
          name="isOk"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange} />
          )}
        />
        {formState.errors.isOk && (
          <p className="error-msg">{formState.errors.isOk.message}</p>
        )}
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
        {formState.errors.text && (
          <p className="error-msg">{formState.errors.text.message}</p>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
        {formState.errors.email && (
          <p className="error-msg">{formState.errors.email.message}</p>
        )}
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

const TextField = ({
  value,
  onChange,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

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
