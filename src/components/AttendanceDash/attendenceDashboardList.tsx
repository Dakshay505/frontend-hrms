import { useState } from "react";
import FunnelSimple from '../../assets/FunnelSimple.svg'
import glass from "../../assets/MagnifyingGlass.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAttandenceByDateAsync } from "../../redux/Slice/AttandenceSlice";
import { getAllDepartmentsAsync } from "../../redux/Slice/DepartmentSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";



export const AttendenceDashboardList = () => {
  const dispatch = useDispatch();



  const todayStaffAttandence = useSelector((state: any) => state.attandence.staffAttandence);
  const departmentList = useSelector((state: any) => state.department.departments);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);


  useEffect(() => {
    dispatch(postAttandenceByDateAsync()).then((data: any) => {
      const employeeData = data.payload.employees;
      const arr = [];
      for (let i = 0; i < employeeData.length; i++) {
          arr.push(employeeData[i].employeeId.name)
      }
      setFetchedSuggestions(arr)
  });
  console.log(fetchedSuggestions);
    dispatch(getAllDepartmentsAsync())
    dispatch(getAllJobProfileAsync())
  }, [])



  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [showFilter, setshowFilter] = useState(false);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  const [filter, setFilter] = useState({
    name: "",
    departmentName: "",
    jobProfileName: "",
    date: ""
  })


  useEffect(() => {
    console.log(filter);
    dispatch(postAttandenceByDateAsync(filter))
  }, [filter])

  

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }


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
            {showFilter && <div className='absolute flex flex-col gap-3 rounded-lg top-10 left-0 min-w-[240px] bg-[#FAFAFA] py-6 px-4'>
              <div className='flex gap-3 justify-between'>
                <div>
                  <p className='text-sm font-medium text-[#2E2E2E]'>Department</p>
                </div>
                <div>
                  <select
                    onChange={(event) => {
                      setFilter({
                        ...filter,
                        departmentName: event.target.value
                      })
                    }}
                    value={filter.departmentName}
                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'>
                    <option value=""></option>
                    {departmentList && departmentList.map((element: any, index: number) => {
                      return <option
                        key={index}
                        value={element.departmentName}
                      >
                        {element.departmentName}
                      </option>
                    })}
                  </select>
                </div>
              </div>
              <div className='flex gap-3 justify-between'>
                <div>
                  <p className='text-sm font-medium text-[#2E2E2E]'>Job Profile</p>
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
              <div className='flex gap-3 justify-between'>
                <div>
                  <p className='text-sm font-medium text-[#2E2E2E]'>Date</p>
                </div>
                <div>
                  <input
                  type="date"
                    onChange={(event) => {
                      setFilter({
                        ...filter,
                        date: event.target.value
                      })
                    }}
                    value={filter.date}
                    className='border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded-md focus:outline-none'                    
                  />
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
                className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
                  {suggestions.map((suggestion: any, index: any) => (
                    <input type="text" readOnly key={index}
                      className="py-3 px-5 cursor-pointer focus:outline-none w-[200px]"
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
      <div className='py-6'>
        {/* TABLE STARTS HERE */}
        <table>
          <tbody>
            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Approved By </td>
            </tr>
            {todayStaffAttandence && todayStaffAttandence.map((element: any, index: number) => {
              const latestAttandence = element.attendance[0];
              const latestPunches = latestAttandence.punches[0]

              return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.date ? (latestAttandence.date).slice(0, 10) : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(11, 16) : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? (latestPunches.punchOut).slice(11, 16) : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.approvedBy ? latestAttandence.approvedBy : "Not Avilable"}</td>
              </tr>
            })}
          </tbody>
        </table>
        {/* TABLE ENDS HERE */}
      </div>

    </div>
  );
};
