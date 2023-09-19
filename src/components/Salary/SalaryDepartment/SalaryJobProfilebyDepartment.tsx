import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryBySubDepartmentAsync } from "../../../redux/Slice/SalarySlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CaretLeft from "../../../assets/CaretLeft.svg";
import CaretRight from "../../../assets/CaretRight1.svg";
// getDepartmentByParentAsync
function SalaryJobProfilebyDepartment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [parentDepartment, setParentDepartment] = useState(
    location.state?.steel
  );
  const [Department, setSubDepartment] = useState(location.state?.sub);

  console.log("parent", Department);
  const subDepartmentList = useSelector(
    (state: any) => state.salary.salaryOfSubDepartment
  );
  useEffect(() => {
    dispatch(getSalaryBySubDepartmentAsync(filter));
    // dispatch(getDepartmentByParentAsync(parentDepartment));
  }, []);
  const navigate = useNavigate();
  const handlerSelectedSubDepartment = (element: any) => {
    console.log("element selected", element);
    // dispatch(getjobProfileBySubDepartmentNameAsync(element.departmentName));
    navigate("/salary-Employee", { state: { jobProfile: element } });
    setParentDepartment("");
    setSubDepartment("");
  };

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
    departmentName: parentDepartment,
  });

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setFilter({
      ...filter,
      date: `${year}-${month}-${day}`,
    });
  }, [date]);

  useEffect(() => {
    if (nextDate) {
      const currentDate = new Date(nextDate);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      setFilter({
        ...filter,
        nextDate: `${year}-${month}-${day}`,
      });
    }
  }, [nextDate]);

  const [dateRange, setDateRange] = useState<any>([]);
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
        setDateRange([...result]);
      }
    }
    getDateRange(filter.date, filter.nextDate);
    dispatch(getSalaryBySubDepartmentAsync(filter));
  }, [filter]);

  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const tileClassName = ({ date }: any) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    if (dateRange.includes(formattedDate)) {
      return "bg-[#ECEDFE] text-[#FFFFFF]";
    }
    return "";
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
            <tr className="bg-[#ECEDFE] cursor-pointer">
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Job Profiles
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Employees
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Pending Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Absent Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Working Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Total Earnings
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Total Hours
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Total Salary Of Employee
              </td>
            </tr>
            {subDepartmentList &&
              subDepartmentList
                .filter(
                  (department: any) => department.departmentName === Department
                )
                .map((department: any, index: any) => {
                  return department.salaryData.map(
                    (jobProfile: any, subIndex: any) => (
                      <tr
                        className="cursor-pointer"
                        key={`${index}-${subIndex}`}
                        onClick={() => {
                          handlerSelectedSubDepartment(
                            jobProfile.jobProfilesName
                          );
                        }}
                      >
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.jobProfilesName}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.numberOfEmployee}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.employeePendingHours.toFixed(2)}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {(
                            jobProfile.employeeTotalHours -
                            (jobProfile.employeePendingHours +
                              jobProfile.employeeWorkingHours)
                          ).toFixed(2)}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.employeeWorkingHours.toFixed(2)}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.employeeTotalEarning.toFixed(2)}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.employeeTotalHours || "-"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                          {jobProfile.totalSalaryOfEmployee}
                        </td>
                      </tr>
                    )
                  );
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
            }}
          >
            <img src={CaretLeft} alt="" className="w-4 h-4" />
          </button>
          {showCalender && (
            <div className="filterCalender absolute z-20 bottom-28">
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
                  console.log(locale);
                  return ["S", "M", "T", "W", "T", "F", "S"][date.getDay()];
                }}
              />
            </div>
          )}
          <p
            onClick={() => {
              setShowCalender(!showCalender);
            }}
            className="text-sm font-medium text-[#283093] cursor-pointer"
          >{`${formatDate(date)} - ${
            nextDate ? formatDate(nextDate) : formatDate(date)
          }`}</p>
          <button
            onClick={() => {
              const nextDate = new Date(date);
              nextDate.setDate(date.getDate() + 1);
              setDate(nextDate);
            }}
          >
            <img src={CaretRight} className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalaryJobProfilebyDepartment;
// as
