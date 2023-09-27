import check from "../../../assets/Check.png"

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getSingleEmployeeAsync,

  updateEmployeeAsync,
} from "../../../redux/Slice/EmployeeSlice";
import { Otp } from "../otp";



export const BankDetails = () => {


  const dispatch = useDispatch();
  const singleEmployee = useSelector(
    (state: any) => state.employee.singleEmployee
  );

  // console.log("llllllllllllllllllllll",singleEmployee)


  console.log(singleEmployee)
 
  const groupList = useSelector((state: any) => state.group.groups);
  console.log(groupList)

  const [employeeId, setEmployeeId] = useState("");

  const [inputBoxESIValue, setInputBoxESIValue] = useState<any>("");
  const [ESIValue, setESIValue] = useState(false);

  const [showInputBoxPancard, setShowInputBoxPancard] = useState(false);
  const [pancardNumber, setPancardNumber] = useState<any>('')





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
    setBankDetail({
      bankName: singleEmployee.bankDetails?.bankName,
      branch: singleEmployee.bankDetails?.branch,
      accountNumber: singleEmployee.bankDetails?.accountNumber,
      IFSC_Code: singleEmployee.bankDetails?.IFSC_Code
    })
  }, [singleEmployee]);



  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit((data: any) => {
      const { overTime } = data;
      if (overTime === "Yes") {
        data = { ...data, overTime: true };
      } else if (overTime === "No") {
        data = { ...data, overTime: false };
      }
      const sendData = { employeeId: employeeId, data: data };
      dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
        if (res.payload.success) {
          toast.success(res.payload.message);
        } else {
          toast.error(res.payload.message);
        }
        dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
      })
      setShowInputBoxPancard(false)
      setESIValue(false)
      setInputBankDeatils(false)



    })}
      className=" gap-[24px] flex flex-col">

      <div className="flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-[#2E2E2E]">Bank Details</h1>
        <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
          <img src={check} alt="" className="w-[16px] h-[16px]" />
          Save
        </button>

      </div>

      <div className="flex flex-col gap-[16px]">
      <Otp/>


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
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.PAN_Number}
              </p>
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
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.ESI_ID}
              </p>
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
                />


              </div>

            </div>

          </div>
        )}


        {/* {!showInputBankName && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
               BANK NAME
              </p>

            </div>
            <div onClick={() => {
              setShowInputBankName(!showInputBankName);
            }}>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.bankDetails?.bankName}
              </p>
            </div>
          </div>
        )}

        {showInputBankName && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold  tracking-[0.25px]">
                  Bank Name
                </p>
              </div>
              <div>
                <input
                  {...register('bankName', { required: true })}
                  className="text-[12px] leading-5 font-normal focus:outline-none"
                  value={bankName}
                 
                  onChange={(event) =>
                    setShowInputBankName(event.target.value)
                }
                  type="text"
                />


              </div>
            </div>

          </div>
        )} */}


        {/* 

        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Bank Name</span>
          <input type="text" placeholder="Type bank name" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Account Number</span>
          <input type="Number" placeholder="Type bank number" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">IFSC Code</span>
          <input type="text" placeholder="Type code" name="" id="" className="outline-none text-[16px]" />
        </div>



        <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
          <span className="text-[12px]">Branch Code</span>
          <input type="text" placeholder="Type your branch code" name="" id="" className="outline-none text-[16px]" />
        </div> */}


        {!InputBankDeatils && (

          <div className="flex flex-col gap-[16px]">

            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <span className="text-[12px] font-semibold">Bank Name</span>
              <div onClick={() => {
                setInputBankDeatils(!InputBankDeatils);
              }}>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {bankdetails.bankName}
                </p>
              </div>
            </div>



            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <span className="text-[12px] font-semibold">Account Number</span>
              <div onClick={() => {
                setInputBankDeatils(!InputBankDeatils);
              }}>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {bankdetails.accountNumber}
                </p>
              </div>
            </div>


            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <span className="text-[12px] font-semibold">Branch Code</span>
              <div onClick={() => {
                setInputBankDeatils(!InputBankDeatils);
              }}>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {bankdetails.branch}
                </p>
              </div>
            </div>

            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <span className="text-[12px] font-semibold">IFSC Code</span>
              <div onClick={() => {
                setInputBankDeatils(!InputBankDeatils);
              }}>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {bankdetails.IFSC_Code}
                </p>
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

    </form>
  )
}
