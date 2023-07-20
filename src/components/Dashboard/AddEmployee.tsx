import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Plus from '../../assets/Plus.png';
import BluePlus from '../../assets/BluePlus.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { createEmployeeAsync } from '../../redux/Slice/EmployeeSlice';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const [employementTypeValue, setEmployementTypeValue] = useState('');
    const [overTimeValue, setOverTimeValue] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

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
    return (
        <div className="mx-8 py-[32px]">
            <div className='pt-[5px]'>
                <h1 className='text-[24px] font-bold leading-8 text-[#2E2E2E]'>Add Employee</h1>
            </div>
            {/* FORM */}
            <div className='mt-10'>
                <form
                    onSubmit={handleSubmit((data) => {
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
                                        {...register('name', { required: 'Name is required' })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
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
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Phone Number</p>
                                </div>
                                <div onChange={handlePhoneNumberChange}>
                                    <input
                                        type="number"
                                        value={phoneNumber}
                                        {...register('contactNumber', { required: "Phone No. required" })}
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
                            {employementTypeValue === "Fixed Salary Employee" && <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Salary</p>
                                </div>
                                <div >
                                    <input
                                        {...register('salary', { required: true })}
                                        type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                        name="salary"
                                    />
                                </div>
                            </div>}
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
                                                <option value="30 min">30 min</option>
                                                <option value="45 min">45 min</option>
                                                <option value="1 hour">1 hour</option>
                                                <option value="1:30 hour">1:30 hour</option>
                                                <option value="2 hour">2 hour</option>
                                                <option value="2:30 hour">2:30 hour</option>
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
                                                <option value="1 day">1 </option>
                                                <option value="2 days">2 </option>
                                                <option value="3 days">3 </option>
                                                <option value="4 days">4 </option>
                                                <option value="5 days">5 </option>
                                                <option value="6 days">6 </option>
                                                <option value="7 days">7 </option>
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
                                                <option value="4 hour">4 hour</option>
                                                <option value="5 hour">5 hour</option>
                                                <option value="6 hour">6 hour</option>
                                                <option value="7 hour">7 hour</option>
                                                <option value="8 hours">8 hours</option>
                                                <option value="9 hours">9 hours</option>
                                                <option value="10 hours">10 hours</option>
                                                <option value="11 hours">11 hours</option>
                                                <option value="12 hours">12 hours</option>
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
        </div>
    )
}

export default AddEmployee