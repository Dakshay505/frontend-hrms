import React, { useEffect, useState } from 'react';
import edit from "../../assets/PencilSimple.png"

import check from "../../assets/Check.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateGroupAsync } from '../../redux/Slice/GroupSlice';


interface Employee {
    id: number;
    title: string;
    data: string;
}

export const GroupInfo = () => {
    const [groupId, setGroupId] = useState("")

    const groups = useSelector((state: any) => state.group.group)
    useEffect(() => {
        setGroupId(groups.groupData?._id);
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
            data: groups?.groupData?.groupName,
            inputName: "groupName"
        },
        {
            id: 2,
            title: "Group Description",
            data: groups?.groupData?.description,
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
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Group Information</h1>
            </div>
            <div className="flex flex-start self-stretch gap-[24px]">
                <div className="container mx-auto px-4">
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log("groupId", groupId)
                            const sendData = { groupId: groupId, data: data }
                            console.log("sendData", sendData)
                            dispatch(updateGroupAsync(sendData)).then(() => {
                                // dispatch(getSingleGroupAsync(groupId));
                            });
                            setEditMode(false);
                        })}>
                        {group && group.map((element: any) => (
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
