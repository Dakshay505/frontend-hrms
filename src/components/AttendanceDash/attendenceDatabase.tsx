
import right from "../../assets/r-arrow.png";
import { Attendence } from "./attendence";
import { Link } from "react-router-dom";
import "../../attndence.css"
import { postAttandenceByDateAsync } from "../../redux/Slice/AttandenceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'

export const AttendenceDtabase = () => {
  const dispatch = useDispatch();
  const todayStaffAttandence = useSelector((state: any) => state.attandence.staffAttandence);
  useEffect(() => {
    dispatch(postAttandenceByDateAsync())
  }, [])

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }
  return (
    <div >
      <Attendence></Attendence>
      <div className="flex flex-col items-start w-[768px] py-[48px] px-[40px] flex-1">
        <div className=" flex justify-between w-[688px] item-center">
          <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
            Attendance Database
          </div>
          <Link to="/leaves">
            <div className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
              <p className="text-[#666666] leading-trim font-inter text-capitalize text-lg font-medium leading-6 tracking-wider">
                See All
              </p>
              <img src={right} alt="" className="h-[16px] w-[16px]" />
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
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(11, 16) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? (latestPunches.punchOut).slice(11, 16) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.approvedBy ? latestAttandence.approvedBy : "Not Avilable"}</td>
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
