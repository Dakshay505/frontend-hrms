import { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"
import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateShopAsync, getSingleShopAsync, deleteShopAsync } from '../../redux/Slice/ShopSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import deleteIcon from "../../assets/Trash.svg"

export const EditShop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showInputBoxShopName, setShowInputBoxShopName] = useState(false);
    const [inputBoxShopNameValue, setInputBoxShopNameValue] = useState<any>("");
    const [showInputBoxShopDescription, setShowInputBoxShopDescription] = useState(false);
    const [, setInputBoxShopDescriptionValue] = useState<any>("");
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);


    const location = useLocation();
    const data = location.state.data
    console.log("i am darta", data)


    useEffect(() => {
        dispatch(getAllJobProfileAsync)
    }, [])

    const alljobprofile = useSelector((state: any) => state.jobProfile.jobProfiles)
    console.log("hiiii", alljobprofile)


    const { register, handleSubmit } = useForm();

// delete
    const handleDeleteClick = () => { 
        setConfirmationOpen(true);
    };

    const handleCancel = () => {
        setConfirmationOpen(false);
    };
    const handleConfirm = () => {
        dispatch(deleteShopAsync(data._id));
        setConfirmationOpen(false);
        navigate('/view-modify-database')
    };

    const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }: any) => {
        return isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                    <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        ) : null;
    };




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
                    setShowInputBoxShopDescription(false);
                })}
            >
                <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Shop Information</h1>
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
                    {!showInputBoxShopDescription &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Job Profile</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxShopDescription(!showInputBoxShopDescription);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{data.jobProfile.jobProfileName
                                }</p>
                            </div>
                        </div >}
                    {showInputBoxShopDescription &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-[15px]">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Job Profile</p>
                                </div>

                                <select
                                    {...register('jobProfileName', { required: "Employment Type required" })}
                                    onChange={(event) => setInputBoxShopDescriptionValue(event.target.value)}
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
                <div className='flex flex-row m-3'>
                    {/* <img src={deleteIcon} alt='delete' onClick={handleDeleteClick} />
                    <h2 className='text-sm font-medium ml-3  text-[red]' >Delete</h2> */}
                    <button
                        className="flex  border py-2 px-5 mx-[-12px] my-5 border-red-500 items-center text-[red] text-sm font-medium "
                        onClick={handleDeleteClick}
                    >
                        <img src={deleteIcon} alt="delete" className="mr-1" />
                        Delete
                    </button>
                    <DeleteConfirmationDialog
                        isOpen={isConfirmationOpen}
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                    />
                </div>



            </form>
        </div>
    )
}