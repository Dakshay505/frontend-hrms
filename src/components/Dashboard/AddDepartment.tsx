import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png"
import { useDispatch, useSelector } from 'react-redux'
import { createDepartmentAsync, getAllDepartmentsAsync } from "../../redux/Slice/DepartmentSlice";
import {useEffect, useState} from "react"

const AddDepartment = () => {
    const dispatch = useDispatch();
    const departmentList = useSelector((state: any) => state.department.departments);
    const [parentDepartmentValue, setParentDepartmentValue] = useState("All Departments");
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        dispatch(getAllDepartmentsAsync());
    }, [])
    return (
        <>
            <div className="mx-10">
                <div className="pt-8">
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Department</h1>
                </div>
                <form onSubmit={handleSubmit((data) => {
                    if(parentDepartmentValue === "All Departments"){
                        data = {
                            departmentName: data.departmentName,
                        }
                    } else{
                        data = {
                            departmentName: data.departmentName,
                            parentDepartmentName: data.parentDepartmentName
                        }
                    }
                    dispatch(createDepartmentAsync(data))
                    .then(() => {
                        dispatch(getAllDepartmentsAsync());
                    });
                    reset()
                })}
                >
                    <div className="mt-10">
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Department Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register('departmentName', { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Parent Department Name</p>
                                </div>
                                <div>
                                <select
                                        {...register('parentDepartmentName', { required: true })}
                                        onChange={(event) => setParentDepartmentValue(event.target.value)}
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option>All Departments</option>
                                        {departmentList && departmentList.map((element: any, index: number) => {
                                            return <option key={index} className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'>{element.departmentName}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            {/* <Link to="/update-hierarchy"> */}
                            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Department</p></button>
                            {/* </Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddDepartment