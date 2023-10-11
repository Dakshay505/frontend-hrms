import { useDispatch, useSelector } from "react-redux";
import { getGroupAttendancesAsync } from "../../redux/Slice/AttandenceSlice";
import { useEffect } from "react";
import LoaderGif from '../../assets/loadergif.gif'
import { Link } from "react-router-dom";

const AttendanceOverview = () => {
  const dispatch = useDispatch();

  const groupAttendanceList = useSelector((state: any) => state.attandence.groupOverView)
  const loaderStatus = useSelector((state: any) => state.attandence.status)

  useEffect(() => {
    dispatch(getGroupAttendancesAsync())
  }, [])
  const handleClick = (element: any) => {
    console.log("selected group-----", element.groupName)
  }
  return (
    <div className="pt-8 px-10">
      <div className="flex  items-center justify-between gap-[20rem]">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Attendance Overview</h1>
        <Link to="/department-overview">
          <button className="border px-5 py-2 bg-primary-blue text-stone-50 rounded-lg">
            Department Overview
          </button>
        </Link>
      </div>
      <div className="mt-8 overflow-auto">
        <table className="w-full">
          <tbody>

            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap w-[2rem]'>Sr.no</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Group Name</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Approved</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Pending</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Rejected</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Total Present</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Total Employees In Group</td>
            </tr>
            {loaderStatus === "loading" ? <div className='flex justify-center w-full'>
              <img src={LoaderGif} className='w-6 h-6' alt="" />
            </div> : (
              <>
                {groupAttendanceList && groupAttendanceList.map((element: any, index: number) => {
                  return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer' onClick={() => { handleClick(element) }}>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{index + 1 ? index + 1 : "-"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.groupName ? element.groupName : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.approved ? element.approved : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.pending ? element.pending : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.rejected ? element.rejected : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalPresent ? element.totalPresent : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap border-b border-solid border-[#EBEBEB]'>{element.totalEmployeesInGroup ? element.totalEmployeesInGroup : "0"}</td>
                  </tr>
                })}
              </>
            )}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AttendanceOverview