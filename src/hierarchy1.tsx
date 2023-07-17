import axios from "axios"
import { apiPath } from "./APIRoutes"
import { useEffect, useState } from "react";
import DepartmentNode1 from "./components/Dashboard/DepartmentNode1";

const Hierarchy1 = () => {
    // const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);
    const [noParentDepartmentArray, setnoParentDepartmentArray] = useState<any>([]);
    const getDepartmentWithNoParent = async () => {
        try {
          const { data } = await axios.get(`${apiPath}/api/v1/department/getdepartmentnoparent`)
          setnoParentDepartmentArray(data)
          return data;
        }
        catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
        getDepartmentWithNoParent();
      }, []);
  return (
    <div className="mt-10 border border-solid border-[#DEDEDE] py-3 rounded bg-[#FAFAFA]">
          {noParentDepartmentArray && noParentDepartmentArray.map((element: any, index: number) => {
            return <DepartmentNode1 key={index} department={element} />
          })}
        </div>
  )
}

export default Hierarchy1