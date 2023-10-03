import check from "../../../assets/Check.png"
import upload from "../../../assets/UploadSimple.png";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getSingleEmployeeAsync,

  updateEmployeeAsync,
} from "../../../redux/Slice/EmployeeSlice";
import { Otp } from "../otp";
import { getLoggedInUserDataAsync } from "../../../redux/Slice/loginSlice";



export const BankDetails = () => {


  const dispatch = useDispatch();
  const singleEmployee = useSelector(
    (state: any) => state.employee.singleEmployee
  );

  // console.log("llllllllllllllllllllll",singleEmployee)
  const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
  useEffect(() => {
    dispatch(getLoggedInUserDataAsync());
  }, [])

  // console.log(singleEmployee)

  // const groupList = useSelector((state: any) => state.group.groups);
  // console.log(groupList)

  const [employeeId, setEmployeeId] = useState("");

  const [inputBoxESIValue, setInputBoxESIValue] = useState<any>("");
  const [ESIValue, setESIValue] = useState(false);

  const [showInputBoxPancard, setShowInputBoxPancard] = useState(false);
  const [pancardNumber, setPancardNumber] = useState<any>('')


  const [showInputAadharCard, setShowInputAadharCard] = useState(false);
  const [inputAadharCardNumber, setInputAadharCardNumber] = useState<any>("");


  const [showInputPfNumberValue, setShowInputPfNumberValue] = useState(false);
  const [inputPfNumber, setInputPfNumber] = useState<any>("");


  const [InputBankDeatils, setInputBankDeatils] =
    useState<any>(false);

  const [bankdetails, setBankDetail] = useState({
    bankName: "",
    branch: "",
    accountNumber: "",
    IFSC_Code: ""
  });


  useEffect(() => {
    setEmployeeId(singleEmployee._id);
    setPancardNumber(singleEmployee.PAN_Number)
    setInputBoxESIValue(singleEmployee.ESI_ID)
    setInputAadharCardNumber(singleEmployee.aadharNumber);
    setInputPfNumber(singleEmployee.PF_UAN_Number)
    setBankDetail({
      bankName: singleEmployee.bankDetails?.bankName,
      branch: singleEmployee.bankDetails?.branch,
      accountNumber: singleEmployee.bankDetails?.accountNumber,
      IFSC_Code: singleEmployee.bankDetails?.IFSC_Code
    })
  }, [singleEmployee]);



  const { handleSubmit, register } = useForm();
  const [fileName, setFileName] = useState("Aadhar Card");

  return (
    <form onSubmit={handleSubmit((data: any) => {
      const { overTime } = data;
      if (overTime === "Yes") {
        data = { ...data, overTime: true };
      } else if (overTime === "No") {
        data = { ...data, overTime: false };
      }
      const sendData = { ...data, employeeId: employeeId };
      dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
        if (res.payload.success) {
          toast.success(res.payload.message);
        } else {
          toast.error(res.payload.message);
        }
        dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
        dispatch(getLoggedInUserDataAsync());

      })
      setShowInputBoxPancard(false)
      setESIValue(false)
      setInputBankDeatils(false)
      setShowInputPfNumberValue(false)
      setShowInputAadharCard(false)

    })}
      className=" gap-[24px] flex flex-col">

      <div className="flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-[#2E2E2E]">Account Details</h1>
        {loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' ? (

          <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
            <img src={check} alt="" className="w-[16px] h-[16px]" />
            Save
          </button>
        ) : null}

      </div>


      {loggedInUserData.admin || loggedInUserData.employee.role === 'dbManager' ? (

        <div className="flex flex-col gap-[16px]">
          <Otp />



          {!showInputAadharCard && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex items-center gap-3">
                <input value={fileName}
                  {...register("fileName")}

                  onChange={(e) => setFileName(e.target.value)}
                  className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                </input>

              </div>
              <div className="flex gap-[20px] items-center ">

                <div onClick={() => {
                  setShowInputAadharCard(!showInputAadharCard);
                }}>
                  <input placeholder="File Name"
                    value={singleEmployee.aadharNumber}

                    className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px] outline-none" />
                </div>
                <div className="text-center">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img src={upload} alt="" className="w-[20px] h-[20px]" />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                  />
                </div>

              </div>

            </div>
          )}

          {showInputAadharCard && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex gap-[10px] flex-col">
                <input value={fileName}
                  {...register("fileName")}
                  onChange={(e) => setFileName(e.target.value)}
                  className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                </input>

                <div className="flex gap-[20px]">
                  <input
                    {...register("aadharNumber", {
                      required: true,

                    })}

                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputAadharCardNumber}
                    onChange={(event) =>
                      setInputAadharCardNumber(event.target.value)
                    }
                    placeholder="Aadhar Number"

                    type="text"
                  />

                  <div className="text-center">
                    <label htmlFor="fileInput" className="cursor-pointer">
                      <img src={upload} alt="" className="w-[20px] h-[20px]" />
                    </label>
                    <input
                      {...register("file")}
                      type="file"
                      id="fileInput"
                      className="hidden"
                    />

                  </div>
                </div>
              </div>

            </div>
          )}


          {!showInputBoxPancard && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Pan Card Number
                </p>

              </div>
              <div onClick={() => {
                setShowInputBoxPancard(!showInputBoxPancard);
              }}>
                <input
                  placeholder="DBXXXXXX"
                  value={singleEmployee.PAN_Number}

                  className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px] outline-none" />
              </div>
            </div>
          )}
          {showInputBoxPancard && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold ] tracking-[0.25px]">
                    PanCard Number
                  </p>
                </div>
                <div>
                  <input
                    {...register('PAN_Number', { required: true })}
                    placeholder="5000000000000"

                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={pancardNumber}
                    onChange={(event) => {

                      if (event.target.value.toString().length <= 10) {
                        setPancardNumber(event.target.value);
                      }


                    }}
                    type="text"
                  />


                </div>

              </div>

            </div>
          )}


          {!showInputPfNumberValue && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  PF Number
                </p>

              </div>
              <div onClick={() => {
                setShowInputPfNumberValue(!showInputPfNumberValue);
              }}>
                <input placeholder="Pf Number" value={singleEmployee.PF_UAN_Number} className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px] outline-none" />

              </div>
            </div>
          )}
          {showInputPfNumberValue && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold ] tracking-[0.25px]">
                    PF Number
                  </p>
                </div>
                <div>
                  <input
                    {...register('PF_UAN_Number', { required: true })}
                    placeholder="PFXXXXXXXX"
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputPfNumber}
                    onChange={(event) => {

                      if (event.target.value.toString().length <= 10) {
                        setInputPfNumber(event.target.value);
                      }


                    }}
                    type="number"
                  />


                </div>

              </div>

            </div>
          )}

          {!ESIValue && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  ESI ID
                </p>

              </div>
              <div onClick={() => {
                setESIValue(!ESIValue);
              }}>
                <input value={singleEmployee.ESI_ID} placeholder="ESI ID" className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px] outline-none" />

              </div>
            </div>
          )}
          {ESIValue && (
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold  tracking-[0.25px]">
                    ESI ID
                  </p>
                </div>
                <div>
                  <input
                    {...register("ESI_ID", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxESIValue}
                    onChange={(event) => {

                      setInputBoxESIValue(event.target.value);

                    }}
                    type="text"
                    placeholder="ESI ID"
                  />


                </div>

              </div>

            </div>
          )}




          {!InputBankDeatils && (

            <div className="flex flex-col gap-[16px]">

              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <span className="text-[12px] font-semibold">Bank Name</span>
                <div onClick={() => {
                  setInputBankDeatils(!InputBankDeatils);
                }}>
                  <input placeholder="SBI" value={bankdetails.bankName} className="outline-none text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]" />


                </div>
              </div>



              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <span className="text-[12px] font-semibold">Account Number</span>
                <div onClick={() => {
                  setInputBankDeatils(!InputBankDeatils);
                }}>
                  <input placeholder="XXXXXXXXXXXXX" value={bankdetails.accountNumber} className="outline-none text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]" />


                </div>
              </div>


              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <span className="text-[12px] font-semibold">Branch Code</span>
                <div onClick={() => {
                  setInputBankDeatils(!InputBankDeatils);
                }}>
                  <input placeholder="XXXXXXXXX" value={bankdetails.branch} className="outline-none text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]" />


                </div>
              </div>

              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <span className="text-[12px] font-semibold">IFSC Code</span>
                <div onClick={() => {
                  setInputBankDeatils(!InputBankDeatils);
                }}>
                  <input placeholder="XXXXXXXXX" value={bankdetails.IFSC_Code} className="outline-none text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]" />


                </div>
              </div>
              <div>
              </div>
            </div>
          )}
          {InputBankDeatils && (
            <>

              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[16px] flex-col">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p className="text-sm font-semibold tracking-[0.25px]">
                      Bank Name
                    </p>
                  </div>
                  <div>
                    <input
                      {...register('bankName', { required: true })}
                      className="text-[12px] leading-5 font-normal focus:outline-none"
                      value={bankdetails.bankName}
                      placeholder="BankName"
                      onChange={(event) => {

                        setBankDetail({
                          ...bankdetails,
                          bankName: event.target.value,
                        });


                      }}
                      type="text"
                    />


                  </div>
                </div>

              </div>


              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p className="text-sm font-semibold  tracking-[0.25px]">
                      Bank Account Number
                    </p>
                  </div>
                  <div>
                    <input
                      {...register('accountNumber', { required: true })}
                      className="text-[12px] leading-5 font-normal focus:outline-none"
                      value={bankdetails.accountNumber}
                      placeholder="xxxxxxxx"
                      onChange={(event) => {

                        setBankDetail({
                          ...bankdetails,
                          accountNumber: event.target.value,
                        });

                      }}
                      type="Number"
                    />
                  </div>
                </div>

              </div>


              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p className="text-sm font-semibold  tracking-[0.25px]">
                      Bank Branch
                    </p>
                  </div>
                  <div>
                    <input
                      {...register('branch', { required: true })}
                      className="text-[12px] leading-5 font-normal focus:outline-none"
                      value={bankdetails.branch}
                      placeholder="Bank Branch"
                      onChange={(event) => {

                        setBankDetail({
                          ...bankdetails,
                          branch: event.target.value,
                        });

                      }}
                      type="text"
                    />
                  </div>
                </div>

              </div>


              <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p className="text-sm font-semibold  tracking-[0.25px]">
                      Bank IFSC CODE
                    </p>
                  </div>
                  <div>
                    <input
                      {...register('IFSC_Code')}
                      className="text-[12px] leading-5 font-normal focus:outline-none"
                      value={bankdetails.IFSC_Code}
                      placeholder="XXXXXXXX"
                      onChange={(event) => {

                        setBankDetail({
                          ...bankdetails,
                          IFSC_Code: event.target.value,
                        });
                        setShowInputBoxPancard(!showInputBoxPancard);

                      }}
                      type="text"
                    />
                  </div>
                </div>

              </div>
            </>
          )}




        </div>

      ) : (
        <div className="flex flex-col gap-[16px]">
          <Otp />

          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Aadhar Card</p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]"> {singleEmployee.aadharNumber}</span>
          </div>

          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Pan Card Number </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.PAN_Number} </span>
          </div>

          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">PF Number </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee.PF_UAN_Number} </span>
          </div>

          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">ESI ID</p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]"> {singleEmployee.ESI_ID} </span>
          </div>

          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Bank Name </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{bankdetails.bankName} </span>
          </div>
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">

            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Account Number </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{bankdetails.accountNumber} </span>
          </div>
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">

            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Branch Code </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{bankdetails.branch} </span>
          </div>
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">

            <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">IFSC Code </p>
            <span className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{bankdetails.IFSC_Code} </span>
          </div>
        </div>
      )
      }


    </form >
  )
}
