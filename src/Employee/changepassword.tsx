import { useEffect, useState, } from 'react';
import eye from "../assets/Eye.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeAsync } from '../redux/Slice/EmployeeSlice';





export function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [employeeId, setEmployeeId] = useState("")

  const singleEmployee = useSelector((state: any) => state.employee.singleEmployee)
  useEffect(() => {
    setEmployeeId(singleEmployee._id);
  }, [singleEmployee])


  // const handleSubmit = (data: Inputs) => {
  //   const { Oldpassword, Newpassword, confirmpassword } = data;

  //   if (Newpassword === confirmpassword && Newpassword && confirmpassword !== Oldpassword) {
  //     console.log('Passwords Changed');
  //     dispatch(changePassword(data)); // Dispatch the action
  //   } else {
  //     console.log('Invalid passwords!');
  //   }
  // };



  return (
    <div>
      <div className='flex flex-col w-[768px] px-[40px] pt-[32px] items-start gap-[32px]'>
        <div className="flex flex-start text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Change Password
        </div>
        <form onSubmit={handleSubmit((data) => {
          const sendData = { employeeId: employeeId, data: data }
          dispatch(updateEmployeeAsync(sendData)).then(() => {
            setEmployeeId(singleEmployee._id);
          });;
        })} className="w-[100%]">
          <div className="max-w-lg">
            <div className="py-2 w-[320px]">
              <span className="px-1 py-[5px] text-sm text-gray-600">Current Password</span>
              <div className="relative">
                <input
                  placeholder=""
                  {...register('Oldpassword')}
                  type={showPassword ? 'text' : 'password'}
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <img
                    className="h-6 text-gray-700 cursor-pointer"
                    src={eye}
                    alt="Show Password"
                    onClick={handleShowPassword}
                  />
                  <img
                    className="h-6 text-gray-700 cursor-pointer hidden"
                    src={eye}
                    alt="Hide Password"
                  />
                </div>
              </div>
            </div>
            <div className="py-2 w-[320px]">
              <span className="px-1 py-[5px] text-sm text-gray-600">New Password</span>
              <div className="relative">
                <input
                  placeholder=""
                  {...register('Newpassword')}
                  type={showPassword ? 'text' : 'password'}
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <img
                    className="h-6 text-gray-700 cursor-pointer"
                    src={eye}
                    alt="Show Password"
                    onClick={handleShowPassword}
                  />
                  <img
                    className="h-6 text-gray-700 cursor-pointer hidden"
                    src={eye}
                    alt="Hide Password"
                  />
                </div>
              </div>
            </div>
            <div className="py-2 w-[320px]">
              <span className="px-1 py-[5px] text-sm text-gray-600">Confirm Password</span>
              <div className="relative">
                <input
                  placeholder=""
                  {...register('confirmpassword')}
                  type={showPassword ? 'text' : 'password'}
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <img
                    className="h-6 text-gray-700 cursor-pointer"
                    src={eye}
                    alt="Show Password"
                    onClick={handleShowPassword}
                  />
                  <img
                    className="h-6 text-gray-700 cursor-pointer hidden"
                    src={eye}
                    alt="Hide Password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[5px] w-[189px] mt-5 rounded-sm items-center text-sm font-semibold bg-primary-blue text-white px-6 py-3 shadow-xl">
            <input type='submit'
              value="* Change Password"
              className='cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
