import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { useForm } from "react-hook-form";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import TreeStructure from '../../assets/TreeStructure.svg'
import { updateHierarchyGroupAsync, updateHierarchyJobProfileAsync } from "../../redux/Slice/updateHierarchySlice";
import axios from "axios";
import { apiPath } from "../../APIRoutes";
import JobProfileNode from "./jobProfileNode";
import GroupNode from "./GroupNode";
import Hierarchy1 from "../../hierarchy1";

const UpdateHierarcy = () => {
  const [selectedValue, setSelectedValue] = useState("Groups");
  const [noParentJobProfileArray, setnoParentJobProfileArray] = useState<any>([]);
  const [noParentGroupArray, setnoParentGroupArray] = useState<any>([]);
  const dispatch = useDispatch();
  const groupList = useSelector((state: any) => state.group.groups);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

  const getJobProfileWithNoParent = async () => {
    const { data } = await axios.get(`${apiPath}/api/v1/jobprofile/getjobprofilewithnoparent`)
    setnoParentJobProfileArray(data.jobProfile)
    return data.jobProfile;
  }
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
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
    getJobProfileWithNoParent();
    getGroupWithNoParent();
  }, []);
  const { handleSubmit, register } = useForm();
  return (
    <div className="mx-10">
      <form
        onSubmit={handleSubmit((data) => {
          if (selectedValue === "Job Profile") {
            if (data.parentJobProfileName === "Parent Job Profile") {
              data = {
                jobProfileName: data.jobProfileName
              }
            }
            else {
              data = {
                jobProfileName: data.jobProfileName,
                parentJobProfileName: data.parentJobProfileName
              }
            }
            dispatch(updateHierarchyJobProfileAsync(data))
              .then(() => {
                dispatch(getAllJobProfileAsync());
                getJobProfileWithNoParent();
              });
          }
          if (selectedValue === "Groups") {
            if (data.parentGroupName === "All Groups") {
              data = {
                groupName: data.groupName
              }
            }
            else {
              data = {
                groupName: data.groupName,
                parentGroupName: data.parentGroupName
              }
            }
            dispatch(updateHierarchyGroupAsync(data))
              .then(() => {
                dispatch(getAllGroupsAsync());
                getGroupWithNoParent();
              })
          }
        })}>
        <div className="flex gap-7 mt-8">
          <div>
            <h1 className="text-2xl font-bold text-[#2E2E2E]">Update Hierarchy</h1>
          </div>
          <div>
            <select
              onChange={(event: any) => setSelectedValue(event.target.value)}
              className="py-3 px-5 bg-[#ECEDFE] h-10 rounded-lg text-sm font-medium text-[#283093]">
              <option>Groups</option>
              <option>Job Profile</option>
              <option>Employee</option>
            </select>
          </div>
        </div>

        {selectedValue === "Job Profile" ? <div className="mt-10 border border-solid border-[#DEDEDE] py-3 rounded bg-[#FAFAFA]">
          {noParentJobProfileArray && noParentJobProfileArray.map((element: any, index: number) => {
            return <JobProfileNode key={index} jobProfile={element} />
          })}
        </div> : ""}

        {selectedValue === "Groups" ? <div className="mt-10 border border-solid border-[#DEDEDE] py-3 rounded bg-[#FAFAFA]">
          {noParentGroupArray && noParentGroupArray.map((element: any, index: number) => {
            return <GroupNode key={index} group={element} />
          })}
        </div> : ""}
        {selectedValue === "Employee" ? <div className="mt-10 border border-solid border-[#DEDEDE] py-3 rounded bg-[#FAFAFA]">
         <Hierarchy1/>
        </div> : ""}

        {(selectedValue === "Groups") ? <div className="flex gap-10 mt-10">
          <div className='flex flex-col gap-3'>
            <div>
              <p className='text-sm font-normal text-[#1C1C1C]'>Groups</p>
            </div>
            <div>
              <select
                {...register('groupName', { required: true })}
                className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                <option>All Groups</option>
                {groupList && groupList.map((element: any, index: number) => {
                  return <option key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.groupName}</option>
                })}
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <p className='text-sm font-normal text-[#1C1C1C]'>Parent Group</p>
            </div>
            <div>
              <select
                {...register('parentGroupName')}
                className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                <option>All Groups</option>
                {groupList && groupList.map((element: any, index: number) => {
                  return <option value={element.groupName} key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.groupName}</option>
                })}
              </select>
            </div>
          </div>
        </div> : ""}
        {(selectedValue === "Job Profile") ? <div className="flex gap-10 mt-10">
          <div className='flex flex-col gap-3'>
            <div>
              <p className='text-sm font-normal text-[#1C1C1C]'>Job Profile</p>
            </div>
            <div>
              <select
                {...register('jobProfileName', { required: true })}
                defaultValue={"Job Profile"} className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                <option>Job Profiles</option>
                {jobProfileList && jobProfileList.map((element: any, index: number) => {
                  return <option key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                })}
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <p className='text-sm font-normal text-[#1C1C1C]'>Parent Job Profile</p>
            </div>
            <div>
              <select
                {...register('parentJobProfileName')}
                className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                <option>Parent Job Profile</option>
                {jobProfileList && jobProfileList.map((element: any, index: number) => {
                  return <option value={element.jobProfileName} key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                })}
              </select>
            </div>
          </div>
        </div> : ""}

        <div className="mt-10">
          <button type='submit' className='flex items-center justify-center rounded-lg text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={TreeStructure} className='w-4' alt="" /><p className="px-2">Update Hierarchy</p></button>
        </div>
      </form>
    </div>
  )
}

export default UpdateHierarcy