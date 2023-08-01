import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiPath } from '../../APIRoutes';
import CaretRight from '../../assets/CaretRight.svg'
import { Link } from 'react-router-dom';

const JobProfileNode1 = ({ jobProfile,group }: any) => {
  const [childJobProfileArray, setChildJobProfileArray] = useState<any>([]);
  const [employee, setEmployee] = useState<any>([]);
  const getChildJobProfile = async (id: any) => {
    const { data } = await axios.get(`${apiPath}/api/v1/jobprofile/getchildjobprofile/${id}`)
    setChildJobProfileArray(data.childjobProfiles)
    return data.childjobProfiles;
  }
  const getEmployee = async () => {
    console.log(`${apiPath}/api/v1/employee/emp?groupName=${group}&jobProfileName=${jobProfile.jobProfileName}`)
    const { data } = await axios.get(`${apiPath}/api/v1/employee/emp?groupName=${group}&jobProfileName=${jobProfile.jobProfileName}`)
    setEmployee(data.employees)
    console.log(data)
    return data.employees;
  }

  useEffect(() => {
    getChildJobProfile(jobProfile._id);
    getEmployee()
  }, []);
  console.log(employee.length)
  return (
    <div className='px-6'>
     
      {employee.length>0 ? employee.map((emp: any, index: number) => (
        <div key={index}>
          <h3 className='flex text-[#666666]'>Job Profile : <img src={CaretRight} />{jobProfile.jobProfileName}</h3>
          <Link to={"/employee-profile"}><p  className=''>Employee Name : <span className='font-bold'>{emp.name}</span> </p></Link>
        </div>
      )) :""}
      {childJobProfileArray && childJobProfileArray.map((childProfile: any, index: number) => (
        <JobProfileNode1 key={index} jobProfile={childProfile} group={group} />
      ))}
    </div>
  );
};

export default JobProfileNode1;