import { useState, useEffect } from "react";
import BluePlus from "../../assets/BluePlus.png";
import greyPlus from "../../assets/gretyPlus.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage} from 'react-lazy-load-image-component';
import {
  getAllEmployeeAsync,
  getEmployeeImageAsync,
  EmployeeBarCodesAsync
} from "../../redux/Slice/EmployeeSlice";
import {
  getAllGroupsAsync,
  getAllGroupsCountEmployeeAsync,
  getSingleGroupAsync,
} from "../../redux/Slice/GroupSlice";
import { useNavigate } from "react-router-dom";
import Pencil from "../../assets/PencilSimple.svg";
import {
  deleteDepartmentToJobProfileAsync,
  getAllJobProfileAsync,
  getSingleJobProfileAsync,
  updateJobProfileDepartmentAsync,
} from "../../redux/Slice/JobProfileSlice";
import glass from "../../assets/MagnifyingGlass.png";
import LoaderGif from "../../assets/loadergif.gif";
import CaretLeft from "../../assets/CaretLeft.svg";
import CaretRight1 from "../../assets/CaretRight1.svg";
import {
  deleteDepartmentAsync,
  getAllDepartmentAsync,
  getAllParentDepartmentAsync,
} from "../../redux/Slice/departmentSlice";
import userIcon from "../../assets/UsersThree.svg";
import deleteIcon from "../../assets/Trash.svg";
import SelectAll from "../../assets/Select All.svg"
import ClearAll from "../../assets/Clear-all.svg"
import toast from "react-hot-toast";
import mongoose from 'mongoose';
import { allShopAsync, getSingleShopAsync } from "../../redux/Slice/ShopSlice";
import { getLoggedInUserDataAsync } from "../../redux/Slice/loginSlice";
import img3 from "../../assets/pngimg.png"

