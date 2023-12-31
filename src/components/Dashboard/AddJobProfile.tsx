import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Plus from '../../assets/Plus.png'
import BlackPlus from "../../assets/BlackPlus.svg"
import { useDispatch, useSelector } from 'react-redux';
import { createJobProfileAsync, getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import toast from 'react-hot-toast';


const employementTypeList = ["Fixed Salary Employee", "Contract Employee"];

const AddJobProfile = () => {
  const dispatch = useDispatch();
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  const [newFieldValue, setNewFieldValue] = useState("")
  const [newFields, setNewFields] = useState<any>([])
  const [employementTypeValue, setEmployementTypeValue] = useState("Fixed Salary Employee");

  useEffect(() => {
    dispatch(getAllJobProfileAsync());
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  }: any = useForm();

  const validateJobProfileName = (value: any) => {
    if (/^\d/.test(value)) {
      return "Job Profile Name cannot start with a digit";
    }
    return true;
  };

  // Event handler to handle changes in the Job Profile Name field
  const handleJobProfileNameChange = (e: any) => {
    const inputJobProfileName = e.target.value;
    if (/^\d/.test(inputJobProfileName)) {
      setValue("jobProfileName", inputJobProfileName.replace(/^\d/, ""));
    }
  };

  return (
    <div className="mx-10 w-[688px]">
      <div className="pt-8 ">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Job Profile</h1>

      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit((data: any) => {
          console.log(data)
          dispatch(createJobProfileAsync(data)).then((res: any) => {
            if (res.payload.success) {
              toast.success(res.payload.message);
            } else {
              toast.error(res.payload.message);
            }
            dispatch(getAllJobProfileAsync());
          })
          setNewFields([]);
          reset()
        })}>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-3'>
              <div className="flex flex-row">
                <p className='text-sm font-normal text-[#1C1C1C] mr-12'>Job Profile Name</p>
                <div className="flex gap-[8px]">

                  <input  {...register('isSupervisor', {})} defaultChecked={false} type="checkbox" />
                  <p className="text-sm">Is this Supervisor?</p>
                </div>
              </div>
              <div>
                <input
                  {...register('jobProfileName', {
                    required: 'Job Profile Name is required',
                    validate: validateJobProfileName,

                  })}
                  type="text"
                  className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                  onChange={handleJobProfileNameChange} // Add the onChange event handler
                />
                {errors.jobProfileName && <p className="text-red-500">{errors.jobProfileName.message}</p>}
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <div>
                <p className='text-sm font-normal text-[#1C1C1C]'>Parent Job Profile</p>
              </div>
              <div>
                <select
                  {...register('parentJobProfileName', { required: "Job Profile required" })}
                  className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                  <option>Job Profiles</option>
                  {jobProfileList && jobProfileList.map((element: any, index: number) => {
                    return <option key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-5'>
            <div>
              <p className='text-sm font-normal text-[#1C1C1C]'>Job Description</p>
            </div>
            <div>
              <textarea
                {...register('jobDescription', { required: 'Job Description is required' })}
                className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-32 w-full' />
              {errors.jobDescription && <p className="text-red-500">{errors.jobDescription.message}</p>}
            </div>
          </div>
          <div className='flex flex-row gap-3 mt-4'>
            <div className='flex flex-col gap-3'>
              <div>
                <p className='text-sm font-normal text-[#1C1C1C]'>Employment Type</p>
              </div>
              <div>
                <select
                  {...register('employmentType', { required: "Employment Type required" })}
                  onChange={(event) => setEmployementTypeValue(event.target.value)}
                  className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                  {employementTypeList.map((element) => {
                    return <option value={element} key={element} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element}</option>
                  })}
                </select>
              </div>
            </div>
          </div>

          {employementTypeValue === "Contract Employee" &&
            <div className="flex justify-center mt-6 py-8 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA]">
              <div className="flex flex-col gap-3">
                <div className="flex">
                  <p className="text-sm font-normal text-[#1C1C1C]">Define Production Slip Format</p>
                </div>
                <div className="flex gap-3">
                  <div>
                    <input
                      onChange={(event) => {
                        setNewFieldValue(event.target.value);
                      }}
                      className="py-3 px-4 w-[320px] h-10 border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded focus:outline-none"
                      placeholder="Column Name"
                      value={newFieldValue}
                      type="text" />
                  </div>
                  <div>
                    <div onClick={() => {
                      if (newFieldValue !== "") {
                        setNewFields([...newFields, newFieldValue])
                        setNewFieldValue("");
                      }

                    }}
                      className='flex items-center justify-center rounded-lg w-[149px] h-10 text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4 cursor-pointer'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Column</p></div>
                  </div>
                </div>
                {(newFields.length > 0) && <div className="flex flex-wrap mt-6">
                  <div className="flex justify-center items-center bg-[#ECEDFE] w-12 h-[42px]">
                    <img src={BlackPlus} className="w-6 h-6" alt="" />
                  </div>
                  {newFields && newFields.map((element: any, index: number) => {
                    return <p
                      key={index}
                      className="py-4 px-6 h-[42px] flex items-center text-sm font-medium text-[#2E2E2E] bg-[#ECEDFE] border-l border-solid border-[#DEDEDE]"
                    >{element}</p>
                  })}
                </div>}
              </div>
            </div>
          }

          <div className="mt-10">
            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4 h-10'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Job Profile</p></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobProfile;
