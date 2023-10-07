import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectAll from "../assets/Select All.svg"
import ClearAll from "../assets/Clear-all.svg"
import {
  getAllEmployeeAsync,

  getSingleEmployeeAsync,
  updateEmployeeAsync
} from "../redux/Slice/EmployeeSlice";
import {
  getAllGroupsAsync,
  getAllGroupsCountEmployeeAsync,
} from "../redux/Slice/GroupSlice";
import {
  getAllJobProfileAsync,

} from "../redux/Slice/JobProfileSlice";
import glass from "../assets/MagnifyingGlass.png";
import LoaderGif from "../assets/loadergif.gif";
import CaretLeft from "../assets/CaretLeft.svg";
import CaretRight1 from "../assets/CaretRight1.svg";
import change from "../assets/Repeat.svg"
import check from "../assets/Check.png"

import {
  getAllDepartmentAsync,
  getAllParentDepartmentAsync,
} from "../redux/Slice/departmentSlice";

import edit from "../assets/editIcon.svg"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePasswordAsync } from "../redux/Slice/LoginHistorySlice";




const roleOptions = {
  admin: 'Admin',
  dbManager: 'Database Manager',
  attendanceManager: 'Attendance Manager',
  employee: 'Employee',
  manufacturing: 'Manufacturing',
};



export const NewPage = () => {
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);


  const [filter, setFilter] = useState({
    name: localStorage.getItem("name") || "",
    groupName: [""],
    jobProfileName: [""],
    departmentName: [""],
    page: 1,
    limit: 20,
    aadhar: "0",
    createdSort:"",
    updatedSort:""

  });


  useEffect(() => {
    dispatch(getAllEmployeeAsync(filter)).then((data: any) => {
      setCount(data.payload.count);
      const employeeData = data.payload.employees;
      const arr = [];
      console.log("Filter",filter)
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
      localStorage.removeItem("departmentName");
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
  console.log(employeeDetailList)
  const departmentList = useSelector((state: any) => state.department.department)
  // const sortedDepartmentList = [...departmentList].sort((a: any, b: any) =>
  //   a.departmentName.localeCompare(b.departmentName)
  // );



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
    dispatch(getSingleEmployeeAsync());
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
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



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsGroupOpen(false);
    setIsDepartmentOpen(false);

  };
  const GrouptoggleDropdown = () => {
    setIsGroupOpen(!isGroupOpen);
    setIsOpen(false);
    setIsDepartmentOpen(false);

  };
  const DepartmenttoggleDropdown = () => {
    setIsDepartmentOpen(!isDepartmentOpen);
    setIsOpen(false);
    setIsGroupOpen(false);

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




  // pagination


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






  // edit role pop up

  const [isEditRolePopupOpen, setIsEditRolePopupOpen] = useState(false);
  const [inputRoleValue, setInputRoleValue] = useState<any>("");

  const openEditRolePopup = (employeeId: any) => {
    setEmployeeId(employeeId);
    setIsEditRolePopupOpen(true);
    setIsChangePasswordPopupOpen(false);
  };

  const closeEditRolePopup = () => {
    setIsEditRolePopupOpen(false);
  };


  // update role 
  const { handleSubmit, register } = useForm();
  const [employeeId, setEmployeeId] = useState("");
  // console.log(setEmployeeId)

  const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
  // console.log(singleEmployee)


  useEffect(() => {
    setEmployeeId(singleEmployee?._id);
    setInputRoleValue(singleEmployee?.role);
  }, [singleEmployee]);





  // Change Password pop up

  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);

  const openChangePasswordPopup = (employeeId: any) => {
    console.log(employeeId)
    setEmployeeId(employeeId);
    setIsEditRolePopupOpen(false);
    setIsChangePasswordPopupOpen(true);
  };

  const closeChangePasswordPopup = () => {
    setIsChangePasswordPopupOpen(false);
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  // Create a function to toggle the showPassword state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword && employeeId) {
      dispatch(changePasswordAsync({ employeeId, password: newPassword }))
        .then(() => {
          toast.success('Password changed successfully');
          setIsChangePasswordPopupOpen(false);

        })
        .catch((error: any) => {
          toast.error('Error changing password');
          console.error(error);
        });
    } else {
      toast.error('Passwords do not match or employeeId is missing');
    }
  };



  // active in active atstus

  const [isEditStatusPopupOpen, setIsEditStatusPopupOpen] = useState(false);

  const openEditStatusPopup = (employeeId: any) => {
    console.log(employeeId)
    setEmployeeId(employeeId);
    setIsEditRolePopupOpen(false)
    setIsChangePasswordPopupOpen(false)
    setIsEditStatusPopupOpen(true);
  };

  const closeEditStatusPopup = () => {
    setIsEditStatusPopupOpen(false);
  };




  const [StatusValue, setStatusValue] = useState<boolean | null>(null);


  useEffect(() => {
    setEmployeeId(singleEmployee?._id);
    setStatusValue(singleEmployee?.active);
  }, [singleEmployee]);




  const handleSaveStatus = async () => {
    try {
      if (StatusValue !== null) {
        const active = StatusValue;
        dispatch(updateEmployeeAsync({ employeeId, active })).then(() => {
          setStatusValue(active);
          closeEditStatusPopup();
          toast.success("Status updated successfully");
          dispatch(getAllEmployeeAsync({ employeeId }))

        });
      } else {
        console.log("not saved");
      }
      dispatch(getAllGroupsAsync({ employeeId }));
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };



  return (
    <div className="mx-10">

      <div className="flex gap-5 flex-wrap">
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
          
            <div className="relative inline-block text-left  ml-3 " >
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
                    <img src={SelectAll} onClick={selectAll} className="h-5 w-5" />
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
           
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"

                onClick={DepartmenttoggleDropdown}
              >
                All Department
              </button>
              {isDepartmentOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">

                  <div className="flex flex-row p-2 gap-3">
                    <img src={SelectAll} onClick={selectDepartmentAll} className="h-5 w-5 b" />
                    <img src={ClearAll} className="h-5 w-5 " onClick={clearDepartmentAll} />
                  </div>
                  <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                    {departmentList &&
                      departmentList.map((element: any, index: any) => (
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
        <div className="overflow-auto">
          <div className="py-5">
            {/* TABLE FOR EMPLOYEE */}
            <table className="w-full">
              <tbody>
                <tr className="bg-[#ECEDFE] cursor-default">
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Employee Code
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Name
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Group
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Phone Number
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Role
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Status
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Password
                  </td>
                  <td
                    className="flex flex-row py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                    Date Of Creation

                  </td>

                </tr>


                {employeeDetailList &&
                  employeeDetailList.map((element: any, index: number) => {

                    return (
                      <tr
                        key={index}
                        className="hover:bg-[#FAFAFA]"
                      >
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.employeeCode
                            ? element.employeeCode
                            : "-"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap ">
                          <p className="font-medium hover:underline cursor-pointer"> {element.name ? element.name : "-"} </p>
                          <p className="text-[12px]"> {element.jobProfileId?.jobProfileName
                            ? element.jobProfileId?.jobProfileName
                            : "-"}</p>
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.groupId?.groupName
                            ? element.groupId?.groupName
                            : "-"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.contactNumber ? element.contactNumber : "-"}
                        </td>


                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] wrap">
                          <div className="flex gap-[10px]">
                            <div>
                              {element?.role === 'attendanceManager' ? 'Attendance Manager' :
                                element?.role === 'employee' ? 'Employee' :
                                  element?.role === 'dbManager' ? 'Database Manager' :
                                    element?.role === 'admin' ? 'Admin' :
                                      element?.role === 'manufacturing' ? 'Manufacturing' : 'Role'
                              }
                            </div>
                            <img
                              src={edit}
                              alt=""
                              className="cursor-pointer"
                              onClick={() => openEditRolePopup(element._id)}
                            />
                          </div>
                        </td>


                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          <div className="flex gap-[10px]">
                            <div>
                              {element.active ? "Active" : "InActive"}

                            </div>
                            <img
                              src={edit}
                              alt=""
                              className="cursor-pointer"
                              onClick={() => openEditStatusPopup(element._id)}
                            />
                          </div>
                        </td>


                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          <div className="flex gap-[10px]">
                            Change Password
                            <img src={change} alt="" className="cursor-pointer"
                              onClick={() => openChangePasswordPopup(element._id)}
                            />
                          </div>

                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.updatedAt ? formatDate(new Date(element.createdAt)) : "-"}
                        </td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {isEditRolePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>

                <form
                  onSubmit={handleSubmit((data: any) => {
                    const sendData = { employeeId: employeeId, role: data.role };
                    console.log("abcd", sendData);
                    dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
                      if (res.payload.success) {
                        toast.success(res.payload.message);
                        dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));

                      } else {
                        toast.error(res.payload.message);
                        dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                      }
                      dispatch(getAllEmployeeAsync({ employeeId: employeeId }))
                    });
                    setIsEditRolePopupOpen(false);
                  })}
                  className="modal relative flex flex-col gap-[20px] bg-white p-6 rounded-lg shadow-lg">

                  <div className="flex flex-col gap-[16px]">
                    <h1 className="text-[18px] font-bold text-[#2E2E2E]">Update Role</h1>
                    <div>
                      <select
                        {...register("role", { required: true })}
                        className="text-[16px] leading-5 font-normal focus:outline-none"
                        value={inputRoleValue}
                        onChange={(event) => setInputRoleValue(event.target.value)}
                      >
                        {Object.keys(roleOptions).map((key) => (
                          <option key={key} value={key as keyof typeof roleOptions}>
                            {roleOptions[key as keyof typeof roleOptions]}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                  <div className="flex gap-[10px]">
                    <button onClick={closeEditRolePopup} className="flex gap-[5px] border-[#283093] border  rounded-[8px] px-[16px] py-[8px] justify-center items-center text-[#283093]">Close</button>

                    <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[8px] justify-center items-center text-white" >
                      <img src={check} alt="" className="w-[16px] h-[16px]" />
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>


          {isEditStatusPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
              <div className="flex flex-col gap-[10px] relative bg-white p-6 rounded-lg shadow-lg">
                <h1 className="font-bold text-[25px]">Edit Status</h1>
                <select
                  value={StatusValue === true ? "active" : StatusValue === false ? "inactive" : ""}
                  onChange={(e) => setStatusValue(e.target.value === "active")}
                  className="border px-[15px] py-[10px] border-gray-500 rounded-[8px]"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>


                <div className="flex gap-[10px] pt-[20px]">
                  <button onClick={closeEditStatusPopup} className="flex gap-[5px] border-[#283093] border  rounded-[8px] px-[16px] py-[8px] justify-center items-center text-[#283093]">Close</button>
                  <button onClick={handleSaveStatus} className="flex gap-[5px] bg-[#283093] border  rounded-[8px] px-[16px] py-[8px] justify-center items-center text-white">Save</button>
                </div>
              </div>
            </div>
          )}





          {isChangePasswordPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
              <div className="flex flex-col gap-[10px] relative bg-white p-6 rounded-lg shadow-lg">
                <h1 className="font-bold text-[25px]">

                  Change Password
                </h1>

                <form onSubmit={handlePasswordSubmit}>


                  <div className="flex  flex-col gap-[10px]">
                    <div>
                      <input
                        type={showPassword ? 'text' : 'password'} // Use 'text' to show, 'password' to hide
                        placeholder="Change Password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border px-[15px] py-[10px] border-gray-500 rounded-[8px]"
                      />
                    </div>
                    <div>
                      <input
                        type={showPassword ? 'text' : 'password'} // Use 'text' to show, 'password' to hide
                        placeholder="Confirm Change Password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="border px-[15px] py-[15px] border-gray-500 rounded-[8px]"
                      />
                    </div>


                    <div className="flex justify-end px-[10px]">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-[#283093] text-[12px]  cursor-pointer"
                      >
                        {showPassword ? 'Hide Password' : 'Show Password'}
                      </button>
                    </div>

                  </div>
                  


                  <div className="flex gap-[10px] pt-[20px]">

                    <button onClick={closeChangePasswordPopup} className="flex gap-[5px] border-[#283093] border  rounded-[8px] px-[16px] py-[8px] justify-center items-center text-[#283093]">Close</button>
                    <button type="submit" className="flex gap-[5px] bg-[#283093] border  rounded-[8px] px-[16px] py-[8px] justify-center items-center text-white">
                      Change Password
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}



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

    </div>
  );
};


