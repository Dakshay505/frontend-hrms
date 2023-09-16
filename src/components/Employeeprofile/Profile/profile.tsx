import { useEffect, useState, } from 'react';
import "../../../deletebtn.css"
import { useDispatch, useSelector } from 'react-redux';
import { getQrAssignAsync, getSingleEmployeeAsync, salaryLogAsync } from '../../../redux/Slice/EmployeeSlice';
import { getAllJobProfileAsync } from '../../../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../../../redux/Slice/GroupSlice';
import ArrowSqureOut from '../../../assets/ArrowSquareOut.svg'
import ArrowSqureOutBlack from '../../../assets/ArrowSquareOutBlack.svg'
import DocumentFrame from '../../../assets/documentFrame.svg'
import { Link, useLocation } from 'react-router-dom';
import GreenCheck from '../../../assets/GreenCheck.svg';
import RedX from '../../../assets/RedX.svg';
import SpinnerGap from '../../../assets/SpinnerGap.svg'
import { addPunchAsync, deletePunchAsync, editPunchAsync, getAllAttandenceAsync } from '../../../redux/Slice/AttandenceSlice';
import CaretDown from "../../../assets/CaretDown11.svg";
import toast from 'react-hot-toast';
import CaretUp from "../../../assets/CaretUp.svg";
import X from "../../../assets/X.svg";
import LoaderGif from '../../../assets/loadergif.gif'
import Picture from './Picture';
import SalaryLog from './SalaryLog';
import close from "../../../assets/x1.png";
import check from "../../../assets/Check.svg";
import plus from "../../../assets/Plus.png"
import dots from "../../../assets/dots-vertical.svg"
import del from "../../../assets/Delete.svg"

