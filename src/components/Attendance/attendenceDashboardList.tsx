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
  const totalEmployees=employeeList.length;
  const sortedgroupList=[...groupList].sort((a: any, b: any) =>
  a.groupName.localeCompare(b.groupName
    )
);
  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );
  // const departmentList=useSelector((state:any)=>state.department.department)
//   const sortedDepartmentList = [...departmentList].sort((a: any, b: any) =>
//   a.departmentName.localeCompare(b.departmentName)
// );

const sortedjobProfileList = [...jobProfileList].sort((a: any, b: any) =>
  a.jobProfileName.localeCompare(b.jobProfileName)
);
  const loaderStatus = useSelector((state: any) => state.attandence.status);

  const [date, setDate] = useState<any>(new Date());
  const [nextDate, setnextDate] = useState<any>();
  const [showCalender, setShowCalender] = useState(false);
  const [calenderDayClicked, setcalenderDayClicked] = useState<any>([]);
  const [status,Setstatus]=useState("")

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
  const [shopName,setShopName]=useState("")

  const [filter, setFilter] = useState({
    name: "",
    groupName: localStorage.getItem("groupName")||"",
    jobProfileName:localStorage.getItem("jobProfileName")||"",

    date: "",
    nextDate: "",
    page: 1,
    limit: 2000,
  });
  // const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const shoplist=useSelector((state:any)=>state.Shop.shop)
 

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
  const changetime=(createdAtDate:any)=>{
    //console.log(createdAtDate)
    const date=new Date(createdAtDate)
    const hours = date.getUTCHours(); // Get the hours in UTC
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

// Convert to 12-hour format
const formattedHours = (hours % 12) || 12; // Use 12 for 0 hours
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    
    
  
  
    return formattedTime;
}

  // const fetchData = async () => {
  //   try {
  //     filter.page = 1;

  //     dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
  //       const employeeData = data.payload.attendanceRecords;

  //       const arr: any = [];

  //       if (employeeData.length > 0) {
  //         setItems((prevItems) => [...prevItems, ...employeeData]);

  //         for (let i = 0; i < employeeData.length; i++) {
  //           arr.push(employeeData[i].employeeId.name);
  //         }

  //         0;
  //       }
  //     });
  //   } catch (error) {
  //     // Handle error
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       console.log(entries); // Check intersection entries in the console
  //       if (entries[0].isIntersecting) {
  //         console.log("Load more triggered"); // Debug load more action
  //         handlerFatchMore();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (observerTarget.current) {
  //     observer.observe(observerTarget.current);
  //   }

  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  // }, [observerTarget]);
  useEffect(()=>{
    if(shopName===""){
      return
    }
    const currentDate = new Date();
  

  const formattedDate = currentDate.toISOString().slice(0, 10);

    const sendData = {
      shopName: shopName,
      date: formattedDate 
    };
  
  dispatch(getShopFilterAttandenceAsync(sendData)).then((data: any) => {
    console.log("hiii",data.payload)
    const employeeData = data.payload.attendance;
    
    
    setItems(employeeData)
    
    
  });

  },[shopName])
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
   
    localStorage.setItem("jobProfileName",filter.jobProfileName)
    localStorage.setItem("groupName",filter.groupName)
    getDateRange(filter.date, filter.nextDate);
    filter.page = 1;
    dispatch(getAllEmployeeAsync(filter))
    dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
      const employeeData = data.payload.attendanceRecords;
      if(status===""){
        setItems(employeeData);
        
      }
      else{
      const filteredItems = employeeData.filter((element:any) => element.status === status);
      setItems(filteredItems)
      }
      
    });
  }, [filter,status]);
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
  const navigate = useNavigate();

  const handleTableRowClick = (data: any) => {
    const employeeId = { employeeId: data.employeeId._id };
    dispatch(getEmployeeImageAsync(employeeId));
    navigate(`/employee-profile`, { state: { additionalData: employeeId } });
    console.log("hello",data)
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
        <div className=" flex justify-between item-center max-w-[688px]">
          <div className="text-2xl font-bold text-[#2E2E2E]">
          Attendance Database
          </div>
          
        </div>
        <div className="flex flex-start pt-4 gap-6">
          <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-2xl font-semibold">
                {items.length}
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
                {totalEmployees-items.length}
              </span>
              <img
                src={up}
                alt=""
                className="h-[16px] w-[16px] rotate-180 ms-1"
              />
            </div>
            <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
              Absent
            </p>
          </div>
          <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-2xl font-semibold">
                {totalEmployees}
              </span>
            </div>
            <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
              Total
            </p>
          </div>
        </div>
      </div>
      
      <div className=" flex pt-6 justify-between items-center self-stretch ">
        <div className="flex gap-5">
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
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
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
              >
                <option value="All Job Profiles">All Job Profiles</option>
                {sortedjobProfileList &&
                  sortedjobProfileList.map((element: any, index: number) => {
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
                  if (event.target.value === "") {
                    setShopName("")
                  } else {
                    setShopName(event.target.value)
                  }
                }}
                value={shopName}
                className="border border-solid border-[#201f1f] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none"
              >
                <option value="">All Shop</option>
                {shoplist && shoplist.map((element:any,index:any)=>{return(
                   <option key={index} value={element.shopName}>{element.shopName} 
                    </option>
                )
})
               
                }
                
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
                Marked By{" "}
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
                const firstPunches=sortedPunches[sortedPunches.length-1]
                

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
                      
                      <td  className="flex gap-1 items-center py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-wrap hover:underline cursor-pointer">
                        <p onClick={()=>handleTableRowClick(element)}>{element.employeeId?.name
                          ? element.employeeId?.name
                          : "Not Avilable"}{" "}</p>
                        {sortedPunches.slice(1).length > 0 ? (
                          <img onClick={() => {
                            handleRowClick(index);
                          }}
                            src={
                              showTableRow.includes(index) ? CaretUp : CaretDown
                            }
                            className="w-[14px] h-[14px]"
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
                          ?changetime(latestPunches.punchOut)
                          : "Not Avilable"}
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
                      <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                        {element.approvedBy?.name
                          ? element.approvedBy?.name
                          : "-"}
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
          </tbody>

          {loaderStatus === "loading" ? (
            <div className="flex justify-center w-full">
              <img src={LoaderGif} className="w-6 h-6" alt="" />
            </div>
          ) : (
            ""
          )}
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
          >{`${formatDate(date)} - ${
            nextDate ? formatDate(nextDate) : formatDate(date)
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
    </div>
  );
};
