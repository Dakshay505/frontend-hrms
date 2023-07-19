
import right from "../../assets/r-arrow.png";
import up from "../../assets/arrow-up.png";
import { Link } from "react-router-dom";
import "../../attndence.css"
import { postAttandenceByDateAsync } from "../../redux/Slice/AttandenceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import axios from "axios";
import { getPresentNumberApiPath } from "../../APIRoutes";

export const AttendenceDtabase = () => {
  const dispatch = useDispatch();
  const todayStaffAttandence = useSelector((state: any) => state.attandence.staffAttandence);
  console.log(todayStaffAttandence);
  useEffect(() => {
    dispatch(postAttandenceByDateAsync())
  }, [])

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${getPresentNumberApiPath}`,
          { withCredentials: true }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div >
<div className="flex flex-col flex-start px-10 pt-[32px] ">
      <div className=" flex justify-between w-[688px] item-center">
        <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Attendance Overview
        </div>
        <Link to="/leaves" className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
          <p className="text-[#666666] text-[16px] font-medium leading-6">
            See All
          </p>
          <img src={right} alt="" className="h-[16px] w-[16px]" />
        </Link>

      </div>
      <div className="flex flex-start pt-4 gap-6">
        <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-semibold">
              {data && data.Number_Present_Employee}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] ms-1" />
          </div>
          <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
            Present
          </p>
        </div>
        <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-semibold">
              {data && data.AbsentEmployess}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] rotate-180 ms-1" />
          </div>
          <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
            Absent
          </p>
        </div>
      </div>
    </div>
      <div className="flex flex-col items-start w-[768px] py-[48px] px-[40px] flex-1">
        <div className=" flex justify-between w-[688px] item-center">
          <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
            Attendance Database
          </div>
          <Link to="/attendance-database">
            <div className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
              <p className="text-[#666666] text-[16px] font-medium leading-6">
                See All
              </p>
              <img src={right} alt="" className="h-4 w-4" />
            </div>
          </Link>
        </div>

        <div className='py-6'>
          {/* TABLE STARTS HERE */}
          <table>
            <tbody>
              <tr className='bg-[#ECEDFE] cursor-default'>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Approved By </td>
              </tr>
              {todayStaffAttandence && todayStaffAttandence.map((element: any, index: number) => {
                const latestAttandence = element.attendance[0];
                const latestPunches = latestAttandence.punches[0]

                return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.date ? (latestAttandence.date).slice(0, 10) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? new Date(latestPunches.punchIn).toLocaleString("en-US", {timeStyle: "short"}) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? new Date(latestPunches.punchOut).toLocaleString("en-US", {timeStyle: "short"}) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.approvedBy?.name ? latestAttandence.approvedBy?.name : "Not Avilable"}</td>
                </tr>
              })}
            </tbody>
          </table>
          {/* TABLE ENDS HERE */}
        </div>
      </div>

    </div>
  );
};
