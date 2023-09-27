import { useEffect, useState } from 'react';
import upload from "../../../../assets/UploadSimple.png";
import eyes from "../../../../assets/eyes.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeImageAsync, getSingleEmployeeAsync } from '../../../../redux/Slice/EmployeeSlice';
import UploadPopup from './uploadDocuments';
import { ViewDocuments } from './ViewDocuments';


 
export const EmployeeDocuments = () => {

    const dispatch = useDispatch();
    const documentList = useSelector((state: any) => state.employee.singleEmployee?.docs);
    // const singleEmployee = useSelector((state: any) => state.employee.singleEmployee);

    console.log("singleEmployee", documentList)

    useEffect(() => {
        dispatch(getEmployeeImageAsync());
        dispatch(getSingleEmployeeAsync())
    }, [])


    const [isUploadPopupOpen, setUploadPopupOpen] = useState(false);
    const [isViewPopupOpen, setViewPopupOpen] = useState(false);

    const openUploadPopup = () => {
        setUploadPopupOpen(true);
        setViewPopupOpen(false);

    };

    const closeUploadPopup = () => {
        setUploadPopupOpen(false);
    }
    const openViewPopup = () => {
        setViewPopupOpen(true);
        setUploadPopupOpen(false);

    };

    const closeViewPopup = () => {
        setViewPopupOpen(false);
    }
        return (
            <div className="gap-[24px] flex flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="text-[18px] font-bold text-[#2E2E2E]">Documents</h1>
                </div>

                <div className="flex justify-center items-center gap-[20px]">
                    <label onClick={openUploadPopup} className="text-primary-blue border-2 border-primary-blue rounded-md items-center gap-[5px] cursor-pointer flex px-[16px] py-[8px] bg-white font-semibold">
                        <img src={upload} alt="" className="h-[25px] w-[25px]" />
                        <span className="text-lg font-medium">Upload</span>
                    </label>
                    <label onClick={openViewPopup}  className="text-primary-blue border-2 border-primary-blue rounded-md items-center gap-[5px] cursor-pointer flex px-[16px] py-[8px] bg-white font-semibold">
                        <img src={eyes} alt="" className="h-[25px] w-[25px]" />
                        <span className="text-lg font-medium">View</span>
                    </label>
                </div>

                {isUploadPopupOpen && <UploadPopup onClose={closeUploadPopup} />}

                {isViewPopupOpen && <ViewDocuments onClose={closeViewPopup} />}


            </div>
        )
    }
