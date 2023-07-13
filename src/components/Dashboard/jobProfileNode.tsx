import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiPath } from '../../APIRoutes';
import CaretRight from '../../assets/CaretRight.svg'


const JobProfileNode = ({ jobProfile }: any) => {
  const [childJobProfileArray, setChildJobProfileArray] = useState<any>([]);
  const getChildJobProfile = async (id: any) => {
    const { data } = await axios.get(`${apiPath}/api/v1/jobprofile/getchildjobprofile/${id}`)
    setChildJobProfileArray(data.childjobProfiles)
    return data.childjobProfiles;
  }


  useEffect(() => {
    getChildJobProfile(jobProfile._id);
  }, []);
  return (
    <div className='px-4'>
      <h3 className='flex text-[#666666]'><img src={CaretRight} />{jobProfile.jobProfileName}</h3>
      {childJobProfileArray && childJobProfileArray.map((childProfile: any, index: number) => (
        <JobProfileNode key={index} jobProfile={childProfile} />
      ))}
    </div>
  );
};

export default JobProfileNode;