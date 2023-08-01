import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import glass from '../../assets/MagnifyingGlass.png';
import { RootState } from '../../Store';

export const TraningStatus = () => {
  const dispatch = useDispatch();
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  // const [groupName, setGroupName] = useState('All Groups');
  const groupList = useSelector((state: any) => state.group.groups);
  // const [jobProfileName, setjobProfileName] = useState('All Job Profiles');
  // console.log(groupName, jobProfileName)

  useEffect(() => {
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
  }, []);

  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [showFilter, setshowFilter] = useState(false);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  const [filter, setFilter] = useState({
    name: '',
    groupName: '',
    jobProfileName: '',
    date: '',
  });
  console.log(showFilter, setFetchedSuggestions);

  const handleInputChange = (event: any) => {
    if (event.target.value !== '') {
      setLabelVisible(false);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value,
      });
      getSuggestions(event.target.value);
    } else {
      setLabelVisible(true);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value,
      });
      setSuggestions([]);
    }
  };

  const getSuggestions = (inputValue: any) => {
    const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
      suggestion?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };





  const jobProfileId = useSelector((state: RootState) => state.jobProfile.jobProfiles)
  console.log("sc hiavcisac", jobProfileId)



  const handleTableRowClick = (data: any) => {
    console.log(data._id);
  };

  return (
    <div className='px-[40px] py-[32px]'>
      <div className='flex flex-col gap-3'>
        <div className='mt-8'>
          <h1 className='text-2xl font-bold text-[#2E2E2E]'>Training Status</h1>
        </div>
        <div className='flex gap-[16px]'>
          <div className='flex gap-4 items-center'>
            <p className='text-[#000000] text-[16px] leading-6 font-medium'>For:</p>
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
            <div className='relative'>
              {isLabelVisible && (
                <div className='absolute top-[10px] left-6'>
                  <label
                    htmlFor='searchInput'
                    className='flex gap-2 items-center cursor-text'
                  >
                    <img src={glass} alt='' className='h-4 w-4' />
                    <p className='text-sm text-[#B0B0B0] font-medium'>
                      Search
                    </p>
                  </label>
                </div>
              )}
              <input
                onClick={() => setshowFilter(false)}
                type='search'
                id='searchInput'
                onChange={handleInputChange}
                value={search}
                className='h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none'
              />
              {suggestions.length > 0 && (
                <div className='absolute top-10 flex flex-col text-[#2E2E2E]'>
                  {suggestions.map((suggestion: any, index: any) => (
                    <input
                      type='text'
                      readOnly
                      key={index}
                      className='py-3 px-5 cursor-pointer focus:outline-none w-[200px]'
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

        <div className='py-6 relative'>
          {/* TABLE STARTS HERE */}
          <table className='z-[-100000] absolute'>
            <tbody>
              <tr className='bg-[#ECEDFE] cursor-default'>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                  Date
                </td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                  Name
                </td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                  Job Profile
                </td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                  Training Status
                </td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                  Marks
                </td>
              </tr>
              {jobProfileId &&
                jobProfileId.map((element: any, index: number) => {

                  const result = useSelector((state: any) => state.training)
                  console.log(result);

                  return (
                    <tr
                      key={index}
                      className='hover:bg-[#FAFAFA]'
                      onClick={() => handleTableRowClick(element)}
                    >
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {element.createdAt.slice(0, 10)}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>
                        {element.jobProfileName
                          ? element.jobProfileName
                          : 'Not Available'}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {element.jobProfileName
                          ? element.jobProfileName
                          : 'Not Available'}
                      </td>
                      <td>
                    
                      </td>
                    
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* TABLE ENDS HERE */}
        </div>
      </div>
    </div>
  );
};
