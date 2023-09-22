import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoginAsync, getLoggedInUserDataAsync } from '../redux/Slice/loginSlice';
import eye from "../assets/Eye.png"
import signin from "../assets/SignIn.png"
import { Navigate } from 'react-router-dom';
import XCircle from "../assets/XCircle.svg"
import LoaderGif from '../assets/loadergif.gif'
import toast from 'react-hot-toast';

export function Login() {
    const [errorMessage, setErrorMessage] = useState("")
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    const loaderStatus = useSelector((state: any) => state.login.status)
    function isValidEmail(email: any) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const onSubmit = (data: any) => {
        if (isValidEmail(data.email)) {
            dispatch(getAdminLoginAsync(data)).then((res: any) => {
                if (res.payload.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res.payload.message);
                }
                if (res.payload.success) {
                    setErrorMessage("");
                } else {
                    setErrorMessage(res.payload.message)
                }
                dispatch(getLoggedInUserDataAsync());
            })
        } else {
            data = {
                phone: data.email,
                password: data.password
            }
            dispatch(getAdminLoginAsync(data)).then((res: any) => {
                if (res.payload.success) {
                    setErrorMessage("");
                } else {
                    setErrorMessage(res.payload.message)
                }
                dispatch(getLoggedInUserDataAsync());
            })
        }

    };

    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    }, [])
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {(loggedInUserData && loggedInUserData.admin) && <Navigate to='/' replace={true}></Navigate>}
            {(loggedInUserData && loggedInUserData.employee) && <Navigate to='/emphome' replace={true}></Navigate>}
            <div className='flex flex-col justify-center items-center w-full mt-20'>
                <div>
                    <h1 className="text-[28px] leading-9 font-bold">HR Admin Login</h1>
                </div>
                <div className='mt-8'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className="text-sm font-normal">Email/Phone no</p>
                                </div>
                                <div className='relative w-[320px]'>
                                    <input
                                        {...register("email", {
                                            required: true
                                        })}
                                        className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className="text-sm font-normal">Password</p>
                                </div>
                                <div className='relative w-[320px]'>
                                    <input
                                        {...register("password", { required: true })}
                                        className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <div onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-0 bottom-0 flex items-center cursor-pointer z-10'>
                                        <img src={eye} className='w-4 h-4' alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errorMessage !== "" && <div className='flex items-center gap-[6px]'>
                            <div>
                                <img src={XCircle} className='w-[14px] h-[14px]' alt="" />
                            </div>
                            <p className='text-xs font-medium text-[#E23F3F]'>{errorMessage}</p>
                        </div>}

                        <div className='mt-8 flex  items-center gap-5'>
                            <div className='flex gap-5'>
                                <button type='submit' className='flex justify-center items-center w-[125px] h-[52px] rounded-lg hover:bg-[#28319196] bg-[#283093] py-4 px-5'>
                                    <div>
                                        <img src={signin} className='w-5 h-5' alt="" />
                                    </div>
                                    <div>
                                        <p className='px-2 text-[16px] leading-6 font-medium text-[#FBFBFC]'>Login</p>
                                    </div>
                                </button>

                             
                            </div>
                            {loaderStatus === "loading" ? <div className='flex w-full'>
                                <img src={LoaderGif} className='w-6 h-6' alt="" />
                            </div> : ""}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}