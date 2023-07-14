import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Plus from '../../assets/Plus.png'
import { useDispatch, useSelector } from 'react-redux';
import { createJobProfileAsync, getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";

const employementTypeList = ["Fixed Salary Employee", "Contract Employee"];

const AddJobProfile = () => {
  const dispatch = useDispatch();
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles)

  useEffect(() => {
    dispatch(getAllJobProfileAsync());
  }, [])

  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  return (
    <div className="mx-10">
      <div className="pt-8">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Job Profile</h1>
      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit((data) => {
          dispatch(createJobProfileAsync(data)).then(() => {
            dispatch(getAllJobProfileAsync());
          })
          reset()
        })}
        >
          <div className='flex gap-10'>
            <div className='flex flex-col gap-3'>
              <div>
                <p className='text-sm font-normal text-[#1C1C1C]'>Job Profile Name</p>
              </div>
              <div>
                <input
                  {...register('jobProfileName', { required: true })}
                  type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
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
                {...register('jobDescription', { required: true })}
                className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-32 w-full' />
            </div>
          </div>
          <div className='flex flex-row gap-3 mt-4'>
            <div className='flex flex-col gap-3 mt-4'>
              <div>
                <p className='text-sm font-normal text-[#1C1C1C]'>Employment Type</p>
              </div>
              <div>
                <select
                  {...register('employmentType', { required: "Employement Type required" })}
                  className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                  <option>Employement Type</option>
                  {employementTypeList.map((element) => {
                    return <option value={element} key={element} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element}</option>
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4 h-10'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Job Profile</p></button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddJobProfile