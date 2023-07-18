import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { getAllDepartmentsAsync } from "../../redux/Slice/DepartmentSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import FunnelSimple from '../../assets/FunnelSimple.svg'
import glass from "../../assets/MagnifyingGlass.png";
import Calendar from "react-calendar";
import CaretLeft from "../../assets/CaretLeft.svg"
import CaretRight from "../../assets/CaretRight1.svg"
import 'react-datepicker/dist/react-datepicker.css';

const salaryList = [
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
  {
    dayAndDate: "Sat, 28/06/23",
    name: "Madhav M",
    jobProfile: "Pro Head",
    netSalary: 670,
    basicSalary: 14000,
    productiveTime: "08:30",
    workingHours: "08:30",
    ratePerHour: "67.31",
    lunchTime: "00:30",
    overTime: "08:30",
    absentHours: "08:30"
  },
]

const SalaryDatabase = () => {
  const dispatch = useDispatch();

  const departmentList = useSelector((state: any) => state.department.departments);
  const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

  const [date, setDate] = useState<any>(new Date());
  const [showCalender, setShowCalender] = useState(false);

  useEffect(() => {
    // dispatch(postAttandenceByDateAsync()).then((data: any) => {
    //   const employeeData = data.payload.employees;
    //   const arr = [];
    //   for (let i = 0; i < employeeData.length; i++) {
    //     arr.push(employeeData[i].employeeId.name)
    //   }
    //   setFetchedSuggestions(arr)
    // });
    // console.log(fetchedSuggestions);
    dispatch(getAllDepartmentsAsync())
    dispatch(getAllJobProfileAsync())
  }, [])

  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  // const [suggestions, setSuggestions] = useState<any>([]);
  const [showFilter, setshowFilter] = useState(false);
  // const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  const [filter, setFilter] = useState({
    name: "",
    departmentName: "",
    jobProfileName: "",
    date: ""
  })

  useEffect(() => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFilter({
      ...filter,
      date: formattedDate
    })
    console.log("hi")
  }, [date])

  useEffect(() => {
    console.log(filter);
  }, [filter])



  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }

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
      // getSuggestions(event.target.value);
    }
    else {
      setLabelVisible(true);
      setSearch(event.target.value);
      setFilter({
        ...filter,
        name: event.target.value
      })
      // setSuggestions([]);
    }
  };

  // const getSuggestions = (inputValue: any) => {
  //   const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
  //     suggestion?.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  //   setSuggestions(filteredSuggestions);
  // };

  return (
    <div className="px-10 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Salary Database</h1>
      </div>
      <div className="flex justify-between pt-6">
        <div className='relative'>
          <div
            onClick={() => {
              setshowFilter(!showFilter)
              // setSuggestions([]);
            }}
            className='flex gap-2 justify-center items-center py-3 px-5 w-[100px] h-10 bg-[#FAFAFA] rounded-[53px] border border-solid border-[#DEDEDE] cursor-pointer'>
            <img src={FunnelSimple} className='w-4 h-4' alt="" />
            <p className='text-sm font-medium text-[#2E2E2E]'>Filter</p>
          </div>
          {showFilter && <div className='absolute z-10 flex flex-col gap-3 rounded-lg top-10 left-0 min-w-[240px] bg-[#FAFAFA] py-6 px-4'>
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
              className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none"
            />
            {/* {suggestions.length > 0 && (
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
              )} */}
          </div>
        </div>
      </div>

      {/* TABLE START HERE */}
      <div className="py-6 overflow-auto">
        <table className="z-0">
          <tbody>
            <tr className='bg-[#ECEDFE] cursor-default'>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Day and Date</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Job Profile</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Net Salary</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Basic Salary</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Productive Time</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Working Hours</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Rate per Hour</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Lunch Time</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Overtime</td>
              <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Absent Hours</td>
            </tr>
            {salaryList && salaryList.map((element: any, index: number) => {
              return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.dayAndDate ? element.dayAndDate : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.name ? element.name : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.jobProfile ? element.jobProfile : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.netSalary ? element.netSalary : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.basicSalary ? element.basicSalary : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.productiveTime ? element.productiveTime : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.workingHours ? element.workingHours : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.ratePerHour ? element.ratePerHour : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.lunchTime ? element.lunchTime : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.overTime ? element.overTime : "Not Avilable"}</td>
                <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element.absentHours ? element.absentHours : "Not Avilable"}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
      {/* TABLE ENDS HERE */}

      <div>
        <div className="fixed bottom-0 right-0 left-[270px] flex justify-center bg-white">
          <div className="flex gap-3 items-center justify-center w-[200px] h-12 my-5 border border-solid border-[#DEDEDE] py-4 px-5 rounded-[53px] bg-[#FAFAFA]">
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
                className="border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-[7px] w-[168px] h-[189px] text-[9px]"
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
  )
}

export default SalaryDatabase