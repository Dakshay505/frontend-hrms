import { useState, useEffect } from 'react';
import glass from '../../../assets/MagnifyingGlass.png'
import GreenCheck from '../../../assets/GreenCheck.svg';
import RedX from '../../../assets/RedX.svg';
import SpinnerGap from '../../../assets/SpinnerGap.svg'
import { getAllLeavesAndGatePassAsync, getMyLeavesAndGatePassAsync } from '../../../redux/Slice/LeaveAndGatepassSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserDataAsync } from '../../../redux/Slice/loginSlice';

export const ViewLeavesRecord = () => {
    const dispatch = useDispatch();
    const [leaveAndGatepassValue, setLeaveAndGatepassValue] = useState("Leaves");
    const [yourAndStaffLeaveValue, setYourAndStaffLeaveValue] = useState("");
    const [isLabelVisible, setLabelVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        name: "",
        groupName: "",
        jobProfileName: "",
        date: "",
        nextDate: ""
    });

    const myLeaveAndGatepassList = useSelector((state: any) => state.leave.myLeavesAndGatePass);
    console.log("myLeaveAndGatepassList", myLeaveAndGatepassList);
    const [myLeaves, setMyLeaves] = useState<any>([])
    const [myGatePass, setMyGatepass] = useState<any>([])

    useEffect(() => {
        if (myLeaveAndGatepassList) {
            console.log("myLeaveAndGatepassList", myLeaveAndGatepassList)
            setMyLeaves(myLeaveAndGatepassList.filter((element: any) => {
                return element.from
            }))
            setMyGatepass(myLeaveAndGatepassList.filter((element: any) => {
                return element.gatePassDate
            }))
        }
    }, [myLeaveAndGatepassList])


    const upperLevelEmployee = useSelector((state: any) => state.leave.upperLevelEmployee);
    console.log("upperLevelEmployee", upperLevelEmployee)
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
        dispatch(getMyLeavesAndGatePassAsync());
        dispatch(getAllLeavesAndGatePassAsync());
        if (leaveAndGatepassValue === "Leaves") {
            setYourAndStaffLeaveValue("Your Leaves")
        }
        else if (leaveAndGatepassValue === "Gatepass") {
            setYourAndStaffLeaveValue("Your Gatepass")
        }
    }, [leaveAndGatepassValue])
    const handleLeaveRecordChange = (event: any) => {
        setLeaveAndGatepassValue(event?.target.value)
    }
    const handleYourAndStaffLeavesChange = (event: any) => {
        setYourAndStaffLeaveValue(event?.target.value)
    }
    const handleSearchInputChange = (event: any) => {
        if (event.target.value !== "") {
            setLabelVisible(false);
        }
        else {
            setLabelVisible(true);
        }
        setSearch(event.target.value);
        console.log(search)
    };
    return (
        <div className="mx-10">
            <div className='flex gap-7 pt-8'>
                <div>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>View Database</h1>
                </div>
                <div>
                    <select
                        className="bg-[#ECEDFE] rounded-lg py-3 px-5 text-[#283093] text-sm font-medium h-10 focus:outline-none"
                        defaultValue="YourLeaves"
                        onChange={handleLeaveRecordChange}
                    >
                        <option value="Leaves">Leaves</option>
                        <option value="Gatepass">Gatepass</option>
                    </select>
                </div>
            </div>
            <div className='mt-7'>
                <div className="flex gap-4 items-center">
                    <div>
                        <select
                            onChange={handleYourAndStaffLeavesChange}
                            className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium w-[176px] h-10 px-5 focus:outline-none'>
                            {leaveAndGatepassValue === "Leaves" && <option value="Your Leaves">Your Leaves</option>}
                            {leaveAndGatepassValue === "Leaves" && <option value="Staff Leaves" >Staff Leaves</option>}
                            {leaveAndGatepassValue === "Gatepass" && <option value="Your Gatepass" >Your Gatepass</option>}
                            {leaveAndGatepassValue === "Gatepass" && <option value="Staff Gatepass" >Staff Gatepass</option>}
                        </select>
                    </div>
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
                            className='border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none'>
                            <option value="All Job Profiles">All Job Profiles</option>
                            {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <div className="container flex justify-center items-center">
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
                                    onChange={handleSearchInputChange}
                                    className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:shadow focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE STARTS HERE */}
            {(yourAndStaffLeaveValue === "Your Leaves") && <div className='mt-8'>
                <table className='py-6'>
                    <tbody>
                        <tr className='bg-[#ECEDFE]'>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Time Period</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Supervisor</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Status</td>
                        </tr>
                        {/* USEM1APHERE */}
                        {myLeaves && myLeaves.map((element: any, index: number) => {
                            return <tr key={index}>
                                <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{(element.from).slice(0, 10)} - {(element.to).slice(0, 10)}</td>
                                <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{upperLevelEmployee?.name}</td>
                                <td className='py-4 px-6'>
                                    {element.status === "approved" &&
                                        <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                            <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                            <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                        </span>}
                                    {element.status === "accepted" &&
                                        <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                            <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                            <span className='text-sm font-normal text-[#186A3B]'>Accepted</span>
                                        </span>}
                                    {element.status === "rejected" &&
                                        <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                            <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                            <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                        </span>}
                                    {element.status === "pending" &&
                                        <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                            <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                            <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                        </span>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
            {(yourAndStaffLeaveValue === "Your Gatepass") && <div className='mt-8'>
                <table className='py-6'>
                    <tbody>
                        <tr className='bg-[#ECEDFE]'>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Gatepass Date</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Time</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Supervisor</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Status</td>
                        </tr>
                        {/* USEMAPHERE */}
                        {myGatePass && myGatePass.map((element: any, index: number) => {
                            return <tr key={index}>
                                <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{(element.gatePassDate).slice(0, 10)}</td>
                                <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{element.gatePassTime}</td>
                                <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{upperLevelEmployee?.name}</td>
                                <td className='py-4 px-6'>
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
                                    {(element.status === "pending" || element.status === "accepted") &&
                                        <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                            <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                            <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                        </span>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
            {(yourAndStaffLeaveValue === "Staff Leaves") && <div className='mt-8'>
                <table className='py-6'>
                    <tbody>
                        <tr className='bg-[#ECEDFE]'>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Name</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Time Period</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Supervisor</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Status</td>
                        </tr>
                        {/* USEMAPHERE */}
                        {/* {allLeavesAndGatePassList && allLeavesAndGatePassList.map((element: any, index: number) => {
                            const latestLeave = element.fromTo[(element.fromTo).length - 1];
                            
                            return <tr key={index}>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{(latestLeave.from).slice(0, 10)} - {(latestLeave.to).slice(0, 10)}</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Not  Avilable</td>
                            <td className='py-4 px-6'>
                                {latestLeave.status === "approved" &&
                                <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                </span>}
                                {latestLeave.status === "rejected" &&
                                <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                </span>}
                                {latestLeave.status === "pending" &&
                                <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                </span>}
                            </td>
                        </tr>
                        })} */}
                    </tbody>
                </table>
            </div>}
            {(yourAndStaffLeaveValue === "Staff Gatepass") && <div className='mt-8'>
                <table className='py-6'>
                    <tbody>
                        <tr className='bg-[#ECEDFE]'>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Name</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Time Period</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Supervisor</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Status</td>
                        </tr>
                        {/* USEMAPHERE */}
                        {/* {allLeavesAndGatePassList && allLeavesAndGatePassList.map((element: any, index: number) => {
                            const latestGatepass = element.gatePass[(element.gatePass).length - 1];
                            
                            return <tr key={index}>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>{(latestGatepass?.time) ? (latestGatepass?.time) : "Not Avilable"}</td>
                            <td className='text-sm font-medium text-[#2E2E2E] py-4 px-6 text-start'>Not  Avilable</td>
                            <td className='py-4 px-6'>
                                {latestGatepass?.status === "approved" &&
                                <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                </span>}
                                {latestGatepass?.status === "rejected" &&
                                <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                </span>}
                                {(latestGatepass?.status === "accepted" || latestGatepass?.status === "pending") &&
                                <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                    <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                    <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                </span>}
                            </td>
                        </tr>
                        })} */}
                    </tbody>
                </table>
            </div>}
            {/* TABLE ENDS HERE */}
        </div>
    )
}