import React, { useState } from "react";

import { useForm } from 'react-hook-form';
import filter from "../../assets/filter.png";
import glass from "../../assets/MagnifyingGlass.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAttandenceByDateAsync } from "../../redux/Slice/AttandenceSlice";



export const AttendenceDashboardList = () => {

  const dispatch = useDispatch();
  const todayStaffAttandence = useSelector((state: any) => state.attandence.staffAttandence);
  console.log(todayStaffAttandence);
  useEffect(() => {
    dispatch(postAttandenceByDateAsync())
  }, [])

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }
  const [isOpen2, setIsOpen2] = useState(false);

  const [search, setSearch] = React.useState('');

  const [isLabelVisible, setLabelVisible] = useState(true);


  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setLabelVisible(false);
    }
    else {
      setLabelVisible(true);
    }
    setSearch(event.target.value);
  };
  console.log(search);

  const departmentList = useSelector((state: any) => state.department.departments);
  const {
    register,
  } = useForm();



  return (
    <div className="px-[40px] pt-[32px]">
      <div className="flex w-[688px] items-start gap-[291px]">
        <p className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Attendance Database
        </p>
      </div>
      <div className=" flex pt-6 justify-between items-center self-stretch ">
        <div className=" flex items-center gap-6">
          <div className="flex px-[20px] py-[12px] justify-center items-center gap-[8px]">
            <div className="relative inline-block text-left">
              <div>
                <select
                  {...register('allDepartments', { required: "Phone No. required" })}
                  defaultValue={"All Departments"} className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium w-[176px] h-10 px-5'>
                  <option value="All Departments">All Departments</option>
                  {departmentList && departmentList.map((element: any, index: number) => {
                    return <option value={element.departmentName} key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.departmentName}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex px-[20px] py-[12px] justify-center border border-solid border-primary-border rounded-full items-center gap-[8px] h-[40px]">       
            <img src={filter} alt="" className="h-[16px] w-[16px]" />
            <div>
              <button
                className="text-neutral-n-600 leading-trim text-capitalize text-sm font-inter font-medium tracking-tighter"
                onClick={() => setIsOpen2(!isOpen2)}
              >
                Filter
              </button>
            </div>
          </div>
          {isOpen2 && (
            <div className="mt-3 left-[35%] top-[35%] absolute w-[240px] bg-white p-4 rounded shadow">
              <div className="mb-2 justify-between flex gap-[10px] ">
                <label className="block text-gray-700">Name</label>
                <input
                  className="mt-1 block w-[94px] h-[23px] rounded-md border border-solid border-primary-border shadow-sm"
                  type="text"
                />
              </div>
              <div className="mb-2 justify-between flex  gap-[10px] ">
                <label className="block text-gray-700">Date</label>
                <input
                  className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                  type="date"
                />
              </div>
              <div className="mb-2 justify-between flex gap-[10px] ">
                <label className="block text-gray-700">Punch in:</label>
                <input
                  className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                  type="time"
                />
              </div>
              <div className="mb-2 flex justify-between  gap-[10px] ">
                <label className="block text-gray-700">Punch out:</label>
                <input
                  className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                  type="time"
                />
              </div>
              <div className="mb-2 flex justify-between gap-[10px] ">
                <label className="block text-gray-700">Job profile:</label>
                <input
                  className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                  type="text"
                />
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
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
                className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:shadow focus:outline-none"
              />
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
