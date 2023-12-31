import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeImageAsync, getSingleEmployeeAsync } from '../../../../redux/Slice/EmployeeSlice';
import { useEffect } from "react";

export const ViewDocuments = ({ onClose }: any) => {

    const dispatch = useDispatch();

    const documentList = useSelector((state: any) => state.employee.singleEmployee?.docs);

    useEffect(() => {
        dispatch(getEmployeeImageAsync());
        dispatch(getSingleEmployeeAsync());
    }, []);

    const openImageInNewTab = (imageURL: string) => {
        window.open(imageURL, '_blank');
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-[20px] flex-wrap justify-center">
                {documentList && documentList.map((element: any, index: any) => {
                    return (
                        <div key={index} className='rounded-[7px] border-[0.83px] border-solid border-[#9198F7]'>
                            <p className='flex justify-center bg-[#ECEDFE] items-center py-[13px] px-7 text-[13px] leading-4 font-medium text-[#2E2E2E] rounded-b-md'>
                                {element.docsName ? element.docsName : "Document"}
                            </p>
                            <a
                                href={element.docs}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openImageInNewTab(element.docs); 
                                }}
                            >
                                <img src={element.docs} alt="" className='w-[250px] h-[250px]' />
                            </a>
                        </div>
                    );
                })}
            </div>

            <div className="flex mt-[30px] justify-between">
                <button onClick={onClose} className="flex gap-[5px] border-[#283093] border-1 border  rounded-[8px] px-[16px] py-[5px] justify-center items-center text-[#283093]">Close</button>
            </div>
        </div>
    )
}
