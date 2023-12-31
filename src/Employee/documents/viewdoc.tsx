import { useForm } from "react-hook-form";
import { useState } from "react";
import { addDocumentsAsync } from "../../redux/Slice/EmployeeSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import doc from "../../assets/File.png";
import upload from "../../assets/FileArrowUp.png";

export const EmpViewdoc = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm();

  const handleFormSubmit = () => {
    const formData = new FormData();
    console.log(formData);
    formData.append('file', selectedFile);
    // formData.append('fileName', data.resourceDocsName);
    for (const entry of formData.entries()) {
        console.log(entry[0] + ": " + entry[1]);
    }
    dispatch(addDocumentsAsync(formData))
  }


  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("file uploaded successfully", file);
  };


  return (
    <div className="flex flex-col items-start self-stretch max-w-[768px] pt-[32px]  px-[40px] gap-[32px]">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex gap-4">
          <Link to="/your-documents" className="flex gap-4 items-center p-6 bg-[#ECEDFE] rounded-lg w-[336px] h-[80px]">
            <img className="w-[32px] h-[32px] color-red-500" src={doc} alt="" />
            <p className="text-[#283093] text-xl font-medium">View Documents</p>
          </Link>
        </div>
        <div className="flex flex-col py-[48px]  flex-start gap-8 self-stretch">
          <div className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
            Daily Staff Check-in
          </div>
          <div className="flex p-[24px] items-start justify-between w-[688px] gap-[32px] border self-stretch rounded-[8px] border-primary-border bg-[#fafafa]">
            <div className="flex flex-col items-start gap-[16px] flex-1 self-stretch">
              <div className="flex items-center text-[#2E2E2E] text-[16px] font-inter font-semibold leading-2">Upload Documents</div>
              <div className="flex py-[8px] px-[16px] bg-[#ECEDFE] rounded-3xl items-center  text-primary-blue text-[14px] font-inter  gap-[8px]  leading-2 ">
                <img src={doc} alt="" className="w-[10px] h-[10px]" />
                PDF
              </div>
              <div className="flex items-center text-[#2E2E2E] text-[14px] font-inter leading-2">Lorem ipsum dolor sit amet .</div>
            </div>
            <div className="flex flex-col items-end gap-[24px] flex-1 self-stretch ">
              <label
                htmlFor="file"
                className="bg-primary-blue rounded-[8px] items-center flex gap-[5px] px-[16px] py-[12px] text-white font-semibold h-[40px] w-[122px] justify-center"
              >
                <img src={upload} className="h-[25px] w-[25px]" /> Upload
                <input
                  {...register(`file`, { required: true })}
                  type="file"
                  name="file"
                  id="file"
                  className="absolute opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  onBlur={handleSubmit(handleFormSubmit)}
                />
              </label>
            </div>
          </div>
        </div>
      </form> 
    </div>
  );
};
