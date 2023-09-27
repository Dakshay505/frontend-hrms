import check from "../../../assets/Check.png"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
    getSingleEmployeeAsync,
    updateEmployeeAsync,
} from "../../../redux/Slice/EmployeeSlice";
import { Otp } from "../otp";



export const EmployeeDetails = () => {
    const dispatch = useDispatch();
    const singleEmployee = useSelector(
        (state: any) => state.employee.singleEmployee
    );
    console.log(singleEmployee)
    const jobProfileList = useSelector(
        (state: any) => state.jobProfile.jobProfiles
    );
    const groupList = useSelector((state: any) => state.group.groups);
    console.log(groupList)

    const [employeeId, setEmployeeId] = useState("");

    const [inputBoxJobProfileValue, setInputBoxJobProfileValue] = useState<any>("");
    const [showInputBoxJobProfile, setShowInputBoxJobProfile] = useState(false);

    const [showInputBoxSalary, setShowInputBoxSalary] = useState(false);
    const [inputBoxSalaryValue, setInputBoxSalaryValue] = useState<any>("");


    const [showInputBoxLunchTime, setShowInputBoxLunchTime] = useState(false);
    const [inputBoxLunchTimeValue, setInputBoxLunchTimeValue] = useState<any>("");

    const [showInputBoxWorkingDays, setShowInputBoxWorkingDays] = useState(false);
    const [inputBoxWorkingDaysValue, setInputBoxWorkingDaysValue] =
        useState<any>("");


    const [showInputBoxWorkingHours, setShowInputBoxWorkingHours] =
        useState(false);
    const [inputBoxWorkingHoursValue, setInputBoxWorkingHoursValue] =
        useState<any>("");

    const [showInputBoxOverTime, setShowInputBoxOverTime] = useState(false);
    const [inputBoxOverTimeValue, setInputBoxOverTimeValue] =
        useState<any>(false);

  

    useEffect(() => {
        setEmployeeId(singleEmployee._id);
        setInputBoxJobProfileValue(singleEmployee.jobProfileId?.jobProfileName);
        setInputBoxSalaryValue(singleEmployee.salary);
        setInputBoxLunchTimeValue(singleEmployee.lunchTime);
        setInputBoxWorkingDaysValue(singleEmployee.workingDays);
        setInputBoxWorkingHoursValue(singleEmployee.workingHours);
        setInputBoxOverTimeValue(singleEmployee.overTime);


    }, [singleEmployee]);




    const { handleSubmit, register } = useForm();


    return (
        <div className="flex flex-col ">
            <form onSubmit={handleSubmit((data: any) => {
                const { overTime } = data;
                if (overTime === "Yes") {
                    data = { ...data, overTime: true };
                } else if (overTime === "No") {
                    data = { ...data, overTime: false };
                }
                const sendData = { employeeId: employeeId, data: data };
                dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
                    if (res.payload.success) {
                        toast.success(res.payload.message);
                    } else {
                        toast.error(res.payload.message);
                    }
                    dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                })
                setShowInputBoxJobProfile(false);
                setShowInputBoxSalary(false);
                setShowInputBoxLunchTime(false);
                setShowInputBoxWorkingDays(false);
                setShowInputBoxWorkingHours(false);
                setShowInputBoxOverTime(false);



            })}
                className=" gap-[24px] flex flex-col">

                <div className="flex justify-between  items-center">
                    <h1 className="text-[18px] font-bold text-[#2E2E2E]">Employee Details</h1>
                    <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
                        <img src={check} alt="" className="w-[16px] h-[16px]" />
                        Save
                    </button>

                </div>


                <div className="flex flex-col gap-[16px]">
                  <Otp/>

                    {!showInputBoxJobProfile && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <span className="text-[12px]">Job Profile</span>
                            <div onClick={() => {
                                setShowInputBoxJobProfile(!showInputBoxJobProfile);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.jobProfileId?.jobProfileName}
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxJobProfile && (
                        <div className="flex justify-between py-[8px]  px-[16px]  border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Job Profile
                                    </p>
                                </div>
                                <div>
                                    <select
                                        {...register("jobProfile", { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        defaultValue={inputBoxJobProfileValue}
                                        onChange={(event) =>
                                            setInputBoxJobProfileValue(event.target.value)
                                        }
                                    >
                                        {jobProfileList &&
                                            jobProfileList.map((element: any, index: number) => {
                                                return (
                                                    <option key={index} value={element.jobProfileName}>
                                                        {element.jobProfileName}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>

                        </div>
                    )}



                    {!showInputBoxSalary && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex items-center gap-3">

                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                    Salary
                                </p>

                            </div>
                            <div onClick={() => {
                                setShowInputBoxSalary(!showInputBoxSalary);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.salary}
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxSalary && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Salary
                                    </p>
                                </div>
                                <div>
                                    <input
                                        {...register("salary", { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxSalaryValue}
                                        onChange={(event) =>
                                            setInputBoxSalaryValue(event.target.value)
                                        }
                                        type="number"
                                    />
                                </div>
                            </div>

                        </div>
                    )}



                    {!showInputBoxLunchTime && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                    Lunch Time
                                </p>

                            </div>
                            <div onClick={() => {
                                setShowInputBoxLunchTime(!showInputBoxLunchTime);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.lunchTime} Hour
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxLunchTime && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Lunch Time
                                    </p>
                                </div>
                                <div>
                                    <select
                                        {...register("lunchTime", { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxLunchTimeValue}
                                        onChange={(event) =>
                                            setInputBoxLunchTimeValue(event.target.value)
                                        }
                                    >
                                        <option value="0.5">30 Min</option>
                                        <option value="0.75">45 Min</option>
                                        <option value="1">1 Hour</option>
                                        <option value="1.5">1.5 Hour</option>
                                        <option value="2">2 Hour</option>
                                        <option value="2.5">2.5 Hour</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    )}



                    {!showInputBoxWorkingDays && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                    Working Days
                                </p>

                            </div>
                            <div onClick={() => {
                                setShowInputBoxWorkingDays(!showInputBoxWorkingDays);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.workingDays} days per Week
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxWorkingDays && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Working Days
                                    </p>
                                </div>
                                <div>
                                    <select
                                        {...register("workingDays", { required: true })}
                                        className="text-[12px] leading-5 font-normal pe-5 focus:outline-none"
                                        value={inputBoxWorkingDaysValue}
                                        onChange={(event) =>
                                            setInputBoxWorkingDaysValue(event.target.value)
                                        }
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    )}



                    {!showInputBoxWorkingHours && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                    Working Hours
                                </p>

                            </div>
                            <div onClick={() => {
                                setShowInputBoxWorkingHours(!showInputBoxWorkingHours);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.workingHours} Hours per day
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxWorkingHours && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Working Hours
                                    </p>
                                </div>
                                <div>
                                    <input
                                        {...register("workingHours", { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxWorkingHoursValue}
                                        onChange={(event) =>
                                            setInputBoxWorkingHoursValue(event.target.value)
                                        }
                                        type="number"
                                    />
                                </div>
                            </div>

                        </div>
                    )}


                    {!showInputBoxOverTime && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                    Overtime?
                                </p>

                            </div>
                            <div onClick={() => {
                                setShowInputBoxOverTime(!showInputBoxOverTime);
                            }}>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                    {singleEmployee.overTime ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>
                    )}
                    {showInputBoxOverTime && (
                        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold  tracking-[0.25px]">
                                        Overtime?
                                    </p>
                                </div>
                                <div>
                                    <select
                                        {...register("overTime", { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        defaultValue={inputBoxOverTimeValue ? "Yes" : "No"}
                                        value={inputBoxOverTimeValue}
                                        onChange={(event) =>
                                            setInputBoxOverTimeValue(event.target.value)
                                        }
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    )}


                    <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                                Overtime Rate
                            </p>
                        </div>
                        <div>
                            <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                                {inputBoxOverTimeValue &&
                                    singleEmployee.overTimeRate &&
                                    singleEmployee.overTimeRate.toFixed(2)}
                            </p>
                        </div>
                    </div>

                </div>
            </form>

        </div >
    )
}
