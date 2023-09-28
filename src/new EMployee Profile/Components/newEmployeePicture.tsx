import del from "../../assets/TrashSimple11.svg"
import del1 from "../../assets/TrashSimple.svg"
import EditPicture from "../../assets/EditPicture.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { addImageAsync, deleteEmployeeAsync, getSingleEmployeeAsync } from "../../redux/Slice/EmployeeSlice";
import { useNavigate } from "react-router-dom";

const NewPicture = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    const [employeeId, setEmployeeId] = useState("")
    const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/219/219983.png")

    useEffect(() => {
        setEmployeeId(singleEmployee?._id);
        if (singleEmployee?.profilePicture) {
            setProfilePicture(singleEmployee?.profilePicture)
        } else {
            setProfilePicture("https://cdn-icons-png.flaticon.com/512/219/219983.png")
        }
    }, [singleEmployee])

    // delete section
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirmation(false);
        dispatch(deleteEmployeeAsync({ employeeId: singleEmployee?._id })).then(() => {
            navigate("/view-modify-database")
        })
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };
    return (
        <div className="flex mt-10 gap-6">
            <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-col justify-center items-center gap-[16px] py-8 px-4 bg-[#FAFAFA] rounded-lg border border-solid border-[#DEDEDE] w-[192px] ">
                    <div className='relative'>
                        <img src={profilePicture} alt="Employee Image" className='rounded-full object-cover w-[144px] h-[144px]' />
                        <div className='absolute right-4 bottom-1 cursor-pointer'>
                            <label className='cursor-pointer' htmlFor="ProPic"><img src={EditPicture} className='w-[24px] h-[24px]' alt="" /></label>
                            <input onChange={(event: any) => {
                                const formData = new FormData();
                                formData.append('file', event.target.files[0]);
                                formData.append('employeeId', employeeId);
                                dispatch(addImageAsync(formData)).then(() => {
                                    dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                                })
                            }} className='hidden' id="ProPic" type="file" />
                        </div>
                    </div>
                    <p className="text-center text-[18px] leading-6 font-semibold text-[#2E2E2E]">
                        {singleEmployee && singleEmployee.name}
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

        </div>
    )
}

export default NewPicture