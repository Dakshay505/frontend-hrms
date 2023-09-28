import { useEffect, useState } from 'react';
import NewPicture from './Components/newEmployeePicture'
import { EmployeeDetails } from './Components/navButtons/EmployeeDetails';
import { PersonalDetails } from './Components/navButtons/PersonalDetails';
import { BankDetails } from './Components/navButtons/BankDetails';
import SalaryLog from '../components/Employeeprofile/Profile/SalaryLog';
import { useDispatch, useSelector } from 'react-redux';
import ArrowSqureOut from '../assets/ArrowSquareOut.svg'
import X from "../assets/X.svg";
import { getQrAssignAsync, getSingleEmployeeAsync, salaryLogAsync } from '../redux/Slice/EmployeeSlice';
import { EmployeeAttendance } from './Components/EmployeeAttendance';
import { EmployeeDocuments } from './Components/navButtons/Documents/EmployeeDocuments';
import { getAllJobProfileAsync } from '../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../redux/Slice/GroupSlice';
import { useLocation } from 'react-router-dom';
import { getAllAttandenceAsync } from '../redux/Slice/AttandenceSlice';

export const NewProfile = () => {
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('employee');

    const toggleTab = (tab: any) => {
        setActiveTab(tab);
    };
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    console.log("employee",singleEmployee)

    // qr asign
    const qrAssign = useSelector((state: any) => state.employee.qrAssign);
    const [showQrRow, setShowQrRow] = useState<any>([]);
    const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/219/219983.png")

    const handleQrRowClick = (index: number) => {
        const isExpanded = showQrRow.includes(index)
        if (isExpanded) {
            setShowQrRow(showQrRow.filter((belowRowIndex: any) => belowRowIndex !== index))
        }
        else {
            setShowQrRow([index])
        }
    }
    useEffect(() => {
        if (singleEmployee?.profilePicture) {
            setProfilePicture(singleEmployee.profilePicture)
        } else {
            setProfilePicture("https://cdn-icons-png.flaticon.com/512/219/219983.png")
        }
        if (singleEmployee?._id) {
            dispatch(getQrAssignAsync(singleEmployee?._id));
            dispatch(salaryLogAsync(singleEmployee?._id))
        }
    }, [singleEmployee])

    const location = useLocation();
    const additionalData = (location.state?.additionalData);

    const [singleEmployeeAttendanceList, setSingleEmployeeAttendanceList] = useState([])


    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    
    useEffect(() => {
        const nextDate = new Date();
        const date = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
        dispatch(getAllJobProfileAsync());
        dispatch(getAllGroupsAsync());
        if (additionalData && additionalData !== "") {
            dispatch(getSingleEmployeeAsync(additionalData)).then((res: any) => {
                dispatch(salaryLogAsync(res.payload.employeeData?._id));
                dispatch(getQrAssignAsync(res.payload.employeeData?._id));
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
            //setAdditionalData("");
        }
    }, [])


    return (
        <div className='px-[40px] pb-[50px] pt-[32px]'>
            <div className='flex gap-[31px]'>
                <NewPicture />
                <div className='flex w-[600px] gap-[16px] pt-[32px] flex-col '>
                    <div className="flex px-[24px] py-[8px] items-start justify-around border border-[#d7d7d7] rounded-[8px] space-x-4">
                        <button
                            className={`p-2 ${activeTab === 'employee'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('employee')}
                        >
                            Employee Detail
                        </button>
                        <button
                            className={`p-2 ${activeTab === 'personal'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('personal')}
                        >
                            Personal Detail
                        </button>
                        <button
                            className={`p-2 ${activeTab === 'bank'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('bank')}
                        >
                            Account Detail
                        </button>
                        
                        <button
                            className={`p-2 ${activeTab === 'documents'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('documents')}
                        >
                          Documents
                        </button>
                    </div>
                    <div className='border  border-[#d7d7d7] rounded-[8px]'>
                        {activeTab === 'employee' && (
                            <div className="p-[16px]"><EmployeeDetails /></div>
                        )}

                        {activeTab === 'personal' && (
                            <div className="p-[16px]"><PersonalDetails /></div>
                        )}

                        {activeTab === 'bank' && (
                            <div className="p-[16px]"><BankDetails /></div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="p-[16px]"><EmployeeDocuments/></div>
                        )}
                    </div>
                </div>
            </div>
            <SalaryLog/>

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

            <EmployeeAttendance singleEmployeeAttendanceList={singleEmployeeAttendanceList} />
        </div>
    )
}
