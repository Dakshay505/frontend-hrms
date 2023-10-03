import { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"
import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import deleteIcon from "../../assets/Trash.svg"
import { useLocation, useNavigate } from "react-router-dom";
import {  updateParentDepartmentAsync } from '../../redux/Slice/departmentSlice';
import toast from 'react-hot-toast';

export const ParentDepartmentInfo = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const departmentid = location.state.Parentdepartmentid;
    const departmentName = location.state.ParentdepartmentName;
    const description = location.state.Parentdescription;
    const [showInputBoxDepartmentName, setShowInputBoxDepartmentName] = useState(false);
    const [showInputBoxDepartmentDepartment, setShowInputBoxDepartmentDepartment] = useState(false);
    // const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [inputBoxDepartmentNameValue, setInputBoxDepartmentNameValue] = useState(departmentName);
    const [inputBoxDescriptionValue, setInputBoxDescriptionValue] = useState(description);


    const { register, handleSubmit } = useForm();


    const onSubmit = async () => {
        try {
            let updatedData = {};

            if (inputBoxDepartmentNameValue === departmentName) {
                updatedData = {
                    departmentId: departmentid,
                    description: inputBoxDescriptionValue,
                };
            } else {
                updatedData = {
                    departmentId: departmentid,
                    description: inputBoxDescriptionValue,
                    departmentName: inputBoxDepartmentNameValue,
                };
            }

            const response = await dispatch(updateParentDepartmentAsync(updatedData));
            if (response.payload.success) {
                navigate('/view-modify-database');
                toast.success('Department updated successfully');
            } else {
                toast.error('Department update failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // const handleDeleteClick = () => {
    //     setDeleteConfirmationOpen(true);
    // };

    // const handleDeleteCancel = () => {
    //     setDeleteConfirmationOpen(false);
    // };

    // const handleDeleteConfirm = async () => {
    //     try {
    //         const response = await dispatch(deleteDepartmentAsync(departmentid));
    //         if (response.payload.success) {
    //             toast.success('Department deleted successfully');
    //             navigate('/view-modify-database');
    //         } else {
    //             toast.error('Department deletion failed');
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    //     setDeleteConfirmationOpen(false);
    // };

    // const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }: any) => {
    //     return isOpen ? (
    //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //             <div className="bg-white p-6 rounded shadow-md">
    //                 <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
    //                 <div className="flex justify-end">
    //                     <button
    //                         className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
    //                         onClick={onCancel}
    //                     >
    //                         Cancel
    //                     </button>
    //                     <button
    //                         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
    //                         onClick={onConfirm}
    //                     >
    //                         Confirm
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     ) : null;
    // };


    useEffect(() => {
        // setdepartmentId(departmentId);
        setInputBoxDepartmentNameValue(departmentName)
        setInputBoxDescriptionValue(description)
    }, []);

    return (
        <div className="px-10 py-8">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Department Information</h1>
                </div>
                <div className="flex flex-col gap-3 mt-10">
                    {!showInputBoxDepartmentName &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Department Name</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxDepartmentName(!showInputBoxDepartmentName);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{departmentName}</p>
                            </div>
                        </div >}
                    {showInputBoxDepartmentName &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Department Name</p>
                                </div>
                                <div>

                                    <input
                                        {...register('departmentName')}
                                        value={inputBoxDepartmentNameValue}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        onChange={(event) => setInputBoxDepartmentNameValue(event.target.value)}
                                        type="text"
                                    />
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


                    {!showInputBoxDepartmentDepartment &&
                        <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Department Description</p>
                                <img src={edit} onClick={() => {
                                    setShowInputBoxDepartmentDepartment(!showInputBoxDepartmentDepartment);
                                }} className="w-3 h-3" alt="" />
                            </div>
                            <div>
                                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{description}</p>
                            </div>
                        </div >}


                    {showInputBoxDepartmentDepartment &&
                        <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">Department Description</p>
                                </div>
                                <div>

                                    <input
                                        {...register('description')}
                                        className="text-[12px] leading-5 font-normal focus:outline-none"
                                        value={inputBoxDescriptionValue}
                                        onChange={(event) => setInputBoxDescriptionValue(event.target.value)}
                                        type="text"
                                    />
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

            {/* <div className='flex flex-row m-3'>
                <button
                    className="flex border py-2 px-5 mx-[-12px] my-5 border-red-500 items-center text-[red] text-sm font-medium"
                    onClick={handleDeleteClick}
                >
                    <img src={deleteIcon} alt="delete" className="mr-1" />
                    Delete
                </button>
                <DeleteConfirmationDialog
                    isOpen={isDeleteConfirmationOpen}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            </div> */}
        </div>
    )
}