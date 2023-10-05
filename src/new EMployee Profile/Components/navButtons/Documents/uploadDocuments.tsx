import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import check from "../../../../assets/Check.png"
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadEmployeeDocuments } from "../../../../redux/API/UploadDocument";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import cancel from "../../../../assets/X.svg"

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
    const [, setSelectedFile] = useState<File | null>(null); 
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append("employeeId", employeeId);
        formDataToSend.append("fileName", fileName);
        formDataToSend.append("file", data.file[0]);

        try {
            const res = await uploadEmployeeDocuments(formDataToSend);
            console.log("heloooooooooooo", res.payload);
            navigate("/view-modify-database");

            toast.success("Document uploaded successfully!");
        } catch (error) {
            console.error("Error uploading document:", error);
        }
    };

    const singleEmployee = useSelector(
        (state: any) => state.employee.singleEmployee
    );
    const [employeeId, setEmployeeId] = useState("");
    useEffect(() => {
        setEmployeeId(singleEmployee._id);
    }, [singleEmployee]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setSelectedFile(selectedFile); 
            setFileName(selectedFile.name);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setFileName("");
    };

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
                        <label htmlFor="file" className="font-medium">
                            Choose a File
                        </label>

                        <div className="flex px-[20px] items-center justify-between border border-dashed border-[#9198F7] bg-[#ECEDFE] w-[300px] h-14 rounded-sm">
                            <label htmlFor="file" className="text-[12px] leading-5 font-normal text-[#666666]">
                                {fileName ? (
                                    <>
                                        {fileName}
                                        <button type="button" onClick={clearFile}>
                                            <img src={cancel} alt="Cancel" className="w-4 h-4 ml-2 cursor-pointer" />
                                        </button>
                                    </>
                                ) : (
                                    "Drag & Drop or"
                                )}
                                <span className="text-[#283093] underline cursor-pointer">Browse</span>
                            </label>
                            <input
                                {...register("file")}
                                type="file"
                                name="file"
                                id="file"
                                className="absolute opacity-0 cursor-pointer"
                                onChange={handleFileChange} 
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


