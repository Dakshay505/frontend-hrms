import  { useState } from 'react'
import { getOtpApiPath, verifyApiPath } from '../../APIRoutes';
import axios from 'axios';
import WarningCircle from "../../assets/WarningCircle.svg";
import Receipt from "../../assets/Receipt.svg";
import XCircle from "../../assets/XCircle.svg";
import PaperPlaneTilt from "../../assets/PaperPlaneTilt.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmployeeAsync } from '../../redux/Slice/EmployeeSlice';


export const Otp = () => {
    const [,] =
        useState(false);
    const [inputBoxContactValue, ] =
        useState<any>("");

    const dispatch = useDispatch();

    // OTP VERIFICATION
    const [employeeId, ] = useState("");

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

    const singleEmployee = useSelector(
        (state: any) => state.employee.singleEmployee
    );

    return (
        <div>
            {!singleEmployee?.verified && (
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
                    className="fixed flex justify-center z-50 items-center top-0 bottom-0 right-0 left-0"
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
        </div>
    )
}
