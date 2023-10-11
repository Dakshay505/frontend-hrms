import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoaderGif from '../../assets/loadergif.gif'
import { Link } from "react-router-dom";
import { getDepartmentOverviewAsync } from "../../redux/Slice/departmentSlice";
import Calendar from "react-calendar";

const DepartmentOverview = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);


  const handleDateChange = (date: any) => {
      setStartDate(date);
      //setSelectedDate(date);
  };

  const departmentList = useSelector((state: any) => state.department.departmentOverview)
  const loaderStatus = useSelector((state: any) => state.attandence.status)
  console.log("--", departmentList);
  useEffect(() => {
    //console.log(startDate)
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    dispatch(getDepartmentOverviewAsync(`${year}-${month}-${day}`))
  }, [])
  useEffect(() => {
    //console.log(startDate)
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    dispatch(getDepartmentOverviewAsync(`${year}-${month}-${day}`))
  }, [startDate])
  return (
    <div className="pt-8 px-10">
      <div className="flex  items-center justify-between gap-[20rem]">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Attendance Overview</h1>
        
        <Link to="/attendance-overview">
          <button className="border px-5 py-2 bg-primary-blue text-stone-50 rounded-lg">
            Group Overview
          </button>
        </Link>
      </div>
      <div className="relative shadow-sm inline-block text-left" >
                            <button
                                type="button"
                                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[40px] text-sm font-bold text-[#2E2E2E] focus:outline-none"
                                onClick={()=>setIsOpen(!isOpen)}
                            >
                                {startDate ? `${startDate.toDateString()}` : 'Select a Date'}
                            </button>
                            {isOpen && (
                                <div className="absolute left-0 mt-2 w-[280px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 space-y-2  overflow-y-auto">
                                        <Calendar
                                            value={startDate}
                                            onChange={handleDateChange}
                                            tileClassName={({ date }) =>
                                                date.toDateString() === startDate.toDateString()
                                                    ? 'text-black selected-date'
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>
                            )}
            </div>
      <div className="mt-8 overflow-auto">
        <table className="w-full">
          <tbody>
            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap w-[2rem]'>Sr.no</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Department Name</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Approved</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Pending</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Rejected</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Total Present</td>
              <td className='py-4 px-5 text-sm font-bold text-[#2E2E2E] whitespace-nowrap'>Total Employees In Department</td>
            </tr>
            {loaderStatus === "loading" ? <div className='flex justify-center w-full'>
              <img src={LoaderGif} className='w-6 h-6' alt="" />
            </div> : (
              <>
                {departmentList && departmentList.map((element: any, index: number) => {
                  return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer'>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{index + 1 ? index + 1 : "-"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.departmentName ? element.departmentName : "Not Avilable"}</td>
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

export default DepartmentOverview;