
// import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from "react-redux"
import round from "../../assets/Group 1.png"
import { useEffect } from "react"
import { getLoggedInUserDataAsync } from "../../redux/Slice/loginSlice"
import { getEmployeeImageAsync } from "../../redux/Slice/EmployeeSlice"


export const Employeehome = () => {
    const Employee = useSelector((state: any) => state.login.loggedInUserData?.employee)
    const profileData = useSelector((state: any) => state.employee.singleEmployee.profileId?.profilePicture)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync()).then((data: any) => {
            dispatch(getEmployeeImageAsync({ employeeId: data.payload.employee._id }));
        })
    }, [])
    console.log(Employee)


    return (
        <div className="flex flex-col items-start self-stretch max-w-[768px] pt-[32px]  px-[40px] gap-[32px]">
            <div className="flex flex-col items-start self-stretch gap-[32px]">
                <div className="flex items-start self-stretch gap-[291px] text-[#2E2E2E] font-inter font-bold text-[28px] leading-[36px]">
                    Welcome Back {Employee ? Employee.name : 'Employee'}
                </div>

                <div className="flex items-start bg-[#FAFAFA] rounded-[8px] border border-primary-border self-stretch px-[40px] py-[24px] gap-[40px] w-[404px]">
                    <div className="flex flex-col items-start self-stretch pb-0 gap-[8px] text-[#2E2E2E] font-inter font-semibold text-[20px] leading-[28px]">
                        Your Employee Barcode
                    </div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAANuSURBVO3BQY5bCRYDweSD7n/lHC96wdUHBKlsdw8j4i/M/OOYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTDlmyjFTjplyzJRjprz4UBJ+J5V3JOGJypMkPFF5koTfSeUTx0w5ZsoxU158mco3JeETKi0J71BpSfiEyjcl4ZuOmXLMlGOmvPhhSXiHyjuS8ETlSRKayu+UhHeo/KRjphwz5ZgpL/5jVH6nJDSVf7Njphwz5ZgpL/7jkvCTVP5LjplyzJRjprz4YSq/UxKaSkvC30Tlb3LMlGOmHDPlxZcl4U9SaUloKi0JT5LQVFoSmsqTJPzNjplyzJRjprz4kMrfJAlN5RMqLQlN5YnKv8kxU46ZcsyUFx9KQlNpSfgmlabSkvA3ScI3qfykY6YcM+WYKS++LAnvUGlJaCpPkvAkCU9UniShqTxJQlNpSWgqLQlNpSWhqXzTMVOOmXLMlPgLX5SEptKS0FSeJKGpvCMJTeUTSWgqLQlPVFoSnqi0JDxR+cQxU46ZcsyUF7+ZyjtUWhKeqDSVloSm8g6VTyThicqfdMyUY6YcM+XFl6k8SUJTaUl4h8qflIR3qDxJwjtUvumYKcdMOWZK/IUPJOEdKi0JT1RaEp6otCQ0lZaEJyrflISm8iQJTeUnHTPlmCnHTHnxZSotCS0JT1RaEn6SSktCS8ITlZaEpvKOJDSVloQnKp84ZsoxU46Z8uKHqXxC5UkSnqg8ScITlU8k4R0qf9IxU46ZcsyUF3+ZJDxReZKEpvIOlZaEn5SEv8kxU46ZcsyU+Av/YkloKr9TEprKO5LQVFoSmkpLQlP5xDFTjplyzJQXH0rC76TSVFoSPqHyTUloKp9Iwk86ZsoxU46Z8uLLVL4pCU+S0FRaEp6oPElCU3mHyidUniThm46ZcsyUY6a8+GFJeIfKJ5LQVFoS3qHSkvAkCd+UhKbyk46ZcsyUY6a8+D+j0pLwDpUnSXii0pLQkvAkCT/pmCnHTDlmyov/uCQ0labSkvAJlSdJaCqfSMI3HTPlmCnHTHnxw1R+ksqTJDxJwhOVloQnKi0J/ybHTDlmyjFTXnxZEn6nJDSVpvIOlZaEpvIOlZaEJ0n4k46ZcsyUY6bEX5j5xzFTjplyzJRjphwz5Zgpx0w5ZsoxU46ZcsyUY6YcM+WYKcdM+R9bSXEfvkhrCQAAAABJRU5ErkJggg==" alt="barcode" />
                </div>

                <div className="flex flex-col items-start self-stretch pt-[24px] gap-[32px]">
                    <div className="flex items-start self-stretch gap-[291px] text-[#2E2E2E] font-inter font-bold text-[28px] leading-[36px]">
                        Staff Attendance
                    </div>

                    <div className="flex items-start gap-[20px] self-stretch">
                        <div className="flex flex-col justify-center  bg-[#FAFAFA] rounded-[8px] border border-primary-border self-stretch px-[20px] py-[16px]  items-start p-[4px] gap-[2px] w-[200px]">
                            <div className='flex items-center gap-[12px]'>
                                <img src={round} alt="" className='w-[24px] h-[24px]' />
                                <p className="text-[#283093] font-inter font-bold text-[24px] leading-[32px]">
                                    4 / 5
                                </p>

                            </div>
                            <p className='items-start self-stretch pb-0 gap-[8px] text-[#000000] font-inter font-medium text-[16px] leading-[28px]'>Product Managers</p>
                        </div>
                    </div>
                </div>


                <div className="flex justify-between items-end self-stretch pt-24">

                </div>
            </div>

        </div>

    )
}
