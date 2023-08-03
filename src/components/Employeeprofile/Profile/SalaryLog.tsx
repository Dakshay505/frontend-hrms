import { useSelector } from "react-redux"
import ArrowSqureOut from '../../../assets/ArrowSquareOut.svg'
import X from "../../../assets/X.svg"
import CurrencyInr from "../../../assets/CurrencyInr.svg"
import { useState } from "react"

const SalaryLog = () => {

    const salaryLogList = useSelector((state: any) => state.employee.salaryLogSingleEmployee);
    console.log("salaryLogList", salaryLogList)
    const [showPopup, setShowPopup] = useState<any>([])
    return (
        <div className="mt-10">
            <div>
                <h1 className='text-2xl font-bold text-[#2E2E2E]'>Salary Logs</h1>
            </div>
            <div className=" flex gap-6 mt-6 pb-6 overflow-auto">
                {salaryLogList && salaryLogList.map((element: any, index: number) => {
                    const localDate = new Date(new Date(element.createdAt).getTime() + new Date(element.createdAt).getTimezoneOffset() * 60000);
                    const day = String(localDate.getDate()).padStart(2, '0');
                    const month = String(localDate.getMonth() + 1).padStart(2, '0');
                    const year = localDate.getFullYear();
                    const formattedDate = `${day}/${month}/${year}`;
                    return (
                        <div key={index} className="px-6 py-4 border border-solid border-[#DEDEDE] min-w-[250px] min-h-[104px] rounded-lg bg-[#FAFAFA]" >
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div>
                                        <h3 className="text-[16px] leading-5 font-medium text-[#1C1C1C] tracking-[0.1px]">₹ {(element.overTimeRate).toFixed(2)} per hour</h3>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium  text-[#666666] tracking-[0.25px]">{formattedDate}</p>
                                    </div>
                                </div>

                                <div>
                                    <div onClick={() => {
                                        setShowPopup([index])
                                    }} className="flex items-center gap-[6px] cursor-pointer">
                                        <p className="text-xs font-medium text-[#283093]">View All Details</p>
                                        <img src={ArrowSqureOut} className="w-[14px] h-[14px]" alt="" />
                                    </div>
                                </div>
                            </div>
                            {showPopup.includes(index) && <div style={{ backgroundColor: "rgba(0,0,0,0.6)" }} className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                                <div className="relative p-10 bg-[#FFFFFF] w-[720px] h-[340px]">
                                    <img src={X} onClick={() => {
                                                setShowPopup([])
                                            }} className="w-7 h-7 absolute top-3 right-3 cursor-pointer" alt="" />
                                    <div className="flex justify-between items-center py-4 border-b border-solid border-[#B0B0B0]">
                                        <div className="flex gap-2">
                                            <div>
                                                <img src={CurrencyInr} className="w-6 h-6" alt="" />
                                            </div>
                                            <div>
                                                <h3 className="text-[18px] leading-6 font-medium text-[#283093] tracking-[0.15px]">Salary Logs</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#666666] tracking-[0.25px]">{formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3">Salary</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3">₹ {element.salary}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">Lunch Time</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">{element.lunchTime} Hour</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">Working Days</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">{element.workingDays} days</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">Working Hours</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">{element.workingHours} Hours</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">Overtime?</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">{element.overTime ? "Yes" : "No"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm font-semibold text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">Overtime Rate</td>
                                                    <td className="text-sm font-normal text-[#3B3B3B] tracking-[0.25px] px-3 pt-3">₹ {(element.overTimeRate).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SalaryLog