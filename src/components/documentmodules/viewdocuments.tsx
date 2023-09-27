import React, { useEffect } from 'react';
import upload from "../../assets/UploadSimple.png";
// import { useLocation } from 'react-router-dom';
import DocumentFrame from '../../assets/documentFrame.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeImageAsync, getSingleEmployeeAsync } from '../../redux/Slice/EmployeeSlice';

// import { addDocumentsAsync } from "../../redux/Slice/EmployeeSlice";
// interface Document {
//   id: string;
//   name: string;
//   url: string;
// }

const ViewDoc: React.FC = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const [EmployeeName, setEmployeeName] = useState(location.state?.name);
  // const [EmployeeId, setEmployeeId] = useState(location.state?.empId);
  const documentList = useSelector((state: any) => state.employee.singleEmployee?.docs);
  const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", singleEmployee)

  console.log("singleEmployee", documentList)
  const data = {
    // employeeId:EmployeeId
  }
  useEffect(() => {
    dispatch(getEmployeeImageAsync(data));
    dispatch(getSingleEmployeeAsync())
  }, [])
  //   const handleFormSubmit = (data: any) => {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     formData.append('fileName', data.resourceDocsName);
  //     formData.append('groupName', data.groupName);
  //     formData.append('JobProfileName', data.JobProfileName);
  //     for (const entry of formData.entries()) {
  //         console.log(entry[0] + ": " + entry[1]);
  //     }
  //     dispatch(addDocumentsAsync(formData))
  // }

  // const [selectedFile, setSelectedFile] = useState<any>(null);


  return (
    <div className="flex items-stretch pt-[32px] px-0 py-[40px] w-[770px] gap-[40px] flex-col">
      <div className="flex px-[40px] w-[100%] py-[0] gap-[40px] flex-col items-start">
        <div className="flex justify-between w-[100%] gap-[50px] items-start">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
              Viewing Documents
            </p>
            <div className='flex justify-between'>

              <p className="text-[#2E2E2E] text-xl font-inter font-semibold leading-8">
                {singleEmployee.name}
              </p>
              {/* <p className="text-[#2E2E2E] text-xl font-inter font-semibold leading-8">
                {singleEmployee.mCode}
              </p> */}
            </div>
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
      {/* DOCUMENT CODE STARTS HERE */}
      <div className='mx-[40px] w-full'>
        <div className='mt-6 pb-6 overflow-auto'>
          <div className='grid grid-cols-3 gap-5'>
            {documentList && documentList.map((element: any, index: any) => {
              return <div key={index} className='w-[210px] rounded-[7px] border-[0.83px] border-solid border-[#9198F7]'>
                <img src={DocumentFrame} className='w-full' alt="" />
                <p className='flex justify-center bg-[#ECEDFE] items-center py-[13px] px-7 text-[13px] leading-4 font-medium text-[#2E2E2E] rounded-b-md'>{element.docsName ? element.docsName : "Documnet"}</p>
              </div>
            })}
          </div>
        </div>
      </div>
      {/* DOCUMENT CODE ENDS HERE */}
    </div> 
  );
};

export default ViewDoc;
