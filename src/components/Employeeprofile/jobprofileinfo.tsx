import { useState, useEffect } from "react";
import edit from "../../assets/PencilSimple.png";
import check from "../../assets/Check.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  deleteJobProfileAsync,
  getSingleJobProfileAsync,
  updateJobProfileAsync,
} from "../../redux/Slice/JobProfileSlice";
import deleteIcon from "../../assets/Trash.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const JobProfileInfo = () => {
  const dispatch = useDispatch();
  const JobProfile = useSelector(
    (state: any) => state.jobProfile.jobProfileData
  );
  const navigate = useNavigate();
  const [jobProfileId, setJobProfileId] = useState("");
  const [showInputBoxJobProfileName, setShowInputBoxJobProfileName] =
    useState(false);
    const [showInputBoxSupervisor, setShowInputBoxSupervisor] =
    useState(false);
  const [inputBoxJobProfileNameValue, setInputBoxJobProfileNameValue] =
    useState<any>("");
  const [
    showInputBoxJobProfileDescription,
    setShowInputBoxJobProfileDescription,
  ] = useState(false);
  const [
    inputBoxJobProfileDescriptionValue,
    setInputBoxJobProfileDescriptionValue,
  ] = useState<any>("");
  const [
    inputBoxSupervisor,
    setInputBoxSupervisor,
  ] = useState<any>("");


  useEffect(() => {
    setJobProfileId(JobProfile._id);
    setInputBoxJobProfileNameValue(JobProfile.jobProfileName);
    setInputBoxJobProfileDescriptionValue(JobProfile.jobDescription);
    setInputBoxSupervisor(JobProfile.isSupervisor)
  }, [JobProfile]);

  const { register, handleSubmit } = useForm();
  // delete
  const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }: any) => {
    return isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmationOpen(true);
  };
  const handleCancel = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    dispatch(deleteJobProfileAsync(JobProfile._id))
      .then((res: any) => {
        if (res.payload.success) {
          toast.success(res.payload.message);
        } else {
          toast.error(res.payload.message);
        }
        navigate("/view-modify-database");
      })
      .catch((error: any) => {
        toast.error(error);
      });
    setConfirmationOpen(false);
  };

  return (
    <div className="px-10 py-8">
      <form
        onSubmit={handleSubmit((data) => {
          const sendData = { jobProfileId: jobProfileId, data: data };
          console.log(data)
          dispatch(updateJobProfileAsync(sendData)).then(() => {
            dispatch(getSingleJobProfileAsync({ jobProfileId: jobProfileId }));
          });
          setShowInputBoxSupervisor(false);
          setShowInputBoxJobProfileName(false);
          setShowInputBoxJobProfileDescription(false);
         
        })}
      >
        <div>
          <h1 className="text-2xl font-bold text-[#2E2E2E]">
            Job Profile Information
          </h1>
        </div>
        <div className="flex flex-col gap-3 mt-10">
          {!showInputBoxJobProfileName && (
            <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Job Profile Name
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxJobProfileName(!showInputBoxJobProfileName);
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {JobProfile.jobProfileName}
                </p>
              </div>
            </div>
          )}
          {showInputBoxJobProfileName && (
            <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Job Profile Name
                  </p>
                </div>
                <div>
                  <input
                    {...register("jobProfileName", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxJobProfileNameValue}
                    onChange={(event) =>
                      setInputBoxJobProfileNameValue(event.target.value)
                    }
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxJobProfileDescription && (
            <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                  Job Profile Description
                </p>
                <img
                  src={edit}
                  onClick={() => {
                    setShowInputBoxJobProfileDescription(
                      !showInputBoxJobProfileDescription
                    );
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {JobProfile.jobDescription}
                </p>
              </div>
            </div>
          )}
          {showInputBoxJobProfileDescription && (
            <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                    Job Profile Description
                  </p>
                </div>
                <div>
                  <input
                    {...register("jobDescription", { required: true })}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    value={inputBoxJobProfileDescriptionValue}
                    onChange={(event) =>
                      setInputBoxJobProfileDescriptionValue(event.target.value)
                    }
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          {!showInputBoxSupervisor && (
            <div className="flex flex-col p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#2E2E2E] tracking-[0.25px]">
                 Supervisor Status
                </p>
                <img
                  src={edit}
                  onClick={() => {
                   setShowInputBoxSupervisor(
                      !showInputBoxSupervisor
                    );
                  }}
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[12px] leading-5 font-normal text-[#1C1C1C] tracking-[0.25px]">
                  {JobProfile.isSupervisor?"True":"False"}
                </p>
              </div>
            </div>
          )}
          {showInputBoxSupervisor&& (
            <div className="flex justify-between p-4 w-[472px] border border-solid border-[#DEDEDE] bg-[#FFFFFF] rounded">
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <p className="text-sm font-semibold text-[#283093] tracking-[0.25px]">
                   SuperVisor Status
                  </p>
                </div>
                <div>
                  <input
                    {...register("isSupervisor", {})}
                    className="text-[12px] leading-5 font-normal focus:outline-none"
                    defaultChecked={inputBoxSupervisor}
                    
                    type="checkbox"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center bg-[#283093] rounded w-[35px] h-[35px]"
                  type="submit"
                >
                  <img src={check} className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-row m-3">
            <button
              className="flex  border py-2 px-5 mx-[-12px] my-5 border-red-500 items-center text-[red] text-sm font-medium "
              onClick={handleDeleteClick}
            >
              <img src={deleteIcon} alt="delete" className="mr-1" />
              Delete
            </button>
            <DeleteConfirmationDialog
              isOpen={isConfirmationOpen}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
