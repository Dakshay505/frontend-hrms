import { useEffect, useState, } from 'react';
import edit from "../../assets/PencilSimple.png"
import del from "../../assets/TrashSimple11.svg"
import del1 from "../../assets/TrashSimple.svg"
import check from "../../assets/Check.png"
import "../../deletebtn.css"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeAsync, getQrAssignAsync, getSingleEmployeeAsync, updateEmployeeAsync } from '../../redux/Slice/EmployeeSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import ArrowSqureOut from '../../assets/ArrowSquareOut.svg'
import ArrowSqureOutBlack from '../../assets/ArrowSquareOutBlack.svg'
import DocumentFrame from '../../assets/documentFrame.svg'
import WarningCircle from '../../assets/WarningCircle.svg'
import Receipt from '../../assets/Receipt.svg'
import axios from 'axios';
import { getOtpApiPath, verifyApiPath } from '../../APIRoutes';
import XCircle from '../../assets/XCircle.svg'
import PaperPlaneTilt from '../../assets/PaperPlaneTilt.svg';
import { useNavigate } from 'react-router-dom';
import GreenCheck from '../../assets/GreenCheck.svg';
import RedX from '../../assets/RedX.svg';
import SpinnerGap from '../../assets/SpinnerGap.svg'
import { getAllAttandenceAsync } from '../../redux/Slice/AttandenceSlice';
import CaretDown from "../../assets/CaretDown11.svg"
import CaretUp from "../../assets/CaretUp.svg"
import X from "../../assets/X.svg"

