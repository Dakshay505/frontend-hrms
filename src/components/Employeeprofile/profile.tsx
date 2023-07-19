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
    console.log("employeeId", employeeId);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);

    };

    const handleConfirmDelete = () => {
        // Perform the deletion logic here
        // ...
        setShowConfirmation(false);
        console.log("ggg", { employeeId: employeeId })
        dispatch(deleteEmployeeAsync({ employeeId: singleEmployee._id }));
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    // employee info
    const Profile = singleEmployee.profileId
    let image;
    if (Profile && Profile.profilePicture) {
        image = Profile.profilePicture;
    } else {
        image = "https://cdn-icons-png.flaticon.com/512/219/219983.png";
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
                            {!showInputBoxName &&
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
                                <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
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
                                <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
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
        </div >
    )
}
