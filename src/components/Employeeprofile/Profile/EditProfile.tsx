import edit from "../../../assets/PencilSimple.png";
import check from "../../../assets/Check.png";
import WarningCircle from "../../../assets/WarningCircle.svg";
import Receipt from "../../../assets/Receipt.svg";
import XCircle from "../../../assets/XCircle.svg";
import PaperPlaneTilt from "../../../assets/PaperPlaneTilt.svg";
import eye from "../../../assets/Eye.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getSingleEmployeeAsync,
  newPasswordAsync,
  updateEmployeeAsync,
} from "../../../redux/Slice/EmployeeSlice";
import axios from "axios";
import { getOtpApiPath, verifyApiPath } from "../../../APIRoutes";

const EditProfile = () => {
  const dispatch = useDispatch();
  const singleEmployee = useSelector(
    (state: any) => state.employee.singleEmployee
  );
  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );
  const groupList = useSelector((state: any) => state.group.groups);

  const [employeeId, setEmployeeId] = useState("");

  const [showInputBoxName, setShowInputBoxName] = useState(false);
  const [inputBoxNameValue, setInputBoxNameValue] = useState<any>("");

  const [showInputBoxEmployeeCode, setShowInputBoxEmployeeCode] =
    useState(false);
  const [inputBoxEmployeeCodeValue, setInputBoxEmployeeCodeValue] =
    useState<any>("");

  const [showInputBoxJobProfile, setShowInputBoxJobProfile] = useState(false);
  const [inputBoxJobProfileValue, setInputBoxJobProfileValue] =
    useState<any>("");

  const [showInputBoxGroup, setShowInputBoxGroup] = useState(false);
  const [inputBoxGroupValue, setInputBoxGroupValue] = useState<any>("");

  const [showInputBoxEmail, setShowInputBoxEmail] = useState(false);
  const [inputBoxEmailValue, setInputBoxEmailValue] = useState<any>("");

  const [showInputBoxPassword, setShowInputBoxPassword] = useState(false);
  const [inputBoxPasswordValue, setInputBoxPasswordValue] = useState<any>("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputBoxPFValue, setInputBoxPFValue] = useState<any>("");
  const [PFValue, setPFValue] = useState(false);
  const [inputBoxESIValue, setInputBoxESIValue] = useState<any>("");
  const [ESIValue, setESIValue] = useState(false);

  const [showInputBoxContactNumber, setShowInputBoxContactNumber] =
    useState(false);
  const [inputBoxContactValue, setInputBoxContactNumberValue] =
    useState<any>("");

  const [showInputBoxGender, setShowInputBoxGender] = useState(false);
  const [inputBoxGenderValue, setInputBoxGenderValue] = useState<any>("");
  // addhar
  const [showInputBoxAadhar, setShowInputBoxAadhar] = useState(false);
  const [inputBoxAadharValue, setInputBoxAadharValue] = useState<any>("");

  const [showInputBoxSalary, setShowInputBoxSalary] = useState(false);
  const [inputBoxSalaryValue, setInputBoxSalaryValue] = useState<any>("");

  const [showInputBoxLunchTime, setShowInputBoxLunchTime] = useState(false);
  const [showInputBoxPancard,setShowInputBoxPancard]=useState(false);
  const [inputBoxLunchTimeValue, setInputBoxLunchTimeValue] = useState<any>("");
 
  // const [showInputBoxWorkingDays, setShowInputBoxWorkingDays] = useState(false);
  // const [inputBoxWorkingDaysValue, setInputBoxWorkingDaysValue] =
  //   useState<any>("");

  // const [showInputBoxWorkingHours, setShowInputBoxWorkingHours] =
  //   useState(false);
  // const [inputBoxWorkingHoursValue, setInputBoxWorkingHoursValue] =
  //   useState<any>("");
    
  const [pancardNumber,setPancardNumber]=useState('')
  const [showInputBoxOverTime, setShowInputBoxOverTime] = useState(false);
  const [isValidAadhar, setIsValidAadhar] = useState(false);
  const [inputBoxOverTimeValue, setInputBoxOverTimeValue] =
    useState<any>(false);
    const [InputBankDeatils, setInputBankDeatils] =
    useState<any>(false);
  const [bankdetails, setBankDetail] = useState({
      bankName:"",
      branch:"",
      accountNumber:"",
      IFSC_Code:""
    });
  useEffect(() => {
    setEmployeeId(singleEmployee._id);
    setInputBoxNameValue(singleEmployee.name);
    setInputBoxEmployeeCodeValue(singleEmployee.employeeCode);
    setInputBoxJobProfileValue(singleEmployee.jobProfileId?.jobProfileName);
    setInputBoxGroupValue(singleEmployee.groupId?.groupName);
    setInputBoxContactNumberValue(singleEmployee.contactNumber);
    setInputBoxEmailValue(singleEmployee.email);
    setInputBoxGenderValue(singleEmployee.gender);
    setInputBoxAadharValue(singleEmployee.aadharNumber);
    setInputBoxSalaryValue(singleEmployee.salary);
    setInputBoxLunchTimeValue(singleEmployee.lunchTime);
    // setInputBoxWorkingDaysValue(singleEmployee.workingDays);
    // setInputBoxWorkingHoursValue(singleEmployee.workingHours);
    setInputBoxOverTimeValue(singleEmployee.overTime);
    setPancardNumber(singleEmployee.PAN_Number)
    setBankDetail({
      bankName:singleEmployee.bankDetails?.bankName,
      branch:singleEmployee.bankDetails?.branch,
      accountNumber:singleEmployee.bankDetails?.accountNumber,
      IFSC_Code:singleEmployee.bankDetails?.IFSC_Code
    })
    setInputBoxPFValue(singleEmployee.PF_UAN_Number)
    setInputBoxESIValue(singleEmployee.ESI_ID)
  }, [singleEmployee]);

  // OTP VERIFICATION

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<any>();
  const [otpSent, setOtpSent] = useState<any>("");
  const [otpVerified, setOtpVerified] = useState<any>("");

  const getOtpAsync = async (sendData: any) => {
    try {
      const { data } = await axios.get(
        `${getOtpApiPath}?phoneNumber=${sendData.phoneNumber}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const verifyOtpAsync = async (sendData: any) => {
    try {
      const { data } = await axios.get(
        `${verifyApiPath}?phoneNumber=${sendData.phoneNumber}&otp=${sendData.otp}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const { handleSubmit, register } = useForm();

  return (
    <div className="ps-6">
      <form
        onSubmit={handleSubmit((data: any) => {
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
          });
          setShowInputBoxName(false);
          setShowInputBoxEmployeeCode(false);
          setShowInputBoxJobProfile(false);
          setShowInputBoxGroup(false);
          setShowInputBoxPassword(false);
          setShowInputBoxContactNumber(false);
          setShowInputBoxEmail(false);
          setShowInputBoxGender(false);
          setShowInputBoxAadhar(false);
          setShowInputBoxSalary(false);
          setShowInputBoxLunchTime(false);
          // setShowInputBoxWorkingDays(false);
          // setShowInputBoxWorkingHours(false);
          setShowInputBoxOverTime(false);
          setInputBankDeatils(false)
          setShowInputBoxPancard(false)
         setPFValue(false)
         setESIValue(false)
          
        })}
      >
        <div className="flex flex-col gap-3">
          {!singleEmployee.verified && (
            <div className="flex gap-[10px] items-center bg-[#FCECEC] rounded-lg p-4">
              <div>
                <img src={WarningCircle} className="w-[20px] h-[20px]" alt="" />
              </div>
              <div>
                <p className="text-sm leading-4 font-medium text-[#8A2626]">
                  Contact number is not verified!{" "}
                  <span
                    onClick={() => {
                      setShowOtp(!showOtp);
                      getOtpAsync({ phoneNumber: inputBoxContactValue }).then(
                        (res) => {
                          if (res.data.Status === "Success") {
                            setOtpSent("OTP Sent");
                          } else {
                            setOtpSent("OTP not Sent");
                          }
                        }
                      );
                    }}
                    className="underline underline-offset-2 cursor-pointer"
                  >
                    Verify Now
                  </span>
                </p>
              </div>
            </div>
          )}
          {showOtp && (
            <div
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              className="fixed flex justify-center items-center top-0 bottom-0 right-0 left-0"
            >
              <div className="bg-[#FFFFFF] p-10">
                <div className="flex gap-2 pb-4 w-[640px] border-b border-solid border-[#B0B0B0]">
                  <div>
                    <img src={Receipt} className="w-6 h-6" alt="" />
                  </div>
                  <div>
                    <h3 className="text-[18px] leading-6 font-medium text-[#1C1C1C]">
                      OTP sent to {inputBoxContactValue}
                    </h3>
                  </div>
                </div>
                <div className="pt-6 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="text-sm font-normal text-[#1C1C1C]">
                      Enter OTP
                    </p>
                    <p
                      onClick={() => {
                        getOtpAsync({ phoneNumber: inputBoxContactValue }).then(
                          (res) => {
                            if (res.data.Status === "Success") {
                              setOtpSent("Resend otp Successfully");
                            }
                          }
                        );
                      }}
                      className="text-[12px] leading-5 font-normal text-[#283093] cursor-pointer underline"
                    >
                      Resend OTP
                    </p>
                  </div>
                  <div>
                    <input
                      onChange={(event) => setOtp(event.target.value)}
                      placeholder="XXX XXX"
                      className="border border-solid border-[#B0B0B0] rounded py-3 px-4 h-10 w-[640px] text-sm font-normal text-[#666666]"
                      type="number"
                    />
                    {otpSent === "Resend otp Successfully" && (
                      <div className="flex gap-[6px] items-center pt-2">
                        <img
                          src={PaperPlaneTilt}
                          className="w-[14px] h-[14px]"
                          alt="plane"
                        />
                        <p className="text-xs font-normal text-[#414EF1]">
                          OTP resent successfully!
                        </p>
                      </div>
                    )}
                    {otpVerified === "Not Verified" && (
                      <div className="flex gap-[6px] items-center pt-2">
                        <img
                          src={XCircle}
                          className="w-[14px] h-[14px]"
                          alt="plane"
                        />
                        <p className="text-xs font-normal text-[#E23F3F]">
                          OTP incorrect! Please try again.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="pt-[21px]">
                    <div className="flex gap-4 justify-end">
                      <div
                        onClick={() => setShowOtp(false)}
                        className="flex justify-center items-center h-[34px] w-[96px] border border-solid border-[#3B3B3B] rounded-lg cursor-pointer"
                      >
                        <p className="text-sm font-medium text-[#3B3B3B]">
                          Cancel
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          verifyOtpAsync({
                            phoneNumber: inputBoxContactValue,
                            otp: otp,
                          }).then((res) => {
                            if (res.data.Status === "Success") {
                              setOtpVerified("Verified");
                              dispatch(
                                getSingleEmployeeAsync({
                                  employeeId: employeeId,
                                })
                              );
                              setShowOtp(false);
                            } else {
                              setOtpVerified("Not Verified");
                            }
                          });
                        }}
                        className="flex justify-center items-center h-[34px] w-[122px] bg-[#283093] rounded-lg cursor-pointer"
                      >
                        <p className="text-sm font-medium text-[#FBFBFC]">
                          Verify OTP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!showInputBoxName && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Name
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxName(!showInputBoxName);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.name}
                </p>
              </div>
            </div>
          )}
          {showInputBoxName && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Name
                  </p>
                </div>
                <div>
                  <input
                    {...register("name", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxNameValue}
                    onChange={(event) =>
                      setInputBoxNameValue(event.target.value)
                    }
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxEmployeeCode && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Employee Code
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxEmployeeCode(!showInputBoxEmployeeCode);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee && singleEmployee.employeeCode}
                </p>
              </div>
            </div>
          )}
          {showInputBoxEmployeeCode && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Employee Code
                  </p>
                </div>
                <div>
                  <input
                    {...register("employeeCode", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxEmployeeCodeValue}
                    onChange={(event) =>
                      setInputBoxEmployeeCodeValue(event.target.value)
                    }
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxJobProfile && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Job Profile
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxJobProfile(!showInputBoxJobProfile);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.jobProfileId?.jobProfileName}
                </p>
              </div>
            </div>
          )}
          {showInputBoxJobProfile && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Job Profile
                  </p>
                </div>
                <div>
                  <select
                    {...register("jobProfile", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    defaultValue={inputBoxJobProfileValue}
                    onChange={(event) =>
                      setInputBoxJobProfileValue(event.target.value)
                    }
                  >
                    {jobProfileList &&
                      jobProfileList.map((element: any, index: number) => {
                        return (
                          <option key={index} value={element.jobProfileName}>
                            {element.jobProfileName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxGroup && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Group
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxGroup(!showInputBoxGroup);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.groupId?.groupName}
                </p>
              </div>
            </div>
          )}
          {showInputBoxGroup && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Group
                  </p>
                </div>
                <div>
                  <select
                    {...register("group", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    defaultValue={inputBoxGroupValue}
                    onChange={(event) =>
                      setInputBoxGroupValue(event.target.value)
                    }
                  >
                    {groupList &&
                      groupList.map((element: any, index: number) => {
                        return (
                          <option key={index} value={element.groupName}>
                            {element.groupName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxEmail && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Email
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxEmail(!showInputBoxEmail);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.email}
                </p>
              </div>
            </div>
          )}
          {showInputBoxEmail && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxPassword && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Password
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxPassword(!showInputBoxPassword);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]"></p>
              </div>
            </div>
          )}
          {showInputBoxPassword && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Password
                  </p>
                </div>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    value={inputBoxPasswordValue}
                    onChange={(event) =>
                      setInputBoxPasswordValue(event.target.value)
                    }
                    className="text-[12px] leading-5 font-normal pe-4 focus:outline-none"
                    type={`${showPassword ? "text" : "password"}`}
                  />
                  <img
                    onClick={() => setShowPassword(!showPassword)}
                    src={eye}
                    className="absolute w-[13px] z-10 right-0 bottom-1 cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => {
                    dispatch(
                      newPasswordAsync({
                        employeeId: employeeId,
                        password: inputBoxPasswordValue,
                      })
                    ).then((res: any) => {
                      if (res.payload.success) {
                        toast.success(res.payload.message);
                      } else {
                        toast.error(res.payload.message);
                      }
                    });
                    setInputBoxPasswordValue("");
                    setShowInputBoxPassword(false);
                  }}
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxContactNumber && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Contact Number
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxContactNumber(!showInputBoxContactNumber);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.contactNumber}
                </p>
              </div>
            </div>
          )}
          {showInputBoxContactNumber && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxGender && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Gender
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxGender(!showInputBoxGender);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.gender}
                </p>
              </div>
            </div>
          )}
          {showInputBoxGender && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Gender
                  </p>
                </div>
                <div>
                  
                  <select
                    {...register("gender", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    defaultValue={inputBoxGenderValue}
                    value={inputBoxGenderValue}
                    onChange={(event) =>
                      setInputBoxGenderValue(event.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="">Pefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxAadhar && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Aadhar Number
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxAadhar(!showInputBoxAadhar);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.aadharNumber}
                </p>
              </div>
            </div>
          )}
          {showInputBoxAadhar && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                   Aadhar Number
                  </p>
                </div>
                <div>
                  <input
                   {...register("aadharNumber", { required: true })}
                   className="text-[12px] leading-5 font-normal focus:outline-none"
                   value={inputBoxAadharValue}
                   onChange={(event) => {
                     if (event.target.value.toString().length <= 12) {
                       setInputBoxAadharValue(event.target.value);
                     }
                     const Regex = /^\d{12,13}$/;
                     setIsValidAadhar(Regex.test(event.target.value));
                   }}
                   type="text"
                   />
                   {register("aadharNumber").toString().length > 0 && !isValidAadhar && (
                                  <p className='text-red-500'>Aadhar number is invalid!</p>
                                   
                                )}
                                {isValidAadhar  && (
                                   <p className='text-green-500'>Aadhar number is valid!</p>
                                    
                                    
                                )}

                </div>
                
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
           {!PFValue && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                 PF Number
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setPFValue(!PFValue);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.PF_UAN_Number}
                </p>
              </div>
            </div>
          )}
          {PFValue && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                   PF Number
                  </p>
                </div>
                <div>
                  <input
                   {...register("PF_UAN_Number", { required: true })}
                   className="text-[12px] leading-5 font-normal focus:outline-none"
                   value={inputBoxPFValue}
                   onChange={(event) => {
                    
                       setInputBoxPFValue(event.target.value);
                    
                   }}
                   type="text"
                   />
                   

                </div>
                
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!ESIValue && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                 ESI ID
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setESIValue(!ESIValue);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.ESI_ID}
                </p>
              </div>
            </div>
          )}
          {ESIValue && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
           {!showInputBoxPancard && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                 Pan Card Number
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxPancard(!showInputBoxPancard);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.PAN_Number}
                </p>
              </div>
            </div>
          )}
          {showInputBoxPancard && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxSalary && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Salary
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxSalary(!showInputBoxSalary);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.salary}
                </p>
              </div>
            </div>
          )}
          {showInputBoxSalary && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Salary
                  </p>
                </div>
                <div>
                  <input
                    {...register("salary", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxSalaryValue}
                    onChange={(event) =>
                      setInputBoxSalaryValue(event.target.value)
                    }
                    type="number"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxLunchTime && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Lunch Time
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxLunchTime(!showInputBoxLunchTime);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.lunchTime} Hour
                </p>
              </div>
            </div>
          )}
          {showInputBoxLunchTime && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Lunch Time
                  </p>
                </div>
                <div>
                  <select
                    {...register("lunchTime", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxLunchTimeValue}
                    onChange={(event) =>
                      setInputBoxLunchTimeValue(event.target.value)
                    }
                  >
                    <option value="0.5">30 Min</option>
                    <option value="0.75">45 Min</option>
                    <option value="1">1 Hour</option>
                    <option value="1.5">1.5 Hour</option>
                    <option value="2">2 Hour</option>
                    <option value="2.5">2.5 Hour</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}


          {/* {!showInputBoxWorkingDays && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Working Days
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxWorkingDays(!showInputBoxWorkingDays);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.workingDays} days per Week
                </p>
              </div>
            </div>
          )}
          {showInputBoxWorkingDays && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Working Days
                  </p>
                </div>
                <div>
                  <select
                    {...register("workingDays", { required: true })}
                    className="text-[12px] leading-5 font-normal pe-5 focus:outline-none"
                    value={inputBoxWorkingDaysValue}
                    onChange={(event) =>
                      setInputBoxWorkingDaysValue(event.target.value)
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}

          {!showInputBoxWorkingHours && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Working Hours
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxWorkingHours(!showInputBoxWorkingHours);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.workingHours} Hours per day
                </p>
              </div>
            </div>
          )}
          {showInputBoxWorkingHours && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Working Hours
                  </p>
                </div>
                <div>
                  <input
                    {...register("workingHours", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxWorkingHoursValue}
                    onChange={(event) =>
                      setInputBoxWorkingHoursValue(event.target.value)
                    }
                    type="number"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )} */}
          {!showInputBoxOverTime && (
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Overtime?
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxOverTime(!showInputBoxOverTime);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {singleEmployee.overTime ? "Yes" : "No"}
                </p>
              </div>
            </div>
          )}
          {showInputBoxOverTime && (
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Overtime?
                  </p>
                </div>
                <div>
                  <select
                    {...register("overTime", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    defaultValue={inputBoxOverTimeValue ? "Yes" : "No"}
                    value={inputBoxOverTimeValue}
                    onChange={(event) =>
                      setInputBoxOverTimeValue(event.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!InputBankDeatils && (
            
            <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Bank Details
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setInputBankDeatils(!InputBankDeatils);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
              </div>
            </div>
          )}
          {InputBankDeatils && (
            <>
             <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col ">
                <div className="flex gap-2">
                  <p className="text-lg font-bold text-[#000000] tracking-[0.25px] ml-20 mt-1">
                    Save Bank Details
                  </p>
                </div>
               
              </div>
              <div className="flex justify-center items-center" >
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
            <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
          <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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
          <div className="flex justify-between p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
            <div className="flex flex-col">
              <div className="flex gap-3">
                <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
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

          <div className="flex flex-col p-4 w-[448px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                Overtime Rate
              </p>
            </div>
            <div>
              <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                {inputBoxOverTimeValue &&
                  singleEmployee.overTimeRate &&
                  singleEmployee.overTimeRate.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;