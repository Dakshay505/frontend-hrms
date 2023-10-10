import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployeeAsync,
  getEmployeeImageAsync,
  EmployeeBarCodesAsync
} from "../../redux/Slice/EmployeeSlice";
import {
  getAllGroupsAsync,
  getAllGroupsCountEmployeeAsync,

} from "../../redux/Slice/GroupSlice";
import { useNavigate } from "react-router-dom";

import {

  getAllJobProfileAsync,

} from "../../redux/Slice/JobProfileSlice";
import glass from "../../assets/MagnifyingGlass.png";
import LoaderGif from "../../assets/loadergif.gif";
import CaretLeft from "../../assets/CaretLeft.svg";
import CaretRight1 from "../../assets/CaretRight1.svg";
import {

  getAllDepartmentAsync,
  getAllParentDepartmentAsync,
} from "../../redux/Slice/departmentSlice";

import SelectAll from "../../assets/Select All.svg"
import ClearAll from "../../assets/Clear-all.svg"
import toast from "react-hot-toast";

import { allShopAsync } from "../../redux/Slice/ShopSlice";
import { getLoggedInUserDataAsync } from "../../redux/Slice/loginSlice";

const MonthlyReport = () => {
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [filter, setFilter] = useState({
    name: localStorage.getItem("name") || "",
    //groupName: localStorage.getItem("groupName") || "",
    groupName: [""],
    //jobProfileName: localStorage.getItem("jobProfileName") || "",
    jobProfileName: [""],
    page: 1,
    limit: 20,
    aadhar: "0",
    createdSort:"",
    updatedSort:"",
  });
  const changetime = (createdAtDate: any) => {
    const date = new Date(createdAtDate)
    const hours = date.getUTCHours(); // Get the hours in UTC
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = (hours % 12) || 12; // Use 12 for 0 hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    return formattedTime;
  }

  useEffect(() => {
    console.log("filter", filter)
    dispatch(getAllEmployeeAsync(filter)).then((data: any) => {
      setCount(data.payload.count);
      const employeeData = data.payload.employees;
      //console.log("djhjhjhjhjhj",employeeData)
      const arr = [];
      // localStorage.setItem("groupName", filter.groupName);
      // localStorage.setItem("jobProfileName", filter.jobProfileName);
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].profilePicture) {
          arr.push({
            name: employeeData[i].name,
            profilePicture: employeeData[i].profilePicture,
            jobProfileName: employeeData[i].jobProfileId.jobProfileName,
          });
        } else {
          arr.push({
            name: employeeData[i].name,
            profilePicture:
              "https://cdn-icons-png.flaticon.com/512/219/219983.png",
            jobProfileName: employeeData[i].jobProfileId.jobProfileName,
          });
        }
      }
      setFetchedSuggestions(arr);
    });
  }, [filter]);

  // clearLocalStorageOnUnload
  useEffect(() => {
    const clearLocalStorageOnUnload = () => {
      localStorage.removeItem("groupName");
      localStorage.removeItem("jobProfileName");
    };

    window.addEventListener("beforeunload", clearLocalStorageOnUnload);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnUnload);
    };
  }, []);
  // PAGINATION =
  useEffect(() => {
    setTotalPage(Math.ceil(count / filter.limit));
  }, [count]);

  useEffect(() => {
    setFilter({ ...filter, page: page });
  }, [page]);

  // SEARCH
  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const dispatch = useDispatch();
  const employeeDetailList = useSelector((state: any) => state.employee.employees);
  console.log("Hii", employeeDetailList)


  const loaderStatus = useSelector((state: any) => state.employee.status);

  const groupList = useSelector((state: any) => state.group.groups);

  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );

  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  useEffect(() => {
    dispatch(getAllEmployeeAsync(filter)).then((res: any) => {
      const employeeData = res.payload.employees;
      const arr = [];
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].profilePicture) {
          arr.push({
            name: employeeData[i].name,
            profilePicture: employeeData[i].profilePicture,
            jobProfileName: employeeData[i].jobProfileId.jobProfileName,
          });
        } else {
          arr.push({
            name: employeeData[i].name,
            profilePicture:
              "https://cdn-icons-png.flaticon.com/512/219/219983.png",
            jobProfileName: employeeData[i].jobProfileId.jobProfileName,
          });
        }
      }
      setFetchedSuggestions(arr);
    });
    dispatch(getAllGroupsAsync());
    dispatch(getAllGroupsCountEmployeeAsync());
    dispatch(getAllJobProfileAsync());
    dispatch(getAllDepartmentAsync());
    dispatch(getAllParentDepartmentAsync());
    dispatch(EmployeeBarCodesAsync());
    dispatch(allShopAsync())
  }, []);
  function formatDateExcel(dated: any) {
    const date = new Date(dated)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year} ${changetime(date)}`;
  } 
  const exportToExcel = () => {
    if (employeeDetailList) {
      const columnOrder = [
        'Name',
        'EmployeeCode',
        'JobProfile',
        'Group',
        'Email',
        'Contact Number',
        'Gender',
        'Aadhar',
        'PF Number',
        'ESI Number',
        'Pan Card Number',
        'Salary',
        'Lunch Time',
        'Working Hours',
        'Over Time Status',
        'Lunch Time',
        'Bank Name',
        'Bank Account Number',
        'Bank IFSC Code',
        'updatedAt',
        'createdAt'
        // 'ApprovedBy',
        // 'ApprovedTime',
        // 'Remark'

      ];

      const modifiedData = employeeDetailList.map((record: any) => {

        const mappedData = columnOrder.map((column) => {
          switch (column) {

            case 'EmployeeCode':
              return record.employeeCode;
            case 'Name':
              return record.name;
            case 'Aadhar':
              return record.aadharNumber;
            case 'PF Number':
              return record.PF_UAN_Number
            case 'Pan Card Number':
              return record.PAN_Number;
            case 'ESI Number':
              return record.ESI_ID;
            case 'Salary':
              return record.salary;
            case 'Working Hours':
              return record.workingHours;
            case 'Over Time Status':
              return record.overTime;
            case 'Lunch Time':
              return record.lunchTime
            case 'Bank Name':
              return record?.bankDetails?.bankName
            case 'Bank Account Number':
              return record?.bankDetails?.accountNumber
            case 'Bank IFSC Code':
              return record?.bankDetails?.IFSC_Code

            case 'updatedAt':

              return formatDateExcel(record.updatedAt);
            case 'createdAt':


              return formatDateExcel(record.createdAt);

            case 'Email':
              return record.email;
            case 'Contact Number':
              return record.contactNumber;

            case 'JobProfile':
              return record.jobProfileId.jobProfileName;
            case 'Group':
              return record.groupId.groupName;
            case 'Gender':
              return record.gender

            default:
              return '';
          }
        });

        return Object.fromEntries(mappedData.map((value, index) => [columnOrder[index], value]));
      });



      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Master Report Data');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Master Report.xlsx');
      toast.success("CSV Download Successfully");
    }
  };



  // console.log("shoepeeee",shopss)

  const EmployeeBarcode = useSelector((state: any) => state.employee.Baremployees)
  const BarcodeStore: any = {}
  // console.log("jjsjsjsssksk", EmployeeBarcode)
  EmployeeBarcode.forEach((e: any) => {

    const code = e.employeeCode;
    BarcodeStore[code] = {
      ...e
    }
  });


  const navigate = useNavigate();
  const handleTableRowClick = (data: any) => {
    const employeeId = { employeeId: data._id };
    dispatch(getEmployeeImageAsync(employeeId));
    navigate(`/employee-profile`, { state: { additionalData: employeeId } });
  };






  const [pagiArrIncludes, setPagiArrIncludes] = useState<any>([]);
  const [createdAt,setCreatedAt]=useState("")
  const [updatedAt,setUpdatedAt]=useState("")
  useEffect(()=>{
    setFilter({
      ...filter,
      createdSort:createdAt
    })

  },[createdAt])
  useEffect(()=>{
    setFilter({
      ...filter,
      updatedSort:updatedAt
    })

  },[updatedAt])
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
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsGroupOpen(false);
  };
  const GrouptoggleDropdown = () => {
    setIsGroupOpen(!isGroupOpen);
    setIsOpen(false);
  };
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
  const selectGroupAll = () => {
    const allProfiles = groupList.map((element: any) => element.groupName);
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
  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
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
  const getSuggestions = (inputValue: any) => {
    const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
      suggestion.name?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };



  // delete department

  // const handlerAadhar = () => {
  //   if (items.length > 1) {
  //     const filteredItems = items.filter((element: any) => element.aadharNumber !== 0);
  //     setItems(filteredItems)
  //   }
  // }


  const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
  console.log(loggedInUserData)

  useEffect(() => {
    dispatch(getLoggedInUserDataAsync());
  }, [])
  return (
    <div className="mx-10">
      <div className="flex justify-between pt-8">
        <div className="flex gap-7 items-center justify-center">
          <div className="flex gap-3 justify-between items-center">
            <h1 className="text-2xl font-bold text-[#2E2E2E] whitespace-nowrap">
              Master Sheet
            </h1>
            <div onClick={exportToExcel} className="flex cursor-pointer   gap-[5px]  items-center px-[15px] h-9 w-30 bg-[#244a1d] rounded-lg">

              <p className="text-sm  font-medium whitespace-nowrap text-[#FFFFFF] tracking-[0.25px] ">Export to Excel</p>
            </div>
          </div>

        </div>

      </div>

      <div className="mt-10 flex gap-5 flex-wrap">
        <div className="flex gap-4">
          <div>
          
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"

                onClick={GrouptoggleDropdown}
              >
                All Group
              </button>
              {isGroupOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">

                  <div className="flex flex-row p-2 gap-3">
                    <img src={SelectAll} onClick={selectGroupAll} className="h-5 w-5 b" />
                    <img src={ClearAll} className="h-5 w-5 " onClick={clearGroupAll} />
                  </div>

                  <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                    {groupList &&
                      groupList.map((element: any, index: any) => (
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
          </div>
          <div>
           
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"

                onClick={toggleDropdown}
              >
                All Job Profiles
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">


                  <div className="flex flex-row p-2 gap-3">
                    <img src={SelectAll} onClick={selectAll} className="h-5 w-5 b" />
                    <img src={ClearAll} className="h-5 w-5 " onClick={clearAll} />
                  </div>
                  <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                    {jobProfileList &&
                      jobProfileList.map((element: any, index: any) => (
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
          </div>
          <div>
            <select
              onChange={(event) => {
                setFilter({
                  ...filter,
                  aadhar: event.target.value,
                });
              }}
              value={filter.aadhar}
              className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
            >
              <option value="0">Aadhar Default</option>
              <option value="1">
                Employee with aadhar card
              </option>
              <option value="-1">
                Employee without aadhar card
              </option>

            </select>


          </div>
          <div className="relative inline-block text-left ml-3">
              <select
              onChange={(event)=>setCreatedAt(event.target.value)}
              value={createdAt}
             
              
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"

                
              >
                <option value="">Sorted By Created Date</option>
                 <option value="True">New</option>
                    <option value="">Old</option>
              </select>
              
            </div>
            <div className="relative inline-block text-left text-sm">
              <select
              onChange={(event)=>setUpdatedAt(event.target.value)}
              value={updatedAt}
             
              
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"

                
              >
                <option value="">Sorted By Updated Date</option>
                 <option value="True">New</option>
                    <option value="False">Old</option>
              </select>
              
            </div>
        </div>
        <div>
          <div className="relative">
            {isLabelVisible && (
              <div className="absolute top-[10px] left-6">
                <label
                  htmlFor="searchInput"
                  className="flex gap-2 items-center cursor-text"
                >
                  <img src={glass} alt="" className="h-4 w-4" />
                  <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                </label>
              </div>
            )}
            <input
              type="search"
              id="searchInput"
              onChange={handleInputChange}
              value={search}
              className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
            />

            {suggestions.length > 0 && (
              <div className="absolute top-12 flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
                {suggestions.map((element: any, index: any) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSearch(element.name);
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
        </div>
      </div>

      {loaderStatus === "loading" ? (
        <div className="flex justify-center w-full">
          <img src={LoaderGif} className="w-6 h-6" alt="" />
        </div>
      ) : (
        ""
      )}
      <div className="">
        <div className="mt-3 overflow-auto">
          <div className="py-5">
            {/* TABLE FOR EMPLOYEE */}

            <table className="w-full">
              <tbody>
                <tr className="bg-[#ECEDFE] cursor-default">
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Profile Photo
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Employee ID
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Name
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Email
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Contact Number
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Gender
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Aadhar Number
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    PF Number
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    ESI NUMBER
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Pan Card Number
                  </td>

                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Job Profile
                  </td>

                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Group
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Salary
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Employement Status
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Lunch Time
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Working Time
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    OverTime Allow
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Bank Name
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Bank Account Number
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Bank IFSC NUMBER
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Updated at
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Created at
                  </td>


                </tr>
                {employeeDetailList &&
                  employeeDetailList.map((element: any, index: number) => {

                    return (
                      <tr
                        key={index}
                        className="hover:bg-[#FAFAFA]"
                        onClick={() => handleTableRowClick(element)}
                      >
                        <td className="py-4 px-5"  >
                          {element.profilePicture
                            ? <img src={element.profilePicture} className="w-[80px] h-[80px] rounded-full" />
                            : <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className="w-[80px] h-[80px] rounded-full" />}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.employeeCode
                            ? element.employeeCode
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer">
                          {element.name ? element.name : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer">
                          {element.email ? element.email : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer">
                          {element.contactNumber ? element.contactNumber : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.gender ? element.gender : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.aadharNumber ? element.aadharNumber : <p className="">0</p>}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.PF_UAN_Number ? element.PF_UAN_Number : <p className="">0</p>}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.ESI_ID ? element.ESI_ID : <p className="">0</p>}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.PAN_Number ? element.PAN_Number : <p className="">0</p>}
                        </td>

                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.jobProfileId?.jobProfileName
                            ? element.jobProfileId?.jobProfileName
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.groupId?.groupName
                            ? element.groupId?.groupName
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.salary ? element.salary : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.jobProfileId?.employmentType
                            ? element.jobProfileId?.employmentType
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.lunchTime
                            ? element.lunchTime
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.workingHours
                            ? element.workingHours
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.overTime
                            ? element.overTime
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.bankDetails
                            ? element.bankDetails.bankName
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.bankDetails
                            ? element.bankDetails.accountNumber
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.bankDetails
                            ? element.bankDetails.IFSC_Code
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.updatedAt
                            ? `${element.updatedAt.slice(0, 10)}: ${changetime(element.updatedAt)}`
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.createdAt
                            ? `${element.createdAt.slice(0, 10)}: ${changetime(element.createdAt)}`
                            : "Not Avilable"}
                        </td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {/* TABLE FOR EMPLOYEE ENDS */}

            {/* PAGINATION STARTS */}

            <div className="flex gap-4 items-center justify-center">
              <div
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                {" "}
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
                onClick={() => {
                  if (page !== totalPage) {
                    setPage(page + 1);
                  }
                }}
              >
                {" "}
                <img src={CaretRight1} alt="" />
              </div>
            </div>



          </div>
        </div>
        {/* popup */}

        {/* popup */}
      </div>
    </div>
  );
};

export default MonthlyReport;
