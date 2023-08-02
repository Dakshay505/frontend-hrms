import axios from "axios"
import { apiPath } from "./APIRoutes"
import { useEffect, useState } from "react";
import JobProfileNode1 from "./components/Dashboard/jobProfileNode1";

const Hierarchy1 = () => {
  const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);

  // const getGroupWithNoParent = async () => {
  //     try {
  //       const { data } = await axios.get(`${apiPath}/api/v1/group/getgroupnoparent`)
  //       setnoParentGroupArray(data)
  //       return data;
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  const getJobProfileWithNoParent = async () => {
    const { data } = await axios.get(
      `${apiPath}/api/v1/jobprofile/getjobprofilewithnoparent`
    );
    setnoParentJobProfileArray(data.jobProfile);
    return data.jobProfile;
  };
  useEffect(() => {
    getJobProfileWithNoParent()
  }, []);
  console.log("no parent jobProfile", noParentJobProfileArray)
  return (
    <div>
      {noParentJobProfileArray &&
        noParentJobProfileArray.map((childProfile: any, index: number) => (
          <JobProfileNode1
            key={index}
            jobProfile={childProfile}
          />
        ))}
    </div>
  )
}

export default Hierarchy1