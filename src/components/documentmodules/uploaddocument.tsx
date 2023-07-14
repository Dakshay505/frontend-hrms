import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import arrow from "../../assets/FileArrowUp.png"
import glass from "../../assets/MagnifyingGlass.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartmentsAsync } from "../../redux/Slice/DepartmentSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import { uploadDocuments } from "../../redux/API/UploadDocument";
import X from '../../assets/X.svg'

export const Uploaddocument = () => {
    const dispatch = useDispatch();
    const departmentList = useSelector((state: any) => state.department.departments);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    console.log(jobProfileList);

    useEffect(() => {
        dispatch(getAllDepartmentsAsync());
        dispatch(getAllJobProfileAsync())
    }, [])
    // search
    const [search, setSearch] = React.useState('');

    const handleInputChange = (event: any) => {
        setSearch(event.target.value);
    };

    React.useEffect(() => {
        console.log(search);
    }, [search]);


    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    
    
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

        const handleFormSubmit = (data: any) => {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('resourceDocsName', data.resourceDocsName);
            formData.append('departmentName', data.departmentName);
            formData.append('JobProfileName', data.JobProfileName);
            uploadDocuments(formData);
        }
    const handleFileReset = () => {
        setSelectedFile(null);
    };
    return (
        <div className="mx-10">
            <form
                onSubmit={handleSubmit((data) => {
                    handleFormSubmit(data);
                    reset();
                })}
            >
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Upload Documents</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-[#000000] text-[16px] leading-6 font-bold">For:</p>
                        <div>
                            <select
                                {...register('departmentName', { required: true })}
                                className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                <option>All Departments</option>
                                {departmentList.map((element: any, index: number) => {
                                    return <option key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.departmentName}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                {...register('JobProfileName', { required: true })}
                                className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                <option>All Job Profiles</option>
                                {jobProfileList.map((element: any, index: number) => {
                                    return <option key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                                })}
                            </select>
                        </div>
                        <div className="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
                            <div className="relative">
                                <div className="absolute pl-[10px] top-4 pt-[5px] left-3">

                                    <img src={glass} alt="" className="h-[16px] w-[16px]" />
                                </div>
                                <input
                                    type="text"
                                    name="search" onChange={handleInputChange}
                                    className="h-14 w-[250px] pl-[3rem] pr-5 rounded-full z-0 border border-solid border-primary-border focus:shadow focus:outline-none"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DOCUMENT FORM STARTS */}
                <div className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>
                    <div className='flex gap-10 mx-6'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Document Name</p>
                            </div>
                            <div>
                                <input
                                    {...register(`resourceDocsName`, { required: true })}
                                    type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Attachment</p>
                            </div>
                            <div className="relative">
                                {selectedFile ? (
                                    <div className="flex items-center justify-center border border-dashed border-[#DEDEDE] bg-[#FAFAFA] w-[300px] h-14 rounded-sm">
                                        <span className="text-[12px] leading-5 font-normal text-[#666666]">{selectedFile.name}</span>
                                        <button onClick={handleFileReset}>
                                            <img src={X} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center border border-dashed border-[#9198F7] bg-[#ECEDFE] w-[300px] h-14 rounded-sm">
                                        <label htmlFor="file" className="text-[12px] leading-5 font-normal text-[#666666]">Drag & Drop or<span className="text-[#283093] underline cursor-pointer"> Browse</span></label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            className="absolute opacity-0"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* DOCUMENT FORM ENDS */}
                <div className="mt-10">
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={arrow} className='w-4' alt="" /><p className="px-2">Upload Resources</p></button>
                </div>
            </form>
        </div>
    )
}