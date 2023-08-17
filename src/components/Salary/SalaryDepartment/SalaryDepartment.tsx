import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDepartmentByParentAsync,
  getjobProfileBySubDepartmentNameAsync,
} from "../../../redux/Slice/departmentSlice";
import { useDispatch, useSelector } from "react-redux";

// getDepartmentByParentAsync
function SalaryDepartment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [parentDepartment, setParentDepartment] = useState(
    location.state?.parentDepartment
  );
  const subDepartmentList = useSelector(
    (state: any) => state.department.myDepartment
  );
  useEffect(() => {
    dispatch(getDepartmentByParentAsync(parentDepartment));
    // Iterate through each department in subDepartmentList
    subDepartmentList.forEach((department: any) => {
      const departmentName = department.departmentName;

      // Dispatch action to fetch job profiles for each department
      dispatch(getjobProfileBySubDepartmentNameAsync(departmentName));
    });
  }, [subDepartmentList,parentDepartment]); //
  return (
    <div className="px-10 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Salary Database</h1>
      </div>
      {/* TABLE START HERE */}
      <div className="py-6 mb-24 overflow-auto">
        <table className="z-0 w-[80%] table-fixed">
          <tbody>
            <tr className="bg-[#ECEDFE] cursor-default">
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Sr.no
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Sub Department
              </td>
            </tr>
            {subDepartmentList &&
              subDepartmentList.map((element: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {index + 1}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.departmentName}
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
