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
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import up from "../../assets/arrow-up.png";
import { getAllAttandenceAsync, getShopFilterAttandenceAsync } from "../../redux/Slice/AttandenceSlice";
import CaretDown from "../../assets/CaretDown11.svg";
import CaretUp from "../../assets/CaretUp.svg";
import LoaderGif from "../../assets/loadergif.gif";
import ArrowSqureOut from "../../assets/ArrowSquareOut.svg";
import close from "../../assets/x1.png";
import { getAllDepartmentAsync } from "../../redux/Slice/departmentSlice";
import { getAllEmployeeAsync, getEmployeeImageAsync } from "../../redux/Slice/EmployeeSlice";
import { allShopAsync } from "../../redux/Slice/ShopSlice";

export const AttendenceDashboardList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state: any) => state.group.groups);
  const employeeList = useSelector((state: any) => state.employee.employees);
  const totalEmployees = employeeList.length;
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
  const [nextDate, setnextDate] = useState<any>();
  const [showCalender, setShowCalender] = useState(false);
  const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
  const [status, Setstatus] = useState("")
  const [loading, Setloading] = useState(false)

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
    groupName: localStorage.getItem("groupName") || "",
    jobProfileName: localStorage.getItem("jobProfileName") || "",
    departmentName: localStorage.getItem("departmentName") || "",
    date: "",
    nextDate: "",
    page: 1,
    limit: 2000,
  });
  // const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const shoplist = useSelector((state: any) => state.Shop.shop)
  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setFilter({
      ...filter,
      date: `${year}-${month}-${day}`,
      page: 1,
    });
  }, [date]);
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

  const [selectedShop, setSelectedShop] = useState("All Shop");
  const [shopName, setShopName] = useState("");

  const handleShopChange = (event: any) => {

    const selectedValue = event.target.value;
    setSelectedShop(selectedValue);

    if (selectedValue === "All Shop") {
      setShopName("");
    } else {
      setShopName(selectedValue);
    }
  };

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
    if (shopName === "") {
      return
    }
    // const currentDate = new Date();
    // const formattedDate = currentDate.toISOString().slice(0, 10);
    let sendData = {}
    sendData = {
      shopName: shopName,
      date: filter.date,
      nextDate: filter.nextDate

    }

    dispatch(getShopFilterAttandenceAsync(sendData)).then((data: any) => {
      const employeeData = data.payload.attendance;
      setItems(employeeData)
    });

  }, [shopName])
  const [dateRange, setDateRange] = useState<any>([]);
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
    setShopName("")
    Setloading(true)
    localStorage.setItem("jobProfileName", filter.jobProfileName)
    localStorage.setItem("groupName", filter.groupName)
    localStorage.setItem("departmentName", filter.departmentName)

    getDateRange(filter.date, filter.nextDate);
    filter.page = 1;
    dispatch(getAllEmployeeAsync(filter))
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
  }, [filter, status]);
  // const handlerFatchMore = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

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
  const navigate = useNavigate();

  const handleTableRowClick = (data: any) => {
    const employeeId = { employeeId: data.employeeId._id };
    dispatch(getEmployeeImageAsync(employeeId));
    navigate(`/employee-profile`, { state: { additionalData: employeeId } });
  };
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
        'Shop',
        // 'ApprovedBy',
        // 'ApprovedTime',
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

        console.log({...rest});
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
            // case 'ApprovedBy':
            //   return record.approvedBy?.name;
            // case 'ApprovedTime':
            //   const time3 = extractTime(record.approvedTime);
            //   return time3;
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


  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setLabelVisible(false);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value,
      });
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

  const handleImageClick = (imageSrc: any) => {
    setSelectedImage(imageSrc);
    setIsImageOpen(true);
  };

  const handleCloseImage = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="px-[40px] pt-[32px]">
      <div className="flex flex-col flex-start">
        <div className=" flex gap-3 justify-between items-center">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Database
          </div>
          <div onClick={exportToExcel} className="flex cursor-pointer   gap-[5px]  items-center px-[15px] h-9 w-30 bg-[#244a1d] rounded-lg">

            <p className="text-sm  font-medium whitespace-nowrap text-[#FFFFFF] tracking-[0.25px] ">Export to Excel</p>
          </div>

        </div>

        <div className="flex flex-start pt-4 gap-6">
          {selectedShop !== "All Shop" ? (
            <>

              <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                <div className="flex justify-center items-center">
                  <span className="text-[#283093] text-2xl font-semibold">
                    {items.length}
                  </span>
                  {/* <img src={up} alt="" className="h-[16px] w-[16px] ms-1" /> */}
                </div>
                <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
                  Approved
                </p>
              </div>
              <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                <div className="flex justify-center items-center">
                  <span className="text-[#283093] text-2xl font-semibold">
                    {items.length}
                  </span>
                </div>
                <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
                  total
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                <div className="flex justify-center items-center">
                  <span className="text-[#283093] text-2xl font-semibold">
                    {loading ? 0 : items.length}
                  </span>
                  <img src={up} alt="" className="h-[16px] w-[16px] ms-1" />
                </div>
                <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
                  Present
                </p>
              </div>
              <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                <div className="flex justify-center items-center">
                  <span className="text-[#283093] text-2xl font-semibold">
                    {loading ? 0 : totalEmployees - items.length}
                  </span>
                  <img src={up} alt="" className="h-[16px] w-[16px] rotate-180 ms-1" />
                </div>
                <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
                  Absent
                </p>
              </div>
              <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                <div className="flex justify-center items-center">
                  <span className="text-[#283093] text-2xl font-semibold">
                    {loading ? 0 : totalEmployees}
                  </span>
                </div>
                <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
                  Total
                </p>
              </div>
            </>
          )}

        </div>

      </div>

      <div className=" flex pt-6 justify-between items-center self-stretch ">
        <div className="flex gap-5">
          <div className="flex gap-3">
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 w-[280px] text-sm font-medium text-[#2E2E2E] min-w-[160px] px-2 focus:outline-none"
              >
                <option value="All Groups">All Groups</option>
                {sortedgroupList &&
                  sortedgroupList.map((element: any, index: number) => {
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"
              >
                <option value="All Job Profiles">All Job Profiles</option>
                {sortedjobProfileList &&
                  sortedjobProfileList.map((element: any, index: number) => {
                    return (
                      <option key={index} className="max-w-[210px] w-[210px] min-w-[210px]" value={element.jobProfileName}>
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"
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
            <div>
              <select
                onChange={handleShopChange}
                value={selectedShop}
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] w-[210px] px-5 focus:outline-none"
              >
                <option value="All Shop">All Shop</option>
                {shoplist && Array.isArray(shoplist) && shoplist.map((element: any, index: any) => (
                  <option key={index} value={element?.shopName}>
                    {element?.shopName}
                  </option>
                ))}

              </select>
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
          <div>

          </div>

        </div>

      </div>
      <div className="flex flex-row">
        <div className="relative mt-4">
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
        </div>

      </div>


      <div className="py-6 mb-24 overflow-auto">
        {/* TABLE STARTS HERE */}
        <table className="w-full">
          <tbody>
            <tr className="bg-[#ECEDFE] cursor-default">
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Date
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Employee Code
              </td>
              <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                Name
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
                Photos
              </td>
            </tr>
            {items &&
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

                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                        {element?.status === "approved" && (
                          <div>{selectedShop !== "All Shop" ? selectedShop : "-"}</div>
                        )}
                      </td>


                      {/* photo open */}

                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                        {element?.status === "approved" &&
                          element.approvedImage && (
                            <div className="flex gap-[10px] cursor-pointer">
                              <div>
                                <p
                                  className="text-[12px] leading-4 font-medium text-[#283093] underline"
                                  onClick={() =>
                                    handleImageClick(
                                      element.approvedImage
                                    )
                                  }
                                >
                                  Open Photo
                                </p>
                              </div>
                              <div>
                                <img
                                  src={ArrowSqureOut}
                                  className="w-[14px] h-[14px]"
                                  alt="arrowsqureout"
                                />
                              </div>
                            </div>
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
          </tbody >

          {loaderStatus === "loading" ? (
            <div className="flex justify-center w-full">
              <img src={LoaderGif} className="w-6 h-6" alt="" />
            </div>
          ) : (
            ""
          )
          }
          <div ref={observerTarget}></div>
          {isImageOpen && (
            <div className="fixed  left-0 right-0 m-auto flex   inset-0 z-50  items-center justify-center bg-black bg-opacity-75">
              <img src={selectedImage} alt="Approved" className="h-[20rem]" />
              <button
                className="close-button absolute top-[10rem] right-[37rem] p-[10px]  rounded-full shadow-lg"
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
        </table>
        {/* TABLE ENDS HERE */}
      </div>

      <div className="fixed flex justify-center bg-white bottom-0 left-[270px] right-0">
        <div className="flex gap-3 items-center justify-center w-[300px] h-12 mb-10 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
          <button
            onClick={() => {
              const nextDate = new Date(date);
              nextDate.setDate(date.getDate() - 1);
              setDate(nextDate);
            }}
          >
            <img src={CaretLeft} alt="" className="w-4 h-4" />
          </button>
          {showCalender && (
            <div className="filterCalender absolute z-20 bottom-28">
              <Calendar
                tileClassName={tileClassName}
                onChange={(event) => {
                  calenderDayClicked.length === 0 ? setDate(event) : "";
                  calenderDayClicked.length === 1 ? setnextDate(event) : "";
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
              const nextDate = new Date(date);
              nextDate.setDate(date.getDate() + 1);
              setDate(nextDate);
            }}
          >
            <img src={CaretRight} className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    </div >
  );
};
