import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Plus from '../../assets/Plus.png';
import BluePlus from '../../assets/BluePlus.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { createEmployeeAsync } from '../../redux/Slice/EmployeeSlice';
import Receipt from '../../assets/Receipt.svg'

const AddEmployee = () => {
    const dispatch = useDispatch();
    const [employementTypeValue, setEmployementTypeValue] = useState('');
    const [overTimeValue, setOverTimeValue] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    }: any = useForm()

    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const groupList = useSelector((state: any) => state.group.groups);
    const overTimeList = ['Yes', 'No'];

    useEffect(() => {
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
    }, []);

    const handleJobProfileChange = (event: any) => {
        const value = event.target.value;
        if (event.target.value === 'JobProfile') {
            setEmployementTypeValue('');
        }
        for (let i = 0; i < jobProfileList.length; i++) {
            if (value === jobProfileList[i].jobProfileName) {
                setEmployementTypeValue(jobProfileList[i].employmentType);
                break;
            }
        }
    };

    const handleOverTimeChange = (event: any) => {
        const value = event.target.value;
        setOverTimeValue(value === 'Yes');

        // If "Yes" is selected, set a default overtime rate (you can change this value as needed)
        if (value === 'Yes') {
            const defaultOvertimeRate = 10; // Replace this with your desired default overtime rate
            setValue('overTimeRate', defaultOvertimeRate);
        } else {
            // If "No" is selected, clear the overtime rate
            setValue('overTimeRate', '');
        }
    };

    // phone number validation
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handlePhoneNumberChange = (e: any) => {
        const inputPhoneNumber = e.target.value;
        if (inputPhoneNumber.length <= 10) {
            setPhoneNumber(inputPhoneNumber);
        }

        // Regex pattern for a 10-digit phone number
        const phoneRegex = /^\d{10,11}$/;

        // Check if the input matches the regex pattern
        setIsValid(phoneRegex.test(inputPhoneNumber));
    };

    // name validation
    const validateEmployeeName = (value: any) => {
        if (/^\d/.test(value)) {
            return "Name cannot start with a digit";
        }
        return true;
    };

    // Event handler to handle changes in the Name field
    const handleEmployeeNameChange = (e: any) => {
        const inputEmployeeName = e.target.value;
        if (/^\d/.test(inputEmployeeName)) {
            setValue("name", inputEmployeeName.replace(/^\d/, ""));
        }
    };

    const handleSalaryChange = (event: any) => {
        const input = event.target;
        let newValue = input.value;

        // Check if the value starts with 0 or '-'
        if (/^(-|0)/.test(newValue)) {
            // Reset the value to remove the invalid characters
            newValue = newValue.replace(/^(-|0)/, '');
        }

        // Limit the value to 8 digits
        newValue = newValue.slice(0, 8);

        // Update the input value
        input.value = newValue;
    };


    return (
        <div className="mx-8 py-[32px]">
            <div className='pt-[5px]'>
                <h1 className='text-[24px] font-bold leading-8 text-[#2E2E2E]'>Add Employee</h1>
            </div>
            {/* FORM */}
            <div className='mt-10'>
                <form
                    onSubmit={handleSubmit((data: any) => {
                        data = {
                            ...data,
                            overTime: overTimeValue,
                        };
                        console.log(data);
                        dispatch(createEmployeeAsync(data));
                        reset();
                    })}
                >
                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register('name', { required: 'Name is required', validate: validateEmployeeName })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                        onChange={handleEmployeeNameChange} // Add the onChange event handler
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Email</p>
                                </div>
                                <div>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        type="email" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                        placeholder='abc@gmail.com'
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Job Profile</p>
                                </div>
                                <div>
                                    <select
                                        {...register('jobProfileName', { required: "Job Profile required" })}
                                        defaultValue={"Job Profile"} className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'
                                        onChange={handleJobProfileChange}>
                                        <option value="JobProfile">Job Profiles</option>
                                        {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                            return <option value={element.jobProfileName} key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Group</p>
                                </div>
                                <div>
                                    <select
                                        {...register('groupName', { required: "Group Name required" })}
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option value="Group">Group</option>
                                        {groupList && groupList.map((element: any, index: number) => {
                                            return <option value={element.groupName} key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.groupName}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between'>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Phone Number</p>
                                    <p onClick={() => setShowOtp(!showOtp)} className='text-[12px] leading-5 text-[#283093] font-normal cursor-pointer underline'>Verify with OTP</p>
                                </div>
                                <div onChange={handlePhoneNumberChange}>
                                    <input
                                        type="number"
                                        value={phoneNumber}
                                        placeholder='eg. 123-4567-890'
                                        {...register('contactNumber', { required: true })}
                                        pattern="^\d{10,11}$" // Regex pattern for a 10-digit phone number
                                        required // Make the input field required
                                        className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                    />
                                </div>
                                {phoneNumber.length > 0 && !isValid && (
                                    <p className='text-red-500'>Phone number is invalid!</p>
                                )}
                                {isValid && (
                                    <p className='text-green-500'>Phone number is valid!</p>
                                )}
                            </div>
                            {employementTypeValue === "Fixed Salary Employee" &&
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <p className='text-sm font-normal text-[#1C1C1C]'>Salary</p>
                                    </div>
                                    <div>
                                        <input
                                            {...register('salary', { required: "salary requires" })}
                                            type="number"
                                            className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                            name="salary"
                                            placeholder='₹'
                                            onChange={handleSalaryChange}
                                            maxLength={8}  // Add the maxLength attribute to limit the input to 8 digits
                                        />
                                        {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
                                    </div>
                                </div>
                            }
                            {employementTypeValue === "Contract Employee" && <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Expected Salary</p>
                                </div>
                                <div>
                                    <input
                                        {...register('expactedSalary', { required: true })}
                                        type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                </div>
                            </div>}
                        </div>

                        {/* FIXED SALARY EMPLOYEE */}
                        {employementTypeValue === "Fixed Salary Employee" ?
                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Lunch Time</p>
                                        </div>
                                        <div>
                                            <select
                                                {...register('lunchTime', { required: true })}
                                                className='border border-solid border-[#DEDEDE] rounded px-3 h-10 w-[324px]'
                                            >
                                                <option value="">Select lunch time</option>
                                                <option value="30">30 min</option>
                                                <option value="45">45 min</option>
                                                <option value="1">1 hour</option>
                                                <option value="1.30">1:30 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="2.30">2:30 hour</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Working Days</p>
                                        </div>
                                        <div
                                        >
                                            <select
                                                {...register('workingDays', { required: true })}
                                                className='border border-solid border-[#DEDEDE] rounded px-3 h-10 w-[324px]'
                                            >
                                                <option value="">Select working days</option>
                                                <option value="1">1 </option>
                                                <option value="2">2 </option>
                                                <option value="3">3 </option>
                                                <option value="4">4 </option>
                                                <option value="5">5 </option>
                                                <option value="6">6 </option>
                                                <option value="7">7 </option>
                                                {/* Add more working day options as needed */}
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Working Hours</p>
                                        </div>
                                        <div>
                                            <select
                                                {...register('workingHours', { required: true })}
                                                className='border border-solid border-[#DEDEDE] rounded py-2 px-3 h-10 w-[324px]'
                                            >
                                                <option value="">Select Working Hours</option>
                                                <option value="4 ">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hours</option>
                                                <option value="9">9 hours</option>
                                                <option value="10">10 hours</option>
                                                <option value="11">11 hours</option>
                                                <option value="12">12 hours</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Overtime?</p>
                                        </div>
                                        <div>
                                            <select
                                                {...register('overTime', { required: "Phone No. required" })}
                                                defaultValue={"Overtime"} className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'
                                                onChange={handleOverTimeChange}>
                                                <option value="Overtime">Overtime</option>
                                                {overTimeList.map((element) => {
                                                    return <option value={element} key={element} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Overtime Rate</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('overTimeRate', { required: overTimeValue })}
                                                type='number' readOnly disabled={!overTimeValue} className='border border-solid outline-none border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }
                        {/* FIXED SALARY EMPLOYEE END */}
                    </div>
                    <div className='flex gap-6 mt-10'>
                        <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Employee</p></button>
                        <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add More Employees</p></button>
                    </div>
                </form>
            </div>
            {showOtp && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className='absolute flex justify-center items-center top-0 bottom-0 right-0 left-0'>
                                <div className='bg-[#FFFFFF] p-10'>
                                    <div className='flex gap-2 pb-4 w-[640px] border-b border-solid border-[#B0B0B0]'>
                                        <div>
                                            <img src={Receipt} className='w-6 h-6' alt="" />
                                        </div>
                                        <div>
                                            <h3 className='text-[18px] leading-6 font-medium text-[#1C1C1C]'>OTP sent to +91 85385 57391</h3>
                                        </div>
                                    </div>
                                    <div className='pt-6 flex flex-col gap-3'>
                                        <div className='flex justify-between'>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Enter OTP</p>
                                            <p className='text-[12px] leading-5 font-normal text-[#283093] cursor-pointer underline'>Resend OTP</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register("otp", { required: true })}
                                                placeholder='XXX XXX'
                                                className='border border-solid border-[#B0B0B0] rounded py-3 px-4 h-10 w-[640px] text-sm font-normal text-[#666666]'
                                                type="number" />
                                        </div>
                                        <div className='pt-[21px]'>
                                            <div className='flex gap-4 justify-end'>
                                                <div onClick={() => setShowOtp(false)} className='flex justify-center items-center h-[34px] w-[96px] border border-solid border-[#3B3B3B] rounded-lg cursor-pointer'>
                                                    <p className='text-sm font-medium text-[#3B3B3B]'>Cancel</p>
                                                </div>
                                                <div className='flex justify-center items-center h-[34px] w-[122px] bg-[#283093] rounded-lg cursor-pointer'>
                                                    <p className='text-sm font-medium text-[#FBFBFC]'>Verify OTP</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
        </div>
    )
}

export default AddEmployee