export const EmployeeProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const [employeeId, setEmployeeId] = useState("")
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    const [singleEmployeeAttendanceList, setSingleEmployeeAttendanceList] = useState([])
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const groupList = useSelector((state: any) => state.group.groups);
    const qrAssign = useSelector((state: any) => state.employee.qrAssign);

    const [showInputBoxName, setShowInputBoxName] = useState(false);
    const [inputBoxNameValue, setInputBoxNameValue] = useState<any>("");

    const [showInputBoxJobProfile, setShowInputBoxJobProfile] = useState(false);
    const [inputBoxJobProfileValue, setInputBoxJobProfileValue] = useState<any>("");

    const [showInputBoxGroup, setShowInputBoxGroup] = useState(false);
    const [inputBoxGroupValue, setInputBoxGroupValue] = useState<any>("");

    const [showInputBoxEmail, setShowInputBoxEmail] = useState(false);
    const [inputBoxEmailValue, setInputBoxEmailValue] = useState<any>("");

    const [showInputBoxContactNumber, setShowInputBoxContactNumber] = useState(false);
    const [inputBoxContactValue, setInputBoxContactNumberValue] = useState<any>("");

    const [showInputBoxGender, setShowInputBoxGender] = useState(false);
    const [inputBoxGenderValue, setInputBoxGenderValue] = useState<any>("");

    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        setEmployeeId(singleEmployee._id);
        setInputBoxNameValue(singleEmployee.name);
        setInputBoxJobProfileValue(singleEmployee.jobProfileId?.jobProfileName);
        setInputBoxGroupValue(singleEmployee.groupId?.groupName);
        setInputBoxEmailValue(singleEmployee.email);
        setInputBoxContactNumberValue(singleEmployee.contactNumber);
        setInputBoxGenderValue(singleEmployee.gender);
        if (singleEmployee._id) {
            dispatch(getQrAssignAsync(singleEmployee._id));
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

    // delete section
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirmation(false);
        dispatch(deleteEmployeeAsync({ employeeId: singleEmployee._id })).then(() => {
            navigate("/view-modify-database")
        })
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    // employee info
    const Profile = singleEmployee.profileId
    let image: any = '';
    if (Profile && Profile.profilePicture) {
        image = Profile.profilePicture;
    } else {
        image = "https://cdn-icons-png.flaticon.com/512/219/219983.png";
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


    // OTP VERIFICATION

    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState<any>();
    const [otpSent, setOtpSent] = useState<any>("");
    const [otpVerified, setOtpVerified] = useState<any>("");

    const getOtpAsync = async (sendData: any) => {
        try {
            const { data } = await axios.get(`${getOtpApiPath}?phoneNumber=${sendData.phoneNumber}`, { withCredentials: true });
            return data;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    const verifyOtpAsync = async (sendData: any) => {
        try {
            const { data } = await axios.get(`${verifyApiPath}?phoneNumber=${sendData.phoneNumber}&otp=${sendData.otp}`, { withCredentials: true });
            return data
        }
        catch (error) {
            console.log(error);
            return error
        }
    }

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
            <div className="flex mt-10 gap-6">
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col justify-center items-center gap-[16px] py-8 px-4 bg-[#FAFAFA] rounded-lg border border-solid border-[#DEDEDE] w-[192px] ">
                        <img src={image} alt="Employee Image" className='rounded-full object-cover w-[144px] h-[144px]' />
                        <p className="text-center text-[18px] leading-6 font-semibold text-[#2E2E2E]">
                            {singleEmployee.name}
                        </p>
                    </div>
                    <div>
                        <div
                            className="flex items-center justify-center cursor-pointer py-3 px-4"
                            onClick={handleDeleteClick}
                        >
                            <div>
                                <img src={del} alt="" className="w-4 h-4" />
                            </div>
                            <p className='px-2 text-sm font-medium text-[#8A2626]'>Delete</p>
                        </div>

                        {showConfirmation && (
                            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                                <div className='bg-[#FFFFFF] p-10'>
                                    <div className="flex gap-2 items-center pt-2 pb-4 border-b border-solid border-[#B0B0B0]">
                                        <img src={del1} alt="" className="w-6 h-6" />
                                        <h2 className="text-[18px] leading-6 font-medium text-[#8A2626]">Delete employee?</h2>
                                    </div>
                                    <div className='pt-6'>
                                        <p className='text-sm font-normal text-[#3B3B3B]'>Are your sure you want to delete this employee? This action can’t be undone.</p>
                                    </div>
                                    <div className="pt-[33px] flex gap-4 justify-end">
                                        <div className="flex justify-center items-center w-[96px] h-[34px] border border-solid border-[#3B3B3B] rounded-lg cursor-pointer" onClick={handleCancelDelete}>
                                            <p className='text-sm font-medium text-[#3B3B3B] tracking-[0.25px]'>Cancel</p>
                                        </div>
                                        <div className="flex justify-center items-center w-[164px] h-[34px] bg-[#283093] rounded-lg cursor-pointer" onClick={handleConfirmDelete}>
                                            <p className='text-sm font-medium text-[#FBFBFC] tracking-[0.25px]'>Delete Employee</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="ps-6">
                    <form
                        onSubmit={handleSubmit((data) => {
                            const sendData = { employeeId: employeeId, data: data }
                            dispatch(updateEmployeeAsync(sendData)).then(() => {
                                dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                            });
                            setShowInputBoxName(false);
                            setShowInputBoxJobProfile(false);
                            setShowInputBoxGroup(false);
                            setShowInputBoxEmail(false);
                            setShowInputBoxContactNumber(false);
                            setShowInputBoxGender(false);
                        })}
                    >
                        <div className="flex flex-col gap-3">
                            {!singleEmployee.verified && <div className='flex gap-[10px] items-center bg-[#FCECEC] rounded-lg p-4'>
                                <div>
                                    <img src={WarningCircle} className='w-[20px] h-[20px]' alt="" />
                                </div>
                                <div>
                                    <p className='text-sm leading-4 font-medium text-[#8A2626]'>Contact number is not verified! <span onClick={() => {
                                        setShowOtp(!showOtp)
                                        getOtpAsync({ phoneNumber: inputBoxContactValue }).then((res) => {
                                            if (res.data.Status === "Success") {
                                                setOtpSent("OTP Sent");
                                            }
                                            else {
                                                setOtpSent("OTP not Sent");
                                            }
                                        })
                                    }} className='underline underline-offset-2 cursor-pointer'>Verify Now</span></p>
                                </div>
                            </div>}
                            {showOtp &&
                                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className='fixed flex justify-center items-center top-0 bottom-0 right-0 left-0'>
                                    <div className='bg-[#FFFFFF] p-10'>
                                        <div className='flex gap-2 pb-4 w-[640px] border-b border-solid border-[#B0B0B0]'>
                                            <div>
                                                <img src={Receipt} className='w-6 h-6' alt="" />
                                            </div>
                                            <div>
                                                <h3 className='text-[18px] leading-6 font-medium text-[#1C1C1C]'>OTP sent to {inputBoxContactValue}</h3>
                                            </div>
                                        </div>
                                        <div className='pt-6 flex flex-col gap-3'>
                                            <div className='flex justify-between'>
                                                <p className='text-sm font-normal text-[#1C1C1C]'>Enter OTP</p>
                                                <p onClick={() => {
                                                    getOtpAsync({ phoneNumber: inputBoxContactValue }).then((res) => {
                                                        if (res.data.Status === "Success") {
                                                            setOtpSent("Resend otp Successfully")
                                                        }
                                                    })
                                                }} className='text-[12px] leading-5 font-normal text-[#283093] cursor-pointer underline'>Resend OTP</p>
                                            </div>
                                            <div>
                                                <input
                                                    onChange={(event) => setOtp(event.target.value)}
                                                    placeholder='XXX XXX'
                                                    className='border border-solid border-[#B0B0B0] rounded py-3 px-4 h-10 w-[640px] text-sm font-normal text-[#666666]'
                                                    type="number" />
                                                {otpSent === "Resend otp Successfully" &&
                                                    <div className='flex gap-[6px] items-center pt-2'>
                                                        <img src={PaperPlaneTilt} className='w-[14px] h-[14px]' alt="plane" />
                                                        <p className='text-xs font-normal text-[#414EF1]'>OTP resent successfully!</p>
                                                    </div>}
                                                {otpVerified === "Not Verified" && <div className='flex gap-[6px] items-center pt-2'>
                                                    <img src={XCircle} className='w-[14px] h-[14px]' alt="plane" />
                                                    <p className='text-xs font-normal text-[#E23F3F]'>OTP incorrect! Please try again.</p>
                                                </div>}
                                            </div>
                                            <div className='pt-[21px]'>
                                                <div className='flex gap-4 justify-end'>
                                                    <div onClick={() => setShowOtp(false)} className='flex justify-center items-center h-[34px] w-[96px] border border-solid border-[#3B3B3B] rounded-lg cursor-pointer'>
                                                        <p className='text-sm font-medium text-[#3B3B3B]'>Cancel</p>
                                                    </div>
                                                    <div onClick={() => {
                                                        verifyOtpAsync({ phoneNumber: inputBoxContactValue, otp: otp }).then((res) => {
                                                            if (res.data.Status === "Success") {
                                                                setOtpVerified("Verified");
                                                                dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                                                                setShowOtp(false);
                                                            } else {
                                                                setOtpVerified("Not Verified");
                                                            }
                                                        });
                                                    }} className='flex justify-center items-center h-[34px] w-[122px] bg-[#283093] rounded-lg cursor-pointer'>
                                                        <p className='text-sm font-medium text-[#FBFBFC]'>Verify OTP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            {!showInputBoxName &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Name</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxName(!showInputBoxName);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.name}</p>
                                    </div>
                                </div >}
                            {showInputBoxName &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Name</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('name', { required: true })}
                                                className="text-[12px] leading-5 font-normal focus:outline-none"
                                                value={inputBoxNameValue}
                                                onChange={(event) => setInputBoxNameValue(event.target.value)}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                            {!showInputBoxJobProfile &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Job Profile</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxJobProfile(!showInputBoxJobProfile);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.jobProfileId?.jobProfileName}</p>
                                    </div>
                                </div >}
                            {showInputBoxJobProfile &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Job Profile</p>
                                        </div>
                                        <div>
                                            <select
                                                {...register('jobProfile', { required: true })}
                                                className='text-[12px] leading-5 font-normal focus:outline-none'
                                                defaultValue={inputBoxJobProfileValue}
                                                onChange={(event) => setInputBoxJobProfileValue(event.target.value)}
                                            >
                                                {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                                    return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                            {!showInputBoxGroup &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Group</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxGroup(!showInputBoxGroup);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.groupId?.groupName}</p>
                                    </div>
                                </div >}
                            {showInputBoxGroup &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Group</p>
                                        </div>
                                        <div>
                                            <select
                                                {...register('group', { required: true })}
                                                className='text-[12px] leading-5 font-normal focus:outline-none'
                                                defaultValue={inputBoxGroupValue}
                                                onChange={(event) => setInputBoxGroupValue(event.target.value)}
                                            >
                                                {groupList && groupList.map((element: any, index: number) => {
                                                    return <option key={index} value={element.groupName}>{element.groupName}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                            {!showInputBoxEmail &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Email</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxEmail(!showInputBoxEmail);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.email}</p>
                                    </div>
                                </div >}
                            {showInputBoxEmail &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Email</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('email', { required: true })}
                                                className="text-[12px] leading-5 font-normal focus:outline-none"
                                                value={inputBoxEmailValue}
                                                onChange={(event) => setInputBoxEmailValue(event.target.value)}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                            {!showInputBoxContactNumber &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Contact Number</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxContactNumber(!showInputBoxContactNumber);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.contactNumber}</p>
                                    </div>
                                </div >}
                            {showInputBoxContactNumber &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Contact Number</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('contactNumber', { required: true })}
                                                className="text-[12px] leading-5 font-normal focus:outline-none"
                                                value={inputBoxContactValue}
                                                onChange={(event) => setInputBoxContactNumberValue(event.target.value)}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                            {!showInputBoxGender &&
                                <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Gender</p>
                                        <img src={edit} onClick={() => {
                                            setShowInputBoxGender(!showInputBoxGender);
                                        }} className="w-3 h-3" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.gender}</p>
                                    </div>
                                </div >}
                            {showInputBoxGender &&
                                <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                                    <div className="flex flex-col">
                                        <div className="flex gap-3">
                                            <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Gender</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register('gender', { required: true })}
                                                className="text-[12px] leading-5 font-normal focus:outline-none"
                                                value={inputBoxGenderValue}
                                                onChange={(event) => setInputBoxGenderValue(event.target.value)}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                            type="submit">
                                            <img src={check} className="w-4 h-4" alt="" />
                                        </button>
                                    </div>
                                </div>}
                        </div>
                    </form>
                </div>
            </div>

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
                                    <img src={image} className='w-16 h-16 rounded-full' alt="" />
                                </div>
                                {/* <img src={element.proofPicture} className='w-full h-full' alt="" /> */}
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
                    <img src={ArrowSqureOutBlack} className='w-[18px] h-[18px] cursor-pointer' alt="" />
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
