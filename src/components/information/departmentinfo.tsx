import React, { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"

import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateDepartmentAsync } from '../../redux/Slice/DepartmentSlice';


interface Employee {
    id: number;
    title: string;
    data: string;
}

export const DepartmentInfo = () => {
    const [departmentId, setDepartmentId] = useState("")

    const departments = useSelector((state: any) => state.department.department)
    useEffect(() => {
        setDepartmentId(departments.departmentData?._id);
    }, [departments]);
    console.log("departmentId", departmentId)
    // console.log(departments)

    const [search, setSearch] = React.useState('');


    const { handleSubmit, register } = useForm();
    React.useEffect(() => {
        console.log(search);
        setSearch("")
    }, [search]);


    // employee info

    const department = [
        {
            id: 1,
            title: "Department Name",
            data: departments?.departmentData?.departmentName,
            inputName: "departmentName"
        },
        {
            id: 2,
            title: "Department Description",
            data: departments?.departmentData?.description,
            inputName: "description"
        }
    ]

    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEditMode(true);
    };
    const dispatch = useDispatch();
    return (
        <div className='px-[40px] pt-[32px] flex flex-col flex-start gap-[40px] w-[770px]'>
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Department Information</h1>
            </div>
            <div className="flex flex-start self-stretch gap-[24px]">
                <div className="container mx-auto px-4">
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log("departmentId", departmentId)
                            const sendData = { departmentId: departmentId, data: data }
                            console.log("sendData", sendData)
                            dispatch(updateDepartmentAsync(sendData)).then(() => {
                                // dispatch(getSingleDepartmentAsync(departmentId));
                            });
                            setEditMode(false);
                        })}>
                        {department && department.map((element: any) => (
                            <div key={element.id} className="mb-6">
                                <div className={`flex flex-col bg-primary-bg border border-primary-border rounded-xl py-[16px] px-[10px] items-start gap-[10px] ${editMode && selectedEmployee && selectedEmployee.id === element.id ? 'bg-white' : ''}`}>
                                    <div className="flex">
                                        <h2 className="text-lg font-semibold">{element.title}</h2>
                                        <div className="text-white font-bold py-2 px-4" onClick={() => handleEditClick(element)}>
                                            <img src={edit} alt="" className="h-[16px] w-[16px]" />
                                        </div>
                                    </div>
                                    <div>
                                        {editMode && selectedEmployee && selectedEmployee.id === element.id ? (
                                            <div className="flex gap-[20px] p-[7px]  border border-primary-border rounded-xl">
                                                <input
                                                    {...register(element.inputName, { required: true })}
                                                    type="text" className="w-full py-2 px-3 outline-none text-grey-darker" value={selectedEmployee.data} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, data: e.target.value })} />
                                                <button type='submit' className="bg-primary-blue text-white font-bold py-2 px-4 rounded">
                                                    <img src={check} alt="" className="w-[18px] h-[18px]" />
                                                </button>
                                            </div>
                                        ) : (
                                            <h2 className="text-md font-normal">{element.data}</h2>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

            </div>
        </div >
    )
}
