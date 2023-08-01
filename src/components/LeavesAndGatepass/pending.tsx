import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import plane from "../../assets/AirplaneTilt.svg";
import door from "../../assets/DoorOpen.png";
import { useDispatch, useSelector } from 'react-redux';
import { getAllAcceptedLeavesAsync, getAllApprovedLeavesAsync, getAllRejectedLeavesAsync, updateAcceptedGatePassAsync, updateAcceptedLeavesAsync } from '../../redux/Slice/LeaveAndGatepassSlice';
import X from '../../assets/X.svg';
import Check from '../../assets/Check.svg';
import LoaderGif from '../../assets/loadergif.gif'

export const PendingLeaves = () => {
  const [activeButton, setActiveButton] = useState('Pending');

  const dispatch = useDispatch();
  const allApprovedLeaveList = useSelector((state: any) => state.leave.approvedLeaves);
  const allAcceptedLeaveList = useSelector((state: any) => state.leave.acceptedLeaves);
  const allRejectedLeaveList = useSelector((state: any) => state.leave.rejectedLeaves);
  const loaderStatus = useSelector((state: any) => state.leave.status)

  useEffect(() => {
    dispatch(getAllApprovedLeavesAsync());
    dispatch(getAllAcceptedLeavesAsync());
    dispatch(getAllRejectedLeavesAsync());
  }, [])

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  function convertTimeToAMPM(time: any) {
    const [hour, minute] = time.split(':');
    let hourNum = Number(hour);
    const meridiem = hourNum >= 12 ? 'PM' : 'AM';
    hourNum = hourNum % 12 || 12;
    const convertedTime = `${hourNum}:${minute} ${meridiem}`;
    return convertedTime;
  }


  return (

    <div>
      <div className='flex w-[770px] flex-col items-start px-[32px] pt-[32px]'>
        <div className='flex gap-4'>
          <Link to='/leave-records' className='flex gap-4 items-center p-6 bg-[#ECEDFE] rounded-lg w-[336px] h-[80px]'>
            <img className='w-[32px] h-[32px] color-red-500' src={plane} alt="" />
            <p className='text-[#283093] text-xl font-medium'>View Leave Records</p>
          </Link>

          <Link to="/gatepass-records" className='flex gap-4 items-center p-6 bg-[#ECEDFE] rounded-lg w-[336px] h-[80px]'>
            <img className='w-[32px] h-[32px]' src={door} alt="" />
            <p className='text-[#283093] text-xl font-medium'>View Gatepass Records</p>
          </Link>
        </div>

        <div className='py-12'>


          <div>
            <h1 className='text-2xl font-bold'>Approve Leaves and Gatepass</h1>
          </div>

          <div className='flex mt-8'>
            <button onClick={() => handleButtonClick("Pending")} className={`flex items-center justify-center p-4 text-sm font-medium w-[109px] h-[42px] rounded-t-[4px] ${activeButton === "Pending" ? "border-s-[1px] border-t-[1px] border-r-[1px] border-solid border-[#DEDEDE] text-[#757575]" : "text-[#0D0D0D]"}`}>Pending</button>
            <button onClick={() => handleButtonClick("Confirmed")} className={`flex items-center justify-center p-4 text-sm font-medium w-[109px] h-[42px] rounded-t-[4px] ${activeButton === "Confirmed" ? "border-s-[1px] border-t-[1px] border-r-[1px] border-solid border-[#DEDEDE] text-[#757575]" : "text-[#0D0D0D]"}`}>Confirmed</button>
            <button onClick={() => handleButtonClick("Rejected")} className={`flex items-center justify-center p-4 text-sm font-medium w-[109px] h-[42px] rounded-t-[4px] ${activeButton === "Rejected" ? "border-s-[1px] border-t-[1px] border-r-[1px] border-solid border-[#DEDEDE] text-[#757575]" : "text-[#0D0D0D]"}`}>Rejected</button>
          </div>
          <div className="">
            {loaderStatus === "loading" ? <div className='flex justify-center w-full'>
              <img src={LoaderGif} className='w-6 h-6' alt="" />
            </div> : ""}
            {activeButton === 'Pending' && (
              <div>
              {/*  usemap on this */}
              {allAcceptedLeaveList && allAcceptedLeaveList.map((element: any, index: number) => {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                const options: any = { day: "numeric", month: "short" };
                let gatePassDate;
                if (element.gatePassDate) {
                  const dateString = element.gatePassDate;
                  const dateObject = new Date(dateString);
                  const day = dateObject.getDate().toString().padStart(2, "0");
                  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
                  const year = dateObject.getFullYear().toString();
                  gatePassDate = `${day}/${month}/${year}`;
                }
                // leave
                if (element.from) {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{formattedDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Leave: {(new Date(element.from)).toLocaleDateString("en-US", options)} - {(new Date(element.to)).toLocaleDateString("en-US", options)}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message}</p>
                      </div>
                      <div className='flex gap-4'>
                        <button onClick={() => dispatch(updateAcceptedLeavesAsync({
                          employeeId: element.employeeId?._id,
                          status: "approved",
                          from: element.from,
                          to: element.to
                        })).then(() => {
                          dispatch(getAllApprovedLeavesAsync());
                          dispatch(getAllAcceptedLeavesAsync());
                          dispatch(getAllRejectedLeavesAsync());
                        })}
                          className='flex items-center justify-center w-[122px] h-10 py-3 px-4 bg-[#283093] rounded-sm'><img src={Check} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#FBFBFC]'>Approve</p></button>
                        <button
                          onClick={() => dispatch(updateAcceptedLeavesAsync({
                            employeeId: element.employeeId?._id,
                            status: "rejected",
                            from: element.from,
                            to: element.to
                          })).then(() => {
                            dispatch(getAllApprovedLeavesAsync());
                            dispatch(getAllAcceptedLeavesAsync());
                            dispatch(getAllRejectedLeavesAsync());
                          })}
                          className='flex items-center justify-center w-[100px] h-10 py-3 px-4 border border-solid border-[#283093] rounded-sm'><img src={X} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#283093]'>Deny</p></button>
                      </div>
                    </div>
                  </div>
                } else {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{gatePassDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Gatepass: {element.gatePassTime ? convertTimeToAMPM(element.gatePassTime) : "Not Avilable"}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message ? element.message : "Not Avilable"}</p>
                      </div>
                      <div className='flex gap-4'>
                        <button
                          onClick={() => dispatch(updateAcceptedGatePassAsync({
                            currentStatus: element.status,
                            employeeId: element.employeeId?._id,
                            status: "approved",
                            gatePassDate: element.gatePassDate,
                            gatePassTime: element.gatePassTime
                          })).then(() => {
                            dispatch(getAllApprovedLeavesAsync());
                            dispatch(getAllAcceptedLeavesAsync());
                            dispatch(getAllRejectedLeavesAsync());
                          })}
                          className='flex items-center justify-center w-[122px] h-10 py-3 px-4 bg-[#283093] rounded-sm'><img src={Check} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#FBFBFC]'>Approve</p></button>
                        <button
                          onClick={() => dispatch(updateAcceptedGatePassAsync({
                            currentStatus: element.status,
                            employeeId: element.employeeId?._id,
                            status: "rejected",
                            gatePassDate: element.gatePassDate,
                            gatePassTime: element.gatePassTime
                          })).then(() => {
                            dispatch(getAllApprovedLeavesAsync());
                            dispatch(getAllAcceptedLeavesAsync());
                            dispatch(getAllRejectedLeavesAsync());
                          })}
                          className='flex items-center justify-center w-[100px] h-10 py-3 px-4 border border-solid border-[#283093] rounded-sm'><img src={X} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#283093]'>Deny</p></button>
                      </div>
                    </div>
                  </div>
                }
              })}
            </div>
            )}
            {activeButton === 'Confirmed' && (
              <div>
              {/* usemap on this */}
              {allApprovedLeaveList && allApprovedLeaveList.map((element: any, index: number) => {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric',});
                const options: any = { day: "numeric", month: "short" };
                let gatePassDate;
                if (element.gatePassDate) {
                  const dateString = element.gatePassDate;
                  const dateObject = new Date(dateString);
                  const day = dateObject.getDate().toString().padStart(2, "0");
                  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
                  const year = dateObject.getFullYear().toString();
                  gatePassDate = `${day}/${month}/${year}`;
                }
                // leave
                if (element.from) {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{formattedDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Leave: {(new Date(element.from)).toLocaleDateString("en-US", options)} - {(new Date(element.to)).toLocaleDateString("en-US", options)}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message}</p>
                      </div>
                    </div>
                  </div>
                } else {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{gatePassDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Gatepass: {element.gatePassTime ? convertTimeToAMPM(element.gatePassTime) : "Not Avilable"}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message ? element.message : "Not Avilable"}</p>
                      </div>
                    </div>
                  </div>
                }
              })}
            </div>
            )}
            {activeButton === 'Rejected' && (
              <div>
              {/* usemap on this */}
              {allRejectedLeaveList && allRejectedLeaveList.map((element: any, index: number) => {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                const options: any = { day: "numeric", month: "short" };
                let gatePassDate;
                if (element.gatePassDate) {
                  const dateString = element.gatePassDate;
                  const dateObject = new Date(dateString);
                  const day = dateObject.getDate().toString().padStart(2, "0");
                  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
                  const year = dateObject.getFullYear().toString();
                  gatePassDate = `${day}/${month}/${year}`;
                }
                // leave
                if (element.from) {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{formattedDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Leave: {(new Date(element.from)).toLocaleDateString("en-US", options)} - {(new Date(element.to)).toLocaleDateString("en-US", options)}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message}</p>
                      </div>
                    </div>
                  </div>
                } else {
                  return <div key={index} className='mt-6 border border-solid border-[#DEDEDE] rounded-lg bg-[#FAFAFA] p-6 min-w-[688px]'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[16px] leading-5 font-medium text-[#2E2E2E] underline'>{element.employeeId?.name ? element.employeeId?.name : "Not Avilable"}</p>
                        <p className='text-[16px] leading-6 font-normal text-[#666666]'>{gatePassDate}</p>
                      </div>
                      <div>
                        <p className='text-[16px] leading-6 font-medium'>Gatepass: {element.gatePassTime ? convertTimeToAMPM(element.gatePassTime) : "Not Avilable"}</p>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between mt-8'>
                      <div>
                        <p className='text-sm font-normal text-[#2E2E2E]'>{element.message ? element.message : "Not Avilable"}</p>
                      </div>
                    </div>
                  </div>
                }
              })}
            </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};