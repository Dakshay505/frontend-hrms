
import { useState, useEffect } from 'react'
import BluePlus from '../../assets/BluePlus.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeAsync, getSingleEmployeeAsync } from '../../redux/Slice/EmployeeSlice';
import { getAllDepartmentsAsync, getSingleDepartmentAsync } from '../../redux/Slice/DepartmentSlice';
import { useNavigate } from 'react-router-dom';
import Pencil from '../../assets/PencilSimple.svg'
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';

const ViewModifyDatabase = () => {
    const dispatch = useDispatch();
    const employeeDetailList = useSelector((state: any) => state.employee.employees);
    const departmentList = useSelector((state: any) => state.department.departments);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles)
    const [path, setPath] = useState('')
    const [databaseValue, setDatabaseValue] = useState("Employess");
    useEffect(() => {
        dispatch(getAllEmployeeAsync());
        dispatch(getAllDepartmentsAsync());
        dispatch(getAllJobProfileAsync());
    }, [])

    const navigate = useNavigate();
    const handleTableRowClick = (data: any) => {
        const employeeId = { employeeId: data._id }
        console.log("employeeId:", employeeId)
        dispatch(getSingleEmployeeAsync(employeeId));
        navigate(`/employee-profile`,{ state: { data: data } });
    }
    const handleDepartmentTableRowClick = (data: any) => {
        const departmentId = { departmentId: data._id }
        console.log("department 1:", departmentId)
        dispatch(getSingleDepartmentAsync(departmentId));
        navigate(`/departments-info`,{ state: { data: data } });
    }


    return (

        <div className='mx-10 w-[70%]'>
            <div className="flex justify-between mt-8">
                <div className="flex gap-7 items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">View Database</h1>
                    </div>
                    <div>
                        <form
                            onChange={(event: any) => {
                                setDatabaseValue(event.target.value);
                                const selectedValue = event.target.value;
                                if (selectedValue !== "Employess") {
                                    if (selectedValue === "Departments") {
                                        setPath("/add-department")
                                    }
                                    if (selectedValue === "Job Profiles") {
                                        setPath("/add-job-profile")
                                    }
                                }
                            }
                            }
                        >
                            <select
                                className="bg-[#ECEDFE] rounded-lg py-3 px-5 text-[#283093] text-sm font-medium"
                                defaultValue="Employess"
                            >
                                <option>Employess</option>
                                <option>Departments</option>
                                <option>Job Profiles</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <Link to="/update-hierarchy">
                        <div className='flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={Pencil} className='w-4' alt="" /><p className="px-2">Update Hierarchy</p></div>
                    </Link>
                    <Link to={path}>
                        <div className='flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add</p></div>
                    </Link>
                </div>
            </div>
            <div className='w-[100%]'>
                <div className='mt-10 overflow-auto'>
                    <div className='py-6'>
                        {/* TABLE FOR EMPLOYEE */}
                        {databaseValue === "Employess" && <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE] cursor-default'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Department</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Salary</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Employement Status</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Leaves Taken</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Current Barcode</td>
                                </tr>
                                {employeeDetailList && employeeDetailList.map((element: any, index: number) => {
                                    return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element._id}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.name ? element.name : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobProfileId?.jobProfileName ? element.jobProfileId?.jobProfileName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.departmentId?.departmentName ? element.departmentId?.departmentName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.salary ? element.salary : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobProfileId?.employmentType ? element.jobProfileId?.employmentType : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.leaveTaken ? element.leaveTaken : 0}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                                            <img src={element.currentBarCode} alt="barcode" />
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                        {/* TABLE FOR EMPLOYEE ENDS */}
                        {/* TABLE FOR DEPARTMENT */}
                        {databaseValue === "Departments" && <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE]'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Department Name</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Description</td>
                                </tr>
                                {departmentList && departmentList.map((element: any, index: number) => {
                                    return <tr key={index} className='hover:bg-[#FAFAFA] cursor-default' onClick={() => handleDepartmentTableRowClick(element)}>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element._id}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap cursor-pointer hover:underline'>{element.departmentName ? element.departmentName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.description ? element.description : "Not Avilable"}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                        {/* TABLE FOR DEPARTMENTS ENDS */}
                        {databaseValue === "Job Profiles" && <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE] cursor-default'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile Name</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Description</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Rank</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Employement Type</td>
                                </tr>
                                {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                    return <tr key={index} className='hover:bg-[#FAFAFA] cursor-default' onClick={() => handleTableRowClick(element)}>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element._id}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.jobProfileName ? element.jobProfileName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobDescription ? element.jobDescription : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobRank ? element.jobRank : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.employmentType ? element.employmentType : "Not Avilable"}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewModifyDatabase