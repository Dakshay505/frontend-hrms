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



export const PersonalDetails = () => {

  const dispatch = useDispatch();
  const singleEmployee = useSelector(
    (state: any) => state.employee.singleEmployee
  );
  console.log(singleEmployee)
  // const jobProfileList = useSelector(
  //   (state: any) => state.jobProfile.jobProfiles
  // );
  const groupList = useSelector((state: any) => state.group.groups);
  console.log(groupList)

  const [employeeId, setEmployeeId] = useState("");

  const [showInputBoxContactNumber, setShowInputBoxContactNumber] =
    useState(false);
  const [inputBoxContactValue, setInputBoxContactNumberValue] =
    useState<any>("");


  const [showInputBoxGender, setShowInputBoxGender] = useState(false);
  const [inputBoxGenderValue, setInputBoxGenderValue] = useState<any>("");


  const [showInputBoxEmail, setShowInputBoxEmail] = useState(false);
  const [inputBoxEmailValue, setInputBoxEmailValue] = useState<any>("");


  const [showInputAadharCard, setShowInputAadharCard] = useState(false);
  const [inputAadharCardNumber, setInputAadharCardNumber] = useState<any>("");

  useEffect(() => {
    setEmployeeId(singleEmployee._id);
    setInputBoxContactNumberValue(singleEmployee.contactNumber);
    setInputBoxEmailValue(singleEmployee.email);
    setInputBoxGenderValue(singleEmployee.gender);
    setInputAadharCardNumber(singleEmployee.aadharNumber);
  }, [singleEmployee]);

  const { handleSubmit, register } = useForm();
  // const [fileName, setFileName] = useState("Aadhar Card");

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
      setShowInputBoxContactNumber(false);
      setShowInputBoxEmail(false);
      setShowInputBoxGender(false);
      setShowInputAadharCard(false)


    })}
      className=" gap-[24px] flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-[#2E2E2E]">Personal Details</h1>
        <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
          <img src={check} alt="" className="w-[16px] h-[16px]" />
          Save
        </button>

      </div>

      <div className="flex flex-col gap-[16px]">
        <Otp />



        {!showInputBoxContactNumber && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                Contact Number
              </p>

            </div>
            <div onClick={() => {
              setShowInputBoxContactNumber(!showInputBoxContactNumber);
            }}>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.contactNumber}
              </p>
            </div>
          </div>
        )}
        {showInputBoxContactNumber && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold  tracking-[0.25px]">
                  Contact Number
                </p>
              </div>
              <div>
                <input
                  {...register("contactNumber", {
                    required: true,
                    pattern: {
                      value: /^\d{10}$/,
                      message:
                        "Invalid phone number format (10 digits allowed)",
                    },
                  })}
                  className="text-[12px] leading-5 font-normal focus:outline-none"
                  value={inputBoxContactValue}
                  onChange={(event) =>
                    setInputBoxContactNumberValue(event.target.value)
                  }
                  type="number"
                />
              </div>
            </div>

          </div>
        )}

        {!showInputBoxEmail && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                Email
              </p>

            </div>
            <div onClick={() => {
              setShowInputBoxEmail(!showInputBoxEmail);
            }}>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.email}
              </p>
            </div>
          </div>
        )}
        {showInputBoxEmail && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold  tracking-[0.25px]">
                  Email
                </p>
              </div>
              <div>
                <input
                  {...register("email", {
                    required: false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="text-[12px] leading-5 font-normal focus:outline-none"
                  value={inputBoxEmailValue}
                  onChange={(event) =>
                    setInputBoxEmailValue(event.target.value)
                  }
                  type="text"
                />
              </div>
            </div>

          </div>
        )}


        {!showInputAadharCard && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                Aadhar Card
              </p>

            </div>
            <div className="flex gap-[20px] items-center ">

              <div onClick={() => {
                setShowInputAadharCard(!showInputAadharCard);
              }}>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.aadharNumber}
                </p>
              </div>

            </div>

          </div>
        )}
        {showInputAadharCard && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold  tracking-[0.25px]">
                  Aadhar Card
                </p>
              </div>
              <div>
                <input
                  {...register("aadharNumber", {
                    required: true,

                  })}
                  className="text-[12px] leading-5 font-normal focus:outline-none"
                  value={inputAadharCardNumber}
                  onChange={(event) =>
                    setInputAadharCardNumber(event.target.value)
                  }
                  type="text"
                />
              </div>
            </div>

          </div>
        )}


        {/* {showInputAadharCard && (
          <div className="flex justify-between py-[8px] px-[16px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
            <div className="flex gap-[20px] flex-col">
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="fileName" className="font-medium">
                  Upload aadhar card
                </label>
                <input
                  type="text"
                  placeholder="File Name"
                  value={fileName}
                  {...register("fileName")}
                  onChange={(e) => setFileName(e.target.value)}
                  className="outline-none text-[14px]"
                />
              </div>


              <div className="flex items-center justify-center border border-dashed border-[#9198F7] bg-[#ECEDFE] w-[200px] h-[35px] rounded-sm">
                <label htmlFor="file" className="text-[12px] leading-5 font-normal text-[#666666]">Drag & Drop or<span className="text-[#283093] underline cursor-pointer"> Browse</span></label>
                <input
                  {...register("file")}
                  type="file"
                  name="file"
                  id="file"
                  className="absolute opacity-0 cursor-pointer"
                />
              </div>

            </div>
          </div>
        )} */}



        {!showInputBoxGender && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                Gender
              </p>

            </div>
            <div onClick={() => {
              setShowInputBoxGender(!showInputBoxGender);
            }}>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {singleEmployee.gender}
              </p>
            </div>
          </div>
        )}
        {showInputBoxGender && (
          <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold  tracking-[0.25px]">
                  Gender
                </p>
              </div>
              <div>
                <input
                  {...register("gender", { required: true })}
                  className="text-[12px] leading-5 font-normal focus:outline-none"
                  value={inputBoxGenderValue}
                  onChange={(event) =>
                    setInputBoxGenderValue(event.target.value)
                  }
                  type="text"
                />
              </div>
            </div>
           
          </div>
        )}

      </div>

    </form>
  )
}
