import React, { useEffect, useState } from 'react';
import axios from 'axios';
import upload from "../../assets/UploadSimple.png";
import { uploadDocumentApiPath } from "../../APIRoutes";

interface Document {
  id: string;
  name: string;
  url: string;
}

const ViewDoc: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<Document[]>([]);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${uploadDocumentApiPath}`, {
          withCredentials: true,
        });
        // console.log("Fetching data",data)
        if (data && data.doc && Array.isArray(data.doc) && data.doc.length > 0) {
          const documents = data.doc[0].document;
          const mappedImages = documents.map((document: any) => ({
            id: document._id,
            name: document.docsName,
            url: document.docs,
          }));
          setImageUrls(mappedImages);
        } else {
          // setError('Invalid data structure');
        }
      } catch (error) {
        // setError('Error fetching data: ' + (error as Error).message);
      }
    };

    fetchData();
  }, []);


  const openImageInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex pt-[32px] w-[770px] gap-[40px] flex-col items-start">
      <div className="flex px-[40px] w-[100%] py-[0] gap-[40px] flex-col items-start">
        <div className="flex justify-between w-[100%] gap-[50px] items-start">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
              Viewing Documents
            </p>
            <p className="text-[#2E2E2E] text-xl font-inter font-semibold leading-8">
              For Madhav Sharma
            </p>
          </div>
          <div className="flex items-center gap-[20px]">
            <label className="text-primary-blue border-2 border-primary-blue rounded-md items-center gap-[5px] cursor-pointer flex px-[16px] py-[12px] bg-white font-semibold">
              <img src={upload} alt="" className="h-[25px] w-[25px]" />
              <span className="text-lg font-medium">Upload</span>
              <input type="file" className="hidden" />
            </label>
            <label className="text-primary-blue border-2 border-primary-blue rounded-md items-center gap-[5px] cursor-pointer flex px-[16px] py-[12px] bg-white font-semibold">
              <img src={upload} alt="" className="h-[25px] w-[25px]" />
              <span className="text-lg font-medium">Request</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex mx-[40px] gap-[20px] w-[648px] flex-wrap">
        {imageUrls.map((document) => (
          <div
            key={document.id}
            className="w-[200px] cursor-pointer h-[210px] border-2 border-primary-border rounded-[5px]"
            onClick={() => openImageInNewTab(document.url)}
          >
            <img
              src={document.url}
              alt={document.name}
              className="relative overflow-hidden bg-cover bg-center opacity-60 z-[-111111] w-[200px] h-[207px]"
            />
            <h1 className="text-[#2E2E2E] text-center text-sm font-inter font-medium leading-8 bg-[#ECEDFE] border-2 border-[#9198F7] rounded-b-[5px] z-9999999999 relative">{document.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoc;
