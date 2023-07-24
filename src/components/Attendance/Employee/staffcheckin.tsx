import { useEffect, useState } from "react"
import right from "../../../assets/r-arrow.png";
import up from "../../../assets/arrow-up.png";
import bag from "../../../assets/Briefcase.png"
import { Link } from "react-router-dom";
import approve from "../../../assets/Check.png"
import deny from "../../../assets/X.png"
import axios, { AxiosResponse } from "axios";
import { getPresentNumberApiPath } from "../../../APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttandenceAsync, updateAttendanceAsync } from "../../../redux/Slice/AttandenceSlice";


export const StaffCheckin = () => {
    const dispatch = useDispatch();
    const allAttandenceList = useSelector((state: any) => state.attandence.allAttandence.employees);
    const [allAttandenceList1, setAllAttandenceList1] = useState([]);
    useEffect(() => {
        let arr1: any = [];
        let index1: number = 0;
        allAttandenceList && allAttandenceList.forEach((element: any) => {
            arr1 = [...arr1, { ...element }];
            const arr = (element.punches).filter((element: any) => element.status === "pending")
            if(arr.length === 0){
                arr1.splice(index1, 1)
                console.log("hi")
            } else{
                arr1[index1].punches = arr;
                setAllAttandenceList1(arr1)
                index1++;
            }
        })
    }, [allAttandenceList])
    console.log("setAllAttandenceList1", allAttandenceList1)

    interface AttendanceData {
        AbsentEmployess: string[];
        Number_Present_Employee: number;
        // Add any other properties as needed
    }
    const [data, setData] = useState<AttendanceData | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<AttendanceData> = await axios.get(
                    `${getPresentNumberApiPath}`,
                    { withCredentials: true }
                );
                setData(response.data);

            } catch (error) {
                // Handle any errors
                console.error(error);
            }
        };
        fetchData();
        dispatch(getAllAttandenceAsync())
    }, []);


    return (

        <div className="flex flex-col flex-start px-10 pt-[32px] ">
            <div className=" flex justify-between w-[688px] item-center">
                <div className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
                    Daily Staff Check-in
                </div>
                <Link to="/employee-attendence" className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
                    <p className="text-[#666666] leading-trim font-inter text-capitalize text-lg font-medium leading-6 tracking-wider">
                        See Attendance Records
                    </p>
                    <img src={right} alt="" className="h-[16px] w-[16px]" />
                </Link>

            </div>
            <div className="flex flex-start pt-[16px] gap-[32px]">
                <div className="flex flex-col w-[191px] h-[108px] justify-center border border-primary-border items-center gap-4 p-[24px] rounded-2xl bg-[#fafafa]">
                    <div className="flex justify-center items-center">
                        <span className="text-[#283093] text-2xl font-inter font-semibold leading-8">
                            {data && data.Number_Present_Employee}
                        </span>
                        <img src={up} alt="" className="h-[16px] w-[16px]" />
                    </div>
                    <p className="text-neutral-n-600 text-lg font-inter font-medium leading-6 tracking-tighter">
                        Present
                    </p>
                </div>
                <div className="flex flex-col w-[191px] h-[108px] justify-center border border-primary-border items-center gap-4 p-[24px] rounded-2xl bg-[#fafafa]">
                    <div className="flex justify-center items-center">
                        <span className="text-[#283093] text-2xl font-inter font-semibold leading-8">
                            {data && data.AbsentEmployess}
                        </span>
                        <img src={up} alt="" className="h-[16px] w-[16px] rotate-180" />
                    </div>
                    <p className="text-neutral-n-600 text-lg font-inter font-medium leading-6 tracking-tighter">
                        Absent
                    </p>
                </div>
            </div>
            <div className="flex flex-col py-[48px]  flex-start gap-8 self-stretch">
                <div className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
                    Daily Staff Check-in
                </div>

                {allAttandenceList1 && allAttandenceList1.map((element: any, index: number) => {
                    const latestAttendance = element.punches[0];
                    return <div key={index} className="flex p-[24px] items-start gap-[32px] border self-stretch rounded-[8px] border-primary-border bg-[#FAFAFA]">
                        <div className="flex flex-col items-start gap-[16px] flex-1 self-stretch">
                            <div className="flex items-center text-[#2E2E2E] text-[16px] font-inter font-semibold leading-2">{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</div>
                            <div className="flex py-[8px] px-[16px] bg-[#ECEDFE] rounded-3xl items-center  text-primary-blue text-[14px] font-inter  gap-[8px]  leading-2 ">
                                <img src={bag} alt="" className="w-[10px] h-[10px]" />
                                Production Head, {latestAttendance?.status || "No Status"}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-[24px] flex-1 self-stretch ">
                            <div className="flex items-center text-[#2E2E2E] text-[16px] font-inter font-semibold leading-2">Punch-in: {new Date(latestAttendance?.punchIn).toLocaleString("en-US", { timeStyle: "short" })}</div>
                            <div className="flex items-start gap-[16px]">
                                <button className="bg-primary-blue rounded-[8px] items-center flex gap-[8px] px-[16px] py-[12px] text-white text-sm font-medium h-[40px] w-[122px] justify-center"
                                    onClick={() => {
                                        const data = {
                                            employeeId: element.employeeId?._id,
                                            punchInTime: latestAttendance.punchIn,
                                            status: "approved"
                                        }
                                        dispatch(updateAttendanceAsync(data)).then(() => dispatch(getAllAttandenceAsync()));
                                    }}>
                                    <img src={approve} alt="" className="h-[16px] w-[16px]" />
                                    Approved</button>
                                <button className="text-primary-blue border border-primary-blue rounded-[8px] items-center flex gap-[5px] px-[16px] py-[12px] text-sm font-medium h-[40px] w-[122px] justify-center"
                                    onClick={() => {
                                        const data = {
                                            employeeId: element.employeeId?._id,
                                            punchInTime: latestAttendance.punchIn,
                                            status: "rejected"
                                        }
                                        dispatch(updateAttendanceAsync(data)).then(() => dispatch(getAllAttandenceAsync()));
                                    }}>
                                    <img src={deny} alt="" className="h-[16px] w-[16px]" />
                                    Deny</button>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>


    );
};
