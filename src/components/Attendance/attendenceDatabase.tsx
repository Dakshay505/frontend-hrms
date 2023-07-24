import right from "../../assets/r-arrow.png";
import up from "../../assets/arrow-up.png";
import GreenCheck from '../../assets/GreenCheck.svg';
import RedX from '../../assets/RedX.svg';
import SpinnerGap from '../../assets/SpinnerGap.svg'
import { Link } from "react-router-dom";
import "../../attndence.css"
import { getAllAttandenceAsync } from "../../redux/Slice/AttandenceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'

export const AttendenceDtabase = () => {
  const dispatch = useDispatch();
  const allAttandenceList = useSelector((state: any) => state.attandence.allAttandence.attendanceRecords);
  const allAbsentEmployees = useSelector((state: any) => state.attandence.allAttandence.excludedEmployees);

  const [showTableRow, setShowTableRow] = useState<any>([]);

  const handleRowClick = (index: number) => {
    const isExpanded = showTableRow.includes(index)
    if(isExpanded){
      setShowTableRow(showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index))
    }
    else{
      setShowTableRow([...showTableRow, index])
    }
  }

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dispatch(getAllAttandenceAsync({ date: `${year}-${month}-${day}` }));
  }, [])

  return (
    <div className="px-10 pt-8">
      <div className="flex flex-col flex-start">
        <div className=" flex justify-between item-center max-w-[688px]">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Overview
          </div>
          <Link to="" className="flex cursor-pointer gap-[6px] justify-center items-center">
            <p className="text-[#666666] text-[16px] font-medium leading-6">See All </p>
            <img src={right} alt="" className="h-[16px] w-[16px]" />
          </Link>
        </div>
        <div className="flex flex-start pt-4 gap-6">
          <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-2xl font-semibold">
                {allAttandenceList && allAttandenceList.length}
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
                {allAbsentEmployees && allAbsentEmployees.length}
              </span>
              <img src={up} alt="" className="h-[16px] w-[16px] rotate-180 ms-1" />
            </div>
            <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
              Absent
            </p>
          </div>
          <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-2xl font-semibold">
                {allAbsentEmployees && allAttandenceList && (allAbsentEmployees.length + allAttandenceList.length)}
              </span>
            </div>
            <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
              Total
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-[48px]">
        <div className=" flex justify-between max-w-[688px] item-center">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Database
          </div>
          <Link to="/attendance-database">
            <div className="flex cursor-pointer justify-center items-center">
              <p className="text-[#666666] text-[16px] font-medium leading-6">
                See All
              </p>
              <img src={right} alt="" className="h-4 w-4" />
            </div>
          </Link>
        </div>

        <div className='py-6 overflow-auto'>
          {/* TABLE STARTS HERE */}
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
              {allAttandenceList && allAttandenceList.map((element: any, index: number) => {
                const punchesList = [...(element.punches)];
                const sortedPunches = punchesList.sort((a: any, b: any) => {
                  return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
                })
                const latestPunches = sortedPunches[0];
                return <>
                  <tr key={element._id} className='hover:bg-[#FAFAFA]' onClick={() => {handleRowClick(index)}}>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
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
                  {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any, index: number) => {
                    return <tr key={index}>
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
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                    </tr>
                  })}
                </>
              })}
            </tbody>
          </table>
          {/* TABLE ENDS HERE */}
        </div>
      </div>

    </div>
  );
};
