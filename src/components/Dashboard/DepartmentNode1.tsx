import axios from "axios";
import { useState, useEffect } from "react";
import { apiPath } from "../../APIRoutes";
// import CaretDown from '../../assets/CaretDown.svg'
import CaretRight from "../../assets/CaretRight.svg";
import JobProfileNode1 from "./jobProfileNode1";

const DepartmentNode1 = ({ department }: any) => {
  const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);
  const [childDepartmentArray, setChildDepartmentArray] = useState<any>([]);
  const getChildDepartment = async (id: any) => {
    const { data } = await axios.get(
      `${apiPath}/api/v1/department/getchildren/${id}`
    );

    setChildDepartmentArray(data.childDepartment);
    return data.childDepartment;
  };
  const getJobProfileWithNoParent = async () => {
    const { data } = await axios.get(
      `${apiPath}/api/v1/jobprofile/getjobprofilewithnoparent`
    );
    setnoParentJobProfileArray(data.jobProfile);
    return data.jobProfile;
  };
  useEffect(() => {
    getChildDepartment(department._id);
    getJobProfileWithNoParent()
  }, []);

  return (
    <div className="px-6">
      <h3 className="flex text-[#666666]">
        <img src={CaretRight} />
        <span className="font-bold">Department Name: </span>{department.departmentName}
      </h3>

      {noParentJobProfileArray &&
        noParentJobProfileArray.map((childProfile: any, index: number) => (
          <JobProfileNode1
            key={index}
            department={department.departmentName}
            jobProfile={childProfile}
          />
        ))}
      {childDepartmentArray &&
        childDepartmentArray.map((childProfile: any, index: number) => (
          <DepartmentNode1 key={index} department={childProfile} />
        ))}
    </div>
  );
};

export default DepartmentNode1;
