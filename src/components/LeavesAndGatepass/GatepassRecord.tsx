import { useState, useEffect } from "react";
import glass from "../../assets/MagnifyingGlass.png";
import { getAllDepartmentsAsync } from "../../redux/Slice/DepartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Filter from '../../assets/filter.png'
import { getAllApprovedGatePassAsync, getAllApprovedLeavesAsync } from "../../redux/Slice/LeaveAndGatepassSlice";


export const GatepassRecord = () => {
  const [isLabelVisible, setLabelVisible] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const departmentList = useSelector((state: any) => state.department.departments);
  const allApprovedGatePassList = useSelector((state: any) => state.leave.approvedGatePasses);
  console.log(allApprovedGatePassList)
  useEffect(() => {
    dispatch(getAllApprovedLeavesAsync());
    dispatch(getAllApprovedGatePassAsync());
    dispatch(getAllDepartmentsAsync());
  }, [])
  const {
    register,
   
  } = useForm();


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

  const handleTableRowClick = (data: any) => {
    console.log(data._id)
  }

  return (
    <div className="mx-10">
      <div className="pt-8">
        <div className="flex w-[688px] items-start gap-[291px]">
          <p className="text-2xl text-[#2E2E2E] font-bold leading-8">
          Gatepass Records
          </p>
        </div>
        <div className=" flex pt-6 justify-between items-end self-stretch ">
          <div className="flex gap-4 items-center">
            <p className="text-[#000000] text-[16px] leading-6 font-medium">For:</p>
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
            <div className="flex items-center border border-solid [#DEDEDE] bg-[#FAFAFA] py-3 px-5 rounded-[53px] w-[100px] h-10">
              <div className="flex gap-2 items-center">
                <img src={Filter} className="h-4 w-4" alt="" />
                <p className="text-sm font-medium text-[#2E2E2E]">Filter</p>
              </div>
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
                    className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:shadow focus:outline-none"
                  />
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
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Time</td>
                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Accepted By</td>
              </tr>
              {allApprovedGatePassList && allApprovedGatePassList.map((element: any, index: number) => {
                const fromToArray = element.gatePass;
                const lastObject = fromToArray[fromToArray.length - 1];
                console.log(`last${index}`, lastObject)

                return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{element._id}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{lastObject.date ? (lastObject.date).slice(0, 10) : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{lastObject.time ? lastObject.time : "Not Avilable"}</td>
                  <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{lastObject.acceptedBy ? lastObject.acceptedBy : "Not Avilable"}</td>
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
