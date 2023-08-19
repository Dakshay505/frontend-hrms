import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllParentDepartmentAsync,} from "../../../redux/Slice/departmentSlice";
import { useNavigate } from "react-router-dom";
function SalaryWithDepartment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parentDepartmentList = useSelector(
    (state: any) => state.department.parentdepartment
  );
  useEffect(() => {
    dispatch(getAllParentDepartmentAsync());
  }, []);
  const handleSelectedParent = (element: any) => {
    const data = element.departmentName;
    console.log("data", data);
    navigate("/salary-department", { state: { parentDepartment: data } });
  };
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
                Parent Department
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Child Department
              </td>
            </tr>
            {parentDepartmentList &&
              parentDepartmentList.map((element: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      handleSelectedParent(element);
                    }}
                  >
                    <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                      {index + 1}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.departmentName}
                    </td>
                    <td className="hover:underline hover:font-bold py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid cursor-pointer border-[#EBEBEB]">
                      {element.childDepartmentId.length}
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

export default SalaryWithDepartment;
