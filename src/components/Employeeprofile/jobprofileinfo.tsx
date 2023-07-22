import { useState, useEffect } from 'react';
import edit from "../../assets/PencilSimple.png"
import check from "../../assets/Check.png"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getSingleJobProfileAsync, updateJobProfileAsync } from '../../redux/Slice/JobProfileSlice';

export const JobProfileInfo = () => {

const dispatch = useDispatch();
const JobProfile = useSelector((state: any) => state.jobProfile.jobProfileData)

const [jobProfileId, setJobProfileId] = useState("")
const [showInputBoxJobProfileName, setShowInputBoxJobProfileName] = useState(false);
const [inputBoxJobProfileNameValue, setInputBoxJobProfileNameValue] = useState<any>("");
const [showInputBoxJobProfileDescription, setShowInputBoxJobProfileDescription] = useState(false);
const [inputBoxJobProfileDescriptionValue, setInputBoxJobProfileDescriptionValue] = useState<any>("");

useEffect(() => {
    setJobProfileId(JobProfile._id);
    setInputBoxJobProfileNameValue(JobProfile.jobProfileName)
    setInputBoxJobProfileDescriptionValue(JobProfile.jobDescription)
}, [JobProfile]);

const { register, handleSubmit } = useForm();
return (
    <div className="px-10 py-8">
        <form
            onSubmit={handleSubmit((data) => {
                const sendData = { jobProfileId: jobProfileId, data: data }
                dispatch(updateJobProfileAsync(sendData)).then(() => {
                    dispatch(getSingleJobProfileAsync({jobProfileId: jobProfileId}));
                });
                setShowInputBoxJobProfileName(false);
                setShowInputBoxJobProfileDescription(false);
            })}
        >
            <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Group Information</h1>
            </div>
            <div className="flex flex-col gap-3 mt-10">
                {!showInputBoxJobProfileName &&
                    <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Job Profile Name</p>
                            <img src={edit} onClick={() => {
                                setShowInputBoxJobProfileName(!showInputBoxJobProfileName);
                            }} className="w-3 h-3" alt="" />
                        </div>
                        <div>
                            <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{JobProfile.jobProfileName}</p>
                        </div>
                    </div >}
                {showInputBoxJobProfileName &&
                    <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                        <div className="flex flex-col">
                            <div className="flex gap-3">
                                <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Job Profile Name</p>
                            </div>
                            <div>
                                <input
                                    {...register('jobProfileName', { required: true })}
                                    className="text-[12px] leading-5 font-normal focus:outline-none"
                                    value={inputBoxJobProfileNameValue}
                                    onChange={(event) => setInputBoxJobProfileNameValue(event.target.value)}
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
                {!showInputBoxJobProfileDescription &&
                    <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Group Description</p>
                            <img src={edit} onClick={() => {
                                setShowInputBoxJobProfileDescription(!showInputBoxJobProfileDescription);
                            }} className="w-3 h-3" alt="" />
                        </div>
                        <div>
                            <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{JobProfile.jobDescription}</p>
                        </div>
                    </div >}
                {showInputBoxJobProfileDescription &&
                    <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                        <div className="flex flex-col">
                            <div className="flex gap-3">
                                <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Group Description</p>
                            </div>
                            <div>
                                <input
                                    {...register('jobDescription', { required: true })}
                                    className="text-[12px] leading-5 font-normal focus:outline-none"
                                    value={inputBoxJobProfileDescriptionValue}
                                    onChange={(event) => setInputBoxJobProfileDescriptionValue(event.target.value)}
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
