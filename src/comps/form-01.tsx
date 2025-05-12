import { useForm } from "react-hook-form";

export function Form_01() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
    mode: "onBlur",
  });

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form
      className="form"
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <p className="text-white">Uncontrolled Component</p>
      <label>Example</label>
      <input {...register("example")} defaultValue="test" />
      <label>ExampleRequired</label>
      <input
        {...register("exampleRequired", { required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && (
        <p className="error-msg">This field is required</p>
      )}
      <input type="submit" />
    </form>
  );
}
