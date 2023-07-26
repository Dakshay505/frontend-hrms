import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import glass from '../../assets/MagnifyingGlass.png'
import { getAllAttandenceAsync } from "../../redux/Slice/AttandenceSlice";
import GreenCheck from '../../assets/GreenCheck.svg';
import RedX from '../../assets/RedX.svg';
import SpinnerGap from '../../assets/SpinnerGap.svg'

const SingleGroupAttendance = () => {
    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const allAttandenceList = useSelector((state: any) => state.attandence.allAttandence.attendanceRecords)
    const [isLabelVisible, setLabelVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);

    const [filter, setFilter] = useState({
        name: "",
        groupName: ""
    });
    useEffect(() => {
        dispatch(getAllGroupsAsync())
    }, [])
    useEffect(() => {
        dispatch(getAllAttandenceAsync(filter))
    }, [filter])
    useEffect(() => {
        const arr: any = [];
        console.log("AllAttendanceList", allAttandenceList)
        for (let i = 0; i < allAttandenceList.length; i++) {
            arr.push(allAttandenceList[i].employeeId.name)
        }
        setFetchedSuggestions(arr.filter((item: any, index: any) => arr.indexOf(item) === index))
    }, [allAttandenceList])
    const getSuggestions = (inputValue: any) => {

        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };
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
    
    return (
        <div className="pt-8 px-10">
            <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Attendance Database</h1>
            </div>
            <div className="mt-8 flex justify-between">
                <div>

                    <select
                        onChange={(event) => {
                            if (event.target.value === "All Groups") {
                                setFilter({
                                    ...filter,
                                    groupName: ""
                                })
                            } else {
                                setFilter({
                                    ...filter,
                                    groupName: event.target.value
                                })
                            }
                        }}
                        value={filter.groupName}
                        className='border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none'>
                        <option value="All Groups">All Groups</option>
                        {groupList && groupList.map((element: any, index: number) => {
                            return <option
                                key={index}
                                value={element.groupName}
                            >
                                {element.groupName}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <div className="relative">
                        {isLabelVisible && <div className="absolute top-[10px] left-6">
                            <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text">
                                <img src={glass} alt="" className="h-4 w-4" />
                                <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                            </label>
                        </div>}
                        <input
                            type="search"
                            id="searchInput"
                            onChange={handleInputChange}
                            value={search}
                            className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
                        />
                        {suggestions.length > 0 && (
                            <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
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
                </div>
            </div>
            <div className="py-8 overflow-auto">
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
            </div>
        </div>
    )
}

export default SingleGroupAttendance