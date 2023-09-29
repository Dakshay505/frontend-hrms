import { fetchLoggedInHistory } from "../redux/Slice/LoginHistorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Loginlogs = () => {

    const loggedInHistory = useSelector((state: any) => state.loginHistroy.data?.data);
    console.log("abcd", loggedInHistory)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedInHistory());
    }, [dispatch]);



    return (
        <div className='px-[20px] pb-[50px]'>
            <div className=" mb-24 flex flex-col gap-[20px] overflow-auto">
                <table className="w-full">
                    <tbody>
                        <tr className="bg-[#ECEDFE] cursor-default">
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Sr No</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Employee Code</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Employee Name</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Job Profile</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Role</span>

                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Device</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <span> Time</span>
                            </td>

                        </tr>

                        {loggedInHistory &&
                            loggedInHistory.map((element: any, index: any) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element?.userInfo?.employeeCode ? element?.userInfo?.employeeCode : "-"}


                                    </td>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element?.userInfo?.name ? element?.userInfo?.name : "-"}
                                    </td>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element?.userInfo?.jobProfile ? element?.userInfo?.jobProfile : "-"}
                                    </td>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element?.userInfo?.role ? element?.userInfo?.role : "-"}
                                    </td>


                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element?.device?.userAgent ? element?.device?.userAgent.slice(13, 42) : "-"}
                                    </td>
                                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <div>
                                                {element?.logInTime ? element?.logInTime.slice(11, 16) : "-"}
                                            </div>
                                            <div>
                                                {element?.logInTime ? element?.logInTime.slice(0, 10) : "-"}
                                            </div>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                    </tbody >
                </table>
            </div>
        </div>
    )
}
