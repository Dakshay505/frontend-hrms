import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import PaperPlane from '../../../assets/PaperPlane.svg'
import { useDispatch, useSelector } from "react-redux";
import { createLeavesAndGatePassAsync } from "../../../redux/Slice/LeaveAndGatepassSlice";
import { getAllEmployeeAsync } from "../../../redux/Slice/EmployeeSlice";

export const ApplyForLeave = () => {
    const dispatch = useDispatch();
    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    const [applicationTypeValue, setapplicationTypeValue] = useState("")
    const { handleSubmit, register, reset } = useForm();
    const handleApplicationTypeChange = (event: any) => {
        setapplicationTypeValue(event.target.value);
    }

    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    const [employeeBox, setEmployeeBox] = useState(true)
    const [employeeId, setEmployeeId] = useState("")
    useEffect(() => {
        dispatch(getAllEmployeeAsync()).then((res: any) => {
            const employeeData = res.payload.employees;
            const arr = [];
            for (let i = 0; i < employeeData.length; i++) {
                if (employeeData[i].profilePicture) {
                    arr.push({ employeeId: employeeData[i]._id, name: employeeData[i].name, profilePicture: employeeData[i].profilePicture, jobProfileName: employeeData[i].jobProfile.jobProfileName })
                } else {
                    arr.push({ employeeId: employeeData[i]._id, name: employeeData[i].name, profilePicture: "https://cdn-icons-png.flaticon.com/512/219/219983.png", jobProfileName: employeeData[i].jobProfile.jobProfileName })
                }
            }
            setFetchedSuggestions(arr)
        })
    }, [])

    const handleInputChange = (event: any) => {
        if (event.target.value !== "") {
            setSearch(event.target.value);
            getSuggestions(event.target.value);
        }
        else {
            setSearch(event.target.value);
            setSuggestions([]);
        }
    };

    const getSuggestions = (inputValue: any) => {

        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            (suggestion.name)?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };


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
                        const { gatePassTime, from, to } = data;
                        if(!employeeBox){
                            if (gatePassTime) {
                                const updatedTime = convertToAmPm(gatePassTime);
                                data = {
                                    ...data,
                                    time: updatedTime
                                }
                            }
                            if (from) {
                                const updateDate = convertToDateDMY(from)
                                data = {
                                    ...data,
                                    date: updateDate
                                }
                            }
                            if (to) {
                                const updateDate = convertToDateDMY(to)
                                data = {
                                    ...data,
                                    date: updateDate
                                }
                            }
                            if (applicationTypeValue === "Gatepass") {
                                const createData = {
                                    employeeId: employeeId,
                                    gatePassTime: data.gatePassTime,
                                    message: data.message,
                                    gatePassDate: data.date
                                }
                                dispatch(createLeavesAndGatePassAsync(createData));
                                reset();
                                setSearch("");
                                setEmployeeId("");
                            }
                            if (applicationTypeValue === "Leave") {
                                const createData = {
                                    employeeId: employeeId,
                                    from: data.from,
                                    to: data.to,
                                    message: data.message
                                }
                                dispatch(createLeavesAndGatePassAsync(createData));
                                reset();
                                setSearch("");
                                setEmployeeId("");
                            }
                        } else{

                        
                        if (gatePassTime) {
                            const updatedTime = convertToAmPm(gatePassTime);
                            data = {
                                ...data,
                                time: updatedTime
                            }
                        }
                        if (from) {
                            const updateDate = convertToDateDMY(from)
                            data = {
                                ...data,
                                date: updateDate
                            }
                        }
                        if (to) {
                            const updateDate = convertToDateDMY(to)
                            data = {
                                ...data,
                                date: updateDate
                            }
                        }
                        if (applicationTypeValue === "Gatepass") {
                            const createData = {
                                employeeId: loggedInUserData?.employee?._id,
                                gatePassTime: data.gatePassTime,
                                message: data.message,
                                gatePassDate: data.date
                            }
                            dispatch(createLeavesAndGatePassAsync(createData));
                            reset();
                            setSearch("");
                        }
                        if (applicationTypeValue === "Leave") {
                            const createData = {
                                employeeId: loggedInUserData?.employee?._id,
                                from: data.from,
                                to: data.to,
                                message: data.message
                            }
                            dispatch(createLeavesAndGatePassAsync(createData));
                            reset();
                            setSearch("");
                        }
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
                                    className='border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded'>
                                    <option value="ApplicationType" disabled className="hidden"></option>
                                    <option value="Leave" className="rounded-none">Leave</option>
                                    <option value="Gatepass" className='border border-solid border-[#DEDEDE] w-[320px] h-10 px-2'>Gatepass</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-[10px]">
                                <p className="text-sm font-normal text-[#1C1C1C]">Apply for an Employee</p>
                                <input
                                onChange={(event) => {
                                    setEmployeeBox(!event.target.checked)
                                }}
                                type="checkbox" />
                            </div>
                            <div>
                                <div className="relative">
                                    <input
                                        type="search"
                                        id="searchInput"
                                        onChange={handleInputChange}
                                        value={search}
                                        placeholder="Enter Employee Name"
                                        disabled={employeeBox}
                                        required
                                        className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
                                    />
                                    {suggestions.length > 0 && (
                                        <div className="absolute top-12 flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
                                            {suggestions.map((element: any, index: any) => {
                                                return <div key={index} onClick={() => {
                                                    setSearch(element.name);
                                                    setEmployeeId(element.employeeId);
                                                    setSuggestions([]);
                                                    }} className="flex gap-3 p-3 hover:bg-[#F5F5F5] cursor-pointer">
                                                    <div>
                                                        <img src={element.profilePicture} className="w-[50px] h-[50px] rounded-full" alt="" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium #1C1C1C">{element.name}</p>
                                                        <p className="text-[12px] leading-5 font-normal text-[#757575]">{element.jobProfileName}</p>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {applicationTypeValue === "Leave" && <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-normal text-[#1C1C1C]">Date From</p>
                            </div>
                            <div>
                                <input
                                    {...register("from", { required: true })}
                                    className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
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
                                    className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
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
                                    className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
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
                                    className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-10 px-2 focus:outline-none rounded"
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
                                    className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[320px] h-[130px] py-3 px-4 focus:outline-none rounded"
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