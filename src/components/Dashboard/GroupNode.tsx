import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiPath } from '../../APIRoutes';
// import CaretDown from '../../assets/CaretDown.svg'
import CaretRight from '../../assets/CaretRight.svg'


const GroupNode = ({ group }: any) => {
  const [childGroupArray, setChildGroupArray] = useState<any>([]);
  const getChildGroup = async (id: any) => {
    const { data } = await axios.get(`${apiPath}/api/v1/group/getchildren/${id}`)

    setChildGroupArray(data.childGroup)
    return data.childGroup;
  }
  useEffect(() => {
    getChildGroup(group._id);
  }, []);
  return (
    <div className='px-4'>
      <h3 className='flex text-[#666666]'><img src={CaretRight} />{group.groupName}</h3>
      {childGroupArray && childGroupArray.map((childProfile: any, index: number) => (
        <GroupNode key={index} group={childProfile} />
      ))}
    </div>
  );
};

export default GroupNode;