import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createParentDepartmentAsync } from "../../redux/Slice/departmentSlice";

const AddParentDepartment = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  }: any = useForm();

  const validateDepartmentName = (value: any) => {
    if (/^\d/.test(value)) {
      return "Department Name cannot start with a digit";
    }
    return true;
  };

  // Event handler to handle changes in the Job Profile Name field

  const handleDepartmentNameChange = (e: any) => {
    const inputDepartmentName = e.target.value;
    if (/^\d/.test(inputDepartmentName)) {
      setValue("departmentName", inputDepartmentName.replace(/^\d/, ""));
    }
  };

  return (
    <div className="mx-10 w-[688px]">
      <div className="pt-8 flex gap-[15rem]">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">
          Add Parent Department
        </h1>
      </div>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit((data: any) => {
            console.log(data);
            dispatch(createParentDepartmentAsync(data)).then((res: any) => {
              if (res.payload.success) {
                toast.success(res.payload.message);
              } else {
                toast.error(res.payload.message);
              }
              console.log(data, "data");
            });
            reset();
          })}
        >
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-normal text-[#1C1C1C]">
                  Department Name
                </p>
              </div>
              <div>
                <input
                  {...register("departmentName", {
                    required: "Department name is required",
                    validate: validateDepartmentName,
                  })}
                  type="text"
                  className="border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]"
                  onChange={handleDepartmentNameChange} // Add the onChange event handler
                />
                {errors.departmentName && (
                  <p className="text-red-500">
                    {errors.departmentName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div>
              <p className="text-sm font-normal text-[#1C1C1C]">
                Department Description
              </p>
            </div>
            <div>
              <textarea
                {...register("description", {
                  required: "Department description is required",
                })}
                className="border border-solid border-[#DEDEDE] rounded py-4 px-3 h-32 w-full"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4 h-10"
            >
              <img src={Plus} className="w-4" alt="" />
              <p className="px-2">Add Parnet Department</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParentDepartment;
