import { useDispatch, useSelector } from "react-redux";
import { getAllAttandenceAsync, getGroupAttendanceAsync } from "../../redux/Slice/AttandenceSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceOverview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groupAttendanceList = useSelector((state: any) => state.attandence.groupAttendance)

    useEffect(() => {
        dispatch(getGroupAttendanceAsync())
    }, [])

    const handleRowClick = (data: any) => {
        dispatch(getAllAttandenceAsync({groupName: data.groupName}))
        navigate('/single-group-attendance')
    }
    return (
        <div className="pt-8 px-10">
            <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Attendance Overview</h1>
            </div>
            <div className="mt-8 overflow-auto">
            <table>
            <tbody>
              <tr className='bg-[#ECEDFE] cursor-default'>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Group Name</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Employees</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Present</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Absent</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Working Currently</td>
              </tr>
              {groupAttendanceList && groupAttendanceList.map((element: any, index: number) => {
                return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer' onClick={() => {handleRowClick(element)}}>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.groupName ? element.groupName : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalEmployeesInGroup ? element.totalEmployeesInGroup : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.present ? element.present : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{(element.totalEmployeesInGroup - element.present) ? (element.totalEmployeesInGroup - element.present) : "0"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{((element.punchIn).length - (element.punchOut).length) ? ((element.punchIn).length - (element.punchOut).length) : "0"}</td>
                  </tr>
              })}
            </tbody>
          </table>
            </div>
           
        </div>
    )
}

export default AttendanceOverview