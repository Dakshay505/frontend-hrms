import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png";
import { useDispatch, useSelector } from "react-redux";
import BluePlus from "../../assets/BluePlus.png";
import toast from "react-hot-toast";
import {
  createDepartmentAsync,
  getAllParentDepartmentAsync,
} from "../../redux/Slice/departmentSlice";
import { Link } from "react-router-dom";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const departmentList = useSelector(
    (state: any) => state.department.parentdepartment
  );
  useEffect(() => {
    dispatch(getAllParentDepartmentAsync());
  }, []);

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
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Department</h1>
        <Link to="/add-parent-department" className="h-10">
          <div className="flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]">
            <img src={BluePlus} className="w-4" alt="" />
            <p className="px-2">Add Parent Department</p>
          </div>
        </Link>
      </div>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit((data: any) => {
            dispatch(createDepartmentAsync(data)).then((res: any) => {
              if (res.payload.success) {
                toast.success(res.payload.message);
              } else {
                toast.error(res.payload.message);
              }
              console.log(data, "data");
              dispatch(getAllParentDepartmentAsync());
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
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-normal text-[#1C1C1C]">
                  Parent Department
                </p>
              </div>
              <div>
                <select
                  {...register("parentDepartmentName", {
                    required: "Department required",
                  })}
                  className="border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2"
                >
                  <option>Choose Parent Department</option>
                  {departmentList &&
                    departmentList.map((element: any, index: number) => {
                      return (
                        <option
                          key={index}
                          className="border border-solid border-[#DEDEDE] w-[324px] h-10 px-2"
                        >
                          {element.departmentName}
                        </option>
                      );
                    })}
                  {errors.parentDepartmentName && (
                    <p className="text-red-500">
                      {errors.parentDepartmentName.message}
                    </p>
                  )}
                </select>
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
              <p className="px-2">Add Department</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
