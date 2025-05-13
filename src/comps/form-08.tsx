import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Controller,
  useForm,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  username: z.object({
    first: z.string().min(1, "Please enter your first name"),
    last: z.string().min(1, "Please enter your last name"),
  }),
});

// type IForm = z.infer<typeof schema>;

export const Form_08 = () => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: {
        first: "",
        last: "",
      },
    },
  });

  const [username, setUsername] = React.useState({
    first: "",
    last: "",
  });

  const [email, setEmail] = React.useState("");

  console.log(errors);

  return (
    <div className="form">
      <p className="text-white">
        Divided Form With <b>Controlled</b> Component
      </p>
      <UserSetting
        control={control}
        fieldNames={{
          first: "username.first",
          last: "username.last",
        }}
        userName={username}
        onChange={(v) => {
          setUsername({ first: v[0], last: v[1] });
        }}
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (data.username.first === "taken") {
            setError("username.first", {
              type: "manual",
              message: "Already taken",
            });
          }
        })}
        firstError={errors.username?.first}
        lastError={errors.username?.last}
        extra={
          <>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder="Email"
                  {...field}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </>
        }
      />
    </div>
  );
};

type UserSettingProps<T extends FieldValues> = {
  control: Control<T>;
  fieldNames: {
    first: Path<T>;
    last: Path<T>;
  };
  userName: { first: string; last: string };
  onChange: (v: [string, string]) => void;
  firstError: FieldError | undefined;
  lastError: FieldError | undefined;
  extra?: React.ReactNode;
  onSubmit: () => void;
};

const UserSetting = <T extends FieldValues>({
  userName,
  onChange,
  firstError,
  lastError,
  extra,
  onSubmit,
  control,
  fieldNames,
}: UserSettingProps<T>) => {
  return (
    <div>
      <h2 className="text-white">User Setting</h2>
      <Controller
        name={fieldNames.first}
        control={control}
        render={({ field }) => (
          <TextField
            value={userName.first}
            onChange={(e) => {
              onChange([e.target.value, userName.last]);
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      {firstError && <p className="error-msg">{firstError.message}</p>}
      <Controller
        name={fieldNames.last}
        control={control}
        render={({ field }) => (
          <TextField
            value={userName.last}
            onChange={(e) => {
              onChange([userName.first, e.target.value]);
              field.onChange(e.target.value);
            }}
          />
        )}
      />
      {lastError && <p className="error-msg">{lastError.message}</p>}

      {extra ?? null}
      <button onClick={onSubmit}>submit</button>
    </div>
  );
};

const TextField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className="border border-gray-300 rounded-md p-2"
      placeholder="Enter text"
      {...props}
    />
  );
};
