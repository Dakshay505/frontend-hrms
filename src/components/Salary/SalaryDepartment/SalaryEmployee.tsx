import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeSalaryAsync } from "../../../redux/Slice/SalarySlice";
import LoaderGif from "../../../assets/loadergif.gif";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import CaretLeft from "../../../assets/CaretLeft.svg"
import CaretRight from "../../../assets/CaretRight1.svg"

function SalaryEmployee() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [parentDepartment, setParentDepartment] = useState(
    location.state?.steel
  );


  const [jobProfile, setJobProfile] = useState(location.state?.jobProfile);
  console.log("jobProfile in employee", jobProfile);
  const employees = useSelector((state: any) => state.salary.salaryOfEmployee);
  console.log(employees);
 
  // pagination
  const limit = 20;
  const [page, setPage] = useState(0);
  const observerTarget = useRef(null);
  const [items, setItems] = useState<any[]>([]);
  const fetchData = async () => {
    
    
    try {
      if(page==0){
        return
      }
      const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
   
    const requestData = {
      date: `${year}-${month}-${day}`,
      page: page, // Use the incremented page
      limit: limit,
      jobProfileName: jobProfile,

    };
    console.log(requestData)
      //dispatch(getEmployeeSalaryAsync(requestData))

     
      dispatch(getEmployeeSalaryAsync(requestData, filter)).then((data: any) => {
        const employeeData = data.payload.attendanceRecords;
        console.log(data)
        console.log(employeeData)
        if(employeeData.length>0){
        setItems(prevItems => [...prevItems, ...employeeData]);
        }
        setParentDepartment("")

      })
      
    } catch (error) {
      // Handle error
    }
  
  };
  useEffect(() => {
    fetchData()
    
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          handlerFatchMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  const handlerFatchMore = () => {
    
    setPage(prevPage => prevPage + 1);
   
  };
  const loaderStatus = useSelector((state: any) => state.salary.status);




    // date range
    const [date, setDate] = useState<any>(new Date());
    const [nextDate, setnextDate] = useState<any>();
    const [showCalender, setShowCalender] = useState(false);
    const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
  
    const [filter, setFilter] = useState({
      name: "",
      groupName: "",
      jobProfileName: "",
      date: "",
      nextDate: "",
      departmentName:parentDepartment,
    });
  
   
  
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
      dispatch(getEmployeeSalaryAsync(filter))
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
      <div className="py-6 mb-24 overflow-auto">
        <table className="z-0  table-fixed">
          <tbody>
            <tr className="bg-[#ECEDFE] cursor-default">
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Day and Date
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Employees Name
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Job Profile
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Working Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Pending Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Basic Salary
              </td>
            </tr>
            
            {items &&
              items.map((element: any, index: number) => {
                function formatDateToCustomString(date: any) {
                  const options = {
                    weekday: "short",
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  };
                  return date
                    .toLocaleDateString("en-US", options)
                    .replace(/\//g, ", ");
                }
                const inputDate = new Date(element.date);
                const formattedDate = formatDateToCustomString(inputDate);
                const parts = formattedDate.split(",");
                const desiredFormat = `${parts[0]},${parts[2]}/${parts[1]}/${parts[3]}`;
                return (
                  <tr key={index}>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.date ? desiredFormat : "Not Avilable"}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.employeeId
                        ? element.employeeId.name
                        : "Not Avilable"}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.employeeId
                        ? element.employeeId.jobProfileId.jobProfileName
                        : "Not Available"}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.workingHours
                        ? element.workingHours.toFixed(2)
                        : "0"}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.pendingHours
                        ? element.pendingHours.toFixed(2)
                        : "0"}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.employeeId ? element.employeeId.salary : "0"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          
          {loaderStatus === "loading" ? (
              <div className="flex  justify-center  w-full">
                <img src={LoaderGif} className="w-10 h-12" alt="" />
              </div>
            ) : (
              ""
            )}
          
          <div ref={observerTarget}></div>
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
  );
}

export default SalaryEmployee;