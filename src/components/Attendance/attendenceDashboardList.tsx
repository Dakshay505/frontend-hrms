import { useState } from "react";
import glass from "../../assets/MagnifyingGlass.png";
import GreenCheck from "../../assets/GreenCheck.svg";
import RedX from "../../assets/RedX.svg";
import SpinnerGap from "../../assets/SpinnerGap.svg";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import CaretLeft from "../../assets/CaretLeft.svg";
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";
import * as XLSX from 'xlsx';
import CaretRight from "../../assets/CaretRight1.svg";
import DummyProfilr from "../../assets/Dummy.jpeg"
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
// import up from "../../assets/arrow-up.png";
import { getAllAttandenceAsync, getGroupAttendanceAsync, getShopFilterAttandenceAsync } from "../../redux/Slice/AttandenceSlice";
import CaretDown from "../../assets/CaretDown11.svg";
import CaretUp from "../../assets/CaretUp.svg";
import LoaderGif from "../../assets/loadergif.gif";
// import ArrowSqureOut from "../../assets/ArrowSquareOut.svg";
import close from "../../assets/x1.png";
import { getAllDepartmentAsync } from "../../redux/Slice/departmentSlice";
import { getEmployeeImageAsync } from "../../redux/Slice/EmployeeSlice";
import { allShopAsync } from "../../redux/Slice/ShopSlice";
import SelectAll from "../../assets/Select All.svg"
import ClearAll from "../../assets/Clear-all.svg"
// import { AnyAction } from "@reduxjs/toolkit";


