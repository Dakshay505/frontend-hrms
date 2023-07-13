import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiPath } from '../../APIRoutes';
// import CaretDown from '../../assets/CaretDown.svg'
import CaretRight from '../../assets/CaretRight.svg'


const DepartmentNode = ({ department }: any) => {
  const [childDepartmentArray, setChildDepartmentArray] = useState<any>([]);
  const getChildDepartment = async (id: any) => {
    const { data } = await axios.get(`${apiPath}/api/v1/department/getchildren/${id}`)

    setChildDepartmentArray(data.childDepartment)
    return data.childDepartment;
  }
  useEffect(() => {
    getChildDepartment(department._id);
  }, []);
  return (
    <div className='px-4'>
      <h3 className='flex text-[#666666]'><img src={CaretRight} />{department.departmentName}</h3>
      {childDepartmentArray && childDepartmentArray.map((childProfile: any, index: number) => (
        <DepartmentNode key={index} department={childProfile} />
      ))}
    </div>
  );
};

export default DepartmentNode;