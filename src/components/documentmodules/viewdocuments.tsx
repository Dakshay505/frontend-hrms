import React, { ChangeEvent, useState } from "react";
import upload from "../../assets/UploadSimple.png";

const ViewDoc: React.FC = () => {
  const [resumes, setResumes] = useState<string[]>([]);
  let currentPage=1
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const resumesPerPage = 9;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const resumeData = e.target?.result as string;
        setResumes((prevResumes) => [...prevResumes, resumeData]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
   
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const renderResumes = () => {
    const startIndex = (currentPage - 1) * resumesPerPage;
    const endIndex = startIndex + resumesPerPage;
    const currentResumes = resumes.slice(startIndex, endIndex);

    return currentResumes.map((resume, index) => (
      <div
        key={index}
        className="flex items-center justify-center flex-col"
        onClick={() => handleImageClick(resume)}
      >
        <img
          src={resume}
          alt={`Resume ${index + 1}`}
          className="h-[300px] w-[250px] mx-2 cursor-pointer rounded-lg border-2 border-primary-blue"
        />
        {/* {selectedResumeIndex === index && ( */}
          <button
            className="mt-2 text-primary-blue border bg-primary-bg w-[95%] rounded-lg py-[13px] px-[6px] border-primary-border font-medium"
            onClick={() => setFullscreenImage(resume)}
          >
            Resume.pdf
          </button>
        {/* // )} */}
      </div>
    ));
  };

  return (
    <div className="flex pt-[32px] w-[770px] flex-col items-start">
      <div className="flex px-[40px] w-[100%] py-[0] gap-[40px] flex-col items-start">
        <div className="flex justify-between w-[100%] gap-[50px] items-start">
          <div className="flex flex-col gap-[8px]">
            <p className="text-2xl font-inter font-bold leading-8">
              Viewing Documents
            </p>
            <p className="text-xl font-inter font-semibold leading-8">
              For Madhav Sharma
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-primary-blue border border-primary-blue rounded-md items-center gap-[5px] cursor-pointer flex px-[16px] py-[12px] bg-white font-semibold">
              <img src={upload} alt="" className="h-[25px] w-[25px]" />
              <span className="text-lg font-medium">Upload Resume</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="flex mt-[50px] flex-wrap gap-[100px]">
            {renderResumes()}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75">
          <img
            src={fullscreenImage}
            alt="Fullscreen Resume"
            className="max-h-full max-w-full"
          />
          <button
            className="absolute top-4 right-4 p-2 text-white bg-gray-800 rounded-md"
            onClick={closeFullscreenImage}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewDoc;