export const AttendenceDashboardList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state: any) => state.group.groups);
  // const employeeList = useSelector((state: any) => state.employee.employees);
  // const totalEmployees = employeeList.length;
  const sortedgroupList = [...groupList].sort((a: any, b: any) =>
    a.groupName.localeCompare(b.groupName
    )
  );
  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );
  const departmentList = useSelector((state: any) => state.department.department)
  const sortedDepartmentList = [...departmentList].sort((a: any, b: any) =>
    a.departmentName.localeCompare(b.departmentName)
  );

  const sortedjobProfileList = [...jobProfileList].sort((a: any, b: any) =>
    a.jobProfileName.localeCompare(b.jobProfileName)
  );
  const loaderStatus = useSelector((state: any) => state.attandence.status);

  const [date, setDate] = useState<any>(new Date());
  const [nextDate, setnextDate] = useState<any>(new Date());
  const [showCalender, setShowCalender] = useState(false);
  const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
  const [status, Setstatus] = useState("")
  const [loading, Setloading] = useState(false)
  console.log(loading)
  const [showTableRow, setShowTableRow] = useState<any>([]);

  const handleRowClick = (index: number) => {
    const isExpanded = showTableRow.includes(index);
    if (isExpanded) {
      setShowTableRow(
        showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index)
      );
    } else {
      setShowTableRow([...showTableRow, index]);
    }
  };

  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState("");

  const observerTarget = useRef(null);
  const [suggestions, setSuggestions] = useState<any>([]);

  const [filter, setFilter] = useState({
    name: "",
    //groupName: localStorage.getItem("groupName") || "",
    groupName: [""],
    //jobProfileName: localStorage.getItem("jobProfileName") || [],
    jobProfileName: [""],
    //departmentName: localStorage.getItem("departmentName") || "",
    departmentName: [""],
    date: "",
    nextDate: "",
    page: 1,
    limit: 2000,
  });
  // const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [shopitems, setShopItems] = useState<any[]>([]);
  const shoplist = useSelector((state: any) => state.Shop.shop)

  // useEffect(() => {
  //   const currentDate = new Date(date);
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   const day = String(currentDate.getDate()).padStart(2, "0");
  //   setFilter({
  //     ...filter,
  //     date: `${year}-${month}-${day}`,
  //     page: 1,
  //   });
  // }, [date]);




  useEffect(() => {
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
    dispatch(getAllDepartmentAsync());
    dispatch(allShopAsync())
  }, []);
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

  // const [selectedShop,] = useState("All Shop");
  const [shopName, setShopName] = useState([""]);

  // const handleShopChange = (event: any) => {

  //   const selectedValue = event.target.value;
  //   setSelectedShop(selectedValue);

  //   if (selectedValue === "All Shop") {
  //     setShopName("");
  //   } else {
  //     setShopName(selectedValue);
  //   }
  // };

  useEffect(() => {
    function getDateRange(startDate: any, endDate: any) {
      if (nextDate) {
        const result = [];
        const currentDate = new Date(startDate);
        const finalDate = new Date(endDate);
        while (currentDate <= finalDate) {
          result.push(currentDate.toISOString().slice(0, 10));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setDateRange([...result]);
      }
    }
    getDateRange(filter.date, filter.nextDate);
    if (shopName.length < 1) {
      return;
    }

    // const currentDate = new Date();
    // const formattedDate = currentDate.toISOString().slice(0, 10);
    let sendData = {}
    sendData = {
      shopNames: shopName,
      date: filter.date,
      nextDate: filter.nextDate

    }
    //console.log("Daatta",sendData)

    dispatch(getShopFilterAttandenceAsync(sendData)).then((data: any) => {
      const employeeData = data.payload.shopData;
      console.log("eeeeeeeeeeeee", employeeData)
      setShopItems(employeeData)
    });

  }, [shopName])
  const [dateRange, setDateRange] = useState<any>([]);
  useEffect(() => {

    setShopName([])
    Setloading(true)
    filter.page = 1;
    if (filter.nextDate === "") {
      filter.nextDate = filter.date
    }

    dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
      console.log("---------", data.payload);
      const employeeData = data.payload.attendanceRecords;
      if (status === "") {
        setItems(employeeData);
        Setloading(false)
      }
      else {
        const filteredItems = employeeData.filter((element: any) => element.status === status);
        setItems(filteredItems)
        Setloading(false)
      }
    });
  }, [filter, status]);
  useEffect(() => {
    setShopName([])
    Setloading(true)
    filter.page = 1;
    if (filter.nextDate === "") {
      filter.nextDate = filter.date
    }
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const nDate = new Date(nextDate);
    const nextyear = nDate.getFullYear();
    const nextmonth = String(nDate.getMonth() + 1).padStart(2, "0");
    const nextday = String(nDate.getDate()).padStart(2, "0");

    filter.date = `${year}-${month}-${day}`
    filter.nextDate = `${nextyear}-${nextmonth}-${nextday}`;
    dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
      const employeeData = data.payload.attendanceRecords;
      if (status === "") {
        setItems(employeeData);
        Setloading(false)
      }
      else {
        const filteredItems = employeeData.filter((element: any) => element.status === status);
        setItems(filteredItems)
        Setloading(false)
      }
    });
  }, [date, nextDate]);

  useEffect(() => {
    function getDateRange(startDate: any, endDate: any) {
      if (nextDate) {
        const result = [];
        const currentDate = new Date(startDate);
        const finalDate = new Date(endDate);
        while (currentDate <= finalDate) {
          result.push(currentDate.toISOString().slice(0, 10));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setDateRange([...result]);
      }
    }
    setShopName([])
    Setloading(true)


    //localStorage.setItem("jobProfileName", filter.jobProfileName)
    //localStorage.setItem("groupName", filter.groupName)
    //localStorage.setItem("departmentName", filter.departmentName)
    filter.date = new Date().toISOString().slice(0, 10)

    getDateRange(filter.date, filter.nextDate);
    filter.page = 1;
    //dispatch(getAllEmployeeAsync(filter))
    console.log(filter)
    if (filter.nextDate === "") {
      filter.nextDate = filter.date
    }

    dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
      const employeeData = data.payload.attendanceRecords;
      if (status === "") {
        setItems(employeeData);
        Setloading(false)
      }
      else {
        const filteredItems = employeeData.filter((element: any) => element.status === status);
        setItems(filteredItems)
        Setloading(false)
      }
    });
  }, []);

  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  function formatDateExcel(date: any) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  function extractTime(dateTime: any) {
    if (!dateTime) {
      return '';
    }
    const date = new Date(dateTime);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const exportToExcel = () => {
    if (items) {
      const columnOrder = [
        'Sr.no',
        'Date',
        'EmployeeCode',
        'Name',
        'JobProfile',
        'Group',
        'PunchIn',
        'PunchOut',
        'Status',
        'Signature',
        'Shop Code',
        'Shop Name',
        // 'Remark'
        ""
      ];

      const modifiedData = items.map((record, index: number) => {
        // Destructure the record, omit unwanted properties
        const {
          updatedAt,
          createdAt,
          approvedImage,
          __v,
          _id,
          ...rest
        } = record;


        console.log({ ...rest });
        // Map the data according to the column order
        const mappedData = columnOrder.map((column) => {
          switch (column) {
            case 'Sr.no':
              return index + 1;
            case 'EmployeeCode':
              return record.employeeId.employeeCode;
            case 'Name':
              return record.employeeId.name;
            case 'Date':
              const date = new Date(record.date);
              const formattedDate = formatDateExcel(date);
              return formattedDate;
            case 'PunchIn':
              const time = extractTime(record.punches[0]?.punchIn);
              return time;
            case 'PunchOut':
              const time2 = extractTime(record.punches.length > 0 ? record.punches[record.punches.length - 1]?.punchOut : null);
              return time2;
            case 'Status':
              return record.status;
            case 'JobProfile':
              return record.employeeId.jobProfileId.jobProfileName;
            case 'Group':
              return record.employeeId.groupId.groupName;
            case 'Shop Code':
              return record.shopCode ? record.shopCode : "-";
            case 'Shop Name':
              return record.shopName ? record.shopName : "-";
            // case 'Remark':
            //   return record.remarks.length > 0 ? record.remarks[record.remarks.length - 1]?.remark : undefined;
            default:
              return '';
          }
        });

        return Object.fromEntries(mappedData.map((value, index) => [columnOrder[index], value]));
      });
      console.log("item", items)
      modifiedData.forEach((record) => {
        delete record.punches;
      });

      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'attendance_data.xlsx');
      toast.success("CSV Download Successfully");
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsGroupOpen(false);
    setIsDepartmentOpen(false);
    setIsShopOpen(false)
  };
  const GrouptoggleDropdown = () => {
    setIsGroupOpen(!isGroupOpen);
    setIsOpen(false);
    setIsDepartmentOpen(false);
    setIsShopOpen(false)
  };
  const DepartmenttoggleDropdown = () => {
    setIsDepartmentOpen(!isDepartmentOpen);
    setIsOpen(false);
    setIsGroupOpen(false);
    setIsShopOpen(false)
  };
  const ShoptoggleDropdown = () => {
    setIsDepartmentOpen(false);
    setIsOpen(false);
    setIsGroupOpen(false);
    setIsShopOpen(!isShopOpen)
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
  const handleShopCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setShopName([...shopName, value])
    } else {
      setShopName(shopName.filter((profile: any) => profile !== value))
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
  const selectShopAll = () => {
    const allProfiles = shoplist.map((element: any) => element.shopName);
    setShopName(allProfiles)
  };

  const clearShopAll = () => {
    setShopName([])
  };




  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setLabelVisible(false);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value,
      });
      console.log("searchh1", filter)
    } else {
      setLabelVisible(true);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value,
      });
    }
  };


  const tileClassName = ({ date }: any) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    if (dateRange.includes(formattedDate)) {
      return "bg-[#ECEDFE] text-[#FFFFFF]";
    }
    return "";
  };

  // open image
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedProfileImage, setSelectedProfileImage] = useState("");

  const handleImageClick = (imageSrc: any, profileSrc: any) => {
    setSelectedImage(imageSrc);
    setSelectedProfileImage(profileSrc)
    setIsImageOpen(true);
  };


  const handleCloseImage = () => {
    setIsImageOpen(false);
  };




  useEffect(() => {
    dispatch(getGroupAttendanceAsync());
  }, []);


  // pending rejected total
  const navigate = useNavigate();
  const handleTableRowClick = (data: any) => {
    const employeeId = { employeeId: data.employeeId._id };
    dispatch(getEmployeeImageAsync(employeeId));
    navigate(`/employee-profile`, { state: { additionalData: employeeId } });
    //console.log("hello", data)
  };

  let pendingCount = 0;
  let approvedCount = 0;
  let rejectedCount = 0;

  for (const entry of items) {
    // console.log(entry)
    if (entry.status === "pending") {
      pendingCount++;
    } else if (entry.status === "approved") {
      approvedCount++;
    } else if (entry.status === "rejected") {
      rejectedCount++;
    }

  }
 
  // console.log("aabcffff",shopitems)

  const punchesData = useSelector((state: any) => state.attandence.punchInPunchOut);

  let pendingShopCount = 0;
  let approvedShopCount = 0;
  let rejectedShopCount = 0;
  
  for (const entries of shopitems) {
    const status = entries.attendance;
    for(const i of status){
      console.log("statusssssss",i.status)
      if (i.status === "pending") {
      pendingShopCount++;
    } else if (i.status === "approved") {
      approvedShopCount++;
    } else if (i.status === "rejected") {
      rejectedShopCount++;
    }
    }  
    
  }
  



  return (
    <div className="px-[40px] pt-[32px]">
      <div className="flex flex-col gap-3 flex-start">
        <div className=" flex gap-3 justify-between items-center">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Database
          </div>
          <div onClick={exportToExcel} className="flex cursor-pointer   gap-[5px]  items-center px-[15px] h-9 w-30 bg-[#244a1d] rounded-lg">

            <p className="text-sm  font-medium whitespace-nowrap text-[#FFFFFF] tracking-[0.25px] ">Export to Excel</p>
          </div>

        </div>


        {loaderStatus === "loading" ? (
          <div className="flex flex-start pt-4 gap-6">

            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">Approved</p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">Pending</p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">Rejected</p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">Total Present</p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">Punch In</p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">0</span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">Punch Out</p>
            </div>
          </div>
        ): isShopOpen ? (
          <div className="flex flex-start pt-4 gap-6">
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {approvedShopCount}
                </span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">
                Approved

              </p>
            </div>
        
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">

                  {approvedShopCount + pendingShopCount + rejectedShopCount}
                </span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
                Total Present
              </p>
            </div>
          </div>
        )  
         : (
          <div className="flex flex-start pt-4 gap-6">
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {approvedCount}
                </span>
                {/* <img src={up} alt="" className="h-[16px] w-[16px] ms-1" /> */}
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">
                Approved

              </p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {pendingCount}
                </span>

              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">
                Pending
              </p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {rejectedCount}
                </span>

              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E]">
                Rejected
              </p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">

                  {approvedCount + pendingCount + rejectedCount}
                </span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
                Total Present
              </p>
            </div>


            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {punchesData && punchesData.countIn ? punchesData.countIn : 0}
                </span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
                Punch In
              </p>
            </div>
            <div className="flex flex-col w-[150px] h-[70px] shadow-lg justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
              <div className="flex justify-center items-center ">
                <span className="text-[#283093] text-xl font-semibold">
                  {punchesData && punchesData.countOut ? punchesData.countOut : 0}
                </span>
              </div>
              <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
                Punch Out
              </p>
            </div>
          </div>
        )
        }

      </div>

      <div className=" flex pt-6 justify-between items-center self-stretch ">
          <div className="flex gap-3">
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
            </div>
            <div>
              
              <div className="relative inline-block text-left  ml-3">
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
            </div>
            <div>
             
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"
                              
                  onClick={ShoptoggleDropdown}
                >
                  All Shop
                </button>
                {isShopOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">


                    <div className="flex flex-row p-2 gap-3">
                      <img src={SelectAll} onClick={selectShopAll} className="h-5 w-5 b" />
                      <img src={ClearAll} className="h-5 w-5 " onClick={clearShopAll} />
                    </div>
                    <div className="px-2 py-2 space-y-2 max-h-36 overflow-y-auto">
                      {shoplist &&
                        shoplist.map((element: any, index: any) => (
                          <label key={index} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={element.shopName}
                              checked={shopName.includes(element.shopName)}

                              onChange={handleShopCheckboxChange}
                              className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-200"
                            />
                            <span>{element.shopName}</span>
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
                  Setstatus(event.target.value)
                }}
                value={status}
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="added Manually by administrator">Manual</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>


              </select>
            </div>
          </div>
  


      </div>

      <div className="flex flex-row">
        {!isGroupOpen && <div className="relative mt-4">
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
            className="h-10 w-[200px] py-3 px-5 rounded-full text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
              {suggestions.map((suggestion: any, index: any) => (
                <input
                  type="text"
                  readOnly
                  key={index}
                  className="py-3 px-5 cursor-pointer focus:outline-none w-[200px] z-30"
                  value={suggestion}
                  onClick={(event) => {
                    setFilter({
                      ...filter,
                      name: (event.target as HTMLInputElement).value,
                    });
                    setSuggestions([]);
                  }}
                />
              ))}
            </div>
          )}
        </div>}

      </div>


      <div className="py-6 mb-24 overflow-auto">
        {/* TABLE STARTS HERE */}
        {loaderStatus === "loading" ? (
          <div className="flex justify-center w-full">
            <img src={LoaderGif} className="w-6 h-6" alt="" />
          </div>
        ) : (
          ""
        )
        }
        {loaderStatus !== "loading" &&
          <table className="w-full">
            <tbody>
              <tr className="bg-[#ECEDFE] cursor-default">
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Date
                </td>

                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Image
                </td>

                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Employee Code
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Name
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Shift
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Punch In
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Punch Out
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Status
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Approved By
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Shop
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Shop Code
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Photos
                </td>
              </tr>
              {shopName.length < 1 ?
                items &&
                items.map((element: any, index: number) => {
                  const punchesList = [...element.punches];
                  const sortedPunches = punchesList.sort((a: any, b: any) => {
                    return (
                      new Date(b.punchIn).getTime() -
                      new Date(a.punchIn).getTime()
                    );
                  });
                  const latestPunches = sortedPunches[0];
                  const firstPunches = sortedPunches[sortedPunches.length - 1]


                  return (
                    <>
                      <tr
                        key={element._id + latestPunches.punchIn}
                        className="hover:bg-[#FAFAFA]"

                      >
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {latestPunches.punchIn
                            ? latestPunches.punchIn.slice(0, 10)
                            : "Not Avilable"}
                        </td>
                        <td className=""  >
                          {element.profilePicture
                            ? <img src={element.profilePicture} className="w-[60px] h-[60px] rounded-full" />
                            : <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className="w-[60px] h-[60px] rounded-full" />}

                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  ">
                          {element.employeeId?.employeeCode
                            ? element.employeeId.employeeCode
                            : "Not Avilable"}{" "}
                        </td>

                        <td className="flex gap-2 py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap ">
                          <div className="flex flex-col">

                            <p onClick={() => handleTableRowClick(element)} className="font-medium hover:underline cursor-pointer">{element.employeeId?.name
                              ? element.employeeId?.name
                              : "Not Avilable"}</p>

                            <p className="text-[12px]">{element.employeeId.jobProfileId?.jobProfileName
                              ? element.employeeId.jobProfileId?.jobProfileName
                              : "Not Avilable"}</p>

                          </div>


                          {sortedPunches.slice(1).length > 0 ? (
                            <img
                              onClick={() => {
                                handleRowClick(index);

                              }} src={
                                showTableRow.includes(index)
                                  ? CaretUp
                                  : CaretDown
                              }
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                        </td>

                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  ">
                          {element.shift === "day" ? "Day" :
                            element.shift === "night" ? "Night" : "-"}
                        </td>


                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {showTableRow.includes(index)
                            ? latestPunches.punchIn
                              ? changetime(latestPunches.punchIn)
                              : "Not Available"
                            : firstPunches.punchIn
                              ? changetime(firstPunches.punchIn)
                              : "Not Available"}
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          {latestPunches.punchOut
                            ? changetime(latestPunches.punchOut)
                            : "-"}
                        </td>
                        <td className="py-4 px-5">
                          {element?.status === "approved" && (
                            <span className="flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4">
                              <img
                                src={GreenCheck}
                                className="h-[10px] w-[10px]"
                                alt="check"
                              />
                              <span className="text-sm font-normal text-[#186A3B]">
                                Approved
                              </span>
                            </span>
                          )}
                          {element?.status === "rejected" && (
                            <span className="flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4">
                              <img
                                src={RedX}
                                className="h-[10px] w-[10px]"
                                alt="check"
                              />
                              <span className="text-sm font-normal text-[#8A2626]">
                                Rejected
                              </span>
                            </span>
                          )}
                          {element.status === "pending" && (
                            <span className="flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4">
                              <img
                                src={SpinnerGap}
                                className="h-[10px] w-[10px]"
                                alt="check"
                              />
                              <span className="text-sm font-normal text-[#945D2D]">
                                Pending
                              </span>
                            </span>
                          )}
                          {element.status === "added Manually by administrator" && (
                            <span className="flex gap-2 items-center bg-[#acb7f3] w-[106px] h-[26px] rounded-[46px] py-2 px-4">
                              <img
                                src={SpinnerGap}
                                className="h-[10px] w-[10px]"
                                alt="check"
                              />
                              <span className="text-sm font-normal text-[#2c2c6d]">
                                Manual
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 flex justify-center flex-col text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                          <p className="font-medium">

                            {element.approvedBy?.name
                              ? element.approvedBy?.name
                              : "-"}
                          </p>
                          <p className="text-[12px]">

                            {element.approvedBy?.jobProfileId?.jobProfileName
                              ? element.approvedBy?.jobProfileId?.jobProfileName
                              : "-"}
                          </p>

                        </td>

                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap">
                          <p className="">{element.shopName ? element.shopName : "-"}</p>
                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap">
                          <p className="">{element.shopCode ? element.shopCode : "-"}</p>
                        </td>


                        {/* photo open */}

                        <td className="text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                          {element?.status === "approved" &&
                            element.approvedImage && (
                              <img onClick={() =>
                                handleImageClick(
                                  element.approvedImage,
                                  element?.profilePicture

                                )
                              } src={element.approvedImage} className="w-[60px] h-[60px] rounded-full" />

                            )}
                        </td>
                      </tr>
                      {showTableRow.includes(index) &&
                        sortedPunches &&
                        sortedPunches.slice(1).map((element: any) => {
                          return (
                            <tr key={element._id + element.punchIn}>
                              <td>
                                <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                              </td>
                              <td>
                                <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                              </td>
                              <td>
                                <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                              </td>
                              <td>
                                <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                              </td>
                              <td>
                                <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                              </td>
                              <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                {element.punchIn
                                  ? changetime(element.punchIn)
                                  : "Not Avilable"}
                              </td>
                              <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                {element.punchOut
                                  ? changetime(element.punchOut)
                                  : "Not Avilable"}
                              </td>


                            </tr>
                          );
                        })}
                    </>
                  );
                })
                :
                shopitems && shopitems.map((temp: any) => {
                  return (
                    <>
                      {
                        temp?.attendance
                        &&
                        temp?.attendance.map((element: any, index: number) => {
                          const punchesList = [...element.punches];
                          const sortedPunches = punchesList.sort((a: any, b: any) => {
                            return (
                              new Date(b.punchIn).getTime() -
                              new Date(a.punchIn).getTime()
                            );
                          });
                          const latestPunches = sortedPunches[0];
                          const firstPunches = sortedPunches[sortedPunches.length - 1]


                          return (
                            <>
                              <tr
                                key={element._id + latestPunches.punchIn}
                                className="hover:bg-[#FAFAFA]"

                              >
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                  {latestPunches.punchIn
                                    ? latestPunches.punchIn.slice(0, 10)
                                    : "Not Avilable"}
                                </td>

                                <td className=""  >
                                  {element.profilePicture
                                    ? <img src={element.profilePicture} className="w-[60px] h-[60px] rounded-full" />
                                    : <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className="w-[60px] h-[60px] rounded-full" />}

                                </td>

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  ">
                                  {element.employeeId?.employeeCode
                                    ? element.employeeId.employeeCode
                                    : "Not Avilable"}{" "}
                                </td>

                                <td className="flex gap-2 py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap ">
                                  <div className="flex flex-col">

                                    <p onClick={() => handleTableRowClick(element)} className="font-medium hover:underline cursor-pointer">{element.employeeId?.name
                                      ? element.employeeId?.name
                                      : "Not Avilable"}</p>

                                    <p className="text-[12px]">{element.employeeId.jobProfileId?.jobProfileName
                                      ? element.employeeId.jobProfileId?.jobProfileName
                                      : "Not Avilable"}</p>

                                  </div>


                                  {sortedPunches.slice(1).length > 0 ? (
                                    <img
                                      onClick={() => {
                                        handleRowClick(index);

                                      }} src={
                                        showTableRow.includes(index)
                                          ? CaretUp
                                          : CaretDown
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  ">
                                  {element.shift === "day" ? "Day" :
                                    element.shift === "night" ? "Night" : "-"}
                                </td>


                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                  {showTableRow.includes(index)
                                    ? latestPunches.punchIn
                                      ? changetime(latestPunches.punchIn)
                                      : "Not Available"
                                    : firstPunches.punchIn
                                      ? changetime(firstPunches.punchIn)
                                      : "Not Available"}
                                </td>
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                  {latestPunches.punchOut
                                    ? changetime(latestPunches.punchOut)
                                    : "-"}
                                </td>
                                <td className="py-4 px-5">
                                  {element?.status === "approved" && (
                                    <span className="flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4">
                                      <img
                                        src={GreenCheck}
                                        className="h-[10px] w-[10px]"
                                        alt="check"
                                      />
                                      <span className="text-sm font-normal text-[#186A3B]">
                                        Approved
                                      </span>
                                    </span>
                                  )}
                                  {element?.status === "rejected" && (
                                    <span className="flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4">
                                      <img
                                        src={RedX}
                                        className="h-[10px] w-[10px]"
                                        alt="check"
                                      />
                                      <span className="text-sm font-normal text-[#8A2626]">
                                        Rejected
                                      </span>
                                    </span>
                                  )}
                                  {element.status === "pending" && (
                                    <span className="flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4">
                                      <img
                                        src={SpinnerGap}
                                        className="h-[10px] w-[10px]"
                                        alt="check"
                                      />
                                      <span className="text-sm font-normal text-[#945D2D]">
                                        Pending
                                      </span>
                                    </span>
                                  )}
                                  {element.status === "added Manually by administrator" && (
                                    <span className="flex gap-2 items-center bg-[#acb7f3] w-[106px] h-[26px] rounded-[46px] py-2 px-4">
                                      <img
                                        src={SpinnerGap}
                                        className="h-[10px] w-[10px]"
                                        alt="check"
                                      />
                                      <span className="text-sm font-normal text-[#2c2c6d]">
                                        Manual
                                      </span>
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-5 flex justify-center flex-col text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                  <p className="font-medium">

                                    {element.approvedBy?.name
                                      ? element.approvedBy?.name
                                      : "-"}
                                  </p>
                                  <p className="text-[12px]">

                                    {element.approvedBy?.jobProfileId?.jobProfileName
                                      ? element.approvedBy?.jobProfileId?.jobProfileName
                                      : "-"}
                                  </p>

                                </td>

                                <td className="py-4 px-5 text-sm  font-normal text-[#2E2E2E]  whitespace-wrap">
                                  {element?.status === "approved" && (
                                    <div>{temp.shopName ? temp.shopName : "-"}</div>
                                  )}
                                </td>
                                <td className="py-4 px-5 text-sm  font-normal text-[#2E2E2E]  whitespace-wrap">
                                  {element?.status === "approved" && (
                                    <div>{temp.shopCode ? temp.shopCode : "-"}</div>
                                  )}
                                </td>



                                {/* photo open */}

                                <td className="text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                                  {element?.status === "approved" &&
                                    element.approvedImage && (
                                      <img onClick={() =>
                                        handleImageClick(
                                          element.approvedImage,
                                          element?.profilePicture

                                        )
                                      } src={element.approvedImage} className="w-[60px] h-[60px] rounded-full" />

                                    )}
                                </td>
                              </tr>
                              {showTableRow.includes(index) &&
                                sortedPunches &&
                                sortedPunches.slice(1).map((element: any) => {
                                  return (
                                    <tr key={element._id + element.punchIn}>
                                      <td>
                                        <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                                      </td>
                                      <td>
                                        <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                                      </td>
                                      <td>
                                        <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                                      </td>
                                      <td>
                                        <div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div>
                                      </td>
                                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element.punchIn
                                          ? changetime(element.punchIn)
                                          : "Not Avilable"}
                                      </td>
                                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                        {element.punchOut
                                          ? changetime(element.punchOut)
                                          : "Not Avilable"}
                                      </td>


                                    </tr>
                                  );
                                })}
                            </>
                          );
                        })}
                    </>
                  )
                })
              }
            </tbody >


            <div ref={observerTarget}></div>
            {isImageOpen && (
              <div className="fixed  left-0 right-0 m-auto flex   inset-0 z-50  items-center justify-center bg-black bg-opacity-75">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col text-center gap-2">
                    <p className="font-bold text-white ">Profile Image</p>
                    {selectedProfileImage ?

                      <img src={selectedProfileImage} alt="Profile image" className="h-[20rem]" />
                      : <img src={DummyProfilr} alt="Profile image" className="h-[20rem]" />

                    }
                  </div>
                  <div className="flex flex-col text-center gap-2">
                    <p className="font-bold text-white">Approved Image</p>
                    <img src={selectedImage} alt="Approved" className="h-[20rem]" />
                  </div>

                </div>
                <button
                  className="close-button absolute top-[10rem] right-[30rem] p-[10px]  rounded-full shadow-lg"
                  onClick={handleCloseImage}
                >

                  <img
                    src={close}
                    alt=""
                    className="h-[25px] w-[25px] bg-white rounded-full "
                  />
                </button>
              </div>
            )}
          </table>}
      </div>

      <div className="fixed flex justify-center bottom-0 left-[270px] right-0">
        <div className="flex gap-3 items-center justify-center w-[300px] h-12 mb-10 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
          <button
            onClick={() => {
              const temp = new Date(date);
              temp.setDate(date.getDate() - 1);
              setDate(temp);
              const datePart = temp.toISOString().slice(0, 10);
              setFilter({
                ...filter,
                date: datePart
              }
              )
            }}
          >
            <img src={CaretLeft} alt="" className="w-4 h-4" />
          </button>
          {showCalender && (
            <div className="filterCalender absolute z-20 bottom-28">
              <Calendar
                tileClassName={tileClassName}
                onChange={(event) => {
                  if (calenderDayClicked.length === 0) {
                    setDate(event);
                    // const datePart= date.toISOString().slice(0, 10);

                    // setFilter({
                    //   ...filter,
                    //   date:datePart
                    // }
                    // )

                  } else if (calenderDayClicked.length === 1) {
                    setnextDate(event);
                    //       const datePart= nextDate.toISOString().slice(0, 10);
                    // setFilter({
                    //   ...filter,
                    //   nextDate:datePart
                    // }
                    // )
                  }

                  if (calenderDayClicked.length < 1) {
                    setcalenderDayClicked([...calenderDayClicked, 1]);
                  }
                }}
                onClickDay={() => {
                  if (calenderDayClicked.length > 0) {
                    setShowCalender(false);
                    setcalenderDayClicked([]);
                  }
                }}
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
                formatShortWeekday={(locale, date) => {
                  console.log(locale);
                  return ["S", "M", "T", "W", "T", "F", "S"][date.getDay()];
                }}
              />
            </div>
          )}
          <p
            onClick={() => {
              setShowCalender(!showCalender);
            }}
            className="text-sm font-medium text-[#283093] cursor-pointer"
          >{`${formatDate(date)} - ${nextDate ? formatDate(nextDate) : formatDate(date)
            }`}</p>
          <button
            onClick={() => {
              const temp = new Date(nextDate);
              temp.setDate(nextDate.getDate() + 1);
              console.log("Date", temp)
              setnextDate(temp);
              // const datePart= temp.toISOString().slice(0, 10);
              // setFilter({
              //   ...filter,
              //   nextDate:datePart
              // }
              // )

            }}
          >
            <img src={CaretRight} className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    </div >
  );
};

6