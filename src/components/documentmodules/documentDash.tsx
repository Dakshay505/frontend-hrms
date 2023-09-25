import { useEffect, useState } from 'react';
import searchImg from "../../assets/MagnifyingGlass.png";
import upload from "../../assets/UploadSimple.png";
import request from "../../assets/DownloadSimple.png";
import { Link, useNavigate } from "react-router-dom";
import approve from "../../assets/Check.png"
import resume from "../../assets/ArrowSquareOut.png"
import deny from "../../assets/X.png"
import { getAllEmployeeAsync } from "../../redux/Slice/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import del from "../../assets/XSquare.png"
export const DocumentDash = () => {
  const employeeDetailList = useSelector((state: any) => state.employee.employees);
  console.log("employee: ", employeeDetailList)

  const handleApprove = () => {
    console.log('Approved button clicked');
    // Perform any additional logic or actions here
  };
  const [showConfirmation, setShowConfirmation] = useState(false);

  const dispatch = useDispatch();
  // SEARCH
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
  useEffect(() => {
    dispatch(getAllEmployeeAsync()).then((res: any) => {
      console.log("res.payload.employees", res.payload.employees)
      const employeeData = res.payload.employees;
      const arr = [];
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].profilePicture) {
          arr.push({ employeeId: employeeData[i]._id, name: employeeData[i].name, profilePicture: employeeData[i].profilePicture, jobProfileName: employeeData[i].jobProfileId.jobProfileName })
        } else {
          arr.push({ employeeId: employeeData[i]._id, name: employeeData[i].name, profilePicture: "https://cdn-icons-png.flaticon.com/512/219/219983.png", jobProfileName: employeeData[i].jobProfileId.jobProfileName })
        }
      }
      setFetchedSuggestions(arr)
    })
  }, [])
  console.log("fetchedSuggestions", fetchedSuggestions)

  const handleInputChange = (event: any) => {
    if (event.target.value !== "") {
      setSearch(event.target.value);
      getSuggestions(event.target.value);
    }
    else {
      setSearch(event.target.value);
      setSuggestions([]);
    }
  };

  const getSuggestions = (inputValue: any) => {

    const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
      (suggestion.name)?.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log("filteredSuggestions", filteredSuggestions)
    setSuggestions(filteredSuggestions);
  };



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
  const [selectedEmployee, setSelectEmployee] = useState("")
  const handleToView = (element: any) => {
    setSearch(element.name)
    setSelectEmployee(element.employeeId)
    setSuggestions([]);
    console.log("view page ", element)
  }
  const navigate = useNavigate()

  const navigates = () => {
    navigate("/viewdocuments", { state: { empId: selectedEmployee, name: search } })
    console.log("navigate", search)
  }


  return (
    <div className="flex max-w-[768px] px-4 pt-8 flex-col items-start self-stretch">
      <div className="flex px-10  w-[100%] justify-between gap-[50px] items-start self-stretch">


        <div className="flex py-[24px] px-[48px] h-[176px] w-auto flex-col justify-center gap-[16px] rounded-xl border border-solid border-primary-bg">

          <div className="text-primary-blue text-lg font-inter font-medium">
            View Documents
          </div>
          <div className="">
            <form
              className="flex items-center"
            >
              <div className="relative flex  items-center bg-[#ECEDFE] border p-[12px] w-[250px] rounded-[8px]">
                <div onClick={() => navigates()} className="absolute flex items-center right-1 top-1 bottom-0 w-[34px] h-[34px] rounded-[8px] bg-primary-blue justify-center border">
                  <label htmlFor="searchInput" className="">
                    <img src={searchImg} alt="" className="h-4 w-4" />
                  </label>
                </div>
                <input placeholder="Name  of Employee" type="search" id="searchInput" onChange={handleInputChange} value={search}
                  className="no-search-decoration appearance-none mx-2 w-[200px] text-sm font-medium placeholder-primary-blue bg-[#ECEDFE]  focus:outline-none" />
                {suggestions.length > 0 && (
                  <div className="absolute top-12 flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
                    {suggestions.map((element: any) => {
                      return <div onClick={() => handleToView(element)} className="flex gap-3 p-3 hover:bg-[#F5F5F5] cursor-pointer">
                        <div>
                          <img src={element.profilePicture} className="w-[50px] h-[50px] rounded-full" alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-medium #1C1C1C">{element.name}</p>
                          <p className="text-[12px] leading-5 font-normal text-[#757575]">{element.jobProfileName}</p>
                        </div>
                      </div>
                    })}
                  </div>
                )}
              </div>
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
            <div className="flex items-center gap-[16px] w-[238px]">
              <button className="bg-primary-blue rounded-[8px]  items-center flex gap-1 px-[16px] py-[12px] text-white justify-center" onClick={handleApprove}>
                <img src={approve} alt="" className="h-[16px] w-[16px]" />
                <p>Approved</p>
              </button>

              <div>
                <button className="text-primary-blue border border-primary-blue rounded-[8px] items-center flex gap-1 px-[16px] py-[10px] " onClick={handleDeny}>
                  <img src={deny} alt="" className="h-[16px] w-[16px]" />
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