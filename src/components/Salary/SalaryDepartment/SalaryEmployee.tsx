import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeSalaryAsync } from "../../../redux/Slice/SalarySlice";
import LoaderGif from "../../../assets/loadergif.gif";

function SalaryEmployee() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [jobProfile, setJobProfile] = useState(location.state?.jobProfile);
  console.log("jobProfile in employee", jobProfile);
  const employees = useSelector((state: any) => state.salary.salaryOfEmployee);
  console.log(employees);
 
  // pagination
  const limit = 50;
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  useEffect(() => {
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
    if (page === 0) {
      return
    }
    dispatch(getEmployeeSalaryAsync(requestData));
    setJobProfile("")
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
    console.log("hi",page)
    setPage(prevPage => prevPage + 1);
    console.log("hi2",page)

  };
  const loaderStatus = useSelector((state: any) => state.salary.status);

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
            {loaderStatus === "loading" ? (
              <div className="flex  justify-center  w-full">
                <img src={LoaderGif} className="w-10 h-12" alt="" />
              </div>
            ) : (
              ""
            )}
            {employees &&
              employees.map((element: any, index: number) => {
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
          <div ref={observerTarget}></div>
        </table>
      </div>
      {/* TABLE ENDS HERE */}
    </div>
  );
}

export default SalaryEmployee;
