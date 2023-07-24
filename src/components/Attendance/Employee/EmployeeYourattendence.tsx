import { useState, useEffect } from "react";
import glass from "../../../assets/MagnifyingGlass.png";
import FunnelSimple from '../../../assets/FunnelSimple.svg'
import { useDispatch, useSelector } from "react-redux";
import { getAllAttandenceAsync, getMyAttandenceAsync, updateAttendanceAsync } from "../../../redux/Slice/AttandenceSlice";
import Calendar from "react-calendar";
import CaretLeft from "../../../assets/CaretLeft.svg"
import CaretRight from "../../../assets/CaretRight1.svg"
import 'react-datepicker/dist/react-datepicker.css';
import { getAllGroupsAsync } from "../../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../../redux/Slice/JobProfileSlice";
import GreenCheck from '../../../assets/GreenCheck.svg';
import RedX from '../../../assets/RedX.svg';
import SpinnerGap from '../../../assets/SpinnerGap.svg'
import DotsThreeVertical from '../../../assets/DotsThreeVertical.svg'


export const Employeeattendence = () => {
    const dispatch = useDispatch();
    const allAttandenceList = useSelector((state: any) => state.attandence.allAttandence.employees);
    const myAttandenceList = useSelector((state: any) => state.attandence.myAttandence);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

    const [isLabelVisible, setLabelVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [showFilter, setshowFilter] = useState(false);
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    const [nextDate, setnextDate] = useState<any>();
    const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
    const [filter, setFilter] = useState({
        name: "",
        jobProfileName: "",
        date: "",
        nextDate: ""
    })


    const [attandenceValue, setAttandenceValue] = useState("Your Attandence");
    const [date, setDate] = useState<any>(new Date());
    const [showCalender, setShowCalender] = useState(false);

    useEffect(() => {
        const currentDate = new Date(date);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFilter({
            ...filter,
            date: formattedDate
            // date:date.toDateString()
        })
    }, [date])
    useEffect(() => {
        if (nextDate) {
            const currentDate = new Date(nextDate);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            setFilter({
                ...filter,
                nextDate: `${year}-${month}-${day}`
            })
        }
    }, [nextDate])
    useEffect(() => {
        dispatch(getAllAttandenceAsync(filter))
        dispatch(getMyAttandenceAsync(filter))
    }, [filter])
    const handleInputChange = (event: any) => {
        if (event.target.value !== "") {
            setLabelVisible(false);
            setSearch(event.target.value);
            setFilter({
                ...filter,
                name: event.target.value
            })
            getSuggestions(event.target.value);
        }
        else {
            setLabelVisible(true);
            setSearch(event.target.value);
            setFilter({
                ...filter,
                name: event.target.value
            })
            setSuggestions([]);
        }
    };
    const getSuggestions = (inputValue: any) => {
        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };
    useEffect(() => {
        dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
            const employeeData = data.payload.employees;
            const arr = [];
            if (employeeData) {
                for (let i = 0; i < employeeData.length; i++) {
                    arr.push(employeeData[i].employeeId.name)
                }
                setFetchedSuggestions(arr)
            }
        });
        dispatch(getAllGroupsAsync())
        dispatch(getAllJobProfileAsync())
        dispatch(getMyAttandenceAsync());
    }, [])

    const formatDate = (date: any) => {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };


    const [showTableRow, setShowTableRow] = useState<any>([]);

    const handleRowClick = (index: number) => {
        const isExpanded = showTableRow.includes(index)
        if (isExpanded) {
            setShowTableRow(showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index))
        }
        else {
            setShowTableRow([...showTableRow, index])
        }
    }
    console.log("showTableRow", showTableRow)

    const [showStatusDropdown, setShowStatusDropdown] = useState<any>([]);
    const handleDotClicked = (data: any) => {
        const isExpanded = showStatusDropdown.includes(data)
        if (isExpanded) {
            setShowStatusDropdown(showStatusDropdown.filter((element: any) => element !== data))
        }
        else {
            setShowStatusDropdown([data]);
        }
    }


    return (
        <div>
            <div className="pt-8 px-[40px]">
                <div className="flex w-[688px] items-start gap-[291px]">
                    <p className="text-2xl text-[#2E2E2E] font-bold leading-8">
                        Attendance Database
                    </p>
                </div>
                <div className=" flex pt-6 justify-between items-end self-stretch ">
                    <div className="flex gap-4 items-center">
                        <div>
                            <select
                                className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium h-10 px-5 focus:outline-none'
                                onChange={(event) => setAttandenceValue(event.target.value)}>
                                <option>Your Attandence</option>
                                <option>Staff Attandence</option>
                            </select>
                        </div>
                        {attandenceValue !== "Your Attandence" &&
                            <div>
                                <select
                                    onChange={(event) => {
                                        if (event.target.value === "All Job Profiles") {
                                            setFilter({
                                                ...filter,
                                                jobProfileName: ""
                                            })
                                        } else {
                                            setFilter({
                                                ...filter,
                                                jobProfileName: event.target.value
                                            })
                                        }
                                    }}
                                    value={filter.jobProfileName}
                                    className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium h-10 px-5 focus:outline-none'>
                                    <option value="All Job Profiles">All Job Profiles</option>
                                    {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                        return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                                    })}
                                </select>
                            </div>}
                    </div>
                    {attandenceValue !== "Your Attandence" && <div>
                        <div className="relative">
                            {isLabelVisible && <div className="absolute top-[10px] left-6">
                                <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text">
                                    <img src={glass} alt="" className="h-4 w-4" />
                                    <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                                </label>
                            </div>}
                            <input
                                onClick={() => setshowFilter(false)}
                                type="search"
                                id="searchInput"
                                onChange={handleInputChange}
                                value={search}
                                className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
                            />
                            {suggestions.length > 0 && (
                                <div className="absolute top-10 flex z-10 flex-col text-[#2E2E2E]">
                                    {suggestions.map((suggestion: any, index: any) => (
                                        <input type="text" readOnly key={index}
                                            className="py-3 px-5 cursor-pointer focus:outline-none w-[200px]"
                                            value={suggestion}
                                            onClick={(event) => {
                                                setFilter({
                                                    ...filter,
                                                    name: (event.target as HTMLInputElement).value
                                                })
                                                setSuggestions([]);
                                            }} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>}
                </div>
                <div className='mt-10 overflow-auto'>
                    {attandenceValue === "Your Attandence" ? <div className='py-6'>
                        {/* TABLE STARTS HERE */}
                        <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE] cursor-default'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Status</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Marked By </td>
                                </tr>
                                {myAttandenceList && myAttandenceList.map((element: any, index: number) => {
                                    const punchesList = [...(element.punches)];
                                    console.log("normal", punchesList)
                                    const sortedPunches = punchesList.sort((a: any, b: any) => {
                                        return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                                    })
                                    const latestPunches = sortedPunches[0];
                                    return <>
                                        <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => { handleRowClick(index) }}>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? new Date(latestPunches.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? new Date(latestPunches.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                            <td className='py-4 px-5'>
                                                {latestPunches?.status === "approved" &&
                                                    <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                    </span>}
                                                {latestPunches?.status === "rejected" &&
                                                    <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                    </span>}
                                                {(latestPunches.status === "pending") &&
                                                    <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                    </span>}
                                            </td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                        </tr>
                                        {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any, index: number) => {
                                            return <tr key={index}>
                                                <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchIn ? new Date(element.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchOut ? new Date(element.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                <td className='py-4 px-5'>
                                                    {element.status === "approved" &&
                                                        <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                            <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                        </span>}
                                                    {element.status === "rejected" &&
                                                        <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                            <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                        </span>}
                                                    {(element.status === "pending") &&
                                                        <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                            <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                        </span>}
                                                </td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                            </tr>
                                        })}
                                    </>
                                })}
                            </tbody>
                        </table>
                        {/* TABLE ENDS HERE */}
                    </div> : ""}

                    {attandenceValue === "Staff Attandence" ?
                        <div className='pt-6 pb-24 relative overflow-auto'>
                            {/* TABLE STARTS HERE */}
                            <table>
                                <tbody>
                                    <tr className='bg-[#ECEDFE] cursor-default'>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Status</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Marked By </td>
                                    </tr>
                                    {allAttandenceList && allAttandenceList.map((element: any, index: number) => {
                                        const punchesList = [...(element.punches)];
                                        const sortedPunches = punchesList.sort((a: any, b: any) => {
                                            return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                                        })
                                        const latestPunches = sortedPunches[0];
                                        return <>
                                            <tr key={index} className='hover:bg-[#FAFAFA]'>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                                                <td onClick={() => { handleRowClick(index) }} className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? new Date(latestPunches.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? new Date(latestPunches.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                <td className='py-4 px-5'>
                                                    {latestPunches?.status === "approved" &&
                                                        <span className='relative flex gap-3 items-center bg-[#E9F7EF] w-[135px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <div className="flex gap-2 items-center">
                                                                <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                                <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                            </div>
                                                            <div onClick={() => handleDotClicked(latestPunches.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                            </div>
                                                            {showStatusDropdown.includes(latestPunches.punchIn) && <div className="absolute -right-6 -bottom-10 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl">
                                                                <p onClick={() => {
                                                                    dispatch(updateAttendanceAsync({ employeeId: element.employeeId?._id, status: "rejected", punchInTime: latestPunches.punchIn })).then(() => { dispatch(getAllAttandenceAsync(filter)), setShowStatusDropdown([]) })
                                                                }} className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Reject</p>
                                                            </div>}
                                                        </span>}
                                                    {latestPunches?.status === "rejected" &&
                                                        <span className='relative flex gap-3 items-center bg-[#FCECEC] w-[135px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <div className="flex gap-2 items-center">
                                                                <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                                <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                            </div>
                                                            <div onClick={() => handleDotClicked(latestPunches.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                            </div>
                                                            {showStatusDropdown.includes(latestPunches.punchIn) && <div className="absolute -right-6 -bottom-10 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl border border-solid border-[#DEDEDE]">
                                                                <p
                                                                    onClick={() => {
                                                                        dispatch(updateAttendanceAsync({ employeeId: element.employeeId?._id, status: "approved", punchInTime: latestPunches.punchIn })).then(() => { dispatch(getAllAttandenceAsync(filter)), setShowStatusDropdown([]) })
                                                                    }}
                                                                    className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Approve</p>
                                                            </div>}
                                                        </span>}
                                                    {(latestPunches.status === "pending") &&
                                                        <span className='relative flex gap-3 items-center bg-[#FEF5ED] h-[26px] w-[125px] rounded-[46px] py-2 px-4'>
                                                            <div className="flex gap-2 items-center">
                                                                <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                                <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                            </div>
                                                            <div onClick={() => handleDotClicked(latestPunches.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                            </div>
                                                            {showStatusDropdown.includes(latestPunches.punchIn) && <div className="absolute -right-10 -bottom-20 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl">
                                                                <p onClick={() => {
                                                                    dispatch(updateAttendanceAsync({ employeeId: element.employeeId?._id, status: "approved", punchInTime: latestPunches.punchIn })).then(() => { dispatch(getAllAttandenceAsync(filter)), setShowStatusDropdown([]) })
                                                                }} className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Approve</p>
                                                                <p onClick={() => {
                                                                    dispatch(updateAttendanceAsync({ employeeId: element.employeeId?._id, status: "rejected", punchInTime: latestPunches.punchIn })).then(() => { dispatch(getAllAttandenceAsync(filter)), setShowStatusDropdown([]) })
                                                                }}
                                                                    className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E] w-full">Reject</p>
                                                            </div>}
                                                        </span>}
                                                </td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                            </tr>
                                            {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any, index: number) => {
                                                return <tr key={index}>
                                                    <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                    <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchIn ? new Date(element.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchOut ? new Date(element.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                                    <td className='py-4 px-5'>
                                                        {element.status === "approved" &&
                                                            <span className='flex gap-3 items-center bg-[#E9F7EF] h-[26px] rounded-[46px] py-2 px-4'>
                                                                <div className="flex gap-2 items-center">
                                                                    <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                                    <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                                </div>
                                                                <div onClick={() => handleDotClicked(element.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                    <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                                </div>
                                                                {showStatusDropdown.includes(element.punchIn) && <div className="absolute -right-10 -bottom-20 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl">
                                                                    <p className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Reject</p>
                                                                </div>}
                                                            </span>}
                                                        {element.status === "rejected" &&
                                                            <span className='flex gap-3 items-center bg-[#FCECEC] h-[26px] rounded-[46px] py-2 px-4'>
                                                                <div className="flex gap-2 items-center">
                                                                    <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                                    <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                                </div>
                                                                <div onClick={() => handleDotClicked(element.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                    <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                                </div>
                                                                {showStatusDropdown.includes(element.punchIn) && <div className="absolute -right-10 -bottom-20 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl">
                                                                    <p className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Approve</p>
                                                                </div>}
                                                            </span>}
                                                        {(element.status === "pending") &&
                                                            <span className='relative flex gap-3 items-center bg-[#FEF5ED] h-[26px] rounded-[46px] py-2 px-4'>
                                                                <div className="flex gap-2 items-center">
                                                                    <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                                    <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                                </div>
                                                                <div onClick={() => handleDotClicked(element.punchIn)} className="flex justify-center items-center cursor-pointer">
                                                                    <img src={DotsThreeVertical} className="w-[10px] h-[10px]" alt="" />
                                                                </div>
                                                                {showStatusDropdown.includes(element.punchIn) && <div className="absolute -right-10 -bottom-20 z-10 flex flex-col justify-center items-center bg-[#FAFAFA] rounded-xl">
                                                                    <p className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E]">Approve</p>
                                                                    <p className="p-2 hover:bg-[#FFF] cursor-pointer text-sm font-medium text-[#2E2E2E] w-full">Reject</p>
                                                                </div>}
                                                            </span>}
                                                    </td>
                                                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                                </tr>
                                            })}
                                        </>
                                    })}
                                </tbody>
                            </table>
                            {/* TABLE ENDS HERE */}
                        </div> : ""}
                </div>
            </div>

            <div className="fixed flex justify-center bg-white bottom-0 left-[270px] right-0">
                <div className="flex gap-3 items-center justify-center w-[300px] h-12 mb-10 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
                    <button
                        onClick={() => {
                            const nextDate = new Date(date);
                            nextDate.setDate(date.getDate() - 1);
                            setDate(nextDate);
                        }}>
                        <img src={CaretLeft} alt="" className="w-4 h-4" />
                    </button>
                    {showCalender && <div className="filterCalender absolute z-20 bottom-28">
                        <Calendar
                            onChange={(event) => {
                                calenderDayClicked.length === 0 ? setDate(event) : "";
                                calenderDayClicked.length === 1 ? setnextDate(event) : "";
                                if (calenderDayClicked.length < 1) {
                                    setcalenderDayClicked([...calenderDayClicked, 1]);
                                }
                            }}
                            onClickDay={() => {
                                if (calenderDayClicked.length > 0) {
                                    console.log("hlo")
                                    setShowCalender(false);
                                    setcalenderDayClicked([]);
                                }
                            }}
                            className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
                            formatShortWeekday={(locale, date) => {
                                return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
                            }}
                            value={date} />
                    </div>}
                    <p
                        onClick={() => {
                            setShowCalender(!showCalender);
                        }}
                        className="text-sm font-medium text-[#283093] cursor-pointer">{`${formatDate(date)} - ${nextDate ? formatDate(nextDate) : formatDate(date)}`}</p>
                    <button
                        onClick={() => {
                            const nextDate = new Date(date);
                            nextDate.setDate(date.getDate() + 1);
                            setDate(nextDate);
                        }}>
                        <img src={CaretRight} className="w-4 h-4" alt="" />
                    </button>
                </div>
            </div>

        </div>

    )
}
