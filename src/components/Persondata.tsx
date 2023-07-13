import { useState } from "react";
import down from "../assets/down.png";
export const Persondata = () => {
  const data = [
    {
      date: "28/06/23",
      name: "Madhav M",
      punchIn: "8:30 am",
      punchOut: "6:00 pm",
      approvedBy: "Not Approved",
    },
  ];

  
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col py-[24px] w-[100%]  items-start self-stretch">
      <div className="flex justify-between w-[100%] flex-row items-start bg-[#ECEDFE] gap-[32px]">
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Date{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] justify-center w-[150px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Name{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Punch-in{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Punch-out{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Approved By{" "}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex bttn py-[20px] px-[20px] items-start  gap-[5px] "
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        Today
        <img
          src={down}
          alt=""
          className={`-mr-1 ml-2 h-5 w-5 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}
      {isOpen && (<div>
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.date}
            </span>
          </div>
          <div className="flex px-[16px] w-[150px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchIn}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.punchOut}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.approvedBy}
            </span>
          </div>
        </div>
      ))} 
      </div>)}

      
    
    </div>
  );
};
