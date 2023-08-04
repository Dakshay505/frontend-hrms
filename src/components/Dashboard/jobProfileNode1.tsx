import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiPath } from '../../APIRoutes';
import CaretRight from '../../assets/CaretRight.svg'

const JobProfileNode1 = ({ jobProfile }: any) => {
  const [childJobProfileArray, setChildJobProfileArray] = useState<any>([]);
  const [employee, setEmployee] = useState<any>([]);
  const getChildJobProfile = async (id: any) => {
    const { data } = await axios.get(`${apiPath}/api/v1/jobprofile/getchildjobprofile/${id}`)
    setChildJobProfileArray(data.childjobProfiles)
    return data.childjobProfiles;
  }
  const getEmployee = async () => {
    const { data } = await axios.get(`${apiPath}/api/v1/employee/emp?jobProfileName=${encodeURIComponent(jobProfile.jobProfileName)}`, { withCredentials: true })
    setEmployee(data.employees)
    return data.employees;
  }

  useEffect(() => {
    getChildJobProfile(jobProfile._id);
    getEmployee()
  }, []);

  return (
    <div className='ps-10'>
      <h3 className='flex'><span className=''>Job Profile :</span> <img src={CaretRight} /><span>{jobProfile.jobProfileName}</span></h3>
      {employee && employee.length > 0 ? employee.map((emp: any, index: number) => (
        <div key={index}>
          <div className='ps-2'><p className='text-sm text-gray-500'>Name : <span className='text-[#666666]'>{emp.name}</span> </p></div>
        </div>
      )) : ""}
      {childJobProfileArray && childJobProfileArray.map((childProfile: any, index: number) => (
        <JobProfileNode1 key={index} jobProfile={childProfile} />
      ))}
    </div>
  );
};

export default JobProfileNode1;