import { useEffect, useState, useRef } from "react";
import search from "../../../assets/MagnifyingGlass.png"
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllSalaryAsync } from "../../../redux/Slice/NewSalarySlice";
import { getAllPunchInPunchOutAsync } from "../../../redux/Slice/AttandenceSlice";
import SelectAll from "../../../assets/Select All.svg"
import ClearAll from "../../../assets/Clear-all.svg"
import { getAllGroupsAsync } from "../../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../../redux/Slice/JobProfileSlice";
import { getAllDepartmentAsync } from "../../../redux/Slice/departmentSlice";
import LoaderGif from "../../../assets/loadergif.gif";

import Calendar from "react-calendar";
// import * as XLSX from 'xlsx';
// import toast from "react-hot-toast";
// import { saveAs } from 'file-saver';


const options2 = [
    { label: 'Day' },
    { label: 'Night' },
];

export const NewSalaryPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
    const [filter, setFilter] = useState<any>({
        groupName: [""],
        jobProfileName: [""],
        departmentName: [""],
        employeeCodes: [""],
        page: 1,
        limit: 20,
        shifts: [""],
    });

    const salaryData = useSelector((state: any) => state.newSalary?.data?.salaryRecords);
    const salaryDataa = useSelector((state: any) => state.newSalary?.data?.count);
    // if(salaryDataa){
    //     

    // }
     useEffect(()=>{
        setTotal(salaryDataa);
     const newPageCount = Math.ceil(salaryDataa / filter.limit);
    setPageCount(newPageCount);
    if (page > newPageCount) {
     setPage(newPageCount);
    }

     },[limit])


    const loaderStatus = useSelector((state: any) => state.newSalary.status);
    console.log(loaderStatus)


    const totalSalaryA = useSelector((state: any) => state.newSalary?.data?.totalSalaryA);
    const totalSalaryB = useSelector((state: any) => state.newSalary?.data?.totalSalaryB);
    const totalSalaryC = useSelector((state: any) => state.newSalary?.data?.totalSalaryC);
    // console.log("uuuuuuuuuuuuuuuuuuuu", salaryData)

    const dispatch = useDispatch();



    const punchesData = useSelector((state: any) => state.attandence.punchInPunchOut);


    





    useEffect(() => {
        
        dispatch(getAllSalaryAsync(filter));
           dispatch(getAllPunchInPunchOutAsync());
    }, [filter]);
    useEffect(() => {
        //     // dispatch(getAllSalaryAsync(filter)).then((res: any) => {
        //     //     const Salarydata = res.payload.salaryRecords;
        //     //     console.log("aaaaaaaaaaaaaa", Salarydata)
        //     //     const arr = [];
    
        //     //     for (let i = 0; i < Salarydata.length; i++) {
        //     //         if (Salarydata[i].profilePicture) {
        //     //             arr.push({
        //     //                 name: Salarydata[i]?.attendance?.employeeId?.name,
        //     //                 jobProfileName: Salarydata[i]?.attendance?.employeeId.jobProfileId.jobProfileName,
        //     //             });
        //     //         }
        //     //         else {
        //     //             arr.push({
        //     //                 name: Salarydata[i]?.attendance?.employeeId.name,
        //     //                 profilePicture:
        //     //                     "https://cdn-icons-png.flaticon.com/512/219/219983.png",
        //     //                 jobProfileName: Salarydata[i]?.attendance?.employeeId.jobProfileId.jobProfileName,
        //     //             });
        //     //         }
        //     //     }
    
        //     //     setFetchedSuggestions(arr);
        //     // });
            dispatch(getAllGroupsAsync());
            dispatch(getAllJobProfileAsync());
            dispatch(getAllDepartmentAsync());
        }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setPage(newPage);
            setFilter({...filter,page:page})
        } else {
            setPage(1);
            setFilter({...filter,page:page})
        }
    }


    useEffect(() => {
       setFilter({...filter,limit:limit})
    }, [limit]);





    // filter

    const [isOpen1, setIsOpen1] = useState(false);
    const dropdownRef1 = useRef<HTMLDivElement | null>(null);

    const [isOpen2, setIsOpen2] = useState(false);
    const dropdownRef2 = useRef<HTMLDivElement | null>(null);

    const [isOpen3, setIsOpen3] = useState(false);
    const dropdownRef3 = useRef<HTMLDivElement | null>(null);

    const [isOpen4, setIsOpen4] = useState(false);
    const dropdownRef4 = useRef<HTMLDivElement | null>(null);

    const [isOpen5, setIsOpen5] = useState(false);
    const dropdownRef5 = useRef<HTMLDivElement | null>(null);


    const [isOpen7, setIsOpen7] = useState(false);
    const dropdownRef7 = useRef<HTMLDivElement | null>(null);





    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
                dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
                dropdownRef3.current && !dropdownRef3.current.contains(event.target) &&
                dropdownRef4.current && !dropdownRef4.current.contains(event.target) &&
                dropdownRef5.current && !dropdownRef5.current.contains(event.target) &&
                dropdownRef7.current && !dropdownRef7.current.contains(event.target)
            ) {
                setIsOpen1(false);
                setIsOpen2(false);
                setIsOpen3(false);
                setIsOpen4(false);
                setIsOpen5(false);
                setIsOpen7(false);
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
        setIsOpen5(false)
        setIsOpen7(false)
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen7(false)
    };

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen7(false)
    };

    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen5(false)
        setIsOpen7(false)
    };

    const toggleDropdown5 = () => {
        setIsOpen5(!isOpen5);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen7(false)
    };



    const toggleDropdown7 = () => {
        setIsOpen7(!isOpen7);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
    };


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
        const allProfiles = jobProfileList.map((element: any) => element.jobProfileName);
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
        const allProfiles = departmentList.map((element: any) => element.departmentName);
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
        const allProfiles = sortedgroupList.map((element: any) => element.groupName);
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


    const [, setSelectedDate] = useState(new Date());


    //   date
    const formatDateToYYMMDD = (date: any) => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date: any) => {
        setStartDate(date);
        setSelectedDate(date);
    };


    useEffect(() => {
        setFilter({
            ...filter,
            date: formatDateToYYMMDD(startDate),
        });
    }, [startDate]);





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



    const handleShiftCheckboxChange = (event: any) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedShifts((prevSelectedShifts) => [...prevSelectedShifts, value]);
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                shifts: [...prevFilter.shifts, value],
            }));
        } else {
            setSelectedShifts((prevSelectedShifts) =>
                prevSelectedShifts.filter((shift) => shift !== value)
            );
            setFilter((prevFilter: any) => ({
                ...prevFilter,
                shifts: prevFilter.shifts.filter((shift: any) => shift !== value),
            }));
        }
    };


    const selectAllShifts = () => {
        const allShifts = options2.map((option) => option.label);
        setSelectedShifts(allShifts);
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            shifts: allShifts,
        }));
    };

    const clearAllShifts = () => {
        setSelectedShifts([]);
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            shifts: [],
        }));
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


    


    return (
        <div className='p-[40px]'>
            <div className='flex flex-col gap-[10px]'>
                <div className="flex flex-col py-[10px] gap-6  flex-start">
                    <div className="flex-col flex gap-[20px] justify-between ">
                        <div className="flex justify-between ">
                            <div className="text-2xl font-bold text-[#2E2E2E]">
                                Salary Database
                            </div>
                        </div>

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


                        <div className='border flex gap-[15px] px-[15px] py-[13px] shadow-lg  border-solid border-[#DEDEDE] rounded-[8px]'>
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
                                                setInput(element.name);
                                                setFilter({
                                                    ...filter,
                                                    name: element.name,
                                                });
                                                setSuggestions([]);
                                            }}
                                            className="flex gap-3 p-3 hover:bg-[#F5F5F5] cursor-pointer"
                                        >
                                            <div>
                                                <img
                                                    src={element.profilePicture}
                                                    className="w-[50px] h-[50px] rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium #1C1C1C">
                                                    {element.name}
                                                </p>
                                                <p className="text-[12px] leading-5 font-normal text-[#757575]">
                                                    {element.jobProfileName}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

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
                                    </div>
                                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                        {sortedgroupList &&
                                            sortedgroupList.map((element: any, index: any) => (
                                                <label key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={element.groupName}
                                                        checked={filter.groupName.includes(element.groupName)}
                                                        onChange={handleGroupCheckboxChange}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                    />
                                                    <span>{element.groupName}</span>
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
                                    </div>
                                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                        {sortedDepartmentList &&
                                            sortedDepartmentList.map((element: any, index: any) => (
                                                <label key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={element.departmentName}
                                                        checked={filter.departmentName.includes(element.departmentName)}

                                                        onChange={handleDepartmentCheckboxChange}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                    />
                                                    <span>{element.departmentName}</span>
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
                                    </div>
                                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">

                                        {salaryData &&
                                            salaryData.map((element: any) => (
                                                <label key={element.id} className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={element.attendance?.employeeId.employeeCode}
                                                        checked={filter.employeeCodes.includes(element.attendance?.employeeId.employeeCode)}
                                                        onChange={handleEmployeeCheckboxChange}
                                                        className="form-checkbox h-5 w-5 text-blue-600"
                                                    />
                                                    {element.attendance?.employeeId.employeeCode}
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
                                    </div>
                                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                        {sortedjobProfileList &&
                                            sortedjobProfileList.map((element, index) => (
                                                <label key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={element.jobProfileName}
                                                        checked={filter.jobProfileName.includes(element.jobProfileName)}
                                                        onChange={handleJobCheckboxChange}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                                                    />
                                                    <span>{element.jobProfileName}</span>
                                                </label>
                                            ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="relative shadow-sm inline-block text-left" ref={dropdownRef5}>
                            <button
                                type="button"
                                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E] focus:outline-none"
                                onClick={toggleDropdown5}
                            >
                                {startDate ? `${startDate.toDateString()}` : 'Select a Date'}
                            </button>
                            {isOpen5 && (
                                <div className="absolute left-0 mt-2 w-[300px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 space-y-2  overflow-y-auto">
                                        <Calendar
                                            value={startDate}
                                            onChange={handleDateChange}
                                            tileClassName={({ date }) =>
                                                date.toDateString() === startDate.toDateString()
                                                    ? 'text-black selected-date'
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative shadow-sm inline-block text-left" ref={dropdownRef7}>
                            <button
                                type="button"
                                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                                onClick={toggleDropdown7}
                            >
                                Shift
                            </button>

                            {isOpen7 && (
                                <div className=" absolute left-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="flex flex-row px-4 py-2 gap-3">
                                        <img src={SelectAll} onClick={selectAllShifts} className="h-5 w-5 b" />
                                        <img src={ClearAll} onClick={clearAllShifts} className="h-5 w-5 " />
                                    </div>
                                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                                        {options2.map((option) => (
                                            <label
                                                key={option.label}
                                                className="flex items-center gap-[10px] justify-between px-4 py-2 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    value={option.label}
                                                    checked={selectedShifts.includes(option.label)}
                                                    onChange={handleShiftCheckboxChange}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>

                <hr />


                {loaderStatus === "loading" ? (

                    <div className="flex flex-start pt-[25px] gap-6">
                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary A
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">

                                0
                            </div>
                        </div>


                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary B
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                0
                            </div>
                        </div>

                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary C
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                0
                            </div>
                        </div>


                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Punch in
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                0
                            </div>
                        </div>




                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Present
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                0
                            </div>
                        </div>

                    </div>

                ) : (


                    <div className="flex flex-start pt-[25px] gap-6">
                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary A
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">

                                {totalSalaryA !== undefined ? totalSalaryA.toFixed(2) : "-"}
                            </div>
                        </div>


                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary B
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                {totalSalaryB !== undefined ? totalSalaryB.toFixed(2) : "-"}
                            </div>
                        </div>

                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Salary C
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                {totalSalaryC !== undefined ? totalSalaryC.toFixed(2) : "-"}
                            </div>
                        </div>


                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Punch in
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                {punchesData && punchesData.countIn ? punchesData.countIn : 0}
                            </div>
                        </div>




                        <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                            <p className="text-[14px] font-medium  text-[#2E2E2E]">
                                Total Present
                            </p>
                            <div className="flex text-[24px] font-bold justify-center items-center">
                                {punchesData && punchesData.totalPresent ? punchesData.totalPresent : 0}
                            </div>
                        </div>




                    </div >

                )}



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
                                            Date
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
                                            Total Working Hours by Database
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary Per Hours
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Punch IN BY
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Punch IN
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Punch Out BY
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Punch Out
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Shift
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Status
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Approved by
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Actual working hour By Records
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Total Workinghours
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Dutyhours
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Actual Duty hour
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Over Time
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Earning in a day/Salary A
                                        </td>

                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary B
                                        </td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                            Salary C
                                        </td>

 
                                    </tr>

                                    {salaryData && salaryData
                                        .map((element: any, index: any) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.firstPunchIn ? element?.firstPunchIn.slice(0, 10) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.employeeCode ? element?.attendance?.employeeId?.employeeCode : "-"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.name ? element?.attendance?.employeeId?.name : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.groupId?.groupName ? element?.attendance?.employeeId?.groupId?.groupName : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.jobProfileId?.department?.departmentName ? element?.attendance?.employeeId?.jobProfileId?.department?.departmentName : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.jobProfileId?.jobProfileName ? element?.attendance?.employeeId?.jobProfileId?.jobProfileName : "-"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.overTime ? "Yes" : "No"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.employee?.salary ? element?.employee?.salary?.toFixed(2) : "-"}
                                                </td>


                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.workingHours ? element?.attendance?.employeeId?.workingHours?.toFixed(2) : "-"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.employeeId?.lunchTime ? element.attendance?.employeeId.lunchTime + " hours" : "-"}
                                                </td>



                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.totalWorkingHours ? element.totalWorkingHours?.toFixed(2) : "-"}
                                                </td>


                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.salaryPerHours ? element.salaryPerHours?.toFixed(2) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.punches[0]?.punchInBy?.name || "-"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.firstPunchIn ? element?.firstPunchIn.slice(11, 16) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.punches[0]?.punchOutBy?.name || "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.lastPunchOut ? element?.lastPunchOut.slice(11, 16) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance ? element?.attendance?.shift : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.status || "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.attendance?.approvedBy?.name || "-"}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.actualworkingHoursbyRecord?.toFixed(2) || 0}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.finalWorkingHours?.toFixed(2) || 0}

                                                </td>
                                                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.dutyHours?.toFixed(2) || 0}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.actualWorkinghours?.toFixed(2) || 0}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.overTime || 0}
                                                </td>

                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.salaryA !== undefined ? element.salaryA?.toFixed(2) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.salaryB !== undefined ? element.salaryB?.toFixed(2) : "-"}
                                                </td>
                                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                                    {element?.salaryC !== undefined ? element.salaryC?.toFixed(2) : "-"}
                                                </td>

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
                                    if (selectedLimit === total) {
                                        setLimit(total);
                                        setPage(1);
                                    } else {
                                        setLimit(selectedLimit);
                                        setPage(1);
                                    }
                                }}
                            >
                                <option value="">select</option>
                                <option value="10">10</option>
                                <option value="1">1</option>
                                <option value="20">20</option>
                                <option value={total} selected={limit === total}>
                                    All
                                </option>
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
            </div >


        </div >
    )
}