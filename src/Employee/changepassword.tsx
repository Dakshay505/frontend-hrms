import { useEffect, useState, } from 'react';
import eye from "../assets/Eye.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import { updateEmployeeAsync } from '../redux/Slice/EmployeeSlice';
import Asterisk from '../assets/Asterisk.svg'
import { updatePasswordAsync } from '../redux/Slice/EmployeeSlice';


export function ChangePassword() {
  // const dispatch = useDispatch();

  const [employeeId, setEmployeeId] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const singleEmployee = useSelector((state: any) => state.employee.singleEmployee)

  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    setEmployeeId(singleEmployee._id);
  }, [singleEmployee])

  return (
    <div className='pt-8 px-10'>
      <div className=''>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Change Password</h1>
      </div>
      <div className='mt-10'>
        <form onSubmit={handleSubmit((data) => {
          const sendData = { employeeId: employeeId, data: data }
          console.log(sendData)
          dispatch(updatePasswordAsync(sendData)).then(() => {
            setEmployeeId(singleEmployee._id);
          });;
          reset()
        })}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <div>
                <p className="text-[12px] leading-5 font-normal">Current Password</p>
              </div>
              <div className='relative w-[320px]'>
                <input
                  {...register("oldPassword", { required: true })}
                  className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                  type={showCurrentPassword ? "text" : "password"} />
                <div onClick={() => setShowCurrentPassword(!showCurrentPassword)} className='absolute right-4 top-0 bottom-0 flex items-center cursor-pointer z-10'>
                  <img src={eye} className='w-4 h-4' alt="" />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div>
                <p className="text-[12px] leading-5 font-normal">New Password</p>
              </div>
              <div className='relative w-[320px]'>
                <input
                  {...register("newPassword", { required: true })}
                  className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                  type={showNewPassword ? "text" : "password"} />
                <div onClick={() => setShowNewPassword(!showNewPassword)} className='absolute right-4 top-0 bottom-0 flex items-center cursor-pointer z-10'>
                  <img src={eye} className='w-4 h-4' alt="" />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div>
                <p className="text-[12px] leading-5 font-normal">Confirm Password</p>
              </div>
              <div className='relative w-[320px]'>
                <input
                  {...register("confirmPassword", { required: true })}
                  className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                  type={showConfirmPassword ? "text" : "password"} />
                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-4 top-0 bottom-0 flex items-center cursor-pointer z-10'>
                  <img src={eye} className='w-4 h-4' alt="" />
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <button className='flex justify-center items-center py-3 px-4 w-[189px] h-10 rounded-lg bg-[#283093]'>
                <img src={Asterisk} className='w-4 h-4' alt="" />
                <p className='text-sm font-medium text-[#FBFBFC] px-2'>Change Password</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}