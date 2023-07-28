import { useState, useEffect } from "react";
import glass from "../../assets/MagnifyingGlass.png";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllApprovedLeavesAsync } from "../../redux/Slice/LeaveAndGatepassSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";


export const LeaveRecords = () => {
  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  const [filter, setFilter] = useState({
    name: "",
    groupName: "",
    jobProfileName: ""
  });
  const dispatch = useDispatch();
  const groupList = useSelector((state: any) => state.group.groups);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  const allApprovedLeaveList = useSelector((state: any) => state.leave.approvedLeaves);
  useEffect(() => {
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
    dispatch(getAllApprovedLeavesAsync()).then((res: any) => {
      const employeeData = res.payload.allApprovedLeave;
      const arr: any = [];
      if (employeeData) {
        for (let i = 0; i < employeeData.length; i++) {
          arr.push(employeeData[i].employeeId.name)
        }
        setFetchedSuggestions(arr.filter((item: any, index: any) => arr.indexOf(item) === index))
      }
    });
  }, [])

  useEffect(() => {
    console.log(filter);
    dispatch(getAllApprovedLeavesAsync(filter)).then((res: any) => {
      const employeeData = res.payload.allApprovedLeave;
      const arr: any = [];
      if (employeeData) {
        for (let i = 0; i < employeeData.length; i++) {
          arr.push(employeeData[i].employeeId.name)
        }
        setFetchedSuggestions(arr.filter((item: any, index: any) => arr.indexOf(item) === index))
      }
    });
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
    <div className="mx-10">
      <div className="pt-8">
        <div className="flex w-[688px] items-start gap-[291px]">
          <p className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
            Leave Records
          </p>
        </div>
        <div className=" flex pt-6 justify-between items-center self-stretch ">
          <div className='flex gap-5'>
            <div className="flex items-center">
              <p className="text-[#000000] text-[16px] leading-6 font-medium">For:</p>
            </div>
            <div className="flex gap-4">
              <div>
                <select
                  onChange={(event) => {
                    if (event.target.value === "All Groups") {
                      setFilter({
                        ...filter,
                        groupName: ""
                      })
                    } else {
                      setFilter({
                        ...filter,
                        groupName: event.target.value
                      })
                    }
                  }}
                  value={filter.groupName}
                  className='border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none'>
                  <option value="All Groups">All Groups</option>
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
              <div>
                <select
                  onChange={(event) => {
                    if (event.target.value === "All Job Profiles") {
                      setFilter({
                        ...filter,
                        jobProfileName: ""
                      })
                    } else {
                      setFilter({
                        ...filter,
                        jobProfileName: event.target.value
                      })
                    }
                  }}
                  value={filter.jobProfileName}
                  className='border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg h-10 text-sm font-medium text-[#2E2E2E] min-w-[176px] px-5 focus:outline-none'>
                  <option value="All Job Profiles">All Job Profiles</option>
                  {jobProfileList && jobProfileList.map((element: any, index: number) => {
                    return <option key={index} value={element.jobProfileName}>{element.jobProfileName}</option>
                  })}
                </select>
              </div>
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
      </div>
      <div className=''>
        <div className='mt-2 overflow-auto'>
          <div className='py-6'>
            {/* TABLE STARTS HERE */}
            <table>
              <tbody>
                <tr className='bg-[#ECEDFE] cursor-default'>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>ID</td>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Leave From</td>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Leave to</td>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Accepted By</td>
                  <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Message</td>
                </tr>
                {allApprovedLeaveList && allApprovedLeaveList.map((element: any, index: number) => {
                  return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{index + 1}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.from ? (element.from).slice(0, 10) : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.to ? (element.to).slice(0, 10) : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.acceptedBy?.name ? element.acceptedBy?.name : "Not Avilable"}</td>
                    <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.message ? element.message : "Not Avilable"}</td>
                  </tr>
                })}
              </tbody>
            </table>
            {/* TABLE ENDS HERE */}
          </div>
        </div>
      </div>
    </div >
  )
}
