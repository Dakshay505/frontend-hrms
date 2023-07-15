import React, { useEffect, useState } from 'react';
import plus from "../assets/BluePlus.png";
import user from "../assets/User.png";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import X from '../../src/assets/X.svg'
import { addImageAsync } from '../redux/Slice/EmployeeSlice';

const UploadPhotoPage: React.FC = () => {

  const Employee = useSelector((state: any) => state.login.loggedInUserData?.employee)
  const [emp, setEmp] = useState()
  useEffect(() => {
    setEmp(Employee?._id)
  }, [Employee])

  const dispatch = useDispatch();
  const handleFormSubmit = (data: any) => {
    data.employeeId = emp
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('employeeId', data.employeeId);
    for (const entry of formData.entries()) {
      console.log(entry[0] + ": " + entry[1]);
    }
    dispatch(addImageAsync(formData))
  }


  const { register, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileReset = () => {
    setSelectedFile(null);
  };
  return (
    <div className="px-[40px] gap-[32px] flex max-w-[768px] pt-[32px] flex-col items-start self-stretch">
      <form
        onSubmit={handleSubmit((data) => {
          console.log("data", data)
          handleFormSubmit(data);
        })}
      >

        <div className="flex flex-col items-start gap-[40px] self-stretch">
          <div className="flex items-start gap-[291px] self-stretch text-[#2E2E2E] font-inter font-bold text-[28px] leading-[36px]">
            Add your photo
          </div>
          <div className="flex items-start gap-[64px] flex-col self-stretch">
            <div className="flex items-start gap-[20px] flex-col p-[1px]">
              <p className="text-[#2E2E2E] font-inter font-medium text-[16px] leading-[36px]">
                Upload the photo in a 1:1 ratio with face in center
              </p>
              <div className="flex h-[189px] py-[40px] rounded-[2px] border border-dashed border-[#9198F7] bg-[#ECEDFE] flex-col justify-center items-center self-stretch">
                <div className="flex h-[40px] py-[12px] px-[16px] flex-col justify-center items-center gap-[8px] flex-1 cursor-pointer">
                  <img src={plus} alt="" className="h-[24px] w-[24px]" onChange={handleFileChange} />

                  {selectedFile ? (
                    <div className="flex items-center justify-center border border-dashed  w-[300px] h-14 rounded-sm">
                      <span className="text-[12px] leading-5 font-normal text-[#666666]">{selectedFile.name}</span>
                      <button onClick={handleFileReset}>
                        <img src={X} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border border-dashed  w-[300px] h-14 rounded-sm">
                      <label htmlFor="file" className="text-[12px] leading-5 font-normal text-[#666666]">Drag & Drop or<span className="text-[#283093] underline cursor-pointer"> Browse</span></label>
                      <input
                        {...register(`file`, { required: true })}
                        type="file"
                        name="file"
                        id="file"
                        className="absolute opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-[24px]">
            <button type='submit' className="flex items-center justify-center w-[190px] h-[52px] px-[20px] bg-primary-blue py-[16px] rounded-[8px] gap-[4px]">
              <img src={user} alt="" className="h-[20px] w-[20px]" />
              <p className="text-[#FBFBFC] font-inter font-medium text-[16px] leading-[36px]">Upload Photo</p>
            </button>
          </div>
        </div>
      </form>

    </div >
  );
};

export default UploadPhotoPage