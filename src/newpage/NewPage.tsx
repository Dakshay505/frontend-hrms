import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployeeAsync,
  EmployeeBarCodesAsync,
  // getSingleEmployeeAsync,
  // updateEmployeeAsync
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
// import check from "../assets/Check.png"

import {
  getAllDepartmentAsync,
  getAllParentDepartmentAsync,
} from "../redux/Slice/departmentSlice";

import edit from "../assets/editIcon.svg"
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";




// const roleOptions = {
//   admin: 'Admin',
//   dbManager: 'Database Manager',
//   attendanceManager: 'Attendance Manager',
//   employee: 'Employee',
//   manufacturing: 'Manufacturing',
// };



export const NewPage = () => {
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);


  const [filter, setFilter] = useState({
    name: localStorage.getItem("name") || "",
    groupName: localStorage.getItem("groupName") || "",
    jobProfileName: localStorage.getItem("jobProfileName") || "",
    departmentName: localStorage.getItem("departmentName") || "",
    page: 1,
    limit: 20,
    aadhar: "0"
  });


  useEffect(() => {
    dispatch(getAllEmployeeAsync(filter)).then((data: any) => {
      setCount(data.payload.count);
      const employeeData = data.payload.employees;
      //console.log("djhjhjhjhjhj",employeeData)
      const arr = [];
      localStorage.setItem("groupName", filter.groupName);
      localStorage.setItem("jobProfileName", filter.jobProfileName);
      localStorage.setItem("departmentName", filter.departmentName)

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
  }, [filter.groupName, filter.jobProfileName, filter.departmentName]);

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

  // console.log(employeeDetailList)

  const departmentList = useSelector((state: any) => state.department.department)
  const sortedDepartmentList = [...departmentList].sort((a: any, b: any) =>
    a.departmentName.localeCompare(b.departmentName)
  );



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
  }, []);



  const EmployeeBarcode = useSelector((state: any) => state.employee.Baremployees)
  const BarcodeStore: any = {}
  // console.log("jjsjsjsssksk", EmployeeBarcode)
  EmployeeBarcode.forEach((e: any) => {

    const code = e.employeeCode;
    BarcodeStore[code] = {
      ...e
    }
  });



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


 

  // Change Password pop up

  // const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);

  // const openChangePasswordPopup = () => {
  //   setIsEditRolePopupOpen(true);
  //   setIsChangePasswordPopupOpen(false);
  // };

  // const closeChangePasswordPopup = () => {
  //   setIsChangePasswordPopupOpen(false);
  // };
  
  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };



   // edit role pop up

  //  const [isEditRolePopupOpen, setIsEditRolePopupOpen] = useState(false);

  //  const [inputRoleValue, setInputRoleValue] = useState<any>("");
 
  //  const openEditRolePopup = () => {
  //    setIsEditRolePopupOpen(true);
  //    setIsChangePasswordPopupOpen(false);
 
  //  };
 
  //  const closeEditRolePopup = () => {
  //    setIsEditRolePopupOpen(false);
  //  };


  // update role 
  // const { handleSubmit, register } = useForm();
  // const [employeeId, setEmployeeId] = useState("");
  // console.log(employeeId)


  // useEffect(() => {
  //   setEmployeeId(employeeDetailList?._id);
  //   setInputRoleValue(employeeDetailList?.role);
  // }, [employeeDetailList]);


  return (
    <div className="mx-10">

      <div className="flex gap-5 flex-wrap">
        <div className="flex gap-4">
          <div>
            <select
              onChange={(event) => {
                if (event.target.value === "All Groups") {
                  setFilter({
                    ...filter,
                    groupName: "",
                  });
                } else {
                  setFilter({
                    ...filter,
                    groupName: event.target.value,
                  });
                }
              }}
              value={filter.groupName}
              className="border border-solid w-[17rem] border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
            >
              <option value="All Groups">All Groups</option>
              {groupList &&
                groupList.map((element: any, index: number) => {
                  return (
                    <option key={index} value={element.groupName}>
                      {element.groupName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select
              onChange={(event) => {
                if (event.target.value === "All Job Profiles") {
                  setFilter({
                    ...filter,
                    jobProfileName: "",
                  });
                } else {
                  setFilter({
                    ...filter,
                    jobProfileName: event.target.value,
                  });
                }
              }}
              value={filter.jobProfileName}
              className="border border-solid w-[20rem] border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
            >
              <option value="All Job Profiles">All Job Profiles</option>
              {jobProfileList &&
                jobProfileList.map((element: any, index: number) => {
                  return (
                    <option key={index} value={element.jobProfileName}>
                      {element.jobProfileName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select
              onChange={(event) => {
                if (event.target.value === "All Department") {
                  setFilter({
                    ...filter,
                    departmentName: "",
                  });
                } else {
                  setFilter({
                    ...filter,
                    departmentName: event.target.value,
                  });
                }
              }}
              value={filter.departmentName}
              className="border border-solid w-[12rem] border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E]  px-5 focus:outline-none"
            >
              <option value="All Department">All Department</option>
              {sortedDepartmentList &&
                sortedDepartmentList.map((element: any, index: number) => {
                  return (
                    <option key={index} className="max-w-[210px] w-[210px] min-w-[210px]" value={element.departmentName}>
                      {element.departmentName}
                    </option>
                  );
                })}
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
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap ">
                          <p className="font-medium hover:underline cursor-pointer"> {element.name ? element.name : "Not Avilable"} </p>
                          <p className="text-[12px]"> {element.jobProfileId?.jobProfileName
                            ? element.jobProfileId?.jobProfileName
                            : "Not Avilable"}</p>
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.groupId?.groupName
                            ? element.groupId?.groupName
                            : "Not Avilable"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.contactNumber ? element.contactNumber : "Not Avilable"}


                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          <div className="flex gap-[10px]">
                            <div>
                              {element?.role === 'attendanceManager' ? 'Attendance Manager' :
                                element?.role === 'employee' ? 'Employee' :
                                  element?.role === 'dbManager' ? 'Database Manager' :
                                    element?.role === 'admin' ? 'Admin' :
                                      element?.role === 'manufacturing' ? 'Manufacturing' : 'Role'}
                            </div>
                            <img
                              src={edit}
                              alt=""
                              className="cursor-pointer"
                              // onClick={openEditRolePopup}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          <div className="flex gap-[10px]">
                            Change Password
                            <img src={change} alt="" className="cursor-pointer"
                              // onClick={openChangePasswordPopup}
                            />
                          </div>

                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {element.updatedAt ? formatDate(new Date(element.updatedAt)) : "-"}
                        </td>


                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {/* {isEditRolePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
                <form onSubmit={handleSubmit((data: any) => {
                  const sendData = { employeeId: employeeId, data: data };
                  console.log("abcd", sendData)
                  dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
                    if (res.payload.success) {
                      toast.success(res.payload.message);
                    } else {
                      toast.error(res.payload.message);
                    }
                    dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
                  })
                  setIsEditRolePopupOpen(false)

                })} className="modal relative flex flex-col gap-[20px] bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col gap-[16px]">
                    <h1 className="text-[18px] font-bold text-[#2E2E2E]">Update Role</h1>
                    <div>
                      <select
                        {...register("role", { required: true })}
                        className="text-[12px] leading-5 font-normal focus:outline-none"
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



            {isChangePasswordPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
                <div className="modal relative bg-white p-6 rounded-lg shadow-lg">
                  <h1 className="font-bold text-[25px]">

                    Change Password
                  </h1>

                  <button onClick={closeChangePasswordPopup}>Close</button>
                </div>
              </div>
            )} */}



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
    </div>
  );
};


