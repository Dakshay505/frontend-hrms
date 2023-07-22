import { useEffect, useState, } from 'react';
import edit from "../../assets/PencilSimple.png"
import del from "../../assets/TrashSimple.png"
import check from "../../assets/Check.png"
import "../../deletebtn.css"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeAsync, getSingleEmployeeAsync, updateEmployeeAsync } from '../../redux/Slice/EmployeeSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import ArrowSqureOut from '../../assets/ArrowSquareOut.svg'
import ArrowSqureOutBlack from '../../assets/ArrowSquareOutBlack.svg'
import DocumentFrame from '../../assets/documentFrame.svg'
import WarningCircle from '../../assets/WarningCircle.svg'
import Receipt from '../../assets/Receipt.svg'
import axios from 'axios';
import { getOtpApiPath, verifyApiPath } from '../../APIRoutes';


export const EmployeeProfile = () => {
    const dispatch = useDispatch();

    const { handleSubmit, register } = useForm();
    const [employeeId, setEmployeeId] = useState("")
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const groupList = useSelector((state: any) => state.group.groups);


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


    useEffect(() => {
        setEmployeeId(singleEmployee._id);
        setInputBoxNameValue(singleEmployee.name);
        setInputBoxJobProfileValue(singleEmployee.jobProfileId?.jobProfileName);
        setInputBoxGroupValue(singleEmployee.groupId?.groupName);
        setInputBoxEmailValue(singleEmployee.email);
        setInputBoxContactNumberValue(singleEmployee.contactNumber);
        setInputBoxGenderValue(singleEmployee.gender);
    }, [singleEmployee])
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
        dispatch(deleteEmployeeAsync({ employeeId: singleEmployee._id }));
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


    const qrData = [
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
        {
            name: "Mahesh D.",
            date: "08:04 am, 28/06/23"
        },
    ]
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
            console.log(data);
            return data
        }
        catch (error) {
            console.log(error);
            return error
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
                            <div className="confirmation-modal">
                                <div className="confirmation-modal-content">
                                    <div className="flex gap-[5px] items-center">
                                        <img src={del} alt="" className="w-[20px] h-[20px]" />
                                        <h2 className="text-left mb-0">Confirmation</h2>
                                    </div>
                                    <hr />
                                    <p>Are your sure you want to delete this employee? This action can’t be undone.</p>
                                    <div className="button-container">

                                        <div className="cancel-button" onClick={handleCancelDelete}>
                                            Cancel
                                        </div>
                                        <div className="confirm-button" onClick={handleConfirmDelete}>
                                            Delete Employee
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
                            console.log("sendData", sendData);
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
                                                {otpSent === "OTP Sent" && <p>OTP Send successfully</p>}
                                                {otpSent === "Resend otp Successfully" && <p>Resend OTP successfully</p>}
                                                {otpSent === "OTP not Sent" && <p>OTP Not Send Check Phone Number Again</p>}
                                                {otpVerified === "Not Verified" && <p>Otp Not Matched</p>}
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
            <div className='mt-10'>
                <div>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>QR Assigning Logs</h1>
                </div>
                <div className='mt-6 pb-6 overflow-auto'>
                    <div className='grid grid-cols-4 gap-5 w-[1260px]'>
                        {qrData && qrData.map((element: any, index: number) => {
                            return <div key={index} className='flex gap-6 justify-between py-4 px-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] w-[297px]'>
                                <div className='flex items-center justify-center'>
                                    <img src={image} className='w-16 h-16 rounded-full' alt="" />
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div>
                                        <p className='text-[16px] leading-5 font-medium tracking-[0.1px] text-[#000000] cursor-pointer'>By: <span className='underline'>{element.name}</span></p>
                                        <p className='text-[16px] leading-6 font-normal text-[#000000]'>{element.date}</p>
                                    </div>
                                    <div className='flex items-center gap-[6px] cursor-pointer'>
                                        <div>
                                            <p className='text-[12px] leading-4 font-medium text-[#283093] underline'>Open Photo</p>
                                        </div>
                                        <div>
                                            <img src={ArrowSqureOut} className='w-[14px] h-[14px]' alt="arrowsqureout" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
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
            <div className='my-10'>
                <div className='flex gap-3 items-center'>
                    <h1 className='text-2xl font-bold text-[#2E2E2E]'>Employee Attendance</h1>
                    <img src={ArrowSqureOutBlack} className='w-[18px] h-[18px] cursor-pointer' alt="" />
                </div>

            </div>
            {/* Attendance ENDS here */}
        </div >
    )
}
