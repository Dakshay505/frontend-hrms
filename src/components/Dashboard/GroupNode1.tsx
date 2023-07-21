import axios from "axios";
import { useState, useEffect } from "react";
import { apiPath } from "../../APIRoutes";
// import CaretDown from '../../assets/CaretDown.svg'
import CaretRight from "../../assets/CaretRight.svg";
import JobProfileNode1 from "./jobProfileNode1";

const GroupNode1 = ({ group }: any) => {
  const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);
  const [childGroupArray, setChildGroupArray] = useState<any>([]);
  const getChildGroup = async (id: any) => {
    const { data } = await axios.get(
      `${apiPath}/api/v1/group/getchildren/${id}`
    );

    setChildGroupArray(data.childGroup);
    return data.childGroup;
  };
  const getJobProfileWithNoParent = async () => {
    const { data } = await axios.get(
      `${apiPath}/api/v1/jobprofile/getjobprofilewithnoparent`
    );
    setnoParentJobProfileArray(data.jobProfile);
    return data.jobProfile;
  };
  useEffect(() => {
    getChildGroup(group._id);
    getJobProfileWithNoParent()
  }, []);

  return (
    <div className="px-10">
      <h3 className="flex text-[#666666]">
        <img src={CaretRight} />
        <span className="font-bold">Group Name: </span>{group.groupName}
      </h3>

      {noParentJobProfileArray &&
        noParentJobProfileArray.map((childProfile: any, index: number) => (
          <JobProfileNode1
            key={index}
            group={group.groupName}
            jobProfile={childProfile}
          />
        ))}
      {childGroupArray &&
        childGroupArray.map((childProfile: any, index: number) => (
          <GroupNode1 key={index} group={childProfile} />
        ))}
    </div>
  );
};

export default GroupNode1;
