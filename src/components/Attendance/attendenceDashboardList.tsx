import { useState } from "react";
import FunnelSimple from '../../assets/FunnelSimple.svg'
import glass from "../../assets/MagnifyingGlass.png";
import GreenCheck from '../../assets/GreenCheck.svg';
import RedX from '../../assets/RedX.svg';
import SpinnerGap from '../../assets/SpinnerGap.svg'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "react-calendar";
import { getAllAttandenceAsync } from "../../redux/Slice/AttandenceSlice";

export const AttendenceDashboardList = () => {
  const dispatch = useDispatch();

  const allAttandenceList = useSelector((state: any) => state.attandence.allAttandence.attendanceRecords);
  const groupList = useSelector((state: any) => state.group.groups);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  const [date, setDate] = useState<any>(new Date());
  const [showCalender, setShowCalender] = useState(false);

  const [showTableRow, setShowTableRow] = useState<any>([]);

  const handleRowClick = (index: number) => {
    const isExpanded = showTableRow.includes(index)
    if (isExpanded) {
      setShowTableRow(showTableRow.filter((belowRowIndex: any) => belowRowIndex !== index))
    }
    else {
      setShowTableRow([...showTableRow, index])
    }
  }

  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [showFilter, setshowFilter] = useState(false);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  const [filter, setFilter] = useState({
    name: "",
    groupName: "",
    jobProfileName: "",
    date: ""
  });

  useEffect(() => {
    dispatch(getAllAttandenceAsync(filter)).then((data: any) => {
      const employeeData = data.payload.attendanceRecords;
      const arr:any = [];
      if(employeeData){
        for (let i = 0; i < employeeData.length; i++) {
          arr.push(employeeData[i].employeeId.name)
        }
        setFetchedSuggestions(arr.filter((item: any, index: any) => arr.indexOf(item) === index))
      }
      });
    console.log(fetchedSuggestions);
    dispatch(getAllGroupsAsync())
    dispatch(getAllJobProfileAsync())
  }, [])

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    setFilter({
      ...filter,
      date: `${year}-${month}-${day}`
    })
    console.log("hi")
  }, [date])

  useEffect(() => {
    console.log(filter);
    dispatch(getAllAttandenceAsync(filter))
  }, [filter])


  const formatDate = (date: any) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };


  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setLabelVisible(false);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value
      })
      getSuggestions(event.target.value);
    }
    else {
      setLabelVisible(true);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value
      })
      setSuggestions([]);
    }
  };

  const getSuggestions = (inputValue: any) => {
    const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
      suggestion?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };


  return (
    <div className="px-[40px] pt-[32px]">
      <div className="flex w-[688px] items-start gap-[291px]">
        <p className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Attendance Database
        </p>
      </div>
      <div className=" flex pt-6 justify-between items-center self-stretch ">
        <div className='flex gap-5'>
          <div className='relative'>
            <div
              onClick={() => {
                setshowFilter(!showFilter)
                setSuggestions([]);
              }}
              className='flex gap-2 justify-center items-center py-3 px-5 w-[100px] h-10 bg-[#FAFAFA] rounded-[53px] border border-solid border-[#DEDEDE]'>
              <img src={FunnelSimple} className='w-4 h-4' alt="" />
              <p className='text-sm font-medium text-[#2E2E2E]'>Filter</p>
            </div>
            {showFilter && <div className='absolute z-10 flex flex-col gap-3 rounded-lg top-10 left-0 min-w-[240px] bg-[#FAFAFA] py-6 px-4'>
              <div className='flex gap-3 justify-between'>
                <div>
                  <p className='text-sm font-medium text-[#2E2E2E]'>Group</p>
                </div>
                <div>
                  <select
                    onChange={(event) => {
                      setFilter({
                        ...filter,
                        groupName: event.target.value
                      })
                    }}
                    value={filter.groupName}
                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'>
                    <option value=""></option>
                    {groupList && groupList.map((element: any, index: number) => {
                      return <option
                        key={index}
                        value={element.groupName}
                      >
                        {element.groupName}
                      </option>
                    })}
                  </select>
                </div>
              </div>
              <div className='flex gap-3 justify-between'>
                <div>
                  <p className='text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile</p>
                </div>
                <div>
                  <select
                    onChange={(event) => {
                      setFilter({
                        ...filter,
                        jobProfileName: event.target.value
                      })
                    }}
                    value={filter.jobProfileName}
                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'>
                    <option value=""></option>
                    {jobProfileList && jobProfileList.map((element: any, index: number) => {
                      return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>}
          </div>
          <div>
            <div className="relative">
              {isLabelVisible && <div className="absolute top-[10px] left-6">
                <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text">
                  <img src={glass} alt="" className="h-4 w-4" />
                  <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                </label>
              </div>}
              <input
                onClick={() => setshowFilter(false)}
                type="search"
                id="searchInput"
                onChange={handleInputChange}
                value={search}
                className="h-10 w-[200px] py-3 px-5 rounded-full text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
                  {suggestions.map((suggestion: any, index: any) => (
                    <input type="text" readOnly key={index}
                      className="py-3 px-5 cursor-pointer focus:outline-none w-[200px] z-30"
                      value={suggestion}
                      onClick={(event) => {
                        setFilter({
                          ...filter,
                          name: (event.target as HTMLInputElement).value
                        })
                        setSuggestions([]);
                      }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='py-6 relative overflow-auto'>
        {/* TABLE STARTS HERE */}
        <table>
          <tbody>
            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Status</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Marked By </td>
            </tr>
            {allAttandenceList && allAttandenceList.map((element: any, index: number) => {
              const punchesList = [...(element.punches)];
              console.log("normal", punchesList)
              const sortedPunches = punchesList.sort((a: any, b: any) => {
                return new Date(b.punchIn).getTime() - new Date(a.punchIn).getTime();
              })
              const latestPunches = sortedPunches[0];
              return <>
                <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => { handleRowClick(index) }}>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(0, 10) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? new Date(latestPunches.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? new Date(latestPunches.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                  <td className='py-4 px-5'>
                    {latestPunches?.status === "approved" &&
                      <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                        <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                        <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                      </span>}
                    {latestPunches?.status === "rejected" &&
                      <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                        <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                        <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                      </span>}
                    {(latestPunches.status === "pending") &&
                      <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                        <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                        <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                      </span>}
                  </td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                </tr>
                {showTableRow.includes(index) && sortedPunches && sortedPunches.slice(1).map((element: any, index: number) => {
                  return <tr key={index}>
                    <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                    <td><div className="ms-8 h-14 border-s border-solid border-[#DEDEDE]"></div></td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchIn ? new Date(element.punchIn).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.punchOut ? new Date(element.punchOut).toLocaleString("en-US", { timeStyle: "short" }) : "Not Avilable"}</td>
                    <td className='py-4 px-5'>
                      {element.status === "approved" &&
                        <span className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                          <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                          <span className='text-sm font-normal text-[#186A3B]'>Approved</span>
                        </span>}
                      {element.status === "rejected" &&
                        <span className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                          <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                          <span className='text-sm font-normal text-[#8A2626]'>Rejected</span>
                        </span>}
                      {(element.status === "pending") &&
                        <span className='flex gap-2 items-center bg-[#FEF5ED] w-[106px] h-[26px] rounded-[46px] py-2 px-4'>
                          <img src={SpinnerGap} className='h-[10px] w-[10px]' alt="check" />
                          <span className='text-sm font-normal text-[#945D2D]'>Pending</span>
                        </span>}
                    </td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] text-center whitespace-nowrap'>{latestPunches.approvedBy?.name ? latestPunches.approvedBy?.name : "-"}</td>
                  </tr>
                })}
              </>
            })}
          </tbody>
        </table>
        {/* TABLE ENDS HERE */}
        <div className="fixed flex justify-center bg-white bottom-0 left-[270px] right-0 pr-[200px]">
          <div className="flex gap-3 items-center justify-center w-[200px] h-12 mb-10 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
            <button
              onClick={() => {
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() - 1);
                setDate(nextDate);
              }}>
              <img src={CaretLeft} alt="" className="w-4 h-4" />
            </button>
            {showCalender && <div className="filterCalender absolute z-20 bottom-28">
              <Calendar
                onChange={setDate}
                onClickDay={() => {
                  setShowCalender(false);
                }}
                className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[252px] h-[280px] text-[16px]"
                formatShortWeekday={(locale, date) => {
                  console.log(locale)
                  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
                }}
                value={date} />
            </div>}
            <p
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="text-sm font-medium text-[#283093] cursor-pointer">{formatDate(date)}</p>
            <button
              onClick={() => {
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);
                setDate(nextDate);
              }}>
              <img src={CaretRight} className="w-4 h-4" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
