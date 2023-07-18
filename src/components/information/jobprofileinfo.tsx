import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import edit from "../../assets/PencilSimple.png"

import check from "../../assets/Check.png"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getSingleJobProfileAsync, updateJobProfileAsync } from '../../redux/Slice/JobProfileSlice';


interface Employee {
    id: number;
    title: string;
    data: string;
}


export const JobProfileInfo = () => {
    const [search, setSearch] = React.useState('');

    const [jobProfileId, setJobProfileId] = useState("")

    const JobProfile = useSelector((state: any) => state.jobProfile.jobProfiles.jobProfileData)
    useEffect(() => {
        setJobProfileId(JobProfile?._id);
    }, [JobProfile]);
    console.log("JobProfileID:", jobProfileId)

    React.useEffect(() => {
        console.log(search);
        setSearch('')
    }, [search]);


    // employee info

    const Job = [
        {
            id: 1,
            title: "Job Profile Name",
            data: JobProfile?.jobProfileName,
            inputName: "jobProfileName"
        },
        {
            id: 2,
            title: "Job Profile Description",
            data: JobProfile?.jobDescription,
            inputName: "jobDescription"
        }
    ]


    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEditMode(true);
    };
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();

    return (
        <div className='px-[40px] pt-[32px] flex flex-col flex-start gap-[40px] w-[770px]'>
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Job Profile Information</h1>
            </div>
            <form
                onSubmit={handleSubmit((data) => {
                    const sendData = { jobProfileId: jobProfileId, data: data }
                    dispatch(updateJobProfileAsync(sendData)).then(() => {
                        // dispatch(getSingleDepartmentAsync(departmentId));
                    });
                    console.log("sendData", sendData)
                })}>
                <div className="flex flex-start self-stretch gap-[24px]">
                    <div className="container mx-auto px-4">
                        {Job.map((employee) => (
                            <div key={employee.id} className="mb-6">
                                <div className={`flex flex-col bg-primary-bg border border-primary-border rounded-xl py-[16px] px-[10px] items-start gap-[10px] ${editMode && selectedEmployee && selectedEmployee.id === employee.id ? 'bg-white' : ''}`}>
                                    <div className="flex">
                                        <h2 className="text-lg font-semibold">{employee.title}</h2>
                                        <div className="text-white font-bold py-2 px-4" onClick={() => handleEditClick(employee)}>
                                            <img src={edit} alt="" className="h-[16px] w-[16px]" />
                                        </div>
                                    </div>
                                    <div>
                                        {editMode && selectedEmployee && selectedEmployee.id === employee.id ? (
                                            <div className="flex gap-[20px] p-[7px]  border border-primary-border rounded-xl">
                                                <input
                                                    {...register(employee.inputName, { required: true })}
                                                    type="text" className="w-full py-2 px-3 outline-none text-grey-darker" value={selectedEmployee.data} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, data: e.target.value })} />
                                                <button type='submit' className="bg-primary-blue text-white font-bold py-2 px-4 rounded">
                                                    <img src={check} alt="" className="w-[18px] h-[18px]" />
                                                </button>
                                            </div>
                                        ) : (
                                            <h2 className="text-md font-normal">{employee.data}</h2>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </form>

        </div >
    )
}
