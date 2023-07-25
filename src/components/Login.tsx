import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoginAsync, getLoggedInUserDataAsync } from '../redux/Slice/loginSlice';
import eye from "../assets/Eye.png"
import signin from "../assets/SignIn.png"
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Inputs = {
    email: string;
    password: string;
    emailOrPhoneNumber: string; // Add this field for the email or phone number input
};

export function Login() {
    const { register, handleSubmit,
        formState: { errors }, } = useForm<Inputs>();
    const dispatch = useDispatch();
    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    const onSubmit = (data: Inputs) => {
        console.log(data)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        const isPhoneNumber = /^\d{10,}$/.test(data.email);
    
        if (data.emailOrPhoneNumber === "") {
            toast.error("Please enter a correct email or phone number.");
        } else if (!isEmail && !isPhoneNumber) {
            toast.error("Invalid email address or phone number.");
        } else {
            dispatch(getAdminLoginAsync(data)).then(() => {
                dispatch(getLoggedInUserDataAsync());
            });
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
                                    <p className="text-sm font-normal">Email</p>
                                </div>
                                <div className='relative w-[320px]'>
                                    <input
                                        {...register("email", {
                                            required: "Email or Phone Number is required.",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // This pattern will accept either an email or a phone number with at least 10 digits
                                                message: 'Invalid email address ',
                                            },
                                        })}
                                        className='border border-solid border-[#DEDEDE] py-4 ps-4 pe-9 w-[320px] focus:outline-none text-sm text-[#666666] font-normal h-10 rounded'
                                        type="email"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                                {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}
                            </div>
                        </div>

                        <div className="mt-8">
                            <button type='submit' className='flex justify-center items-center w-[125px] h-[52px] rounded-lg bg-[#283093] py-4 px-5'>
                                <div>
                                    <img src={signin} className='w-5 h-5' alt="" />
                                </div>
                                <div>
                                    <p className='px-2 text-[16px] leading-6 font-medium text-[#FBFBFC]'>Login</p>
                                </div>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}