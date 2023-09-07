import { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"
import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateShopAsync, getSingleShopAsync } from '../../redux/Slice/ShopSlice';
import { useLocation } from 'react-router-dom';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';

export const EditShop = () => {
    const dispatch = useDispatch();
    const [showInputBoxShopName, setShowInputBoxShopName] = useState(false);
    const [inputBoxShopNameValue, setInputBoxShopNameValue] = useState<any>("");
    const [showInputBoxGroupDescription, setShowInputBoxGroupDescription] = useState(false);
    const [, setInputBoxGroupDescriptionValue] = useState<any>("");


    const location = useLocation();
    const data = location.state.data
    console.log("i am darta", data)


    useEffect(() => {
        dispatch(getAllJobProfileAsync)
    }, [])

    const alljobprofile = useSelector((state: any) => state.jobProfile.jobProfiles)
    console.log("hiiii", alljobprofile)


    const { register, handleSubmit } = useForm();
    return (
        <div className="px-10 py-8">
            <form
                onSubmit={handleSubmit((Data) => {
                    const sendData = { shopId: data._id, data: Data }
                    console.log(sendData);
                    dispatch(updateShopAsync(sendData)).then(() => {
                        dispatch(getSingleShopAsync(data._id));
                    });
                    setShowInputBoxShopName(false);
                    setShowInputBoxGroupDescription(false);
                })}
            >
                <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Group Information</h1>
                </div>
                <div className="flex flex-col gap-3 mt-10">
                    {!showInputBoxShopName &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Shop Name</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxShopName(!showInputBoxShopName);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{data.shopName}</p>
                            </div>
                        </div >}
                    {showInputBoxShopName &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Shop Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register('shopName', { required: true })}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxShopNameValue}
                                        onChange={(event) => setInputBoxShopNameValue(event.target.value)}
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
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Job Profile</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxGroupDescription(!showInputBoxGroupDescription);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{data.jobProfile.jobProfileName
                                }</p>
                            </div>
                        </div >}
                    {showInputBoxGroupDescription &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-[15px]">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Job Profile</p>
                                </div>

                                <select
                                    {...register('jobProfileName', { required: "Employment Type required" })}
                                    onChange={(event) => setInputBoxGroupDescriptionValue(event.target.value)}
                                    className='border border-solid mt-[15px] outline-none border-[#DEDEDE] rounded  px-3 h-[30px] w-[324px] text-[#666666]'>

                                    {alljobprofile.map((option: any, index: any) => (
                                        <option
                                            key={index}
                                            value={option.jobProfileName}
                                            className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'
                                        >
                                            {option.jobProfileName}
                                        </option>
                                    ))}
                                </select>

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