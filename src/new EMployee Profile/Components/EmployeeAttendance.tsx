import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { addPunchAsync, deletePunchAsync, editPunchAsync } from '../../redux/Slice/AttandenceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getQrAssignAsync, getSingleEmployeeAsync, salaryLogAsync } from '../../redux/Slice/EmployeeSlice';
import ArrowSqureOutBlack from '../../assets/ArrowSquareOutBlack.svg'
import X from "../../assets/X.svg";
import plus from "../../assets/Plus.png"
import closed from "../../assets/x1.png";
import check from "../../assets/Check.svg";
import dots from "../../assets/dots-vertical.svg"
import del from "../../assets/Delete.svg"
import GreenCheck from '../../assets/GreenCheck.svg';
import CaretDown from "../../assets/CaretDown11.svg";
import CaretUp from "../../assets/CaretUp.svg";
import RedX from '../../assets/RedX.svg';
import SpinnerGap from '../../assets/SpinnerGap.svg'
export const EmployeeAttendance = (props:any) => {
    const { singleEmployeeAttendanceList } = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const [showAddPopup, setShowAddPopup] = useState(false);
    const additionalData = (location.state?.additionalData);
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    // const [singleEmployeeAttendanceList, setSingleEmployeeAttendanceList] = useState([])
    const [date, setDate] = useState("")
    const [PuchIn, setPunchIn] = useState("")
    const [PunchOut, setPunchOut] = useState("")
    const [updatePopUp, setUpdatePopup] = useState(false)
    const [dated, setDated] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [punchOutDate, setPunchOutDate] = useState("")
    const [updateDate, setUpdateDate] = useState("")


    const [showTableRow, setShowTableRow] = useState<any>([]);

    const [popup, setPopUp] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const handlePopup = (d: any, element: any, updateDate: any) => {
        setDated(d)
        setDeleteId(element._id)
        setUpdateDate(updateDate)
        setPunchIn(changetime24HourFormat(element?.punchIn))
        setPunchOut(changetime24HourFormat(element?.punchOut))
        if (element?.punchOut !== null && element?.punchOut !== undefined) {
            setPunchOutDate(element.punchOut.slice(0, 10))
        }
        //console.log(PunchOut)
        setPopUp(true)

    }

    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const refresh = () => {
        const nextDate = new Date();
        const date = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
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
                // dispatch(getAllAttandenceAsync(data)).then((res: any) => {
                //     setSingleEmployeeAttendanceList(res.payload.attendanceRecords)
                // })
            })
            ///setAdditionalData("");
        }
    }

    const handleDeletePop = () => {
        setPopUp(false)
        setDeletePopup(true)
    }
    const handleEditPopUp = () => {
        setPopUp(false)
        setUpdatePopup(true)
    }
    const changetime24HourFormat = (createdAtDate: any) => {
        if (createdAtDate !== null) {
            const date = new Date(createdAtDate);
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();

            // Format hours with leading zero if less than 10
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            const formattedTime = `${formattedHours}:${formattedMinutes}`;

            return formattedTime;
        }
        else {
            return "";
        }
    };

    const handleRowClick = (index: number) => {
        const isExpanded = showTableRow.includes(index)
        if (isExpanded) {
            setShowTableRow(showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index))
        }
        else {
            setShowTableRow([...showTableRow, index])
        }
    }
    const changetime = (createdAtDate: any) => {
        // console.log(createdAtDate)
        const date = new Date(createdAtDate)
        const hours = date.getUTCHours(); // Get the hours in UTC
        const minutes = date.getUTCMinutes();
        const period = hours >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        const formattedHours = (hours % 12) || 12; // Use 12 for 0 hours
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
        return formattedTime;
    }
    const handleDeleteSumbit = () => {
        setDeletePopup(false)
        const data = { "punchsId": deleteId, "id": singleEmployee._id }
        console.log(data)

        dispatch(deletePunchAsync(data)).then((res: any) => {
            console.log("Response", res)
            if (res.payload.success) {
                toast.success("Punch delete sucessfully")
                refresh()

            } else {
                toast.error(res.payload.message)
                refresh()

            }
        })
    }
    const handleSumbit = () => {
        if (PuchIn === "") {
            toast.error("PunchIn is required")
            return
        } else {

            setShowAddPopup(false)
            const data = { "date": date, "punchIn": PuchIn !== "" ? `${date}T${PuchIn}` : null, "punchOut": PunchOut !== "" ? `${punchOutDate}T${PunchOut}` : null, "id": singleEmployee._id }
            console.log(data)
            // console.log(singleEmployee._id)

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
    const editHandleSumbit = () => {
        if (PuchIn === "") {
            toast.error("PunchIn is required")
        }
        else if (punchOutDate === "") {
            toast.error("Punchout Date is required")
        }
        else {
            setUpdatePopup(false)
            const data = { "date": updateDate, "punchIn": PuchIn !== "" ? `${dated}T${PuchIn}` : null, "punchOut": PunchOut !== "" ? `${punchOutDate}T${PunchOut}` : null, "id": singleEmployee._id }
            console.log(data)
            // console.log(singleEmployee._id)


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

    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];

        // Set the maxDate state to the current date
        setMaxDate(currentDate);
    }, []);
    return (
        <div> {/* Attendance Starts here */}
            <div className='py-8'>
                <div className='flex gap-3 justify-between items-center'>
                    <div className='flex gap-[10px] items-center'>
                        <h1 className='text-2xl font-bold text-[#2E2E2E]'>Employee Attendance</h1>
                        <Link to="/attendance-database">
                            <img src={ArrowSqureOutBlack} className='w-[18px] h-[18px] cursor-pointer' alt="" />
                        </Link>
                    </div>
                    <div onClick={() => setShowAddPopup(true)} className="flex cursor-pointer gap-[5px]  items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg">
                        <img src={plus} className="w-[12px] h-[12px]" alt="plus" />
                        <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Add</p>
                    </div>
                </div>
                {showAddPopup && (

                    <div className="fixed inset-0  flex z-50 items-center justify-center bg-gray-900 bg-opacity-50 rounded-md">
                        <div className="bg-white flex flex-col gap-[20px] w-[619px] h-[590px] p-6 rounded-lg">

                            <div className="flex justify-between">

                                <div className="flex gap-[5px]">


                                    <span className="text-[16px]  font-bold text-[#3b404f]">Add Details</span>
                                    <div onClick={handleSumbit} className="flex gap-[5px] ml-[400px] items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg cursor-pointer">
                                        <img src={check} className="w-[12px] h-[12px]" alt="plus" />
                                        <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Save</p>
                                    </div>


                                </div>
                                <div className='bg-white rounded-full w-[36px] h-[36px] -mt-10 -mr-10 cursor-pointer'>
                                    <img src={closed} alt="" className="w-[36px] h-[36px] " onClick={() => setShowAddPopup(false)} />
                                </div>
                            </div>

                            <div className="flex justify-items-center items-center h-[495px] w-[540px] flex-col  gap-[24px] rounded-lg border-[1px] p-4 border-[#CFD3D4]">
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
                                    <span className="text-[#2A3143]">PuchOut Date</span>
                                    <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                        <input value={punchOutDate} onChange={(event) => setPunchOutDate(event.target.value)} type="date" placeholder="e.g.Steel" className="focus:outline-none" required />

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
                        }} className='border-[1px] cursor-pointer absolute right-[39%] top-[45%] rounded-full border-black'>
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
                                //console.log("ghghgh", element.status)

                                const punchesList = [...(element.punches)];

                                const sortedPunches = punchesList.sort((a: any, b: any) => {
                                    return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                                })
                                const latestPunches = sortedPunches[0];
                                const firstPunches = sortedPunches[sortedPunches.length - 1];
                                if (element.employeeId.employeeCode === singleEmployee.employeeCode) {
                                    return <>
                                        {updatePopUp && (

                                            <div className="fixed inset-0  flex z-50 items-center justify-center  bg-opacity-80 rounded-md">
                                                <div className="bg-white flex flex-col gap-[30px] w-[619px] h-[590px] p-6 rounded-lg">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-[5px]">
                                                            <span className="text-[16px]  font-bold text-[#3b404f]">Update Details</span>
                                                            <div onClick={editHandleSumbit} className="flex cursor-pointer gap-[5px] ml-[400px] items-center px-[15px] h-9 w-20 bg-[#4648D9] rounded-lg">
                                                                <img src={check} className="w-[12px] h-[12px]" alt="plus" />
                                                                <p className="text-sm font-medium text-[#FFFFFF] tracking-[0.25px] mr-6">Save</p>
                                                            </div>

                                                        </div>
                                                        <div className='bg-white rounded-full w-[36px] h-[36px] -mt-10 -mr-10 cursor-pointer '>
                                                            <img src={closed} alt="" className="w-[36px] h-[36px] " onClick={() => setUpdatePopup(false)} />
                                                        </div>
                                                    </div>

                                                    <div className="flex h-[495px] w-[540px] flex-col justify-items-center items-center gap-[24px] rounded-lg border-[1px] p-4 border-[#CFD3D4]">
                                                        <div className="flex flex-col gap-[7px]">
                                                            <span className="text-[#2A3143]">Employee Name</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={singleEmployee.name} type="text" placeholder="Gopal" className="focus:outline-none" readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">Date</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={dated} type="date" placeholder="e.g.Steel" className="focus:outline-none" readOnly />

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">PuchIn Time</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={PuchIn} onChange={(event) => setPunchIn(event.target.value)} type="time" placeholder="e.g.Steel" className="focus:outline-none" required />

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <span className="text-[#2A3143]">PuchOut Date</span>
                                                            <div className="px-[16px] w-[450px] flex  h-[40px] justify-between  rounded-[4px] border border-[#E3E4E7]">
                                                                <input value={punchOutDate} onChange={(event) => setPunchOutDate(event.target.value)} type="date" placeholder="e.g.Steel" className="focus:outline-none" required />

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
                                                        <div onClick={handleDeleteSumbit} className="flex gap-[5px] cursor-pointer items-center px-[15px] h-10 w-25 bg-[#BB0F0F1F] rounded-lg">
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
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                                                {showTableRow.includes(index)
                                                    ? latestPunches.punchIn
                                                        ? changetime(latestPunches.punchIn)
                                                        : "Not Available"
                                                    : firstPunches.punchIn
                                                        ? changetime(firstPunches.punchIn)
                                                        : "Not Available"}
                                            </td>

                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches?.punchOut ? changetime(latestPunches.punchOut) : "Not Avilable"}</td>
                                            <td className='py-4 px-5'>
                                                {element?.status === "approved" &&
                                                    <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                                                        <img onClick={() => handlePopup((latestPunches.punchIn).slice(0, 10), latestPunches, element.date)} src={dots} className="w-[12px] h-[12px]" alt="plus" />

                                                    </span>}
                                                {element?.status === "rejected" &&
                                                    <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                                                        <img onClick={() => handlePopup((latestPunches.punchIn).slice(0, 10), latestPunches, element.date)} src={dots} className="w-[12px] h-[12px]" alt="plus" />

                                                    </span>}
                                                {(element.status === "pending") &&
                                                    <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                                                        <img onClick={() => handlePopup((latestPunches.punchIn).slice(0, 10), latestPunches, element.date)} src={dots} className="w-[12px] h-[12px]" alt="plus" />
                                                    </span>}
                                                {(element.status === "added Manually by administrator") &&
                                                    <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                                                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                                                        <span className='text-sm font-normal text-[#945D2D]'>Manual</span>
                                                        <img onClick={() => handlePopup((latestPunches.punchIn).slice(0, 10), latestPunches, element.date)} src={dots} className="w-[12px] h-[12px]" alt="plus" />

                                                    </span>}
                                            </td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'> {element.approvedBy?.name
                                                ? element.approvedBy?.name
                                                : "-"}</td>
                                        </tr>
                                        {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any) => {
                                            return <tr key={element._id + element.punchIn}>
                                                <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchIn ? changetime(element.punchIn) : "Not Avilable"}</td>
                                                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchOut ? changetime(element.punchOut) : "Not Avilable"}</td>
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
            {/* Attendance ENDS here */}</div>
    )
}
