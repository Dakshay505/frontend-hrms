import { useEffect, useState, useRef } from "react";
import search from "../assets/MagnifyingGlass.png"
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import SelectAll from "../assets/Select All.svg"
import ClearAll from "../assets/Clear-all.svg"
import { getAllMonthlyReportAsync } from "../redux/Slice/NewSalarySlice";
import { getMonthlyReportsApi } from "../redux/API/NewSalaryApi";
import { getAllPunchInPunchOutAsync } from "../redux/Slice/AttandenceSlice";
import { getAllGroupsAsync } from "../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../redux/Slice/JobProfileSlice";
import { getAllDepartmentAsync } from "../redux/Slice/departmentSlice";
import LoaderGif from "../assets/loadergif.gif";

import * as XLSX from 'xlsx';
import toast from "react-hot-toast";
import { saveAs } from 'file-saver';



export const MonthlyReport = () => {
    const [limit, setLimit] = useState(20);
    const [apply,setApply]=useState(false)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const monthlyData = useSelector((state: any) => state.newSalary?.data?.salaryRecords);
    // console.log("uuuuuuuuuuuuuuuuuuuu", monthlyData)

    const loaderStatus = useSelector((state: any) => state.newSalary.status);
    console.log(loaderStatus)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMonthlyReportAsync({ limit, page }));
    }, [limit, page, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const filter = {
                limit: 20,
                page: 1,
            };

            try {
                const data = await getMonthlyReportsApi(filter);
                console.log("data", data);

                setTotal(data.count);
                const newPageCount = Math.ceil(data.count / filter.limit);
                setPageCount(newPageCount);
                if (page > newPageCount) {
                    setPage(newPageCount);
                }
            } catch (error) {
                console.error("Error fetching new salary data:", error);
            }
        };

        fetchData();

    }, [limit, page]);


    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setPage(newPage);
            dispatch(getAllMonthlyReportAsync({ page: newPage, limit }));
        } else {
            setPage(1);
            dispatch(getAllMonthlyReportAsync({ page: 1, limit }));
        }
    }


    useEffect(() => {
        dispatch(getAllMonthlyReportAsync({ limit, page }));
    }, [limit, page, dispatch]);



    const [filter, setFilter] = useState<any>({
        groupName: [""],
        jobProfileName: [""],
        departmentName: [""],
        employeeCodes: [""],
        page: 1,
        limit: 20,

    });


    useEffect(() => {

        //console.log(filter)

        dispatch(getAllMonthlyReportAsync(filter));
        dispatch(getAllPunchInPunchOutAsync());
    }, [filter.limit,filter.page,apply]);


    // filter

    const [isOpen1, setIsOpen1] = useState(false);
    const dropdownRef1 = useRef<HTMLDivElement | null>(null);

    const [isOpen2, setIsOpen2] = useState(false);
    const dropdownRef2 = useRef<HTMLDivElement | null>(null);

    const [isOpen3, setIsOpen3] = useState(false);
    const dropdownRef3 = useRef<HTMLDivElement | null>(null);

    const [isOpen4, setIsOpen4] = useState(false);
    const dropdownRef4 = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
                dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
                dropdownRef3.current && !dropdownRef3.current.contains(event.target) &&
                dropdownRef4.current && !dropdownRef4.current.contains(event.target)
            ) {
                setIsOpen1(false);
                setIsOpen2(false);
                setIsOpen3(false);
                setIsOpen4(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown1 = () => {
        if (!isOpen1) {
            setIsOpen1(true);
        } else {
            setIsOpen1(false);

            setFilter((prevFilter: any) => ({
                ...prevFilter,
                groupName: [],
            }));
        }
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false)
        setIsOpen3(false)
        setIsOpen4(false)
    };

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen4(false)
    };

    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
    };

    useEffect(() => {
        dispatch(getAllMonthlyReportAsync());
    }, []);

    // filters

    const groupList = useSelector((state: any) => state.group.groups);
    const sortedgroupList = [...groupList].sort((a: any, b: any) => a.groupName.localeCompare(b.groupName));

    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const sortedjobProfileList = [...jobProfileList].sort((a: any, b: any) =>
        a.jobProfileName.localeCompare(b.jobProfileName)
    );


    const departmentList = useSelector((state: any) => state.department.department)
    const sortedDepartmentList = [...departmentList].sort((a: any, b: any) =>
        a.departmentName.localeCompare(b.departmentName)
    );




    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
        dispatch(getAllDepartmentAsync());
        dispatch(getAllMonthlyReportAsync());

    }, []);



    const handleJobCheckboxChange = (event: any) => {
        const { value, checked } = event.target;

        if (checked) {
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobProfileName: [...prevFilter.jobProfileName, value],
            }));

        } else {
            setFilter({
                ...filter,
                jobProfileName: filter.jobProfileName.filter((profile: any) => profile !== value),
            });
        }
    };

    const handleGroupCheckboxChange = (event: any) => {
        const { value, checked } = event.target;


        if (checked) {
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                groupName: [...prevFilter.groupName, value],
            }));

        } else {
            setFilter({
                ...filter,
                groupName: filter.groupName.filter((profile: any) => profile !== value),
            });
        }
    };
    const handleDepartmentCheckboxChange = (event: any) => {
        const { value, checked } = event.target;


        if (checked) {
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                departmentName: [...prevFilter.departmentName, value],
            }));

        } else {
            setFilter({
                ...filter,
                departmentName: filter.departmentName.filter((profile: any) => profile !== value),
            });
        }
    };



    const selectAll = () => {
        const allProfiles = jobProfileList.map((element: any) => element?.jobProfileName);
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            jobProfileName: allProfiles,
        }));
    };

    const clearAll = () => {
        setFilter({
            ...filter,
            jobProfileName: [],
        });
    };
    const selectDepartmentAll = () => {
        const allProfiles = departmentList.map((element: any) => element?.departmentName);
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            departmentName: allProfiles,
        }));
    };

    const clearDepartmentAll = () => {
        setFilter({
            ...filter,
            departmentName: [],
        });
    };
    const selectGroupAll = () => {
        const allProfiles = sortedgroupList.map((element?: any) => element?.groupName);
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            groupName: allProfiles,
        }));
    };

    const clearGroupAll = () => {
        setFilter({
            ...filter,
            groupName: [],
        });
    };


    // useEffect(() => {
    //     dispatch(getAllMonthlyReportAsync(filter));
    //     dispatch(getAllPunchInPunchOutAsync());

    // }, [filter]);


    const handleEmployeeCheckboxChange = (event: any) => {
        const { value, checked } = event.target;

        if (checked) {
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                employeeCodes: [...prevFilter.employeeCodes, value],
            }));
        } else {
            setFilter({
                ...filter,
                employeeCodes: filter.employeeCodes.filter((code: any) => code !== value),
            });
        }
    };


    // search 
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState<any>([]);
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    const [isLabelVisible, setLabelVisible] = useState(true);



    const getSuggestions = (inputValue: any) => {
        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion.name?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };


    const handleInputChange = (event: any) => {
        setInput(event.target.value);
        setFilter({
            ...filter,
            name: event.target.value,
        });
        if (event.target.value !== "") {
            setPage(1);
            setLabelVisible(false);
            getSuggestions(event.target.value);
        } else {
            setLabelVisible(true);
            setSuggestions([]);
        }


    };

    useEffect(() => {
        dispatch(getAllMonthlyReportAsync(filter)).then((res: any) => {
            const monthlyData = res.payload.salaryRecords;
            console.log("aaaaaaaaaaaaaa", monthlyData)
            const arr = [];

            for (let i = 0; i < monthlyData.length; i++) {
                if (monthlyData[i].profilePicture) {
                    arr.push({
                        name: monthlyData[i]?.employee?.name,
                        jobProfileName: monthlyData[i]?.employee.jobProfileId.jobProfileName,
                    });
                }
                else {
                    arr.push({
                        name: monthlyData[i]?.employee.name,
                        profilePicture:
                            "https://cdn-icons-png.flaticon.com/512/219/219983.png",
                        jobProfileName: monthlyData[i]?.employee.jobProfileId.jobProfileName,
                    });
                }
            }

            setFetchedSuggestions(arr);
        });
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
        dispatch(getAllDepartmentAsync());

    }, []);


    useEffect(() => {
        dispatch(getAllMonthlyReportAsync(filter)).then((res: any) => {
            const Salarydata = res.payload.salaryRecords;
            console.log("aaaaaaaaaaaaaa", Salarydata)
            const arr = [];

            for (let i = 0; i < Salarydata.length; i++) {
                if (Salarydata[i].profilePicture) {
                    arr.push({
                        name: Salarydata[i]?.employee?.name,
                        jobProfileName: Salarydata[i]?.employee.jobProfileId.jobProfileName,
                    });
                }
                else {
                    arr.push({
                        name: Salarydata[i]?.employee.name,
                        profilePicture:
                            "https://cdn-icons-png.flaticon.com/512/219/219983.png",
                        jobProfileName: Salarydata[i]?.employee.jobProfileId.jobProfileName,
                    });
                }
            }

            setFetchedSuggestions(arr);
        });
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
        dispatch(getAllDepartmentAsync());

    }, []);

    const [selectedMonth, setSelectedMonth] = useState("");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleMonthChange = (event: any) => {
        const selectedMonthName = event.target.value;
        setSelectedMonth(selectedMonthName);

        const year = new Date().getFullYear();
        const monthIndex = months.findIndex((month) => month === selectedMonthName);

        if (monthIndex !== -1) {
            const startDate = new Date(year, monthIndex, 1);
            const endDate = new Date(year, monthIndex + 1, 0);

            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            setFilter((prevFilter: any) => ({
                ...prevFilter,
                date: formattedStartDate,
                nextDate: formattedEndDate,
            }));
        }
    };

    useEffect(() => {
        // Set the default selected month to the current month
        const currentDate = new Date();
        const currentMonthName = months[currentDate.getMonth()];
        setSelectedMonth(currentMonthName);
    }, []);







    const ExcelData = useSelector((state: any) => state.newSalary?.data?.salaryRecords);
    console.log("ExcelData---------------------", ExcelData);

    const exportToExcel = () => {
        const columnOrder = [
            'Employee Code',
            'Employee Name',
            'Group Name',
            'Department',
            'Job Profile',
            'OverTime',
            'Salary',
            'Duty hour required',
            'Lunch',
            'Total Working Hours',
            'Salary Per Hours',
            'duty per month',
            'no. of duty',
            'approved duty',
            'sum actual working hour',
            'sum Final Workinghours',
            'sum Dutyhours',
            'Over Time Hours',
            'Earn in a day/ Salary A',
            'Salary B',
            'salary C',
        ];

        if (ExcelData && ExcelData.length > 0) {
            const modifiedData = ExcelData.map((record: any) => {
                const mappedData: any = {};

                for (const column of columnOrder) {
                    switch (column) {
                        case 'Employee Code':
                            mappedData[column] = record.employee?.employeeCode || '-';
                            break;
                        case 'Employee Name':
                            mappedData[column] = record.employee?.name || '-';
                            break;
                        case 'Group Name':
                            mappedData[column] = record.employee?.groupId?.groupName || '-';
                            break;
                        case 'Department':
                            mappedData[column] = record.employee?.jobProfileId?.department.departmentName || '-';
                            break;
                        case 'Job Profile':
                            mappedData[column] = record.employee?.jobProfileId?.jobProfileName || '-';
                            break;
                        case 'OverTime':
                            mappedData[column] = record.employee?.overTime ? 'Yes' : 'No';
                            break;
                        case 'Salary':
                            mappedData[column] = record.employee?.salary || '-';
                            break;
                        case 'Duty hour required':
                            mappedData[column] = record.employee?.workingHours || '-';
                            break;
                        case 'Lunch':
                            // Fill this field with your data logic or use a placeholder '-'
                            mappedData[column] = record.employee?.lunchTime || '-';
                            break;
                        case 'Total Working Hours':
                            mappedData[column] = record.totalWorkingHours || '-';
                            break;
                        case 'Salary Per Hours':
                            mappedData[column] = record.salaryPerHours?.toFixed(2) || '-';
                            break;
                        case 'duty per month':
                            mappedData[column] = record.dutyPerMonth || '-';
                            break;
                        case 'no. of duty':
                            mappedData[column] = record.numberofduty || '-';
                            break;
                        case 'approved duty':
                            mappedData[column] = record.approvedduty || '-';
                            break;
                        case 'sum actual working hour':
                            mappedData[column] = record.totalactual?.toFixed(2) || '-';
                            break;
                        case 'sum Final Workinghours':
                            mappedData[column] = record.sumFinalWorkingHours?.toFixed(2) || '-';
                            break;
                        case 'sum Dutyhours':
                            mappedData[column] = record.sumDutyHours?.toFixed(2) || '-';
                            break;
                        case 'Over Time Hours':
                            mappedData[column] = record.overTime?.toFixed(2) || '-';
                            break;
                        case 'Earn in a day/ Salary A':
                            mappedData[column] = record.salaryA || '-';
                            break;
                        case 'Salary B':
                            mappedData[column] = record.salaryB || '-';
                            break;
                        case 'salary C':
                            mappedData[column] = record.salaryC || '-';
                            break;
                        default:
                            mappedData[column] = '-';
                    }
                }

                return mappedData;
            });

            const ws = XLSX.utils.json_to_sheet(modifiedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Monthly Report Data');
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Monthly Report.xlsx');
            toast.success("Excel Downloaded Successfully");
        } else {
            toast.error("Please Wait, Data Is Loading");
        }
    };





    return (
        <div className='p-[40px]'>
            <div className='flex flex-col gap-[10px]'>
                <div className="flex flex-col py-[10px] gap-6  flex-start">
                    <div className="flex-col flex gap-[20px] justify-between ">
                        <div className="flex justify-between ">
                            <div className="text-2xl font-bold text-[#2E2E2E]">
                                Monthly Report
                            </div>

                            <div onClick={exportToExcel} className="flex cursor-pointer   gap-[5px]  items-center px-[15px] h-9 w-30 bg-[#244a1d] rounded-lg">

                                <p className="text-sm  font-medium whitespace-nowrap text-[#FFFFFF] tracking-[0.25px] ">Export to Excel</p>
                            </div>
                        </div>

                        <div className='flex py-[20px] gap-[10px]'>

                            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef1}>
                                <button
                                    type="button"
                                    className="border border-solid border-[#DEDEDE] font-bold  bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm  text-[#2E2E2E]  focus:outline-none"
                                    onClick={toggleDropdown1}
                                >
                                    All Group
                                </button>

                                {isOpen1 && (
                                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">

                                        <div className="flex flex-row p-2 gap-3">
                                            <img src={SelectAll} onClick={selectGroupAll} className="h-5 w-5 b" />
                                            <img src={ClearAll} className="h-5 w-5 " onClick={clearGroupAll} />
                                            <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                                             Apply
                                        </div>
                                        </div>
                                        <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                            {sortedgroupList &&
                                                sortedgroupList.map((element: any, index: any) => (
                                                    <label key={index} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            value={element.groupName}
                                                            checked={filter.groupName.includes(element?.groupName)}
                                                            onChange={handleGroupCheckboxChange}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                        />
                                                        <span>{element?.groupName}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef2}>
                                <button
                                    type="button"
                                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                                    onClick={toggleDropdown2}

                                >
                                    Department
                                </button>

                                {isOpen2 && (
                                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">

                                        <div className="flex flex-row p-2 gap-3">
                                            <img src={SelectAll} onClick={selectDepartmentAll} className="h-5 w-5 b" />
                                            <img src={ClearAll} className="h-5 w-5 " onClick={clearDepartmentAll} />
                                            <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                                             Apply
                                        </div>
                                        </div>
                                        <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                            {sortedDepartmentList &&
                                                sortedDepartmentList.map((element: any, index: any) => (
                                                    <label key={index} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            value={element?.departmentName}
                                                            checked={filter.departmentName.includes(element?.departmentName)}

                                                            onChange={handleDepartmentCheckboxChange}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                        />
                                                        <span>{element?.departmentName}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef3}>
                                <button
                                    type="button"
                                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                                    onClick={toggleDropdown3}

                                >
                                    Employee Code
                                </button>

                                {isOpen3 && (
                                    <div className=" absolute left-0 mt-2 w-[200px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="flex flex-row px-4 py-2 gap-3">
                                            <img src={SelectAll} className="h-5 w-5 b" />
                                            <img src={ClearAll} className="h-5 w-5 " />
                                            <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                                             Apply
                                        </div>
                                        </div>
                                        <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">

                                            {monthlyData &&
                                                monthlyData.map((element?: any) => (
                                                    <label key={element?.id} className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={element?.employee?.employeeCode}
                                                            checked={filter.employeeCodes.includes(element?.employee?.employeeCode)}
                                                            onChange={handleEmployeeCheckboxChange}
                                                            className="form-checkbox h-5 w-5 text-blue-600"
                                                        />
                                                        {element?.employee?.employeeCode}
                                                    </label>
                                                ))}

                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef4}>
                                <button
                                    type="button"
                                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                                    onClick={toggleDropdown4}

                                >
                                    Job Profile
                                </button>


                                {isOpen4 && (
                                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">

                                        <div className="flex flex-row p-2 gap-3">
                                            <img src={SelectAll} onClick={selectAll} className="h-5 w-5 b" />
                                            <img src={ClearAll} className="h-5 w-5 " onClick={clearAll} />
                                            <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                                             Apply
                                        </div>
                                        </div>
                                        <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                            {sortedjobProfileList &&
                                                sortedjobProfileList.map((element, index) => (
                                                    <label key={index} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            value={element?.jobProfileName}
                                                            checked={filter.jobProfileName.includes(element?.jobProfileName)}
                                                            onChange={handleJobCheckboxChange}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                        />
                                                        <span>{element?.jobProfileName}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="border flex  border-solid font-bold border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm  text-[#2E2E2E]  focus:outline-none">
                                <select value={selectedMonth} className="bg-[#FAFAFA] outline-none" onChange={handleMonthChange}>
                                    <option value="" className="font-bold">Select a month</option>
                                    {months.map((month, index) => (
                                        <option key={index} className="font-bold" value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                {isLabelVisible && (
                                    <div className="absolute top-[10px] left-6">
                                        <label
                                            htmlFor="searchInput"
                                            className="flex gap-2 items-center cursor-text"
                                        >
                                            <img src={search} alt="" className="h-4 w-4" />
                                            <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                                        </label>
                                    </div>
                                )}


                                <div className='border flex gap-[15px] h-[60px] items-center px-[15px] py-[13px] shadow-lg  border-solid border-[#DEDEDE] rounded-[8px]'>
                                    <img src={search} alt="" className='w-[20px] h-[20px]' />
                                    <input type="search" value={input} onChange={handleInputChange} className='outline-none w-full ' placeholder="Search" />
                                </div>


                                {suggestions.length > 0 && (
                                    <div className="absolute z-50 top-[15rem] flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
                                        {suggestions.map((element: any, index: any) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setInput(element?.name);
                                                        setFilter({
                                                            ...filter,
                                                            name: element?.name,
                                                        });
                                                        setSuggestions([]);
                                                    }}
                                                    className="flex gap-3 p-3 hover:bg-[#F5F5F5] cursor-pointer"
                                                >
                                                    <div>
                                                        <img
                                                            src={element?.profilePicture}
                                                            className="w-[50px] h-[50px] rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium #1C1C1C">
                                                            {element?.name}
                                                        </p>
                                                        <p className="text-[12px] leading-5 font-normal text-[#757575]">
                                                            {element?.jobProfileName}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                        </div>





                    </div>


                </div>

                <hr />


                <div className="py-6 mb-24">
                    {loaderStatus === "loading" ? (
                        <div className="flex justify-center w-full">
                            <img src={LoaderGif} className="w-6 h-6" alt="" />
                        </div>
                    ) : (
                        ""
                    )
                    }
                    {loaderStatus !== "loading" &&
                        <div className="table-container" style={{ overflowY: 'auto' }}>
                            <table className="w-full">

                                <tbody >
                                    <tr className="bg-[#ECEDFE] cursor-default">
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Sr No.
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Employee Code
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Employee Name
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Group Name
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Department
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Job Profile
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            OverTime
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Duty hour required
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Lunch
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Total Working Hours
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary Per Hours
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            duty per month

                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            no. of duty

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            approved duty

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            sum actual working hour

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            sum Final Workinghours

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            sum Dutyhours

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Over Time Hours

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Earn in a day/ Salary A

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary B

                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            salary c

                                        </td>


                                    </tr>

                                    {monthlyData && monthlyData.map((element: any, index: any) => (
                                        <tr key={index}>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{index + 1}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.employeeCode}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.name}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.groupId?.groupName}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.jobProfileId?.department?.departmentName}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.jobProfileId?.jobProfileName}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.overTime ? 'Yes' : 'No'}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.salary}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.workingHours}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.employee?.lunchTime}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.totalWorkingHours}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.salaryPerHours?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.dutyPerMonth}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.numberofduty}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.approvedduty}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.totalactual?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.sumFinalWorkingHours?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.sumDutyHours?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.overTime?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.salaryA?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.salaryB?.toFixed(2)}</td>
                                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">{element?.salaryC?.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody >
                            </table>
                        </div>}

                    <div className="flex bg-white border-t-2 border-gray-100 py-6 text-sm">
                        <div className="px-3">
                            <select
                                className="bg-theme-btn-gray px-2 py-0.5 border-2 text-zinc-500 border-gray-50 rounded-lg"
                                value={limit.toString()}
                                onChange={(event) => {
                                    const selectedLimit = Number(event.target.value);
                                    console.log("aaaaaa", selectedLimit)
                                    if (selectedLimit === total) {
                                        setLimit(total);
                                        setPage(1);
                                        dispatch(getAllMonthlyReportAsync({ page: 1, limit: total }));
                                    } else {
                                        setLimit(selectedLimit);
                                        setPage(1);
                                        dispatch(getAllMonthlyReportAsync({ page: 1, limit: selectedLimit }));
                                    }
                                }}
                            >
                                <option value="">select</option>
                                <option value="10">10</option>
                                <option value="1">1</option>
                                <option value="20">20</option>

                            </select>

                            <label className="text-zinc-400 pl-2">Items per page</label>
                            <label className="text-zinc-700 pl-4">{(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} items</label>
                        </div>
                        <div className="ml-auto px-6 flex items-center">
                            <div
                                className="bg-theme-btn-gray px-2 py-0.5 border-2 text-zinc-500 border-gray-50 rounded-lg"
                            >
                                <p>{page}</p>
                            </div>
                            <label className="text-zinc-700 pl-2">of {pageCount} pages</label>
                            <label className="text-zinc-700 pl-4">
                                <div className="inline-block">
                                    <button onClick={() => handlePageChange(page - 1)}>
                                        <Icon
                                            className="inline-block"
                                            icon="ic:round-keyboard-arrow-left"
                                            width="20"
                                        />
                                    </button>
                                    <button onClick={() => handlePageChange(page + 1)}>
                                        <Icon
                                            className="inline-block"
                                            icon="material-symbols:keyboard-arrow-right"
                                            width="20"
                                        />
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}