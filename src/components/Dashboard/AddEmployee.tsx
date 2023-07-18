import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Plus from '../../assets/Plus.png'
import BluePlus from '../../assets/BluePlus.png'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { createEmployeeAsync } from '../../redux/Slice/EmployeeSlice';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const [employementTypeValue, setEmployementTypeValue] = useState("");
    const [overTimeValue, setOverTimeValue] = useState(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles)
    const groupList = useSelector((state: any) => state.group.groups);
    const overTimeList = ["Yes", "No"];
    useEffect(() => {
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
    }, [])
    const handleJobProfileChange = (event: any) => {
        const value = event.target.value;
        if (event.target.value === "JobProfile") {
            setEmployementTypeValue('');
        }
        for (let i = 0; i < jobProfileList.length; i++) {
            if (value === jobProfileList[i].jobProfileName) {
                setEmployementTypeValue(jobProfileList[i].employmentType);
                break;
            }
        }
    }

    const handleOverTimeChange = (event: any) => {
        if (event.target.value === "Yes") {
            setOverTimeValue(true);
        } else {
            setOverTimeValue(false);
        }
    }


    return (
        <div className="mx-8">
            <div className='pt-8'>
                <h1 className='text-[24px] font-bold leading-8 text-[#2E2E2E]'>Add Employee</h1>
            </div>
            {/* FORM */}
            <div className='mt-10'>
                <form onSubmit={handleSubmit((data) => {
                    data = {
                        ...data,
                        overTime: overTimeValue
                    }
                    console.log(data)
                    dispatch(createEmployeeAsync(data));
                    reset()
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
                                        {...register('name', { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Email</p>
                                </div>
                                <div>
                                    <input
                                        {...register('email', { required: true })}
                                        type="email" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
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
                                <div>
                                    <input
                                        {...register('contactNumber', { required: "Phone No. required" })}
                                        type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                </div>
                            </div>
                            {employementTypeValue === "Fixed Salary Employee" && <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Salary</p>
                                </div>
                                <div>
                                    <input
                                        {...register('salary', { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
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
                                            <input
                                                {...register('lunchTime', { required: true })}
                                                type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Working Days</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('workingDays', { required: true })}
                                                type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Working Hours</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('workingHours', { required: true })}
                                                type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
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
                                                type="number" disabled={!overTimeValue} className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
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