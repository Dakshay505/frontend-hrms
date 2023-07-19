import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import glass from '../../assets/MagnifyingGlass.png';

export const TraningStatus = () => {
  const dispatch = useDispatch();
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
  const [groupName, setGroupName] = useState('All Groups');
  const groupList = useSelector((state: any) => state.group.groups);
  const [jobProfileName, setjobProfileName] = useState('All Job Profiles');

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

  // Dummy data for groupList and jobProfileList
  const dummyGroupList = [
    { groupName: 'Group 1' },
    { groupName: 'Group 2' },
    // Add more dummy groups as needed
  ];

  const dummyJobProfileList = [
    { jobProfileName: 'Job Profile 1' },
    { jobProfileName: 'Job Profile 2' },
    // Add more dummy job profiles as needed
  ];

  // Dummy data for trainingStatus
  const dummyTrainingStatus = [
    {
      _id: '1',
      employeeId: { name: 'John Doe' },
      attendance: [
        {
          date: '2023-07-19T12:34:56',
          JobProfile: 'Job Profile 1',
          TrainingStatus: 'Completed',
          Marks: '95%',
        },
      ],
    },
    {
      _id: '2',
      employeeId: { name: 'Jane Smith' },
      attendance: [
        {
          date: '2023-07-18T09:00:00',
          JobProfile: 'Job Profile 2',
          TrainingStatus: 'In Progress',
          Marks: '85%',
        },
      ],
    },
    // Add more dummy training status data as needed
  ];

  // Dispatch dummy data to Redux state (Replace with real dispatch)
  useEffect(() => {
    // Simulate API calls to fetch data and update Redux state
    dispatch({ type: 'SET_GROUPS', payload: dummyGroupList });
    dispatch({ type: 'SET_JOB_PROFILES', payload: dummyJobProfileList });
    dispatch({ type: 'SET_TRAINING_STATUS', payload: dummyTrainingStatus });
  }, []);

  const trainingStatus = useSelector((state: any) => state.attandence.staffAttandence);

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
                onChange={(event) => setGroupName(event.target.value)}
                className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'
              >
                <option>All Groups</option>
                {groupList &&
                  groupList.map((element: any, index: number) => {
                    return <option key={index}>{element.groupName}</option>;
                  })}
              </select>
            </div>
            <div>
              <select
                onChange={(event) => setjobProfileName(event.target.value)}
                className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'
              >
                <option>All Job Profiles</option>
                {jobProfileList &&
                  jobProfileList.map((element: any, index: number) => {
                    return (
                      <option key={index}>{element.jobProfileName}</option>
                    );
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
          <table className='z-0'>
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
              {trainingStatus &&
                trainingStatus.map((element: any, index: number) => {
                  const latestAttendance = element.attendance[0];

                  return (
                    <tr
                      key={index}
                      className='hover:bg-[#FAFAFA]'
                      onClick={() => handleTableRowClick(element)}
                    >
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {latestAttendance.date
                          ? latestAttendance.date.slice(0, 10)
                          : 'Not Available'}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>
                        {element.employeeId?.name
                          ? element.employeeId?.name
                          : 'Not Available'}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {latestAttendance.JobProfile
                          ? latestAttendance.JobProfile
                          : 'Not Available'}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {latestAttendance.TrainingStatus
                          ? latestAttendance.TrainingStatus
                          : 'Not Available'}
                      </td>
                      <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                        {latestAttendance.Marks
                          ? latestAttendance.Marks
                          : 'Not Available'}
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
