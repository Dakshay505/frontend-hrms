import { useEffect, useState } from "react";
import search from "../assets/MagnifyingGlass.png"
import { useDispatch, useSelector } from "react-redux";

import { getAllMonthlyReportAsync } from "../redux/Slice/NewSalarySlice";
import { getAllPunchInPunchOutAsync } from "../redux/Slice/AttandenceSlice";
import { getAllGroupsAsync } from "../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../redux/Slice/JobProfileSlice";
import { getAllDepartmentAsync } from "../redux/Slice/departmentSlice";
import LoaderGif from "../assets/loadergif.gif";

import * as XLSX from 'xlsx';
import toast from "react-hot-toast";
import { saveAs } from 'file-saver';

import CaretLeft from "../assets/CaretLeft.svg";
import CaretRight1 from "../assets/CaretRight1.svg";
import Multiselect from 'multiselect-react-dropdown';

export const MonthlyReport = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const monthlyData = useSelector((state: any) => state.newSalary?.data?.salaryRecords);
    // console.log("uuuuuuuuuuuuuuuuuuuu", monthlyData)

    const pageData = useSelector((state: any) => state.newSalary?.data?.count)
    console.log(pageData)


    const loaderStatus = useSelector((state: any) => state.newSalary.status);
    console.log(loaderStatus)

    const dispatch = useDispatch();

    useEffect(() => {
        setTotalPage(Math.ceil(pageData / filter.limit));
    }, [pageData]);

    useEffect(() => {
        setFilter({ ...filter, page: page });
    }, [page]);


    const [pagiArrIncludes, setPagiArrIncludes] = useState<any>([]);

    useEffect(() => {
        setPagiArrIncludes([page - 1]);
    }, [page]);
    const pagination = () => {
        const element = [];
        for (let i = 0; i < totalPage; i++) {
            element.push(
                <p
                    onClick={() => {
                        setPage(i + 1);
                        setPagiArrIncludes([i]);
                    }}
                    className={`${pagiArrIncludes.includes(i) ? "bg-[#ECEDFE]" : ""
                        } rounded-full px-3 cursor-pointer`}
                    key={i}
                >
                    {i + 1}
                </p>
            );
        }
        return element;
    };

    const [filter, setFilter] = useState<any>({
        groupName: [""],
        jobProfileName: [""],
        departmentName: [""],
        employeeCodes: [""],
        page: 1,
        limit: 20,
    });


    useEffect(() => {
        console.log(filter)
        dispatch(getAllMonthlyReportAsync(filter));
        dispatch(getAllPunchInPunchOutAsync());
    }, [filter.limit, filter.page,  filter.groupName, filter.departmentName, filter.jobProfileName, filter.employeeCodes]);

    useEffect(() => {
        dispatch(getAllMonthlyReportAsync());
    }, []);

    // filters

    const groupList = useSelector((state: any) => state.group.groups);
    const sortedgroupList = [...groupList].sort((a, b) => a.groupName.localeCompare(b.groupName));


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



    const handleJobCheckboxChange = (selectedList: any) => {
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            jobProfileName: selectedList.map((item: any) => item.jobProfileName),
        }));
    };

    const handleGroupCheckboxChange = (selectedList: any) => {
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            groupName: selectedList.map((item: any) => item.groupName),
        }));
    };

    const handleDepartmentCheckboxChange = (selectedList: any) => {
        setFilter((prevFilter: any) => ({
            ...prevFilter,
            departmentName: selectedList.map((item: any) => item.departmentName),
        }));
    };



    const handleEmployeeCodeChange = (selectedList: any) => {
        const employeeCodes = selectedList.map((item: any) => item.name);
        setFilter((prevFilter: any) => ({ ...prevFilter, employeeCodes }));
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
    // console.log("ExcelData---------------------", ExcelData);

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

                        <div className='flex py-[20px] gap-[10px] flex-wrap'>


                            <Multiselect
                                options={sortedgroupList}
                                selectedValues={sortedgroupList.filter(item => filter.groupName.includes(item.groupName))}
                                onSelect={handleGroupCheckboxChange}
                                onRemove={handleGroupCheckboxChange}
                                displayValue="groupName"
                                placeholder="Select Group"
                            />



                            <Multiselect
                                options={sortedDepartmentList}
                                selectedValues={sortedDepartmentList.filter(item => filter.departmentName.includes(item.departmentName))}
                                onSelect={handleDepartmentCheckboxChange}
                                onRemove={handleDepartmentCheckboxChange}
                                displayValue="departmentName"
                                placeholder="Select Department"
                            />


                            <Multiselect
                                options={sortedjobProfileList}
                                selectedValues={sortedjobProfileList.filter(item => filter.jobProfileName.includes(item.jobProfileName))}
                                onSelect={handleJobCheckboxChange}
                                onRemove={handleJobCheckboxChange}
                                displayValue="jobProfileName"
                                placeholder="Select Job Profile"
                            />


                            <Multiselect
                                options={monthlyData.map((element:any) => ({
                                    id: element?.id,
                                    name: element?.employee?.employeeCode,
                                }))}
                                selectedValues={[]}
                                onSelect={handleEmployeeCodeChange}
                                onRemove={handleEmployeeCodeChange}
                                displayValue="name"
                            />

                            <div className="border flex  border-solid font-bold border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[40px] text-sm  text-[#2E2E2E]  focus:outline-none">
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


                                <div className='border flex gap-[15px] h-[40px] items-center px-[15px] py-[13px]  border-solid border-[#DEDEDE] rounded-[8px]'>
                                    <img src={search} alt="" className='w-[20px] h-[20px]' />
                                    <input type="search" value={input} onChange={handleInputChange} className='outline-none w-full ' placeholder="Search" />
                                </div>


                                {suggestions.length > 0 && (
                                    <div className="absolute z-50 top-[19rem] flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
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

                    <div className="flex gap-4 items-center justify-center">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}
                        >

                            <img src={CaretLeft} alt="" />{" "}
                        </div>
                        {pagination().map((element: any, index) => {
                            if (pagiArrIncludes.includes(index) && element) {
                                return (
                                    <div key={index} className="flex">
                                        {filter.page > 2 ? "..." : ""}
                                        {filter.page === 1 ? "" : pagination()[index - 1]}
                                        {pagination()[index]}
                                        {pagination()[index + 1]}
                                        {filter.page === 1 ? pagination()[index + 2] : ""}
                                        {filter.page >= totalPage - 1 ? "" : "..."}
                                    </div>
                                );
                            }
                        })}
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                if (page !== totalPage) {
                                    setPage(page + 1);
                                }
                            }}
                        >
                            <img src={CaretRight1} alt="" />
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}