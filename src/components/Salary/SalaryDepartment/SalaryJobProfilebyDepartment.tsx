import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryBySubDepartmentAsync } from "../../../redux/Slice/SalarySlice";

// getDepartmentByParentAsync
function SalaryJobProfilebyDepartment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [parentDepartment, setParentDepartment] = useState(
    location.state?.steel
  );
  console.log("parent", parentDepartment)
  const subDepartmentList = useSelector(
    (state: any) => state.salary.salaryOfSubDepartment
  );
  console.log(subDepartmentList);
  useEffect(() => {
    dispatch(getSalaryBySubDepartmentAsync(parentDepartment));
    // dispatch(getDepartmentByParentAsync(parentDepartment));
  }, []);
  const navigate = useNavigate();
  const handlerSelectedSubDepartment = (element: any) => {
    console.log("element selected", element);
    // dispatch(getjobProfileBySubDepartmentNameAsync(element.departmentName));
    navigate("/salary-Employee", { state: { jobProfile: element } });
    setParentDepartment("")
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
              subDepartmentList.map((department: any, index: any) => {
                return department.salaryData.map(
                  (jobProfile: any, subIndex: any) => (
                    <tr
                      className="cursor-pointer"
                      key={`${index}-${subIndex}`}
                      onClick={() => {
                        handlerSelectedSubDepartment(jobProfile.jobProfilesName);
                      }}
                    >
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {jobProfile.jobProfilesName}
                      </td>
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {jobProfile.numberOfEmployee}
                      </td>
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {(jobProfile.employeePendingHours).toFixed(2)}
                      </td>
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {(jobProfile.employeeTotalHours -(jobProfile.employeePendingHours +jobProfile.employeeWorkingHours)).toFixed(2)}
                      </td>
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {jobProfile.employeeWorkingHours}
                      </td>
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                        {jobProfile.employeeTotalEarning}
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
    </div>
  );
}

export default SalaryJobProfilebyDepartment;
// as