const ViewModifyDatabase = () => {
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [apply,setApply]=useState(false)

  const [filter, setFilter] = useState(() => {
    const storedFilterString = localStorage.getItem("filterData");
  
    if (storedFilterString) {
      return JSON.parse(storedFilterString);
    } else {
      return {
        name: "",
        groupName: [""],
        jobProfileName: [""],
        page: 1,
        limit: 20,
        aadhar: "0"
      };
    }
  });
  
  useEffect(() => {
    dispatch(getAllEmployeeAsync(filter)).then((data: any) => {
      setCount(data.payload.count);
      const employeeData = data.payload.employees;
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
  }, [apply,filter.name, filter.page, filter.aadhar]);

  useEffect(() => {
    const { name, ...filterWithoutName } = filter;
    const filterString = JSON.stringify(filterWithoutName);
    localStorage.setItem("filterData", filterString);
  }, [filter]);
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
  const departmentList = useSelector(
    (state: any) => state.department.department
  );


  const parentDepartmentList = useSelector(
    (state: any) => state.department.parentdepartment
  );
  const groupList = useSelector((state: any) => state.group.groups);
  const groupCount = useSelector((state: any) => state.group.employeeCount);
  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );
  const [path, setPath] = useState("/addemployee");
  const [databaseValue, setDatabaseValue] = useState("Employees");
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);

  useEffect(() => {
    dispatch(getAllEmployeeAsync(filter)).then((res: any) => {
      const employeeData = res.payload.employees;
      console.log("aaaaaaaaaaaaaa", employeeData)
      const arr = [];
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].profilePicture) {
          arr.push({
            name: employeeData[i].name,
            profilePicture: employeeData[i].profilePicture,
            jobProfileName: employeeData[i].jobProfileId.jobProfileName,
          });
        }
        else {
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


  const shopss = useSelector((state: any) => state.Shop.shop)
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


  const handleGroupTableRowClick = (data: any) => {
    // console.log("aaaaaaaaaaa", data.groupId);
    const groupId = { groupId: data.groupId };
    dispatch(getSingleGroupAsync(groupId));
    navigate(`/groups-info`, { state: { data: data } });
  };

  const handleDepartmentTableRowClick = (data: any) => {
    // console.log(data._id);

    const stateObject = {
      departmentid: data?._id || "Not Available",
      departmentName: data.departmentName || "Not Available",
      description: data.description || "Not Available"
    };

    navigate(`/department-info`, { state: stateObject });
  };

  const handleParentDepartmentTableRowClick = (data: any) => {
    // console.log(data._id);

    const stateObject = {
      Parentdepartmentid: data?._id || "Not Available",
      ParentdepartmentName: data.departmentName || "Not Available",
      Parentdescription: data.description || "Not Available"
    };

    navigate(`/parent-department-info`, { state: stateObject });
  };





  const handleShopTableRowClick = (data: any) => {
    // console.log(data.shopId);
    const shopId = { shopId: data._id };
    dispatch(getSingleShopAsync(shopId));
    navigate(`/edit-shop`, { state: { data: data } });
  };
  const handleJobprofileTableRowClick = (data: any) => {
    const jobProfileId = { jobProfileId: data._id };
    dispatch(getSingleJobProfileAsync(jobProfileId));
    navigate(`/jobprofile-info`, { state: { data: data } });
  };

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
  const [assignDepartment, setAssignDepartment] = useState(false);
  const [assignedName, setAssignedName] = useState("");
  const handleDepartmentEdit = (element: any) => {
    setAssignDepartment(true);
    const name = element.jobProfileName;
    setAssignedName(name);
  };
  const assigningDepartment = () => {
    setAssignDepartment(false);
    const data = {
      departmentName: selectedDepartment,
      jobProfileName: assignedName,
    };

    dispatch(updateJobProfileDepartmentAsync(data)).then(() => {
      dispatch(getAllJobProfileAsync());
    });
  };
  const deleteAssignedDepartment = (element: any) => {
    // console.log("1", element);
    const data = {
      departmentName: element.department.departmentName,
      jobProfileName: element.jobProfileName,
    };

    dispatch(deleteDepartmentToJobProfileAsync(data)).then(() => {
      dispatch(getAllJobProfileAsync());
    });
  };

  const [selectedDepartment, setSelectedDepartment] = useState(
    "Choose a Department"
  );
  const handleDepartmentChange = (event: any) => {
    setSelectedDepartment(event.target.value);
  };
  // delete department
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }: any) => {
    return isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };
  // const handlerAadhar = () => {
  //   if (items.length > 1) {
  //     const filteredItems = items.filter((element: any) => element.aadharNumber !== 0);
  //     setItems(filteredItems)
  //   }
  // }
  interface Department {
    departmentName: string;
    _id: mongoose.Types.ObjectId;
  }
  const [departmentToDelete, setDepartmentToDelete] =
    useState<Department | null>(null);
  const handleDeleteClick = (element: Department) => {
    setConfirmationOpen(true);
    // console.log(element, "element to delete");
    setDepartmentToDelete(element);
  };

  const handleCancel = () => {
    setConfirmationOpen(false);
  };

  const handleConfirm = () => {
    if (departmentToDelete) {
      const departmentId = departmentToDelete._id;
      dispatch(deleteDepartmentAsync(departmentId))
        .then((res: any) => {
          if (res.payload.success) {
            toast.success(res.payload.message);
            dispatch(getAllDepartmentAsync());
          } else {
            toast.error(res.payload.message);
          }
          navigate("/view-modify-database");
        })
        .catch((error: any) => {
          toast.error(error);
        });
      // console.log("hi3", departmentId);
    }
    setConfirmationOpen(false);
  };

  const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
  // console.log(loggedInUserData)

  useEffect(() => {
    dispatch(getLoggedInUserDataAsync());
  }, [])
  return (
    <div className="mx-10">
      <div className="flex justify-between pt-8">
        <div className="flex gap-7 items-center justify-center">
          <div>
            <h1 className="text-2xl font-bold text-[#2E2E2E] whitespace-nowrap">
              View Database
            </h1>
          </div>
          <div>
            <form
              onChange={(event: any) => {
                setDatabaseValue(event.target.value);
                const selectedValue = event.target.value;

                if (selectedValue === "Employees") {
                  setPath("/addemployee");
                }
                if (selectedValue === "Groups") {
                  setPath("/add-group");
                }
                if (selectedValue === "Job Profiles") {
                  setPath("/add-job-profile");
                }
                if (selectedValue === "Department") {
                  setPath("/add-department");
                }
                if (selectedValue === "Parent Department") {
                  setPath("/add-department");
                }
                if (selectedValue === "Shop") {
                  setPath("/Shop");
                }
              }}
            >
              <select
                className="bg-[#ECEDFE] rounded-lg py-3 px-5 text-[#283093] text-sm font-medium focus:outline-none"
                defaultValue="Employees"
              >
                <option>Employees</option>
                <option>Groups</option>
                <option>Job Profiles</option>
                <option>Department</option>
                <option>Parent Department</option>
                <option>Shop</option>
              </select>
            </form>
          </div>
        </div>
        {loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin') ? (

          <div className="flex gap-6">
            {databaseValue !== "Employees" && databaseValue !== "Shop" && (
              <Link to="/update-hierarchy">
                <div className="flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]">
                  <img src={Pencil} className="w-4" alt="" />
                  <p className="px-2">Update Hierarchy</p>
                </div>
              </Link>
            )}

            <Link to={path} className="w-[92px] h-10">
              <div className="flex items-center justify-center rounded-lg text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]">
                <img src={BluePlus} className="w-4" alt="" />
                <p className="px-2">Add</p>
              </div>
            </Link>
          </div>
        ) : null}
      </div>
      {databaseValue === "Employees" && (
        <div className="mt-10 flex gap-5">
          <div className="flex gap-4">
            <div>
              {/* <select
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
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
              </select> */}
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
                      <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                        Apply
                      </div>
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
              {/* <select
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
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
              </select> */}
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
                      <div className="cursor-pointer text-blue-600" onClick={()=>setApply(!apply)}>
                        Apply
                      </div>
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
      )}
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
            {databaseValue === "Employees" && (
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
                    <td
                      className="flex flex-row py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      {/* <p onClick={() => handlerAadhar}> Aadhar No.</p> */}
                      Aadhar No.

                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Current Barcode
                    </td>
                    {/* <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Number of  Barcode
                    </td> */}
                  </tr>
                  {employeeDetailList &&
                    employeeDetailList.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA]"
                          onClick={() => handleTableRowClick(element)}
                        >
                          <td className="py-4 px-4 text-sm  font-normal text-[#2E2E2E] whitespace-nowrap">
                            <div className="rounded-full  overflow-hidden">
                            <LazyLoadImage
                              alt="Profile Photo"
                              effect="opacity"
                              
                              src={element?.profilePicture ? element?.profilePicture : img3} // use normal <img> attributes as props
                               className="rounded-full object-cover w-[80px] h-[80px]" />
    
                            

                            </div>
                          </td>

                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                            {element.employeeCode
                              ? element.employeeCode
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer">
                            {element.name ? element.name : "Not Avilable"}
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
                            {element.aadharNumber ? element.aadharNumber : <p className="">0</p>}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                            <img src={element.currentBarCode} alt="barcode" />
                          </td>
                          {/* <td className="py-4  m-auto text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                            <div className="flex gap-[10px]">
                              {BarcodeStore[element.employeeCode] &&
                                BarcodeStore[element.employeeCode].barCodes.map((element: any) => (
                                  <div>
                                    {element + " ,"}
                                  </div>
                                ))
                              }
                            </div>
                          </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {/* TABLE FOR EMPLOYEE ENDS */}

            {/* PAGINATION STARTS */}
            {databaseValue === "Employees" && (
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
            )}
            {/* PAGINATIN ENDS */}

            {/* TABLE FOR DEPARTMENT */}
            {databaseValue === "Groups" && (
              <table className="w-full">
                <tbody>
                  <tr className="bg-[#ECEDFE]">
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Group ID
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Group Name
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Number of Employee
                    </td>
                  </tr>
                  {groupCount &&
                    groupCount.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA] cursor-default"

                          onClick={() => loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin')
                            ? handleGroupTableRowClick(element)
                            : null}
                        >
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {index + 1}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap cursor-pointer hover:underline border-r border-b border-solid border-[#EBEBEB]">
                            {element.groupName
                              ? element.groupName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  border-b border-solid border-[#EBEBEB]">
                            {element.employeeCount
                              ? element.employeeCount
                              : "Not Avilable"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {/* TABLE FOR DEPARTMENTS ENDS */}
            {databaseValue === "Job Profiles" && (
              <table className="w-full">
                <tbody>
                  <tr className="bg-[#ECEDFE] cursor-default">
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Job Profile ID
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Job Profile Name
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Description
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Number Of Employee
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Employement Type
                    </td>
                  </tr>
                  {jobProfileList &&
                    jobProfileList.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA] cursor-default"
                        >
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {index + 1}
                          </td>
                          <td
                            onClick={() => loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin')
                              ? handleJobprofileTableRowClick(element)
                              : null}

                            className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer border-r border-b border-solid border-[#EBEBEB]"
                          >
                            {element.jobProfileName
                              ? element.jobProfileName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap cursor-pointer border-r border-b border-solid border-[#EBEBEB]">
                            {/* Department */}
                            {element.department ? (
                              <div
                                onClick={() => {
                                  deleteAssignedDepartment(element);
                                }}
                                className="flex items-center gap-[8px]"
                              >
                                <p>
                                  {element.department.departmentName
                                    ? element.department.departmentName
                                    : "invaild"}
                                </p>
                                {loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin') ? (

                                  <div className="">
                                    <img src={deleteIcon} alt="delete" />
                                  </div>
                                ) : null}
                              </div>
                            ) : (
                              <div
                                onClick={() => handleDepartmentEdit(element)}
                                className="flex items-center gap-[8px]"
                              >
                                <img
                                  src={greyPlus}
                                  className="w-4 h-3"
                                  alt=""
                                />
                                <p className="underline">Assign</p>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {element.jobDescription
                              ? element.jobDescription
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {element.numberOfEmployees ? element.numberOfEmployees : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-b border-solid border-[#EBEBEB]">
                            {element.employmentType
                              ? element.employmentType
                              : "Not Avilable"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {/*  */}
            {databaseValue === "Department" && (
              <table className="w-full">
                <tbody>
                  <tr className="bg-[#ECEDFE] cursor-default">
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department ID
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department Name
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department Description
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Parent Department
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Edit
                    </td>
                  </tr>
                  {departmentList &&
                    departmentList.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA] cursor-default"
                          onClick={() => loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin')
                            ? handleDepartmentTableRowClick(element)
                            : null}
                        >
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {index + 1}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer border-r border-b border-solid border-[#EBEBEB]">
                            {element.departmentName
                              ? element.departmentName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {element.description
                              ? element.description
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {element.parentDepartmentId.departmentName
                              ? element.parentDepartmentId.departmentName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            <button
                              className="flex py-2 px-5 mx-[-12px] my-5  items-center text-sm font-medium "
                              onClick={() => handleDeleteClick(element)}
                            >
                              <img
                                src={deleteIcon}
                                alt="delete"
                                className="mr-2"
                              />
                              Delete
                            </button>
                            <DeleteConfirmationDialog
                              isOpen={isConfirmationOpen}
                              onCancel={handleCancel}
                              onConfirm={handleConfirm}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}

            {databaseValue === "Parent Department" && (
              <table className="w-full">
                <tbody>
                  <tr className="bg-[#ECEDFE] cursor-default">
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department ID
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department Name
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Department Description
                    </td>
                  </tr>
                  {parentDepartmentList &&
                    parentDepartmentList.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA] cursor-default"
                          onClick={() => loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin')
                            ? handleParentDepartmentTableRowClick(element)
                            : null}
                        >
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {index + 1}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer border-r border-b border-solid border-[#EBEBEB]">
                            {element.departmentName
                              ? element.departmentName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] w-[50rem] border-r border-b border-solid border-[#EBEBEB]">
                            {element.description
                              ? element.description
                              : "Not Avilable"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}

            {/* table for shop */}
            {databaseValue === "Shop" && (
              <table className="w-full">
                <tbody>
                  <tr className="bg-[#ECEDFE] cursor-default">
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      ID
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Shop Code
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Shop Name
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                      Supervisor Job Profile
                    </td>
                  </tr>
                  {shopss &&
                    shopss.map((element: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-[#FAFAFA] cursor-default"
                          onClick={() => loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' || (loggedInUserData.employee.role === 'admin')
                            ? handleShopTableRowClick(element)
                            : null}

                        >
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap border-r border-b border-solid border-[#EBEBEB]">
                            {index + 1}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer border-r border-b border-solid border-[#EBEBEB]">
                            {element.shopCode
                              ? element.shopCode
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer border-r border-b border-solid border-[#EBEBEB]">
                            {element.shopName
                              ? element.shopName
                              : "Not Avilable"}
                          </td>
                          <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] w-[50rem] border-r border-b border-solid border-[#EBEBEB]">
                            {element.jobProfile.jobProfileName
                              ? element.jobProfile.jobProfileName
                              : "Not Avilable"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* popup */}
        {assignDepartment && (
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            className="fixed flex justify-center items-center top-0 bottom-0 right-0 left-0"
          >
            <div className="bg-[#FFFFFF] p-10">
              <div className="flex items-center gap-2 pb-4 w-[640px] border-b border-solid border-[#B0B0B0]">
                <div>
                  <img src={userIcon} alt="user" />
                </div>
                <div>
                  <h3 className="text-[18px] leading-6 font-medium text-[#1C1C1C]">
                    Assign Department to ‘ {assignedName} ’
                  </h3>
                </div>
              </div>
              <div className="pt-6 flex flex-col gap-3">
                <p className="ms-1 text-[14px]">Department</p>
                <div>
                  <select
                    className="px-[12px] py-[16px] rounded border w-full focus:outline-none"
                    onChange={handleDepartmentChange}
                  >
                    <option>Choose a Department</option>
                    {departmentList &&
                      departmentList.map((element: any, index: number) => {
                        return (
                          <option key={index}>{element.departmentName}</option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="pt-[21px]">
                <div className="flex gap-4 justify-end">
                  <div
                    onClick={() => setAssignDepartment(false)}
                    className="flex justify-center items-center h-[34px] w-[96px] border border-solid border-[#3B3B3B] rounded-lg cursor-pointer"
                  >
                    <p className="text-sm font-medium text-[#3B3B3B]">Cancel</p>
                  </div>
                  <div
                    onClick={() => {
                      assigningDepartment();
                    }}
                    className="flex justify-center items-center h-[34px] w-[122px] bg-[#283093] rounded-lg cursor-pointer"
                  >
                    <p className="text-sm font-medium text-[#FBFBFC]">Assign</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* popup */}
      </div>
    </div>
  );
};

export default ViewModifyDatabase;
