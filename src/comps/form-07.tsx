import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type FieldError,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { z } from "zod";

export const Form_07 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email("Please enter a valid email"),
        username: z.object({
          first: z.string().min(1, "Please enter your first name"),
          last: z.string().min(1, "Please enter your last name"),
        }),
      })
    ),
  });

  return (
    <div className="form">
      <p className="text-white">Divided Form With Uncontrolled Component</p>
      <UserSetting
        firstRegistered={register("username.first")}
        lastRegistered={register("username.last")}
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
            <TextField {...register("email")} placeholder="Email" />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </>
        }
      />
    </div>
  );
};

const UserSetting = ({
  firstRegistered,
  lastRegistered,
  firstError,
  lastError,
  extra,
  onSubmit,
}: {
  firstRegistered: UseFormRegisterReturn;
  lastRegistered: UseFormRegisterReturn;
  firstError: FieldError | undefined;
  lastError: FieldError | undefined;
  extra?: React.ReactNode;
  onSubmit: () => void;
}) => {
  return (
    <div>
      <h2 className="text-white">User Setting</h2>
      <TextField {...firstRegistered} />
      {firstError && <p className="error-msg">{firstError.message}</p>}
      <TextField {...lastRegistered} />
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
