import { useForm } from "react-hook-form"
import { useState } from 'react';
import PaperPlane from '../../../assets/PaperPlane.svg'
import { useDispatch, useSelector } from "react-redux";
import { createLeavesAndGatePassAsync } from "../../../redux/Slice/LeaveAndGatepassSlice";

export const ApplyForLeave = () => {
    const dispatch = useDispatch();
    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    const [applicationTypeValue, setapplicationTypeValue] = useState("")
    const { handleSubmit, register, reset } = useForm();
    const handleApplicationTypeChange = (event: any) => {
        setapplicationTypeValue(event.target.value);
    }

    function convertToAmPm(time: any) {
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours, 10);
      
        const suffix = formattedHours >= 12 ? 'PM' : 'AM';
      
        if (formattedHours === 0) {
          formattedHours = 12;
        } else if (formattedHours > 12) {
          formattedHours -= 12;
        }
      
        return `${formattedHours}:${minutes} ${suffix}`;
      }
      function convertToDateDMY(date: any) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
      }
    return (
        <div className="mx-10">
            <div className="pt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Apply for a Leave/Gatepass</h1>
            </div>
            <div className="mt-10">
                <form
                    onSubmit={handleSubmit((data: any) => {
                        const {gatePassTime, from, to} = data;
                        console.log(data);
                        if(gatePassTime){
                            const updatedTime = convertToAmPm(gatePassTime);
                            data = {
                                ...data,
                                time: updatedTime
                            }
                        }
                        if(from){
                            const updateDate = convertToDateDMY(from)
                            data = {
                                ...data,
                                date: updateDate
                            }
                        }
                        if(to){
                            const updateDate = convertToDateDMY(to)
                            data = {
                                ...data,
                                date: updateDate
                            }
                        }
                        if(applicationTypeValue === "Gatepass"){
                            const createData = {employeeId: loggedInUserData?.employee?._id,
                                gatePassTime: data.gatePassTime,
                                message: data.message,
                                gatePassDate: data.date
                            }
                            dispatch(createLeavesAndGatePassAsync(createData));
                            reset();
                            console.log(createData);
                        }
                        if(applicationTypeValue === "Leave"){
                            const createData = {employeeId: loggedInUserData?.employee?._id,
                                from: data.from,
                                to: data.to,
                                message: data.message
                            }
                            dispatch(createLeavesAndGatePassAsync(createData));
                            reset();
                            console.log(createData);
                        }
                    })}
                >
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Application Type</p>
                            </div>
                            <div>
                                <select
                                    {...register('applicationType', { required: true })}
                                    defaultValue="ApplicationType"
                                    onChange={handleApplicationTypeChange}
                                    className='border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded'>
                                    <option value="ApplicationType" disabled className="hidden"></option>
                                    <option value="Leave" className="rounded-none">Leave</option>
                                    <option value="Gatepass" className='border border-solid border-[#DEDEDE] w-[320px] h-10 px-2'>Gatepass</option>
                                </select>
                            </div>
                        </div>
                        {applicationTypeValue === "Leave" && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Date From</p>
                            </div>
                            <div>
                                <input
                                    {...register("from", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
                                    type="date" />
                            </div>
                        </div>}
                        {applicationTypeValue === "Leave" && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Date to</p>
                            </div>
                            <div>
                                <input
                                    {...register("to", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
                                    type="date" />
                            </div>
                        </div>}
                        {applicationTypeValue === "Gatepass" && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Date</p>
                            </div>
                            <div>
                                <input
                                    {...register("date", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
                                    type="date" />
                            </div>
                        </div>}
                        {applicationTypeValue === "Gatepass" && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Time</p>
                            </div>
                            <div>
                                <input
                                    {...register("gatePassTime", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
                                    type="time"
                                />

                            </div>
                        </div>}
                        {(applicationTypeValue === "Leave" || applicationTypeValue === "Gatepass") && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Reason</p>
                            </div>
                            <div>
                                <textarea
                                    {...register("message", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-[#666666] w-[320px] h-[130px] py-3 px-4 focus:outline-none rounded"
                                />
                            </div>
                        </div>}
                        <div className="mt-3">
                            <button type="submit" className="flex items-center py-3 px-4 h-10 w-[104px] bg-[#283093] rounded-lg">
                                <img src={PaperPlane} className="w-4 h-4" alt="plane" />
                                <p className="px-2 text-sm font-medium text-[#FBFBFC]">Apply</p>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}