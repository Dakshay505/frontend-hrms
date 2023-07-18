import axios from "axios"
import { apiPath } from "./APIRoutes"
import { useEffect, useState } from "react";
import GroupNode1 from "./components/Dashboard/GroupNode1";

const Hierarchy1 = () => {
    // const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);
    const [noParentGroupArray, setnoParentGroupArray] = useState<any>([]);
    const getGroupWithNoParent = async () => {
        try {
          const { data } = await axios.get(`${apiPath}/api/v1/group/getgroupnoparent`)
          setnoParentGroupArray(data)
          return data;
        }
        catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
        getGroupWithNoParent();
      }, []);
  return (
    <div className="mt-10 border border-solid border-[#DEDEDE] py-3 rounded bg-[#FAFAFA]">
          {noParentGroupArray && noParentGroupArray.map((element: any, index: number) => {
            return <GroupNode1 key={index} group={element} />
          })}
        </div>
  )
}

export default Hierarchy1