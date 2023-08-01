import { useDispatch, useSelector } from "react-redux"
import round from "../../../assets/Group 1.png"
import { useEffect } from "react"
import { getLoggedInUserDataAsync } from "../../../redux/Slice/loginSlice"
import { getStaffAttendanceAsync } from "../../../redux/Slice/AttandenceSlice"
import ArrowSqureOut from '../../../assets/ArrowSquareOut.svg'
import Calendar from 'react-calendar';
import { getMyLeavesAndGatePassAsync } from "../../../redux/Slice/LeaveAndGatepassSlice"
import { useState } from 'react'
import { Link } from "react-router-dom"

export const Employeehome = () => {

    const dispatch = useDispatch()
    const Employee = useSelector((state: any) => state.login.loggedInUserData?.employee);
    const myLeaveAndGatepassList = useSelector((state: any) => state.leave.myLeavesAndGatePass);
    const staffAttendanceList = useSelector((state: any) => state.attandence.staffAttendance)
    const [myLeaves, setMyLeaves] = useState<any>([])
    const [leaves, setLeaves] = useState<any>([])
    useEffect(() => {
        if (myLeaveAndGatepassList) {
            setMyLeaves(myLeaveAndGatepassList.filter((element: any) => {
                return element.from
            }))
        }
    }, [myLeaveAndGatepassList])
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync())
        dispatch(getStaffAttendanceAsync())
        dispatch(getMyLeavesAndGatePassAsync());

    }, [])

    const newLeaves = myLeaves.flatMap(({ from, to }: any) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const newDates = [];

        for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
            newDates.push(date.toISOString().slice(0, 10));
        }

        return newDates;
    });
    useEffect(() => {
        setLeaves(newLeaves);
    }, [myLeaves])

    const tileClassName = ({ date }: any) => {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split('T')[0];
        if (leaves.includes(formattedDate)) {
            return 'bg-[#8A2626] text-[#FAFAFA]';
        }
        return 'text-[#666666]';
    };


    return (
        <div className="flex flex-col items-start self-stretch pt-[32px] px-[40px] gap-[32px]">
            <div className="flex flex-col items-start self-stretch gap-[32px]">
                <div className="flex items-start self-stretch gap-[291px] text-[#2E2E2E] font-inter font-bold text-[28px] leading-[36px]">
                    Welcome Back {Employee ? Employee.name : 'Employee'}
                </div>

                <div className="flex items-start bg-[#FAFAFA] rounded-[8px] border border-primary-border self-stretch px-[40px] py-[24px] gap-[40px] w-[404px] h-[188px]">
                    <div className="flex flex-col items-start self-stretch pb-0 gap-[8px] text-[#2E2E2E] font-semibold text-xl">
                        Your Employee Barcode
                    </div>
                    <img src={Employee?.currentBarCode} alt="barcode" />
                </div>

                <div className="flex flex-col items-start self-stretch pt-[32px] gap-[32px]">
                    <div className="flex items-start self-stretch gap-[291px] text-[#2E2E2E] font-inter font-bold text-[28px] leading-[36px]">
                        Staff Attendance
                    </div>


                    <div className="flex items-start gap-[20px] self-stretch overflow-auto">
                        {staffAttendanceList && staffAttendanceList.map((element: any, index: number) => {

                            return <div key={index} className="flex flex-col justify-center  bg-[#FAFAFA] rounded-[8px] border border-primary-border self-stretch px-[20px] py-[16px]  items-start p-[4px] gap-[2px] min-w-[216px]">
                                <div className='flex items-center gap-[12px]'>
                                    <img src={round} alt="" className='w-[24px] h-[24px]' />
                                    <p className="text-[#283093] font-inter font-bold text-[24px] leading-[32px]">
                                        {element.todayPresent ? element.todayPresent : "0"} / {element.totalEmployees}
                                    </p>

                                </div>
                                <p className='items-start self-stretch pb-0 gap-[8px] text-[#000000] font-inter font-medium text-[16px] leading-[28px] whitespace-nowrap'>{element.thisJobProfile.jobProfileName ? element.thisJobProfile.jobProfileName : "Not Avilable"}</p>
                            </div>

                        })}
                    </div>

                </div>
                {/* YOUR LEAVES SECTION */}
                <div className="py-8 flex justify-between w-full relative min-h-[250px]">
                    {/* YOUR LEAVE HEADING AND CALANDER */}
                    <div className="flex flex-col gap-8">
                        {/* HEADING */}
                        <div>
                            <h1 className="text-[28px] leading-9 font-bold text-[#2E2E2E]">Your Leaves</h1>
                        </div>
                        {/* CALANDER */}
                        <div className="w-[350px] employeeHomeCalender">
                            <Calendar
                                tileClassName={tileClassName}
                                calendarType="US"
                                className='p-8 bg-[#FAFAFA] border border-solid border-[#DEDEDE] rounded-lg'
                                formatShortWeekday={(locale, date) => {
                                    console.log(locale)
                                    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()];
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 absolute bottom-[24px] right-0">
                        <Link to="/employee-EmployeeAssesmentQuiz">
                            <div className="flex justify-between p-6 w-[300px] h-20 rounded-lg bg-[#ECEDFE]">
                                <p className="text-xl font-medium text-[#283093]">Continue Training</p>
                                <img src={ArrowSqureOut} className="w-8 h-8" alt="" />
                            </div>
                        </Link>
                        <div className="flex justify-between p-6 w-[300px] h-20 rounded-lg bg-[#ECEDFE]">
                            <p className="text-xl font-medium text-[#283093]">View Documents</p>
                            <img src={ArrowSqureOut} className="w-8 h-8" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
