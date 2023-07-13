import React, { ChangeEvent, useRef } from 'react';
import plus from "../assets/BluePlus.png";
import user from "../assets/User.png";

const UploadPhotoPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        console.log(imageDataUrl); // Log the image data URL in the console
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input selection
  };

  return (
    <div className="px-[40px] gap-[32px] flex max-w-[768px] pt-[32px] flex-col items-start self-stretch">
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
                <img src={plus} alt="" className="h-[24px] w-[24px]" onClick={handleUploadButtonClick} />
                <label
                  htmlFor="file-upload"
                  className="text-[#666] text-center leading-trim text-cap font-inter text-xs font-normal leading-5 cursor-pointer tracking-tighter"
                >
                  Drag & Drop or <span className="underline text-primary-blue">Browse</span>
                </label>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-[24px]">
          <button className="flex items-center justify-center w-[190px] h-[52px] px-[20px] bg-primary-blue py-[16px] rounded-[8px] gap-[4px]">
            <img src={user} alt="" className="h-[20px] w-[20px]" />
            <p className="text-[#FBFBFC] font-inter font-medium text-[16px] leading-[36px]">Upload Photo</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoPage;
