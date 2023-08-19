import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../../assets/Table.svg'
import HourGlass from '../../../assets/HourglassMedium.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAcceptedLeavesAsync, getAllPendingLeavesAsync, getAllRejectedLeavesAsync, updatePendingGatePassAsync, updatePendingLeavesAsync } from '../../../redux/Slice/LeaveAndGatepassSlice';
import X from '../../../assets/X.svg';
import Check from '../../../assets/Check.svg';
import LoaderGif from '../../../assets/loadergif.gif'
import GreenCheck from '../../../assets/GreenCheck.svg'
import RedX from '../../../assets/RedX.svg'
import XSquare from '../../../assets/XSquare11.svg'

export const EmployeeLeaveHome = () => {
  const [activeButton, setActiveButton] = useState('Pending');
  const [showGatepassPopup, setShowGatepassPopup] = useState(false)
  const [showLeavesPopup, setShowLeavesPopup] = useState(false)
  const [rejectedReasonGatepass, setRejectedReasonGatepass] = useState("")
  const [rejectedReasonLeaves, setRejectedReasonLeaves] = useState("")

  const dispatch = useDispatch();
  const allApprovedLeaveList = useSelector((state: any) => state.leave.acceptedLeaves);
  const allPendindLeaveList = useSelector((state: any) => state.leave.pendingLeaves);
  const allRejectedLeaveList = useSelector((state: any) => state.leave.rejectedLeaves);
  const loaderStatus = useSelector((state: any) => state.leave.status)

  useEffect(() => {
    dispatch(getAllPendingLeavesAsync());
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
    <div className='mx-10'>
      <div className='flex w-[770px] flex-col items-start pt-8'>
        <div className='flex gap-4'>
          <Link to='/employee-apply-for-leave' className='flex gap-4 items-center p-6 bg-[#ECEDFE] rounded-lg w-[336px] h-[80px]'>
            <img className='w-[32px] h-[32px] color-red-500' src={HourGlass} alt="" />
            <p className='text-[#283093] text-xl font-medium'>Apply for a leave</p>
          </Link>

          <Link to="/employee-view-leave-record" className='flex gap-4 items-center p-6 bg-[#ECEDFE] rounded-lg w-[336px] h-[80px]'>
            <img className='w-[32px] h-[32px]' src={Table} alt="" />
            <p className='text-[#283093] text-xl font-medium'>View Leave Records</p>
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
                {allPendindLeaveList && allPendindLeaveList.map((element: any, index: number) => {
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
                          <button
                            onClick={() => dispatch(updatePendingLeavesAsync({
                              employeeId: element.employeeId?._id,
                              status: "accepted",
                              from: element.from,
                              to: element.to
                            })).then(() => {
                              dispatch(getAllPendingLeavesAsync());
                              dispatch(getAllAcceptedLeavesAsync());
                              dispatch(getAllRejectedLeavesAsync());
                            })}
                            className='flex items-center justify-center w-[122px] h-10 py-3 px-4 bg-[#283093] rounded-sm'><img src={Check} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#FBFBFC]'>Approve</p></button>
                          <button
                            onClick={() => setShowLeavesPopup(true)}
                            className='flex items-center justify-center w-[100px] h-10 py-3 px-4 border border-solid border-[#283093] rounded-sm'><img src={X} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#283093]'>Deny</p></button>
                        </div>
                        {showLeavesPopup && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
                          <div className='w-[720px] h-[281px] p-10 bg-[#FFFFFF]'>
                            <div className='flex gap-2 pt-2 pb-4 border-b border-solid border-[#B0B0B0]'>
                              <div>
                                <img src={XSquare} className='w-6 h-6' alt="" />
                              </div>
                              <div>
                                <p className='text-[18px] leading-6 font-medium text-[#1C1C1C] tracking-[0.15px]'>Deny Leave?</p>
                              </div>
                            </div>
                            <div className='flex flex-col gap-3 pt-6'>
                              <div>
                                <p className='text-sm font-normal tracking-[0.25px] text-[#1C1C1C]'>Enter reason</p>
                              </div>
                              <div>
                                <input
                                  required
                                  onChange={(event) => setRejectedReasonLeaves(event.target.value)}
                                  className='border border-solid border-[#B0B0B0] w-[640px] h-10 rounded px-4 focus:outline-none'
                                  type="text" />
                              </div>
                            </div>
                            <div className='flex justify-end pt-[33px]'>
                              <div className='flex gap-4'>
                                <button
                                  onClick={() => {
                                    setShowLeavesPopup(false)
                                  }}
                                  className='flex justify-center items-center py-3 px-4 w-[96px] h-[34px] border border-solid border-[#3B3B3B] rounded-lg'><p className='text-sm font-medium tracking-[0.25px] text-[#3B3B3B]'>Cancel</p></button>
                                <button
                                  onClick={() => {
                                    dispatch(updatePendingLeavesAsync({
                                      employeeId: element.employeeId?._id,
                                      status: "rejected",
                                      from: element.from,
                                      to: element.to,
                                      rejectedReason: rejectedReasonLeaves
                                    })).then(() => {
                                      dispatch(getAllPendingLeavesAsync());
                                      dispatch(getAllAcceptedLeavesAsync());
                                      dispatch(getAllRejectedLeavesAsync());
                                    })
                                    setShowLeavesPopup(false);
                                    setRejectedReasonLeaves("");
                                  }}
                                  className='flex justify-center items-center py-3 px-4 w-[153px] h-[34px] bg-[#283093] rounded-lg'><p className='text-sm font-medium tracking-[0.25px] text-[#FBFBFC] whitespace-nowrap'>Deny Leave</p></button>
                              </div>
                            </div>
                          </div>
                        </div>}
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
                            onClick={() => dispatch(updatePendingGatePassAsync({
                              currentStatus: element.status,
                              employeeId: element.employeeId?._id,
                              status: "accepted",
                              gatePassDate: element.gatePassDate,
                              gatePassTime: element.gatePassTime
                            })).then(() => {
                              dispatch(getAllPendingLeavesAsync());
                              dispatch(getAllAcceptedLeavesAsync());
                              dispatch(getAllRejectedLeavesAsync());
                            })}
                            className='flex items-center justify-center w-[122px] h-10 py-3 px-4 bg-[#283093] rounded-sm'><img src={Check} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#FBFBFC]'>Approve</p></button>
                          <button
                            onClick={() => setShowGatepassPopup(true)}
                            className='flex items-center justify-center w-[100px] h-10 py-3 px-4 border border-solid border-[#283093] rounded-sm'><img src={X} alt="check" className='w-4 h-4' /><p className='px-2 text-sm font-medium text-[#283093]'>Deny</p></button>
                        </div>
                        {showGatepassPopup && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
                          <div className='w-[720px] h-[281px] p-10 bg-[#FFFFFF]'>
                            <div className='flex gap-2 pt-2 pb-4 border-b border-solid border-[#B0B0B0]'>
                              <div>
                                <img src={XSquare} className='w-6 h-6' alt="" />
                              </div>
                              <div>
                                <p className='text-[18px] leading-6 font-medium text-[#1C1C1C] tracking-[0.15px]'>Deny Gatepass?</p>
                              </div>
                            </div>
                            <div className='flex flex-col gap-3 pt-6'>
                              <div>
                                <p className='text-sm font-normal tracking-[0.25px] text-[#1C1C1C]'>Enter reason</p>
                              </div>
                              <div>
                                <input
                                  required
                                  onChange={(event) => setRejectedReasonGatepass(event.target.value)}
                                  className='border border-solid border-[#B0B0B0] w-[640px] h-10 rounded px-4 focus:outline-none'
                                  type="text" />
                              </div>
                            </div>
                            <div className='flex justify-end pt-[33px]'>
                              <div className='flex gap-4'>
                                <button
                                  onClick={() => {
                                    setShowGatepassPopup(false)
                                  }}
                                  className='flex justify-center items-center py-3 px-4 w-[96px] h-[34px] border border-solid border-[#3B3B3B] rounded-lg'><p className='text-sm font-medium tracking-[0.25px] text-[#3B3B3B]'>Cancel</p></button>
                                <button
                                  onClick={() => {
                                    dispatch(updatePendingGatePassAsync({
                                      currentStatus: element.status,
                                      employeeId: element.employeeId?._id,
                                      status: "rejected",
                                      gatePassDate: element.gatePassDate,
                                      gatePassTime: element.gatePassTime,
                                      rejectedReason: rejectedReasonGatepass
                                    })).then(() => {
                                      dispatch(getAllPendingLeavesAsync());
                                      dispatch(getAllAcceptedLeavesAsync());
                                      dispatch(getAllRejectedLeavesAsync());
                                    })
                                    setShowGatepassPopup(false)
                                    setRejectedReasonGatepass("")
                                  }}
                                  className='flex justify-center items-center py-3 px-4 w-[153px] h-[34px] bg-[#283093] rounded-lg'><p className='text-sm font-medium tracking-[0.25px] text-[#FBFBFC] whitespace-nowrap'>Deny Gatepass</p></button>
                              </div>
                            </div>
                          </div>
                        </div>}
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
                  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', });
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
                        <div className='flex flex-col gap-4'>
                          <p className='text-[16px] leading-6 font-medium'>Leave: {(new Date(element.from)).toLocaleDateString("en-US", options)} - {(new Date(element.to)).toLocaleDateString("en-US", options)}</p>
                          <div className='flex justify-end'>
                            <div className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                              <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                              <span className='text-sm font-normal text-[#186A3B]'>{(element.status).charAt(0).toUpperCase() + (element.status).slice(1).toLowerCase()}</span>
                            </div>
                          </div>
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
                        <div className='flex flex-col gap-4'>
                          <p className='text-[16px] leading-6 font-medium'>Gatepass: {element.gatePassTime ? convertTimeToAMPM(element.gatePassTime) : "Not Avilable"}</p>
                          <div className='flex justify-end'>
                            <div className='flex gap-2 items-center bg-[#E9F7EF] w-[116px] h-[26px] rounded-[46px] py-2 px-4'>
                              <img src={GreenCheck} className='h-[10px] w-[10px]' alt="check" />
                              <span className='text-sm font-normal text-[#186A3B]'>{(element.status).charAt(0).toUpperCase() + (element.status).slice(1).toLowerCase()}</span>
                            </div>
                          </div>
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
                        <div className='flex flex-col gap-4'>
                          <p className='text-[16px] leading-6 font-medium'>Leave: {(new Date(element.from)).toLocaleDateString("en-US", options)} - {(new Date(element.to)).toLocaleDateString("en-US", options)}</p>
                          <div className='flex justify-end'>
                            <div className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                              <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                              <span className='text-sm font-normal text-[#8A2626]'>{(element.status).charAt(0).toUpperCase() + (element.status).slice(1).toLowerCase()}</span>
                            </div>
                          </div>
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
                        <div className='flex flex-col gap-4'>
                          <p className='text-[16px] leading-6 font-medium'>Gatepass: {element.gatePassTime ? convertTimeToAMPM(element.gatePassTime) : "Not Avilable"}</p>
                          <div className='flex justify-end'>
                            <div className='flex gap-2 items-center bg-[#FCECEC] w-[110px] h-[26px] rounded-[46px] py-2 px-4'>
                              <img src={RedX} className='h-[10px] w-[10px]' alt="check" />
                              <span className='text-sm font-normal text-[#8A2626]'>{(element.status).charAt(0).toUpperCase() + (element.status).slice(1).toLowerCase()}</span>
                            </div>
                          </div>
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