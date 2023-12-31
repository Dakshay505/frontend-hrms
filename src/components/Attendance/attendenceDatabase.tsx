import right from "../../assets/r-arrow.png";
// import up from "../../assets/arrow-up.png";
import GreenCheck from "../../assets/GreenCheck.svg";
import { LazyLoadImage} from 'react-lazy-load-image-component';
import RedX from "../../assets/RedX.svg";
import SpinnerGap from "../../assets/SpinnerGap.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../attndence.css";
import { useEffect, useState, useRef } from "react";
import CaretDown from "../../assets/CaretDown11.svg";
import CaretUp from "../../assets/CaretUp.svg";
import LoaderGif from "../../assets/loadergif.gif";
import DummyProfilr from "../../assets/Dummy.jpeg"
//import ArrowSqureOut from "../../assets/ArrowSquareOut.svg";
import close from "../../assets/x1.png";
import axios from "axios";
import { getAllAttandenceApiPath } from "../../APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAllPunchInPunchOutAsync, getGroupAttendanceAsync } from "../../redux/Slice/AttandenceSlice";
import { getEmployeeImageAsync } from "../../redux/Slice/EmployeeSlice";
export const AttendenceDtabase = () => {
  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // function convertToQueryString(data: any) {
  //   let queryStr = "";
  //   for (let key in data) {
  //     if (data.hasOwnProperty(key) && data[key] !== "" && data[key] !== null) {
  //       if (queryStr !== "") {
  //         queryStr += "&";
  //       }
  //       queryStr += `${encodeURIComponent(key)}=${encodeURIComponent(
  //         data[key]
  //       )}`;
  //     }
  //   }
  //   return queryStr;
  // }
  const getAllAttandence = async (sendData: any) => {
    // setIsLoading(true);
    try {
      // const filterDatta = convertToQueryString(sendData);
      const { data } = await axios.post(
        `${getAllAttandenceApiPath}`, sendData,
        {
          withCredentials: true,
        }
      );
      setItems(data.attendanceRecords);
      console.log("all atendence", data.attendanceRecords);
      const numberOfEmployee = parseInt(data.numberOfEmployee) || 0;

      setTotal((prevTotal) => prevTotal + numberOfEmployee);

      // setIsLoading(false);
    } catch (err: any) {
      console.log(err.response.data);
      // setIsLoading(false);
    }
  };


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
  const changetime = (createdAtDate: any) => {
    //console.log(createdAtDate)
    const date = new Date(createdAtDate)
    const hours = date.getUTCHours(); // Get the hours in UTC
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = (hours % 12) || 12; // Use 12 for 0 hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    return formattedTime;
  }

  const [showTableRow, setShowTableRow] = useState<any>([]);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  console.log(total)
  console.log("hello", items);
  const observerTarget = useRef(null);
  // const [isLoading, setIsLoading] = useState(false);
  const loaderStatus = useSelector((state: any) => state.attandence.status);

  const punchesData = useSelector((state: any) => state.attandence.punchInPunchOut);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
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
  const limit = 2000;

  // const [page, setPage] = useState(0);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const requestData = {
      date: `${year}-${month}-${day}`,
      page: 1, // Use the incremented page
      limit: limit,

    };
    //console.log(requestData)
    // if (page === 0) {
    //   return;
    // }
    getAllAttandence(requestData);
  }, []);

  // const handlerFatchMore = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // const groupAttendanceList = useSelector(
  //   (state: any) => state.attandence.groupAttendance
  // );



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupAttendanceAsync());
    dispatch(getAllPunchInPunchOutAsync());
  }, []);

  // const totalPresent = items?.length
  // console.log(totalPresent)
  // const totalEmployees = groupAttendanceList.reduce(
  //   (acc: any, group: any) => acc + group.totalEmployeesInGroup,
  //   0
  // );
  // const totalAbsent = totalEmployees - totalPresent;



  const navigate = useNavigate();
  const handleTableRowClick = (data: any) => {
    const employeeId = { employeeId: data.employeeId._id };
    dispatch(getEmployeeImageAsync(employeeId));
    navigate(`/employee-profile`, { state: { additionalData: employeeId } });
    console.log("hello", data)
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


  return (
    <div className="px-10 pt-8">
      <div className="flex flex-col flex-start">
        <div className=" flex justify-between item-center max-w-[90%]">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Overview
          </div>
          <Link
            to="/attendance-overview"
            className="flex cursor-pointer gap-[6px] justify-center items-center"
          >
            <p className="text-[#666666] text-[16px] font-medium leading-6">
              See All{" "}
            </p>
            <img src={right} alt="" className="h-[16px] w-[16px]" />
          </Link>
        </div>
        <div className="flex flex-start pt-4 gap-6">
          <div className="flex flex-col w-[150px] h-[70px] shadow-lg  justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-xl font-semibold">
                {approvedCount}
              </span>
            </div>
            <p className="text-sm font-medium leading-6 text-[#2E2E2E]">
              Approved

            </p>
          </div>
          <div className="flex flex-col w-[150px] h-[70px] shadow-lg  justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
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

          <div className="flex flex-col w-[150px] h-[70px] shadow-lg  justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-xl font-semibold">
                {pendingCount + approvedCount + rejectedCount}
              </span>
            </div>
            <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
              Total Present
            </p>
          </div>
          <div className="flex flex-col w-[150px] h-[70px] shadow-lg  justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-xl font-semibold">
                {punchesData && punchesData.countIn ? punchesData.countIn : 0}
              </span>
            </div>
            <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
              Punch In
            </p>
          </div>
          <div className="flex flex-col w-[150px] h-[70px] shadow-lg  justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
            <div className="flex justify-center items-center">
              <span className="text-[#283093] text-xl font-semibold">
                {punchesData && punchesData.countOut ? punchesData.countOut : 0}
              </span>
            </div>
            <p className="text-sm font-medium leading-6 text-[#2E2E2E] whitespace-nowrap">
              Punch Out
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-[48px]">
        <div className=" flex justify-between max-w-[90%] item-center">
          <div className="text-2xl font-bold text-[#2E2E2E]">
            Attendance Database
          </div>
          <Link to="/attendance-database">
            <div className="flex cursor-pointer justify-center items-center">
              <p className="text-[#666666] text-[16px] font-medium leading-6">
                See All
              </p>
              <img src={right} alt="" className="h-4 w-4" />
            </div>
          </Link>
        </div>

        <div className="py-6 overflow-auto">
          {/* TABLE STARTS HERE */}

          <table className="w-full">
            <tbody>
              <tr className="bg-[#ECEDFE] cursor-default" >

                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Date
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Profile Name
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
                  Approved By{" "}
                </td>
                <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                  Photo
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
                        <td className="py-4 px-5"  >
                          {element.profilePicture
                            ? <LazyLoadImage src={element.profilePicture} className="w-[60px] h-[60px] rounded-full" />
                            : <LazyLoadImage src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className="w-[60px] h-[60px] rounded-full" />}

                        </td>
                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap  ">
                          {element.employeeId?.employeeCode
                            ? element.employeeId.employeeCode
                            : "Not Avilable"}


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
                        <td className="py-4 px-5 flex justify-center flex-col  text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
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
                        <td className="text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap">
                          {element?.status === "approved" &&
                            element.approvedImage && (
                              <LazyLoadImage onClick={() =>
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
          </table>

          {/* TABLE ENDS HERE */}
        </div>
      </div>
    </div>
  );
};
