import React, {  useState } from 'react';
// import axios from 'axios';
import edit from "../../assets/PencilSimple.png"

import check from "../../assets/Check.png"


interface Employee {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    location: string;
}

export const JobProfileInfo = () => {
    const [search, setSearch] = React.useState('');



    React.useEffect(() => {
        console.log(search);
        setSearch('')
    }, [search]);


    // employee info

    const employees =[
        {
            id: 1,
            name: 'John Doe',
            jobTitle: 'Software Engineer',
            department: 'Engineering',
            location: 'New York',
        },
        {
            id: 2,
            name: 'Jane Smith',
            jobTitle: 'Marketing Specialist',
            department: 'Marketing',
            location: 'San Francisco',
        }
    ];

    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    // useEffect(() => {
    //   // Replace with your actual API endpoint
    //   axios.get('https://api.example.com/employees')
    //     .then(response => {
    //       setEmployees(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data: ', error);
    //     })
    // }, []

    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEditMode(true);
        console.log('Edit employee:', employee);
    };

    const handleSaveClick = () => {
        // Implement save functionality here
        setEditMode(false);
        console.log(selectedEmployee?.jobTitle);
    };


    return (
        <div className='px-[40px] pt-[32px] flex flex-col flex-start gap-[40px] w-[770px]'>
            <div className="mt-8">
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Job Profile Information</h1>
                </div>
            <div className="flex flex-start self-stretch gap-[24px]">
                <div className="container mx-auto px-4">
                    {employees.map((employee) => (
                        <div key={employee.id} className="mb-6">
                            <div className={`flex flex-col bg-primary-bg border border-primary-border rounded-xl py-[16px] px-[10px] items-start gap-[10px] ${editMode && selectedEmployee && selectedEmployee.id === employee.id ? 'bg-white' : ''}`}>
                                <div className="flex">
                                    <h2 className="text-lg font-semibold">Job Profile</h2>
                                    <button className="text-white font-bold py-2 px-4" onClick={() => handleEditClick(employee)}>
                                        <img src={edit} alt="" className="h-[16px] w-[16px]" />
                                    </button>
                                </div>
                                <div>
                                    {editMode && selectedEmployee && selectedEmployee.id === employee.id ? (
                                        <div className="flex gap-[20px] p-[7px]  border border-primary-border rounded-xl">
                                            <input type="text" className="w-full py-2 px-3 outline-none text-grey-darker" value={selectedEmployee.jobTitle} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, jobTitle: e.target.value })} />
                                            <button className="bg-primary-blue text-white font-bold py-2 px-4 rounded" onClick={handleSaveClick}>
                                                <img src={check} alt="" className="w-[18px] h-[18px]" />
                                            </button>
                                        </div>
                                    ) : (
                                        <h2 className="text-md font-normal">{employee.jobTitle}</h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}
