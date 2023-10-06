import EditPicture from "../../assets/EditPicture.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { addImageAsync,  getSingleEmployeeAsync } from "../../redux/Slice/EmployeeSlice";
import { getLoggedInUserDataAsync } from "../../redux/Slice/loginSlice";
import warning from "../../assets/warning.png"
const NewPicture = () => {
    const dispatch = useDispatch();
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
    const [employeeId, setEmployeeId] = useState("")

    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    console.log(loggedInUserData)


    const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/219/219983.png")

    useEffect(() => {
        setEmployeeId(singleEmployee?._id);
        if (singleEmployee?.profilePicture) {
            setProfilePicture(singleEmployee?.profilePicture)
        } else {
            setProfilePicture("https://cdn-icons-png.flaticon.com/512/219/219983.png")
        }
        dispatch(getLoggedInUserDataAsync());

    }, [singleEmployee])

    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    }, [])


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

                <div className="flex flex-col justify-center items-center gap-[16px] py-8 px-4 bg-[#FAFAFA] rounded-lg border border-solid border-[#DEDEDE] w-[192px] ">
                    <div className='relative'>
                        <img src={singleEmployee.permanentBarCode ? singleEmployee.permanentBarCode : warning} alt="Employee Image" className='rounded-full object-cover w-[144px] h-[144px]' />
                    </div>
                </div>


            </div>

        </div>
    )
}

export default NewPicture