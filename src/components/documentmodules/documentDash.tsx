import { useForm } from "react-hook-form";
import  {  useState } from 'react';
import search from "../../assets/MagnifyingGlass.png";
import upload from "../../assets/UploadSimple.png";
import request from "../../assets/DownloadSimple.png";
import { Link } from "react-router-dom";
import approve from "../../assets/Check.png"
import resume from "../../assets/ArrowSquareOut.png"
import deny from "../../assets/X.png"
import del from "../../assets/XSquare.png"



export const DocumentDash = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Perform search action
    console.log(data);
  };

  const handleApprove = () => {
    console.log('Approved button clicked');
    // Perform any additional logic or actions here
  };



  const [showConfirmation, setShowConfirmation] = useState(false);

  // const handleDeleteClick = () => {
  //   console.log("clicked")
  // };
  const handleDeny = () => {
    setShowConfirmation(true);
    console.log('Deny button clicked');
    // Perform any additional logic or actions here
  };

  const handleConfirmDelete = () => {
    // Perform the deletion logic here
    // ...
    setShowConfirmation(false);
    console.log("deleted")
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    console.log("cancel")
  };




  return (
    <div className="flex max-w-[768px] px-4 pt-8 flex-col items-start self-stretch">
      <div className="flex px-10  w-[100%] justify-between gap-[50px] items-start self-stretch">

        <div className="flex py-[24px] px-[48px] h-[176px] w-auto flex-col justify-center gap-[16px] rounded-xl border border-solid border-primary-bg">

          <div className="text-primary-blue text-lg font-inter font-medium">
            View Documents
          </div>
          <div className="bg-primary-bg rounded-xl p-[5px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center"
            >
              <input
                type="text"
                placeholder="Name of Employee"
                className="py-2 px-4  placeholder-primary-blue text-md bg-primary-bg focus:outline-none "
                {...register("searchTerm")}
              />
              <button
                type="submit"
                className="w-[34px] h-[34px] bg-primary-blue flex justify-center items-center text-white rounded-xl focus:outline-none"
              >
                <img src={search} alt="" className="h-[16px] max-w-[16px]" />
              </button>
            </form>
          </div>
        </div>

    
        <div className="flex flex-col w-[300px] items-start gap-[16px]">
          <div className="flex p-[24px] rounded-xl bg-primary-bg justify-between items-start self-stretch w-[300px]">
            <Link to="/request" className="text-primary-blue text-[20px] font-inter font-medium leading-7">
              Request Documents{" "}
            </Link >
            <img src={request} alt="" className="w-[32px] h-[32px]" />
          </div>
          <div className="flex p-[24px] rounded-xl bg-primary-bg justify-between items-start self-stretch w-[300px]">
            <Link to="/upload" className="text-primary-blue text-[20px] font-inter font-medium leading-7">
              Upload Documents{" "}
            </Link>
            <img src={upload} alt="" className="w-[32px] h-[32px]" />
          </div>
        </div>
      </div>

      <div className="flex px-[48px] py-[40px] flex-col items-start gap-[32px]">
        <div className="flex items-start gap-[291px] text-xl font-inter font-bold leading-8">
          Approve Documents
        </div>

        <div className="flex px-[24px] border border-primary-border rounded-[8px] bg-[#FAFAFA] justify-between w-[688px] py-[24px] items-start gap-[32px]">
          <div className="flex flex-col items-start gap[8px]">
            <p className="text-sm font-inter  font-medium leading-5 tracking-tighter">Madhav Mishra</p>
            <p className="text-base font-inter font-normal  leading-6 tracking-wider">Production Head</p>
          </div>


          <div className="flex flex-col items-end  gap-[40px]">
            <Link to="/viewdocuments">
              <div className="flex justify-center items-center gap-[5px] hover:underline"> Resume <img src={resume} alt="" className="h-[12px] w-[12px]" /> </div>
            </Link>
            <div className="flex items-start gap-[8px] w-[238px]">
              <button className="bg-primary-blue rounded-[2px] w-[122px] items-center flex gap-[5px] px-[16px] py-[12px] text-white font-semibold h-[40px]" onClick={handleApprove}>
                <img src={approve} alt="" className="h-[25px] w-[25px]" />
                Approved</button>

              <div>
                <button className="text-primary-blue w-[100px] border border-primary-blue rounded-[2px] items-center flex gap-[5px] px-[16px] py-[12px]  font-semibold h-[40px]" onClick={handleDeny}>
                  <img src={deny} alt="" className="h-[25px] w-[25px]" />
                  Deny</button>

                {showConfirmation && (
                  <div className="confirmation-modal">
                    <div className="confirmation-modal-content  w-[770px]">
                      <div className="flex gap-[5px] items-center">
                        <img src={del} alt="" className="w-[24px] h-[24px]" />
                        <h2 className="text-left mb-0">Deny Documents?</h2>
                      </div>
                      <hr />
                      <div className="flex flex-col py-[10px] text-left gap-[5px]">
                        <label>Enter Reason</label>
                        <input type="text" className="border border-primary-border w-[100%] rounded-lg p-[10px]" />
                      </div>
                      <div className="button-container">

                        <button className="cancel-button w-[96px] h-[40px]" onClick={handleCancelDelete}>
                          Cancel
                        </button>
                        <button className="confirm-button w-[196px] h-[40px]" onClick={handleConfirmDelete}>
                          Deny Document
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}