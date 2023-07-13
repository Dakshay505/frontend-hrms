import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const FormFileData = () => {
  const { register, handleSubmit, control } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    // for(let i = 0; i < showDocumentsForm.length; i++){
      formData.append(`text`, data.text[0]);
      formData.append(`file`, data.files[0]);
  // }

    try {
      const response = await axios.post(
        "/api/v1/employee/docs/upload",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>
          <input
            {...register("department", { required: true })}
            className="border border-black"
            type="text"
            placeholder="Department"
          />
        </div>
        <div>
          <input
            {...register("jobProfile", { required: true })}
            className="border border-black"
            type="text"
            placeholder="Job Profile"
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`text[${index}]`, { required: true })}
              className="border border-black"
              type="text"
              placeholder="Text"
            />
            <input
              {...register(`files[${index}]`, { required: true })}
              type="file"
            />
          </div>
        ))}

        <button type="button" onClick={() => append({})} className="mb-2">
          Add
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormFileData;
