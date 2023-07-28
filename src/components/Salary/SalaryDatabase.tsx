import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import Calendar from "react-calendar";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import 'react-datepicker/dist/react-datepicker.css';
import { getAllGroupSalaryAsync } from "../../redux/Slice/SalarySlice";
import { useNavigate } from "react-router-dom";

const SalaryDatabase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allGroupSalaryList = useSelector((state: any) => state.salary.allGroupsSalary.data);

  const [date, setDate] = useState<any>(new Date());
  const [nextDate, setnextDate] = useState<any>();
  const [showCalender, setShowCalender] = useState(false);
  const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
  const [filter, setFilter] = useState({
    date: "",
    nextDate: ""
  })

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    dispatch(getAllGroupSalaryAsync({date: `${year}-${month}-${day}`}))
  }, [])

  const handleTableRowClick = (data: any) => {
    navigate('/single-group-salary', { state: { additionalData: data }})
  }

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    setFilter({
        ...filter,
        date: `${year}-${month}-${day}`
    })
}, [date])
useEffect(() => {
    if (nextDate) {
        const currentDate = new Date(nextDate);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        setFilter({
            ...filter,
            nextDate: `${year}-${month}-${day}`
        })
    }
}, [nextDate])

const [dateRange, setDateRange] = useState<any>([])
useEffect(() => {
    function getDateRange(startDate: any, endDate: any) {
        if (nextDate) {
            const result = [];
            const currentDate = new Date(startDate);
            const finalDate = new Date(endDate);
            while (currentDate <= finalDate) {
                result.push(currentDate.toISOString().slice(0, 10));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            setDateRange([...result])
        }
    }
    getDateRange(filter.date, filter.nextDate)
    dispatch(getAllGroupSalaryAsync(filter))
}, [filter])


  const formatDate = (date: any) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const tileClassName = ({ date }: any) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    if (dateRange.includes(formattedDate)) {
        return 'bg-[#ECEDFE] text-[#FFFFFF]';
    }
    return '';
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
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.groupName ? element.groupName : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.numberOfEmployees ? element.numberOfEmployees : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalEarning ? (element.totalEarning).toFixed(1) : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalBasicSalary ? (element.totalBasicSalary).toFixed(1) : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalHoursAsPerEmployee ? (element.totalHoursAsPerEmployee).toFixed(1) : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalWorkingHour ? (element.totalWorkingHour).toFixed(1) : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]'>{element.totalPendingHour ? (element.totalPendingHour).toFixed(1) : 0}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-b border-solid border-[#EBEBEB]'>{element.totalAbsentHour ? (element.totalAbsentHour).toFixed(1) : 0}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      {/* TABLE ENDS HERE */}

      <div className="fixed flex justify-center bg-white bottom-0 left-[270px] right-0">
        <div className="flex gap-3 items-center justify-center w-[300px] h-12 mb-10 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
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
              tileClassName={tileClassName}
              onChange={(event) => {
                calenderDayClicked.length === 0 ? setDate(event) : "";
                calenderDayClicked.length === 1 ? setnextDate(event) : "";
                if (calenderDayClicked.length < 1) {
                  setcalenderDayClicked([...calenderDayClicked, 1]);
                }
              }}
              onClickDay={() => {
                if (calenderDayClicked.length > 0) {
                  setShowCalender(false);
                  setcalenderDayClicked([]);
                }
              }}
              className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
              formatShortWeekday={(locale, date) => {
                console.log(locale)
                return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
              }} />
          </div>}
          <p
            onClick={() => {
              setShowCalender(!showCalender);
            }}
            className="text-sm font-medium text-[#283093] cursor-pointer">{`${formatDate(date)} - ${nextDate ? formatDate(nextDate) : formatDate(date)}`}</p>
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
  )
}

export default SalaryDatabase