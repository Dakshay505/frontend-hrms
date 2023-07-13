
export const GatePassdata = () => {
  const data = [
    {
        DateApproved: "28/06/23",
      name: "Madhav M",
      TimePeriod: "03/07/23 - 05/07/23",
      Supervisor: "Madhav M",
    },
  ];

  
  return (
    <div className="flex flex-col py-[24px] w-[100%]  items-start self-stretch">
      <div className="flex justify-between w-[100%] flex-row items-start bg-[#ECEDFE] gap-[32px]">
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Date Approved{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Name{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] w-[150px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Time Period{" "}
          </p>
        </div>
        <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch bg-[#ECEDFE]">
          <p className="text-neutral-n-600 leading-trim text-capitalize text-base font-inter font-medium leading-5 tracking-wide">
            Approving Supervisor{" "}
          </p>
        </div>
      </div>

     
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      {data.map((person, index) => (
        <div key={index} className="flex flex-row items-start  gap-[32px]">
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.DateApproved}
            </span>
          </div>
          <div className="flex pl-[56px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.name}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.TimePeriod}
            </span>
          </div>
          <div className="flex px-[16px] py-[24px] items-start gap-[8px] self-stretch">
            <span className="text-[#2E2E2E] underline leading-trim text-capitalize text-base font-inter font-normal leading-5 tracking-wide">
              {person.Supervisor}
            </span>
          </div>
        </div>
      ))} 
      
   

      
    
    </div>
  );
};
