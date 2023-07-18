import React, { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"

import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupAsync, updateGroupAsync } from '../../redux/Slice/GroupSlice';


interface Employee {
    id: number;
    title: string;
    data: string;
}

export const GroupInfo = () => {
    const [groupId, setGroupId] = useState("")

    const groups = useSelector((state: any) => state.group.group)
    useEffect(() => {
        setGroupId(groups._id);
    }, [groups]);
    console.log("groupId", groupId)
    // console.log(groups)

    const [search, setSearch] = React.useState('');


    const { handleSubmit, register } = useForm();
    React.useEffect(() => {
        console.log(search);
        setSearch("")
    }, [search]);


    // employee info

    const group = [
        {
            id: 1,
            title: "Group Name",
            data: groups?.groupName,
            inputName: "groupName"
        },
        {
            id: 2,
            title: "Group Description",
            data: groups?.description,
            inputName: "description"
        }
    ]

    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEditMode(!editMode);
    };
    const dispatch = useDispatch();
    return (
        <div className='px-[40px] pt-[32px]'>
            <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Group Information</h1>
            </div>
            <div className="py-10">
                <form
                    onSubmit={handleSubmit((data) => {
                        const sendData = { groupId: groupId, data: data }
                        dispatch(updateGroupAsync(sendData)).then(() => {
                            dispatch(getSingleGroupAsync({ groupId: groupId }));
                        });
                        setEditMode(false);
                    })}>
                    {group && group.map((element: any) => (
                        <div key={element.id} className="w-[472px] mb-5">
                            <div className={`flex flex-col bg-[#FAFAFA] border border-primary-border rounded-[4px] py-[16px] px-[10px] items-start ${editMode && selectedEmployee && selectedEmployee.id === element.id ? 'bg-white' : ''}`}>
                                <div className="flex justify-center items-center gap-3">
                                    <h2 className="text-sm font-semibold text-[#2E2E2E]">{element.title}</h2>
                                    <div className="text-white font-bold" onClick={() => handleEditClick(element)}>
                                        <img src={edit} alt="" className="h-3 w-3" />
                                    </div>
                                </div>
                                <div>
                                    {editMode && selectedEmployee && selectedEmployee.id === element.id ? (
                                        <div className="flex gap-[20px] p-[7px]  border border-primary-border rounded-xl">
                                            <input
                                                {...register(element.inputName, { required: true })}
                                                type="text" className="w-full py-2 px-3 outline-none text-[12px] leading-5 font-normal text-[#757575]" value={selectedEmployee.data} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, data: e.target.value })} />
                                            <button type='submit' className="bg-primary-blue text-white font-bold py-2 px-4 rounded">
                                                <img src={check} alt="" className="w-[18px] h-[18px]" />
                                            </button>
                                        </div>
                                    ) : (
                                        <h2 className="text-[12px] leading-5 font-normal text-[#1C1C1C]">{element.data}</h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div >
    )
}
