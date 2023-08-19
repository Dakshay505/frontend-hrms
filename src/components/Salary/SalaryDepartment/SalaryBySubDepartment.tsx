import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getjobProfileBySubDepartmentNameAsync } from "../../../redux/Slice/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryBySubDepartmentAsync } from "../../../redux/Slice/SalarySlice";

// getDepartmentByParentAsync
function SalaryDepartment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [parentDepartment, setParentDepartment] = useState(
    location.state?.parentDepartment
  );

  const subDepartmentList = useSelector(
    (state: any) => state.salary.salaryOfSubDepartment
  );
  console.log(parentDepartment);
  useEffect(() => {
    dispatch(getSalaryBySubDepartmentAsync(parentDepartment));
  }, []);
  const navigate = useNavigate();
  const handlerSelectedSubDepartment = (element: any) => {
    dispatch(getjobProfileBySubDepartmentNameAsync(element.departmentName));
    navigate("/salary-jobProfile-department");
    console.log(element.departmentName);
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
                Sub Department
              </td>
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
              subDepartmentList.map((element: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      handlerSelectedSubDepartment(element);
                    }}
                  >
                   
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.departmentName}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.numberOfJobProfiles}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData.reduce(
                        (acc: any, job: any) => acc + job.numberOfEmployee,
                        0
                      )}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData
                        .reduce(
                          (acc: any, job: any) =>
                            acc + job.employeePendingHours,
                          0
                        )
                        .toFixed(2)}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData
                        .reduce(
                          (acc: any, job: any) =>
                            acc +
                            (job.employeeTotalHours - job.employeePendingHours),
                          0
                        )
                        .toFixed(2)}
                    </td>

                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData.reduce(
                        (acc: any, job: any) => acc + job.employeeWorkingHours,
                        0
                      )}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData.reduce(
                        (acc: any, job: any) => acc + job.employeeTotalEarning,
                        0
                      )}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData.reduce(
                        (acc: any, job: any) => acc + job.employeeTotalHours,
                        0
                      )}
                    </td>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {element.salaryData.reduce(
                        (acc: any, job: any) => acc + job.totalSalaryOfEmployee,
                        0
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* TABLE ENDS HERE */}
    </div>
  );
}

export default SalaryDepartment;
