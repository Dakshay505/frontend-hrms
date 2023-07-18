import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png"
import { useDispatch, useSelector } from 'react-redux'
import { createGroupAsync, getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import {useEffect, useState} from "react"

const AddGroup = () => {
    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const [parentGroupValue, setParentGroupValue] = useState("All Groups");
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        dispatch(getAllGroupsAsync());
    }, [])
    return (
        <>
            <div className="mx-10">
                <div className="pt-8">
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Group</h1>
                </div>
                <form onSubmit={handleSubmit((data) => {
                    if(parentGroupValue === "All Groups"){
                        data = {
                            groupName: data.groupName,
                        }
                    } else{
                        data = {
                            groupName: data.groupName,
                            parentGroupName: data.parentGroupName
                        }
                    }
                    dispatch(createGroupAsync(data))
                    .then(() => {
                        dispatch(getAllGroupsAsync());
                    });
                    reset()
                })}
                >
                    <div className="mt-10">
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Group Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register('groupName', { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Parent Group Name</p>
                                </div>
                                <div>
                                <select
                                        {...register('parentGroupName', { required: true })}
                                        onChange={(event) => setParentGroupValue(event.target.value)}
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option>All Groups</option>
                                        {groupList && groupList.map((element: any, index: number) => {
                                            return <option key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.groupName}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            {/* <Link to="/update-hierarchy"> */}
                            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Group</p></button>
                            {/* </Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddGroup