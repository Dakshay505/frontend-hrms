import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import { getSingleGroupSalaryAsync } from "../../redux/Slice/SalarySlice";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import Calendar from "react-calendar";


const SingleGroupSalary = () => {
    const dispatch = useDispatch();
    const singleGroupsSalaryList = useSelector((state: any) => state.salary.singleGroupsSalary);
    const allGroupsList = useSelector((state: any) => state.group.groups);
    const allJobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

    const [filter, setFilter] = useState({
        groupName: "",
        jobProfileName: "",
        date: "",
        nextDate: ""
    })

    const [groupValue, setGroupValue] = useState<any>("");
    const [jobProfileValue, setJobProfileValue] = useState<any>("");
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
        if(nextDate){
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
        dispatch(getSingleGroupSalaryAsync(filter))
    }, [filter])

    console.log(filter)

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
    }, [])

    const formatDate = (date: any) => {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
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
                        defaultValue="All Groups"
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
                    search
                </div>
            </div>
            <div className="py-6 overflow-auto">
                <table className="z-0">
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
                            return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer'>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.date ? element.date : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employeeId?.jobProfileId?.jobProfileName ? element.employeeId?.jobProfileId?.jobProfileName : "Not Avilable"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalEarning ? element.totalEarning : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employeeId?.salary ? element.employeeId?.salary : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.workingHours ? element.workingHours : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employeeId?.workingHours ? element.employeeId?.workingHours : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.pendingHours ? element.pendingHours : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.pendingHours ? element.pendingHours : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employeeId?.lunchTime ? element.employeeId?.lunchTime : 0}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{(element.workingHours > element.employeeId?.workingHours) && (element.workingHours - element.employeeId?.workingHours) ? (element.workingHours - element.employeeId?.workingHours) : "No Overtime"}</td>
                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{(element.workingHours > element.employeeId?.workingHours) && (element.workingHours - element.employeeId?.workingHours) ? (element.workingHours - element.employeeId?.workingHours) : "Absent"}</td>
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

export default SingleGroupSalary