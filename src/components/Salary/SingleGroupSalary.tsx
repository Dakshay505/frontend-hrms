import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import { getSingleGroupSalaryAsync } from "../../redux/Slice/SalarySlice";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import Calendar from "react-calendar";
import glass from '../../assets/MagnifyingGlass.png'
import { useLocation } from "react-router-dom";

const SingleGroupSalary = () => {
    const location = useLocation();
    const [additionalData, setAdditionalData] = useState(location.state?.additionalData);
    const dispatch = useDispatch();
    const singleGroupsSalaryList = useSelector((state: any) => state.salary.singleGroupsSalary);
    const allGroupsList = useSelector((state: any) => state.group.groups);
    const allJobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

    const [filter, setFilter] = useState({
        groupName: "",
        jobProfileName: "",
        date: "",
        nextDate: "",
        name: ""
    })

    const [groupValue, setGroupValue] = useState<any>("");
    const [jobProfileValue, setJobProfileValue] = useState<any>("");
    const [isLabelVisible, setLabelVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [date, setDate] = useState<any>(new Date());
    const [nextDate, setnextDate] = useState<any>();
    const [showCalender, setShowCalender] = useState(false);
    const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);

    useEffect(() => {
        if (jobProfileValue === "All Job Profiles") {
            setFilter({
                ...filter,
                jobProfileName: ""
            })
        } else {
            setFilter({
                ...filter,
                jobProfileName: jobProfileValue
            })
        }
    }, [jobProfileValue])
    useEffect(() => {
        if (groupValue === "All Groups") {
            setFilter({
                ...filter,
                groupName: ""
            })
        } else {
            setFilter({
                ...filter,
                groupName: groupValue
            })
        }
    }, [groupValue])
    useEffect(() => {
        const currentDate = new Date(date);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        setFilter({
            ...filter,
            date: `${year}-${month}-${day}`
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

    const [dateRange, setDateRange] = useState<any>([])
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    useEffect(() => {
        function getDateRange(startDate: any, endDate: any) {
            if (nextDate) {
                const result = [];
                const currentDate = new Date(startDate);
                const finalDate = new Date(endDate);
                while (currentDate <= finalDate) {
                    result.push(currentDate.toISOString().slice(0, 10));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setDateRange([...result])
            }
        }
        getDateRange(filter.date, filter.nextDate)
        if (additionalData === "") {
            dispatch(getSingleGroupSalaryAsync(filter)).then((data: any) => {
                const employeeData = data.payload.attendanceRecords;
                const arr: any = [];
                for (let i = 0; i < employeeData.length; i++) {
                    arr.push(employeeData[i].employeeId.name)
                }
                setFetchedSuggestions(arr.filter((item: any, index: any) => arr.indexOf(item) === index))
            });
        }
    }, [filter])
    const getSuggestions = (inputValue: any) => {

        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
        if (additionalData !== "") {
            setFilter({
                ...filter,
                groupName: additionalData
            })
            setAdditionalData("");
        }
    }, [])

    const formatDate = (date: any) => {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const tileClassName = ({ date }: any) => {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split('T')[0];
        if (dateRange.includes(formattedDate)) {
            return 'bg-[#ECEDFE] text-[#FFFFFF]';
        }
        return '';
    };

    return (
        <div className='px-10 pt-8'>
            <div>
                <h1 className='text-2xl font-bold text-[#2E2E2E]'>Salary Database</h1>
            </div>
            <div className="pt-6 flex justify-between">
                <div className="flex gap-5">
                    <select
                        onChange={(event) => setGroupValue(event.target.value)}
                        className="py-3 px-5 min-w-[160px] text-sm text-[#2E2E2E] font-medium bg-[#FAFAFA] border border-solid border-[#DEDEDE] rounded-lg focus:outline-none"
                        defaultValue={additionalData}
                    >
                        <option value="All Groups">All Groups</option>
                        {allGroupsList && allGroupsList.map((element: any, index: number) => {
                            return <option key={index} value={element.groupName}>{element.groupName}</option>
                        })}
                    </select>
                    <select
                        onChange={(event) => setJobProfileValue(event.target.value)}
                        className="py-3 px-5 min-w-[160px] text-sm text-[#2E2E2E] font-medium bg-[#FAFAFA] border border-solid border-[#DEDEDE] rounded-lg focus:outline-none"
                    >
                        <option value="All Job Profiles">All Job Profiles</option>
                        {allJobProfileList && allJobProfileList.map((element: any, index: number) => {
                            return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
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
            <div className="py-6 mb-28 overflow-auto">
                <table className="z-0 w-full">
                    <tbody>
                        <tr className='bg-[#ECEDFE] cursor-default'>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Day and Date</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Net Salary</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Basic Salary</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Productive Time</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Working Hours</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Pending Hours</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Rate per Hour</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Lunch Time</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Overtime</td>
                            <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Absent Hours</td>
                        </tr>
                        {singleGroupsSalaryList && singleGroupsSalaryList.map((element: any, index: number) => {
                            function formatDateToCustomString(date:any) {
                                const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
                                return date.toLocaleDateString('en-US', options).replace(/\//g, ', ');
                              }
                            const inputDate = new Date(element.date);
                            const formattedDate = formatDateToCustomString(inputDate);
                            const parts = formattedDate.split(',');
                            const desiredFormat = `${parts[0]},${parts[2]}/${parts[1]}/${parts[3]}`;

                            return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer'>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.date ? desiredFormat : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.employeeId?.jobProfileId?.jobProfileName ? element.employeeId?.jobProfileId?.jobProfileName : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalEarning ? (element.totalEarning).toFixed(1) : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.employeeId?.salary ? element.employeeId?.salary : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.workingHours ? `${(element.workingHours).toFixed(1)} Hours` : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{(element.pendingHours + element.workingHours) ? `${(element.pendingHours + element.workingHours).toFixed(1)} Hours` : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.pendingHours ? `${(element.pendingHours).toFixed(1)} Hours` : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{(element.totalEarning / element.workingHours) ? `${(element.totalEarning / element.workingHours).toFixed(1)} Hours` : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.employeeId?.lunchTime ? element.employeeId?.lunchTime : 0} Hours</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{(element.workingHours - element.employeeId?.workingHours) > 0 ? `${(element.workingHours - element.employeeId?.workingHours).toFixed(1)} Hours` : "No Overtime"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-b border-solid border-[#EBEBEB]'>{(element.employeeId?.workingHours - element.workingHours) > 0 ? `${(element.employeeId?.workingHours - element.workingHours).toFixed(1)} Hours` : "No Absent Hours"}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
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
                            tileClassName={tileClassName}
                            onChange={(event) => {
                                calenderDayClicked.length === 0 ? setDate(event) : "";
                                calenderDayClicked.length === 1 ? setnextDate(event) : "";
                                if (calenderDayClicked.length < 1) {
                                    setcalenderDayClicked([...calenderDayClicked, 1]);
                                }
                            }}
                            onClickDay={() => {
                                if (calenderDayClicked.length > 0) {
                                    setShowCalender(false);
                                    setcalenderDayClicked([]);
                                }
                            }}
                            className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
                            formatShortWeekday={(locale, date) => {
                                console.log(locale)
                                return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
                            }} />
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

export default SingleGroupSalary