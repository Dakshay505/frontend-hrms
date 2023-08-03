import { useEffect, useState, } from 'react';

import "../../../deletebtn.css"
import { useDispatch, useSelector } from 'react-redux';
import { getQrAssignAsync, salaryLogAsync } from '../../../redux/Slice/EmployeeSlice';
import { getAllJobProfileAsync } from '../../../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../../../redux/Slice/GroupSlice';
import ArrowSqureOut from '../../../assets/ArrowSquareOut.svg'
import ArrowSqureOutBlack from '../../../assets/ArrowSquareOutBlack.svg'
import DocumentFrame from '../../../assets/documentFrame.svg'
import { Link } from 'react-router-dom';
import GreenCheck from '../../../assets/GreenCheck.svg';
import RedX from '../../../assets/RedX.svg';
import SpinnerGap from '../../../assets/SpinnerGap.svg'
import { getAllAttandenceAsync } from '../../../redux/Slice/AttandenceSlice';
import CaretDown from "../../../assets/CaretDown11.svg";
import CaretUp from "../../../assets/CaretUp.svg";
import X from "../../../assets/X.svg";
import LoaderGif from '../../../assets/loadergif.gif'
import Picture from './Picture';
import SalaryLog from './SalaryLog';

export const EmployeeProfile = () => {
    const dispatch = useDispatch();
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);

    const loaderStatus = useSelector((state: any) => state.employee.status)

    const [singleEmployeeAttendanceList, setSingleEmployeeAttendanceList] = useState([])
    
    const qrAssign = useSelector((state: any) => state.employee.qrAssign);


    const [inputBoxNameValue, setInputBoxNameValue] = useState<any>("");

    const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/219/219983.png")

    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        setInputBoxNameValue(singleEmployee.name);
        if (singleEmployee.profilePicture) {
            setProfilePicture(singleEmployee.profilePicture)
        } else {
            setProfilePicture("https://cdn-icons-png.flaticon.com/512/219/219983.png")
        }
        if (singleEmployee._id) {
            dispatch(getQrAssignAsync(singleEmployee._id));
            dispatch(salaryLogAsync(singleEmployee._id))
        }
    }, [singleEmployee])

    useEffect(() => {
        const nextDate = new Date();
        const date = new Date(nextDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const data = { name: inputBoxNameValue, date: formatDate(date), nextDate: formatDate(nextDate) }
        if (inputBoxNameValue === singleEmployee.name) {
            dispatch(getAllAttandenceAsync(data)).then((res: any) => {
                setSingleEmployeeAttendanceList(res.payload.attendanceRecords)
            })
        }
    }, [inputBoxNameValue])
    useEffect(() => {
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
    }, [])

    const documentList = [
        {
            documentName: "Resume.pdf"
        },
        {
            documentName: "Resume.pdf"
        },
        {
            documentName: "Resume.pdf"
        },
        {
            documentName: "Resume.pdf"
        },
        {
            documentName: "Resume.pdf"
        },
        {
            documentName: "Resume.pdf"
        },
    ]

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


    const [showQrRow, setShowQrRow] = useState<any>([]);

    const handleQrRowClick = (index: number) => {
        const isExpanded = showQrRow.includes(index)
        if (isExpanded) {
            setShowQrRow(showQrRow.filter((belowRowIndex: any) => belowRowIndex !== index))
        }
        else {
            setShowQrRow([index])
        }
    }

    return (
        <div className='px-[40px] pt-[32px]'>
            <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Employee Information</h1>
            </div>
            {loaderStatus === "loading" ? <div className='flex justify-center w-full'>
                <img src={LoaderGif} className='w-6 h-6' alt="" />
            </div> : ""}
            <Picture />        

            <SalaryLog />

            {/* QR Assigning Logs STARTS HERE */}
            {qrAssign && qrAssign.length > 0 && <div className='mt-10'>
                <div>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>QR Assigning Logs</h1>
                </div>
                <div className='mt-6 pb-6 overflow-auto'>
                    <div className='grid grid-cols-4 gap-5 w-[1260px]'>
                        {qrAssign && qrAssign.map((element: any, index: number) => {
                            return <div key={index} className='flex gap-6 justify-between py-4 px-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] w-[297px]'>
                                <div className='flex items-center justify-center'>
                                    <img src={profilePicture} className='w-16 h-16 rounded-full' alt="" />
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div>
                                        <p className='text-[16px] leading-5 font-medium tracking-[0.1px] text-[#000000] cursor-pointer'>By: <span className='underline'>{element.assignedBy?.name ? element.assignedBy?.name : "Not Avi."}</span></p>
                                        <p className='text-sm font-normal text-[#000000]'>{element.createdAt ? new Date(element.createdAt).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avi."}, {element.createdAt ? (element.createdAt).slice(0, 10) : "Not Avi."}</p>
                                    </div>
                                    <div onClick={() => handleQrRowClick(index)} className='flex items-center gap-[6px] cursor-pointer'>
                                        <div>
                                            <p className='text-[12px] leading-4 font-medium text-[#283093] underline'>Open Photo</p>
                                        </div>
                                        <div>
                                            <img src={ArrowSqureOut} className='w-[14px] h-[14px]' alt="arrowsqureout" />
                                        </div>
                                    </div>
                                    {showQrRow.includes(index) && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className='fixed right-0 top-0 left-0 bottom-0 flex justify-center items-center'>
                                        <div className='relative p-10 rounded-lg bg-[#FAFAFA]'>
                                            <div onClick={() => handleQrRowClick(index)} className='absolute right-3 top-3 cursor-pointer'>
                                                <img src={X} className='w-6 h-6' alt="" />
                                            </div>
                                            <div>
                                                <img src={element.proofPicture} className='h-96' alt="" />
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>}
            {/* QR Assigning Logs ENDS HERE */}


            {/* DOCUMENT CODE STARTS HERE */}
            <div className='my-10'>
                <div className='flex gap-3 items-center'>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>Employee Documents</h1>
                    <img src={ArrowSqureOutBlack} className='w-[18px] h-[18px] cursor-pointer' alt="" />
                </div>
                <div className='mt-6 pb-6 overflow-auto'>
                    <div className='grid grid-cols-4 gap-5 w-[872px]'>
                        {documentList && documentList.map((element: any, index: any) => {
                            return <div key={index} className='w-[210px] rounded-[7px] border-[0.83px] border-solid border-[#9198F7]'>
                                <img src={DocumentFrame} className='w-full' alt="" />
                                <p className='flex justify-center bg-[#ECEDFE] items-center py-[13px] px-7 text-[13px] leading-4 font-medium text-[#2E2E2E] rounded-b-md'>{element.documentName}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            {/* DOCUMENT CODE ENDS HERE */}


            {/* Attendance Starts here */}
            <div className='py-8'>
                <div className='flex gap-3 items-center'>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>Employee Attendance</h1>
                    <Link to="/attendance-database">
                        <img src={ArrowSqureOutBlack} className='w-[18px] h-[18px] cursor-pointer' alt="" />
                    </Link>
                </div>
                <div className='py-8 overflow-auto'>
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
                            {singleEmployeeAttendanceList && singleEmployeeAttendanceList.map((element: any, index: number) => {
                                const punchesList = [...(element.punches)];
                                const sortedPunches = punchesList.sort((a: any, b: any) => {
                                    return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                                })
                                const latestPunches = sortedPunches[0];
                                return <>
                                    <tr key={element._id + latestPunches.punchIn} className='hover:bg-[#FAFAFA]' onClick={() => { handleRowClick(index) }} >
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                                        <td className='flex gap-2 items-center py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"} {sortedPunches.slice(1).length > 0 ? <img src={showTableRow.includes(index) ? CaretUp : CaretDown} className="w-[14px] h-[14px]" alt="" /> : ""}</td>
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
                                    {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any) => {
                                        return <tr key={element._id + element.punchIn}>
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
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{element.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                        </tr>
                                    })}
                                </>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Attendance ENDS here */}
        </div >
    )
}
