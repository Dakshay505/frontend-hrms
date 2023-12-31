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
import { getLoggedInUserDataAsync } from "../../../redux/Slice/loginSlice";




export const PersonalDetails = () => {

  const dispatch = useDispatch();
  const singleEmployee = useSelector(
    (state: any) => state.employee.singleEmployee
  );
  console.log(singleEmployee)

  // const groupList = useSelector((state: any) => state.group.groups);
  // console.log(groupList)

  const [employeeId, setEmployeeId] = useState("");

  const [showInputBoxContactNumber, setShowInputBoxContactNumber] =
    useState(false);
  const [inputBoxContactValue, setInputBoxContactNumberValue] =
    useState<any>("");


  const [showInputBoxGender, setShowInputBoxGender] = useState(false);
  const [inputBoxGenderValue, setInputBoxGenderValue] = useState<any>("");


  const [showInputBoxEmail, setShowInputBoxEmail] = useState(false);
  const [inputBoxEmailValue, setInputBoxEmailValue] = useState<any>("");



  useEffect(() => {
    setEmployeeId(singleEmployee?._id);
    setInputBoxContactNumberValue(singleEmployee?.contactNumber);
    setInputBoxEmailValue(singleEmployee?.email);
    setInputBoxGenderValue(singleEmployee?.gender);
  }, [singleEmployee]);


  const { handleSubmit, register } = useForm();
  const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
  useEffect(() => {
    dispatch(getLoggedInUserDataAsync());
  }, [])


  return (


      <form onSubmit={handleSubmit((data: any) => {


        const sendData = { ...data,employeeId: employeeId};
        
        dispatch(updateEmployeeAsync(sendData)).then((res: any) => {
          if (res.payload.success) {
            toast.success(res.payload.message);
          } else {
            toast.error(res.payload.message);
          }
          dispatch(getSingleEmployeeAsync({ employeeId: employeeId }));
          dispatch(getLoggedInUserDataAsync());

        })
        setShowInputBoxContactNumber(false);
        setShowInputBoxEmail(false);
        setShowInputBoxGender(false);



      })}
        className=" gap-[24px] flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] font-bold text-[#2E2E2E]">Personal Details</h1>
          {loggedInUserData.admin|| loggedInUserData.employee.role === 'dbManager' ||  (loggedInUserData.employee.role === 'admin') ? (

            <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[12px] justify-center items-center text-white" >
              <img src={check} alt="" className="w-[16px] h-[16px]" />
              Save
            </button>
          ) : null}

        </div>

        {loggedInUserData.admin|| loggedInUserData.employee.role === 'dbManager' ||  (loggedInUserData.employee.role === 'admin') ? (

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
                    {singleEmployee?.contactNumber}
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
                  <input
                    {...register("contactNumber", {
                      required: true,
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid phone number format (10 digits allowed)",
                      },
                    })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxContactValue}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      if (inputValue.length <= 10) {
                        setInputBoxContactNumberValue(inputValue);
                      }

                    }}
                    type="number"
                  />


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
                    {singleEmployee?.email?singleEmployee?.email:"-"}
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
                  <input value={singleEmployee?.gender} placeholder="Gender" className="outline-none text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]" />
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
                    <select
                      {...register("gender", { required: true })}
                      className="text-[12px] leading-5 font-normal focus:outline-none"
                      defaultValue={inputBoxGenderValue}
                      onChange={(event) =>
                        setInputBoxGenderValue(event.target.value)
                      }>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

              </div>
            )}

          </div>

        ) : (
          <div className="flex flex-col gap-[16px]">
            <Otp />
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Contact Number</p>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee?.contactNumber}</p>
            </div>
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Email</p>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee?.email}</p>
            </div>
            <div className="px-[16px] py-[8px]  border border-[#CFD3D4] rounded-[8px] flex gap-[10px] flex-col">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">Gender</p>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">{singleEmployee?.gender}</p>
            </div>
          </div>
        )}
      </form>

  )
}