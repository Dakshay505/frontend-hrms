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
  const dispatch = useDispatch();
  const groupList = useSelector((state: any) => state.group.groups);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  const allApprovedLeaveList = useSelector((state: any) => state.leave.approvedLeaves);
  useEffect(() => {
    dispatch(getAllApprovedLeavesAsync());
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
  }, [])

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }

  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setLabelVisible(false);
      setSearch(event.target.value);
      getSuggestions(event.target.value);
    }
    else {
      setLabelVisible(true);
      setSuggestions([]);
    }
  };
  console.log(search);

  const getSuggestions = (inputValue: any) => {
    const fetchedSuggestions: any = [];
    allApprovedLeaveList.map((element: any) => {
      console.log(element.employeeId?.name)
      return fetchedSuggestions.push(element.employeeId?.name)
    })
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
        <div className=" flex pt-6 justify-between items-end self-stretch ">
          <div className="flex gap-4 items-center">
            <p className="text-[#000000] text-[16px] leading-6 font-medium">For:</p>
            <div>
              <select
                defaultValue={"All Groups"} className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium w-[176px] h-10 px-5 focus:outline-none'>
                <option value="All Groups">All Groups</option>
                {groupList && groupList.map((element: any, index: number) => {
                  return <option value={element.groupName} key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.groupName}</option>
                })}
              </select>
            </div>
            <div>
              <select
                defaultValue="All Job Profiles" className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium w-[176px] h-10 px-5 focus:outline-none'>
                <option value="All Job Profiles">All Job Profiles</option>
                {jobProfileList && jobProfileList.map((element: any, index: number) => {
                  return <option value={element.jobProfileName} key={index}>{element.jobProfileName}</option>
                })}
              </select>
            </div>
            <div>
              <div className="container flex justify-center items-center">
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
                    className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-10 flex flex-col text-[#2E2E2E]">
                      {suggestions.map((suggestion: any, index: any) => (
                        <input type="text" readOnly key={index}
                          className="py-3 px-5 cursor-pointer focus:outline-none w-[200px]"
                          value={suggestion}
                          onClick={(event) => console.log((event.target as HTMLInputElement).value)} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='mt-10 overflow-auto'>
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
                  // const fromToArray = element.fromTo;
                  // const lastObject = fromToArray[fromToArray.length - 1];
                  // console.log(`last${index}`, lastObject)

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
