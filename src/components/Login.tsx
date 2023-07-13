import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoginAsync, getLoggedInUserDataAsync } from '../redux/Slice/loginSlice';
import eye from "../assets/Eye.png"
import signin from "../assets/SignIn.png"
import { Navigate } from 'react-router-dom';

type Inputs = {
    email: string;
    password: string;
};


export function Login() {
    const { register, handleSubmit } = useForm<Inputs>();
    const dispatch = useDispatch();
    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    const onSubmit = (data: Inputs) => {
        dispatch(getAdminLoginAsync(data)).then(() => {
            dispatch(getLoggedInUserDataAsync());
        });
    };
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    }, [])
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>

            {(loggedInUserData && loggedInUserData.admin) && <Navigate to='/' replace={true}></Navigate>}
            {(loggedInUserData && loggedInUserData.employee) && <Navigate to='/employee-leaves-home' replace={true}></Navigate>}

            <div>
                <div className='flex flex-col w-[768px] px-[40px] pt-[32px] items-start gap-[32px]'>
                    <div className="flex flex-start text-neutral-n-600 text-2xl font-inter font-bold leading-8">
                        HR Admin Login
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
                        <div className="max-w-lg">
                            <div className="py-2 w-[320px]">
                                <span className="px-1 py-[5px] text-sm text-gray-600">Email</span>
                                <input
                                    placeholder=""
                                    type="Email"
                                    {...register('email')}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                            </div>
                            <div className="py-2 w-[320px]">
                                <span className="px-1 py-[5px] text-sm text-gray-600">Password</span>
                                <div className="relative">
                                    <input
                                        placeholder=""
                                        {...register('password')}
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

                        <div className=" flex gap-[5px] w-[130px] mt-5 rounded-sm  items-center text-lg font-semibold bg-primary-blue  text-white  px-6 py-3  shadow-xl">
                            <img src={signin} alt="" className='h-[20px] w-[20px]' />
                            <input type='submit'
                                value={"Login"}
                                className='cursor-pointer'
                            />
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
