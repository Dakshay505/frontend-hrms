import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import check from "../../../../assets/Check.png"
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadEmployeeDocuments } from "../../../../redux/API/UploadDocument";


type FormData = {
    employeeId: string;
    fileName: string;
    file: FileList;
};

const UploadPopup = ({ onClose }: any) => {
    const {
        register,
        handleSubmit,

    } = useForm<FormData>();

    const [fileName, setFileName] = useState("");

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append("employeeId", employeeId);
        formDataToSend.append("fileName", fileName);
        formDataToSend.append("file", data.file[0]);

        for (let i of formDataToSend) {
            console.log("formsfataaaaaaaaaaaaaaaa", i)
        }
        uploadEmployeeDocuments(formDataToSend).then((res: any) => {
            console.log("heloooooooooooo", res.payload)
        })

    };


    const singleEmployee = useSelector(
        (state: any) => state.employee.singleEmployee
    );
    const [employeeId, setEmployeeId] = useState("");
    useEffect(() => {
        setEmployeeId(singleEmployee._id);
    }, [singleEmployee]);



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="gap-[24px] flex flex-col">

                <div className="flex justify-between py-[8px] px-[16px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                    <div className="flex flex-col gap-[8px]">
                        <label htmlFor="fileName" className="font-medium">
                            File Name
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
                </div>

                <div className="flex justify-between py-[8px] px-[16px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
                    <div className="flex gap-[20px] flex-col">
                        <label htmlFor="file " className="font-medium">Choose a File</label>

                        <div className="flex items-center justify-center border border-dashed border-[#9198F7] bg-[#ECEDFE] w-[300px] h-14 rounded-sm">
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


                <div className="flex mt-[20px] justify-between">

                    <button onClick={onClose} className="flex gap-[5px] border-[#283093] border-1 border  rounded-[8px] px-[16px] py-[5px] justify-center items-center text-[#283093]">Close</button>
                    <button type="submit" className="flex gap-[5px] bg-[#283093] rounded-[8px] px-[16px] py-[5px] justify-center items-center text-white" >
                        <img src={check} alt="" className="w-[16px] h-[16px]" />
                        Save
                    </button>
                </div>
            </form>


        </div>
    );
};

export default UploadPopup;


