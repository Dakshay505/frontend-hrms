import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import Calendar from "react-calendar";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import 'react-datepicker/dist/react-datepicker.css';
import { getAllGroupSalaryAsync, getSingleGroupSalaryAsync } from "../../redux/Slice/SalarySlice";
import { useNavigate } from "react-router-dom";

const SalaryDatabase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allGroupSalaryList = useSelector((state: any) => state.salary.allGroupsSalary.data);
  console.log(allGroupSalaryList)

  const [date, setDate] = useState<any>(new Date());
  const [showCalender, setShowCalender] = useState(false);

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    dispatch(getAllGroupSalaryAsync(`${year}-${month}-${day}`))
  }, [])

  const handleTableRowClick = (data: any) => {
    console.log(data);
    dispatch(getSingleGroupSalaryAsync({groupName: data}))
    navigate('/single-group-salary')
  }

  const formatDate = (date: any) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="px-10 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Salary Database</h1>
      </div>

      {/* TABLE START HERE */}
      <div className="py-6 overflow-auto">
        <table className="z-0">
          <tbody>
            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Group Name</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Employees</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Net Salary</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Avg Basic Salary</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Total Hours</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Productive Hours</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Pending Hours</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Absent Hours</td>
            </tr>
            {allGroupSalaryList && allGroupSalaryList.map((element: any, index: number) => {
              return <tr key={index} className='hover:bg-[#FAFAFA] cursor-pointer' onClick={() => handleTableRowClick(element.groupName)}>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.groupName ? element.groupName : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.numberOfEmployees ? element.numberOfEmployees : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalEarning ? element.totalEarning : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalBasicSalary ? element.totalBasicSalary : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalHoursAsPerEmployee ? element.totalHoursAsPerEmployee : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalWorkingHour ? element.totalWorkingHour : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalPendingHour ? element.totalPendingHour : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.totalAbsentHour ? element.totalAbsentHour : 0}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
      {/* TABLE ENDS HERE */}

      <div>
        <div className="fixed bottom-0 right-0 left-[270px] flex justify-center bg-white">
          <div className="flex gap-3 items-center justify-center w-[200px] h-12 my-5 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
            <button
              onClick={() => {
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() - 1);
                setDate(nextDate);
              }}>
              <img src={CaretLeft} alt="" className="w-4 h-4" />
            </button>
            {showCalender && <div className="filterCalender absolute z-20 bottom-28">
              <Calendar
                onChange={setDate}
                onClickDay={() => {
                  setShowCalender(false);
                }}
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
                formatShortWeekday={(locale, date) => {
                  console.log(locale)
                  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
                }}
                value={date} />
            </div>}
            <p
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="text-sm font-medium text-[#283093] cursor-pointer">{formatDate(date)}</p>
            <button
              onClick={() => {
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);
                setDate(nextDate);
              }}>
              <img src={CaretRight} className="w-4 h-4" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryDatabase