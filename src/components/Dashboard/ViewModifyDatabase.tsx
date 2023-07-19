import { useState, useEffect } from 'react'
import BluePlus from '../../assets/BluePlus.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeAsync, getEmployeeImageAsync, getSingleEmployeeAsync } from '../../redux/Slice/EmployeeSlice';
import { getAllGroupsAsync, getSingleGroupAsync } from '../../redux/Slice/GroupSlice';
import { useNavigate } from 'react-router-dom';
import Pencil from '../../assets/PencilSimple.svg'
import { getAllJobProfileAsync, getSingleJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import FunnelSimple from '../../assets/FunnelSimple.svg'
import glass from '../../assets/MagnifyingGlass.png'

const ViewModifyDatabase = () => {
    const itemsPerPage = 20; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState({
        name: "",
        groupName: "",
        jobProfileName: "",
        limit: itemsPerPage,
        page: currentPage
    })
    useEffect(() => {
        dispatch(getAllEmployeeAsync(filter));
        console.log("filter", filter)
    }, [filter])

    // SEARCH

    const [isLabelVisible, setLabelVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);


    const dispatch = useDispatch();
    const employeeDetailList = useSelector((state: any) => state.employee.employees);
    const groupList = useSelector((state: any) => state.group.groups);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles)
    const [path, setPath] = useState('/addemployee')
    const [databaseValue, setDatabaseValue] = useState("Employees");
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    const [showFilter, setshowFilter] = useState(false);
    useEffect(() => {
        dispatch(getAllEmployeeAsync(filter)).then((data: any) => {
            const employeeData = data.payload.employees;
            const arr = [];
            for (let i = 0; i < employeeData.length; i++) {
                arr.push(employeeData[i].name)
            }
            setFetchedSuggestions(arr)
        });
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
    }, [])

    const navigate = useNavigate();
    const handleTableRowClick = (data: any) => {
        const employeeId = { employeeId: data._id }
        dispatch(getSingleEmployeeAsync(employeeId));
        dispatch(getEmployeeImageAsync(employeeId));
        navigate(`/employee-profile`, { state: { data: data } });
    }
    const handleGroupTableRowClick = (data: any) => {
        const groupId = { groupId: data._id }
        dispatch(getSingleGroupAsync(groupId));
        navigate(`/groups-info`, { state: { data: data } });
    }
    const handleJobprofileTableRowClick = (data: any) => {
        const jobProfileId = { jobProfileId: data._id }
        console.log(jobProfileId)
        dispatch(getSingleJobProfileAsync(jobProfileId));
        navigate(`/jobprofile-info`, { state: { data: data } });
    }


    const handleInputChange = (event: any) => {
        if (event.target.value !== "") {
            setLabelVisible(false);
            setSearch(event.target.value);
            setFilter({
                ...filter,
                name: event.target.value
            })
            getSuggestions(event.target.value);
        }
        else {
            setLabelVisible(true);
            setSearch(event.target.value);
            setFilter({
                ...filter,
                name: event.target.value
            })
            setSuggestions([]);
        }
    };

    const getSuggestions = (inputValue: any) => {

        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // pagination 
    const count = 9;

    // Calculate the total number of pages
    const employeePagination = Math.ceil((count || 0) / itemsPerPage);

    const dispatchPagination = (pageNumber: number) => {
        console.log("page no-", pageNumber);
        setCurrentPage(pageNumber);
        setFilter({ ...filter, page: pageNumber });
        dispatch(getAllEmployeeAsync(filter));
    };
    const handleNextPage = () => {
        console.log('handleNextPage');
        const nextPage = currentPage + 1;
        if (nextPage <= employeePagination) {
            console.log("nextPage: " + nextPage)
            dispatchPagination(nextPage);
        }
    };

    const handlePreviousPage = () => {
        console.log('handlePreviousPage');
        const previousPage = currentPage - 1;
        if (previousPage >= 1) {
            console.log("previous page", previousPage)
            dispatchPagination(previousPage);
        }
    };
    const pageNumbers = Array.from({ length: employeePagination }, (_, i) => i + 1);

    return (

        <div className='mx-10'>
            <div className="flex justify-between pt-8">
                <div className="flex gap-7 items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">View Database</h1>
                    </div>
                    <div>
                        <form
                            onChange={(event: any) => {
                                setDatabaseValue(event.target.value);
                                const selectedValue = event.target.value;

                                if (selectedValue === "Employees") {
                                    setPath("/addemployee")
                                }
                                if (selectedValue === "Groups") {
                                    setPath("/add-group")
                                }
                                if (selectedValue === "Job Profiles") {
                                    setPath("/add-job-profile")

                                }
                            }
                            }
                        >
                            <select
                                className="bg-[#ECEDFE] rounded-lg py-3 px-5 text-[#283093] text-sm font-medium"
                                defaultValue="Employees"
                            >
                                <option>Employees</option>
                                <option>Groups</option>
                                <option>Job Profiles</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className='flex gap-6'>
                    {databaseValue !== "Employees" && <Link to="/update-hierarchy">
                        <div className='flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={Pencil} className='w-4' alt="" /><p className="px-2">Update Hierarchy</p></div>
                    </Link>}
                    <Link to={path}>
                        <div className='flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add</p></div>
                    </Link>
                </div>
            </div>
            {databaseValue === "Employees" && <div className='my-10 flex gap-5'>
                <div className='relative'>
                    <div
                        onClick={() => {
                            setshowFilter(!showFilter)
                            setSuggestions([]);
                        }}
                        className='flex gap-2 justify-center items-center py-3 px-5 w-[100px] h-10 bg-[#FAFAFA] rounded-[53px] border border-solid border-[#DEDEDE]'>
                        <img src={FunnelSimple} className='w-4 h-4' alt="" />
                        <p className='text-sm font-medium text-[#2E2E2E]'>Filter</p>
                    </div>
                    {showFilter && <div className='absolute flex flex-col gap-3 rounded-lg top-10 left-0 min-w-[240px] bg-[#FAFAFA] py-6 px-4'>
                        <div className='flex gap-3 justify-between'>
                            <div>
                                <p className='text-sm font-medium text-[#2E2E2E]'>Group</p>
                            </div>
                            <div>
                                <select
                                    onChange={(event) => {
                                        setFilter({
                                            ...filter,
                                            groupName: event.target.value
                                        })
                                    }}
                                    value={filter.groupName}
                                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'>
                                    <option value=""></option>
                                    {groupList && groupList.map((element: any, index: number) => {
                                        return <option
                                            key={index}
                                            value={element.groupName}
                                        >
                                            {element.groupName}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-3 justify-between'>
                            <div>
                                <p className='text-sm font-medium text-[#2E2E2E]'>Job Profile</p>
                            </div>
                            <div>
                                <select
                                    onChange={(event) => {
                                        setFilter({
                                            ...filter,
                                            jobProfileName: event.target.value
                                        })
                                    }}
                                    value={filter.jobProfileName}
                                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'>
                                    <option value=""></option>
                                    {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                        return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>}
                </div>
                <div>
                    <div className="relative">
                        {isLabelVisible && <div className="absolute top-[10px] left-6">
                            <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text">
                                <img src={glass} alt="" className="h-4 w-4" />
                                <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                            </label>
                        </div>}
                        <input
                            onClick={() => setshowFilter(false)}
                            type="search"
                            id="searchInput"
                            onChange={handleInputChange}
                            value={search}
                            className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
                        />
                        {suggestions.length > 0 && (
                            <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
                                {suggestions.map((suggestion: any, index: any) => (
                                    <input type="text" readOnly key={index}
                                        className="py-3 px-5 cursor-pointer focus:outline-none w-[200px]"
                                        value={suggestion}
                                        onClick={(event) => {
                                            setFilter({
                                                ...filter,
                                                name: (event.target as HTMLInputElement).value
                                            })
                                            setSuggestions([]);
                                        }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>}
            <div className=''>
                <div className='mt-10 overflow-auto'>
                    <div className='py-6'>
                        {/* TABLE FOR EMPLOYEE */}
                        {databaseValue === "Employees" && <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE] cursor-default'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Group</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Salary</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Employement Status</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Leaves Taken</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Current Barcode</td>
                                </tr>
                                {employeeDetailList && employeeDetailList.map((element: any, index: number) => {
                                    return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{index + 1}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.name ? element.name : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobProfileId?.jobProfileName ? element.jobProfileId?.jobProfileName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.groupId?.groupName ? element.groupId?.groupName : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.salary ? element.salary : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobProfileId?.employmentType ? element.jobProfileId?.employmentType : "Not Avilable"}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.leaveTaken ? element.leaveTaken : 0}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                                            <img src={element.currentBarCode} alt="barcode" />
                                        </td>
                                    </tr>
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        <div className="flex gap-[10px] justify-center mt-4">
                                            <button
                                                className="px-3 py-2 mx-1"
                                                onClick={handlePreviousPage}
                                                disabled={currentPage === 1}
                                            >
                                                &laquo;

                                            </button>

                                            {pageNumbers.map((page) => (
                                                <button
                                                    key={page}
                                                    className={`px-3 py-2 mx-1 ${page === currentPage ? 'bg-blue-500 rounded-full shadow-lg px-[15px] text-white' : 'bg-gray-200  rounded-full shadow-lg px-[15px]'}`}
                                                    onClick={() => dispatchPagination(page)}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                className="px-3 py-2 mx-1"
                                                onClick={handleNextPage}
                                                disabled={currentPage === employeePagination}
                                            >
                                                &raquo;
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>}
                        {/* TABLE FOR EMPLOYEE ENDS */}
                        {/* TABLE FOR DEPARTMENT */}
                        {databaseValue === "Groups" && <table>
                            <tbody>
                                <tr className='bg-[#ECEDFE]'>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Group Name</td>
                                    <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Description</td>
                                </tr>
                                {groupList && groupList.map((element: any, index: number) => {
                                    return <tr key={index} className='hover:bg-[#FAFAFA] cursor-default' onClick={() => handleGroupTableRowClick(element)}>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element._id}</td>
                                        <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap cursor-pointer hover:underline'>{element.groupName ? element.groupName : "Not Avilable"}</td>
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
                                    return <tr key={index} className='hover:bg-[#FAFAFA] cursor-default' onClick={() => handleJobprofileTableRowClick(element)}>
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