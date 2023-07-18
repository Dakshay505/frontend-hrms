import { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"
import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupAsync, updateGroupAsync } from '../../redux/Slice/GroupSlice';

export const GroupInfo = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state: any) => state.group.group)
    
    const [groupId, setGroupId] = useState("")
    const [showInputBoxGroupName, setShowInputBoxGroupName] = useState(false);
    const [inputBoxGroupNameValue, setInputBoxGroupNameValue] = useState<any>("");
    const [showInputBoxGroupDescription, setShowInputBoxGroupDescription] = useState(false);
    const [inputBoxGroupDescriptionValue, setInputBoxGroupDescriptionValue] = useState<any>("");

    useEffect(() => {
        setGroupId(groups._id);
        setInputBoxGroupNameValue(groups.groupName)
        setInputBoxGroupDescriptionValue(groups.description)
    }, [groups]);

    const { register, handleSubmit } = useForm();
    return (
        <div className="px-10 py-8">
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    const sendData = { groupId: groupId, data: data }
                        dispatch(updateGroupAsync(sendData)).then(() => {
                            dispatch(getSingleGroupAsync({ groupId: groupId }));
                        });
                    setShowInputBoxGroupName(false);
                    setShowInputBoxGroupDescription(false);
                })}
            >
                <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Group Information</h1>
                </div>
                <div className="flex flex-col gap-3 mt-10">
                    {!showInputBoxGroupName &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Group Name</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxGroupName(!showInputBoxGroupName);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{groups.groupName}</p>
                            </div>
                        </div >}
                    {showInputBoxGroupName &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Group Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register('groupName', { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxGroupNameValue}
                                        onChange={(event) => setInputBoxGroupNameValue(event.target.value)}
                                        type="text" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                    type="submit">
                                    <img src={check} className="w-4 h-4" alt="" />
                                </button>
                            </div>
                        </div>}
                    {!showInputBoxGroupDescription &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Group Description</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxGroupDescription(!showInputBoxGroupDescription);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{groups.description}</p>
                            </div>
                        </div >}
                    {showInputBoxGroupDescription &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Group Description</p>
                                </div>
                                <div>
                                    <input
                                        {...register('description', { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxGroupDescriptionValue}
                                        onChange={(event) => setInputBoxGroupDescriptionValue(event.target.value)}
                                        type="text" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                                    type="submit">
                                    <img src={check} className="w-4 h-4" alt="" />
                                </button>
                            </div>
                        </div>}
                </div>
            </form>
        </div>
    )
}
