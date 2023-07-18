import { useEffect, useState, } from 'react';
import edit from "../../assets/PencilSimple.png"
import del from "../../assets/TrashSimple.png"
import check from "../../assets/Check.png"
import "../../deletebtn.css"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeAsync, getSingleEmployeeAsync, updateEmployeeAsync } from '../../redux/Slice/EmployeeSlice';

interface Employee {
    id: number;
    title: string;
    inputName: string;
    data: string;
}


export const EmployeeProfile = () => {
    const dispatch = useDispatch();

    const { handleSubmit, register } = useForm();
    const [employeeId, setEmployeeId] = useState("")
    const singleEmployee = useSelector((state: any) => state.employee.singleEmployee)
    console.log("singleEmployee", singleEmployee)
    useEffect(() => {
        setEmployeeId(singleEmployee._id);
    }, [singleEmployee])
    
    // delete section
    console.log("ppp", employeeId);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);

    };

    const handleConfirmDelete = () => {
        // Perform the deletion logic here
        // ...
        setShowConfirmation(false);
        console.log("ggg",{ employeeId: employeeId })
        dispatch(deleteEmployeeAsync({ employeeId: singleEmployee._id }));
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    // employee info
    const Profile = singleEmployee.profileId
    let image;
    if (Profile && Profile.profilePicture) {
        image = Profile.profilePicture;
    } else {
        image = "https://cdn-icons-png.flaticon.com/512/219/219983.png";
    }
    // console.log(image);
    const employees = [
        {
            id: 1,
            title: "Name",
            inputName: "name",
            data: singleEmployee.name,
        },
        {
            id: 2,
            title: "Job Profile",
            inputName: "jobProfile",
            data: singleEmployee.jobProfileId?.jobProfileName,
        },
        {
            id: 3,
            title: "Group",
            inputName: "group",
            data: singleEmployee.groupId?.groupName,
        },
        {
            id: 4,
            title: "Email",
            inputName: "email",
            data: singleEmployee.email,
        },
        {
            id: 5,
            title: "Contact Number",
            inputName: "contactNumber",
            data: singleEmployee.contactNumber,
        },
        {
            id: 6,
            title: "Gender",
            inputName: "gender",
            data: singleEmployee.gender,
        },
    ];
    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEditMode(true);
    };


    return (
        <div className='px-[40px] pt-[32px] flex flex-col flex-start gap-[40px]'>
            <div className=" flex pt-6 justify-between items-center self-stretch">
                <div className=" flex items-start gap-6">
                    <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
                        Employee Information
                    </div>
                </div>
            </div>
            <div className="flex flex-start self-stretch gap-[24px]">
                <div className="flex flex-col gap-[8px] items-center">
                    <div className="py-[32px] px-[16px] bg-primary-bg rounded-sm flex w-[195px] flex-col justify-center items-center gap-[16px] ">

                        <img src={image} alt="Employee Image" className='rounded-full w-fit object-cover h-[9.5rem]' />
                        <p className="text-neutral-n-600 text-center leading-trim text-capitalize font-inter text-base font-semibold leading-6 tracking-tighter">
                            {singleEmployee.name}
                        </p>
                    </div>
                    <div>
                        <div
                            className="delete-button"
                            onClick={handleDeleteClick}
                        >
                            <img src={del} alt="" className="delete-icon" />
                            Delete
                        </div>

                        {showConfirmation && (
                            <div className="confirmation-modal">
                                <div className="confirmation-modal-content">
                                    <div className="flex gap-[5px] items-center">
                                        <img src={del} alt="" className="w-[20px] h-[20px]" />
                                        <h2 className="text-left mb-0">Confirmation</h2>
                                    </div>
                                    <hr />
                                    <p>Are your sure you want to delete this employee? This action can’t be undone.</p>
                                    <div className="button-container">

                                        <div className="cancel-button" onClick={handleCancelDelete}>
                                            Cancel
                                        </div>
                                        <div className="confirm-button" onClick={handleConfirmDelete}>
                                            Delete Employee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div className="container mx-auto px-4">
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log(data);
                            const sendData = { employeeId: employeeId, data: data }
                            dispatch(updateEmployeeAsync(sendData)).then(() => {
                                dispatch(getSingleEmployeeAsync({employeeId: employeeId}));
                            });
                            setEditMode(false);
                        })}
                    >
                        {employees.map((employee) => {
                            return <div key={employee.id} className="mb-6">
                                <div className={`flex flex-col bg-primary-bg border border-primary-border rounded-xl py-[16px] px-[10px] items-start gap-[10px] ${editMode && selectedEmployee && selectedEmployee.id === employee.id ? 'bg-white' : ''}`}>
                                    <div className="flex">
                                        <h2 className="text-lg font-semibold">{employee.title}</h2>
                                        <div className="text-white font-bold py-2 px-4 cursor-pointer" onClick={() => handleEditClick(employee)}>
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
                        })}
                    </form>
                </div>

            </div>
        </div >
    )
}