export const EmployeeProfile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [showAddPopup, setShowAddPopup] = useState(false);
    const additionalData = location.state?.additionalData;
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    const loaderStatus = useSelector((state: any) => state.employee.status)
    const [singleEmployeeAttendanceList, setSingleEmployeeAttendanceList] = useState([])
    const qrAssign = useSelector((state: any) => state.employee.qrAssign);
    const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/219/219983.png")
    const [date, setDate] = useState("")
    const [PuchIn, setPunchIn] = useState("")
    const [PunchOut, setPunchOut] = useState("")
    const [updatePopUp, setUpdatePopup] = useState(false)


    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
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
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
        if (additionalData !== "") {
            dispatch(getSingleEmployeeAsync(additionalData)).then((res: any) => {
                dispatch(salaryLogAsync(res.payload.employeeData._id));
                dispatch(getQrAssignAsync(res.payload.employeeData._id));
                let data = {};
                if (res.payload.employeeData.employeeCode) {
                    data = { name: res.payload.employeeData.employeeCode, date: formatDate(date), nextDate: formatDate(nextDate) }
                } else {
                    data = { name: res.payload.employeeData.name, date: formatDate(date), nextDate: formatDate(nextDate) }
                }
                dispatch(getAllAttandenceAsync(data)).then((res: any) => {
                    setSingleEmployeeAttendanceList(res.payload.attendanceRecords)
                })
            })
            // setAdditionalData("");
        }
    }, [])
    const refresh = () => {
        const nextDate = new Date();
        const date = new Date(nextDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
        if (additionalData !== "") {
            dispatch(getSingleEmployeeAsync(additionalData)).then((res: any) => {
                dispatch(salaryLogAsync(res.payload.employeeData._id));
                dispatch(getQrAssignAsync(res.payload.employeeData._id));
                let data = {};
                if (res.payload.employeeData.employeeCode) {
                    data = { name: res.payload.employeeData.employeeCode, date: formatDate(date), nextDate: formatDate(nextDate) }
                } else {
                    data = { name: res.payload.employeeData.name, date: formatDate(date), nextDate: formatDate(nextDate) }
                }
                dispatch(getAllAttandenceAsync(data)).then((res: any) => {
                    setSingleEmployeeAttendanceList(res.payload.attendanceRecords)
                })
            })
            // setAdditionalData("");
        }
    }

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
    const [popup, setPopUp] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const handleDeletePop = () => {
        setPopUp(false)
        setDeletePopup(true)
    }
    const handleEditPopUp = () => {
        setPopUp(false)
        setUpdatePopup(true)
    }
    const handleRowClick = (index: number) => {
        const isExpanded = showTableRow.includes(index)
        if (isExpanded) {
            setShowTableRow(showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index))
        }
        else {
            setShowTableRow([...showTableRow, index])
        }
    }
    const handleDeleteSumbit = (Date: any) => {
        setDeletePopup(false)
        const data = { "date": Date, "id": singleEmployee._id }

        dispatch(deletePunchAsync(data)).then((res: any) => {
            if (res.payload.success) {
                toast.success("Punch delete sucessfully")
                refresh()
            } else {
                toast.error(res.payload.message)
            }
        })
    }
    const handleSumbit = () => {
        if (PuchIn === "") {
            toast.error("PunchIn is required")
            return
        } else {
            setShowAddPopup(false)
            const data = { "date": date, "punchIn": PuchIn !== "" ? `${date}T${PuchIn}` : null, "punchOut": PunchOut !== "" ? `${date}T${PunchOut}` : null, "id": singleEmployee._id }
            dispatch(addPunchAsync(data)).then((res: any) => {
                if (res.payload.success) {
                    toast.success("Punch add sucessfully")
                    refresh()
                    setPunchIn("")
                    setPunchOut("")
                    setDate("")

                } else {
                    toast.error(res.payload.message)
                }
            })
        }
    }
    const editHandleSumbit = (Date: any) => {
        if (PuchIn === "") {
            toast.error("PunchIn is required")
        } else {
            setUpdatePopup(false)
            const data = { "date": Date, "punchIn": PuchIn !== "" ? `${Date}T${PuchIn}` : null, "punchOut": PunchOut !== "" ? `${Date}T${PunchOut}` : null, "id": singleEmployee._id }
            dispatch(editPunchAsync(data)).then((res: any) => {
                if (res.payload.success) {
                    toast.success("Punch edit sucessfully")

                    setPunchIn("")
                    setPunchOut("")
                    setDate("")
                    refresh()
                } else {
                    toast.error(res.payload.message)
                }
            })
        }
    }

    const [showQrRow, setShowQrRow] = useState<any>([]);
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];

        // Set the maxDate state to the current date
        setMaxDate(currentDate);
    }, []);

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
                    <div className='flex gap-5'>
                        {qrAssign && qrAssign.map((element: any, index: number) => {
                            return <div key={index} className='flex gap-6 justify-between py-4 px-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] min-w-[297px]'>
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
                    <div className='flex gap-5'>
                        {documentList && documentList.map((element: any, index: any) => {
                            return <div key={index} className='min-w-[210px] rounded-[7px] border-[0.83px] border-solid border-[#9198F7]'>
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
                    <div onClick={() => setShowAddPopup(true)} className="flex gap-[5px] mx-[640px] items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg">
                        <img src={plus} className="w-[12px] h-[12px]" alt="plus" />
                        <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Add</p>
                    </div>
                </div>
                {showAddPopup && (

                    <div className="fixed inset-0  flex z-50 items-center justify-center bg-gray-900 bg-opacity-50 rounded-md">
                        <div className="bg-white flex flex-col gap-[20px] w-[619px] h-[520px] p-6 rounded-lg">

                            <div className="flex justify-between">

                                <div className="flex gap-[5px]">


                                    <span className="text-[22px]  font-bold text-[#3b404f]">Add Details</span>
                                    <div onClick={handleSumbit} className="cursor-pointer flex gap-[5px] ml-[400px] items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg">
                                        <img src={check} className="w-[12px] h-[12px]" alt="plus" />
                                        <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Save</p>
                                    </div>


                                </div>
                                <img src={close} alt="" className="w-[36px] h-[36px] -mt-9 -mr-10" onClick={() => setShowAddPopup(false)} />

                            </div>

                            <div className="flex h-[445px] w-[540px] flex-col items-start gap-[24px] rounded-lg border-[1px] p-4 border-[#CFD3D4]">
                                <div className="flex flex-col gap-[7px]">
                                    <span className="text-[#2A3143]">Employee Name</span>
                                    <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                        <input value={singleEmployee.name} type="text" placeholder="Gopal" className="focus:outline-none" readOnly />

                                    </div>



                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-[#2A3143]">Date</span>
                                    <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                        <input value={date} onChange={(event) => setDate(event.target.value)} max={maxDate} type="date" placeholder="e.g.Steel" className="focus:outline-none" required />

                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-[#2A3143]">PuchIn Time</span>
                                    <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                        <input value={PuchIn} onChange={(event) => setPunchIn(event.target.value)} type="time" placeholder="e.g.Steel" className="focus:outline-none" required />

                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-[#2A3143]">PuchOut Time</span>
                                    <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                        <input value={PunchOut} onChange={(event) => setPunchOut(event.target.value)} type="time" placeholder="e.g.Steel" className="focus:outline-none" required />

                                    </div>
                                </div>


                            </div>




                        </div>
                    </div>




                )}
                {popup && (
                    <div className="fixed inset-0  flex z-50 items-center justify-center bg-gray-900 bg-opacity-50 rounded-md">
                        <div onClick={() => {
                            setPopUp(false);
                        }} className='border-[1px] absolute right-[39%] top-[45%] rounded-full border-black'>
                            <img src={X} alt="image" className=' cursor-pointer' />
                        </div>
                        <div className=" flex flex-col gap-[30px] w-[150px] h-[150px] p-6 rounded-lg">
                            <div className="flex h-[15rem] w-[15rem] flex-col items-center justify-center rounded-lg border-[1px] bg-white p-2 ">
                                <div onClick={handleEditPopUp} className="cursor-pointer flex gap-[5px]  items-center">
                                    <p className="text-sm font-medium tracking-[0.25px] ">Update</p>
                                </div>
                                <div onClick={handleDeletePop} className="cursor-pointer flex gap-[5px] items-center px-[15px] h-9 w-[80px] ">
                                    <p className="text-sm font-medium  tracking-[0.25px] ">Delete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                                console.log("ghghgh", element.status)
                                const punchesList = [...(element.punches)];
                                const sortedPunches = punchesList.sort((a: any, b: any) => {
                                    return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                                })
                                const latestPunches = sortedPunches[0];
                                if (element.employeeId.employeeCode === singleEmployee.employeeCode) {
                                    return <>
                                        {updatePopUp && (

                                            <div className="fixed inset-0  flex z-50 items-center justify-center  bg-opacity-50 rounded-md">
                                                <div className="bg-white border-2 flex flex-col gap-[30px] w-[619px] h-[40rem] p-6 rounded-lg">
                                                    <div className="flex justify-between">

                                                        <div className="flex gap-[5px]">
                                                            <span className="text-[22px]  font-bold text-[#3b404f]">Update Details</span>
                                                            <div onClick={() => editHandleSumbit((latestPunches.punchIn).slice(0, 10))} className="flex gap-[5px] ml-[400px] items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg">
                                                                <img src={check} className="w-[12px] h-[12px]" alt="plus" />
                                                                <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Save</p>
                                                            </div>

                                                        </div>
                                                        <img src={close} alt="" className="cursor-pointer w-[36px] h-[36px] -mt-10 -mr-10 " onClick={() => setUpdatePopup(false)} />
                                                    </div>

                                                    <div className="flex h-[445px] w-[540px] flex-col items-start gap-[24px] rounded-lg border-[1px] p-4">
                                                        <div className="flex flex-col gap-[7px]">
                                                            <span className="text-[#2A3143]">Employee Name</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={singleEmployee.name} type="text" placeholder="Gopal" className="focus:outline-none" readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">Date</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={(latestPunches.punchIn).slice(0, 10)} type="date" placeholder="e.g.Steel" className="focus:outline-none" readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">PuchIn Time</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={PuchIn} onChange={(event) => setPunchIn(event.target.value)} type="time" placeholder="e.g.Steel" className="focus:outline-none" required />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">PuchOut Time</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={PunchOut} onChange={(event) => setPunchOut(event.target.value)} type="time" placeholder="e.g.Steel" className="focus:outline-none" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {deletePopup && (

                                            <div className="fixed inset-0  flex z-50 items-center justify-center bg-gray-900 bg-opacity-50 rounded-md">

                                                <div className="bg-white flex flex-col gap-[30px] w-[300px] h-[150px] p-6 rounded-lg">
                                                    <span className="text-[15px]  font-bold text-[#3b404f]">Do you want to delete permanently ?</span>
                                                    <div className="flex flex-row items-start gap-[24px] rounded-lg">
                                                        <div onClick={() => setDeletePopup(false)} className="flex gap-[5px]  items-center px-[15px] h-10 w-25 bg-[#FFFFFF] rounded-lg ">

                                                            <p className="text-sm font-medium text-[#000000] tracking-[0.25px] mr-6">Cancel</p>
                                                        </div>
                                                        <div onClick={() => handleDeleteSumbit((latestPunches.punchIn).slice(0, 10))} className="flex gap-[5px] cursor-pointer  items-center px-[15px] h-10 w-25 bg-[#BB0F0F1F] rounded-lg">
                                                            <img src={del} className="w-[12px] h-[12px]" alt="plus" />
                                                            <p className="text-sm font-medium text-[#F23A3A] tracking-[0.25px] mr-6">Yes,Delete</p>
                                                        </div>

                                                    </div>




                                                </div>
                                            </div>





                                        )}
                                        <tr key={element._id + latestPunches.punchIn} className='hover:bg-[#FAFAFA]' onClick={() => { handleRowClick(index) }} >
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                                            <td className='flex gap-2 items-center py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"} {sortedPunches.slice(1).length > 0 ? <img src={showTableRow.includes(index) ? CaretUp : CaretDown} className="w-[14px] h-[14px]" alt="" /> : ""}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? new Date(latestPunches.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? new Date(latestPunches.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                                            <td className='py-4 px-5'>

                                                {element?.status === "approved" &&
                                                    <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                        <img onClick={() => setPopUp(true)} src={dots} className="w-[12px] h-[12px]" alt="plus" />
                                                    </span>}
                                                {element?.status === "rejected" &&
                                                    <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                        <img onClick={() => setPopUp(true)} src={dots} className="w-[12px] h-[12px]" alt="plus" />
                                                    </span>}
                                                {(element.status === "pending") &&
                                                    <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                        <img onClick={() => setPopUp(true)} src={dots} className="w-[12px] h-[12px]" alt="plus" />
                                                    </span>}
                                                {(element.status === "added Manually by administrator") &&
                                                    <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#945D2D]'>Manual</span>
                                                        <img onClick={() => setPopUp(true)} src={dots} className="w-[12px] h-[12px]" alt="plus" />

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
                                                    {(element.status === "added Manually by administrator") &&
                                                        <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                            <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                            <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                        </span>}

                                                </td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{element.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                                            </tr>
                                        })}
                                    </>
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Attendance ENDS here */}
        </div >
    )
}