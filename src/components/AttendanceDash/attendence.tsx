import React, { useState, useEffect } from "react";
import right from "../../assets/r-arrow.png";
import up from "../../assets/arrow-up.png";
import axios from 'axios';
import { Link } from "react-router-dom";
import { getPresentNumberApiPath } from "../../APIRoutes";

export const Attendence: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${getPresentNumberApiPath}`,
          { withCredentials: true }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="flex flex-col flex-start px-10 pt-[32px] ">
      <div className=" flex justify-between w-[688px] item-center">
        <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Attendance Overview
        </div>
        <Link to="/leaves" className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
          <p className="text-[#666666] text-[16px] font-medium leading-6">
            See All
          </p>
          <img src={right} alt="" className="h-[16px] w-[16px]" />
        </Link>

      </div>
      <div className="flex flex-start pt-4 gap-6">
        <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-semibold">
              {data && data.Number_Present_Employee}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] ms-1" />
          </div>
          <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
            Present
          </p>
        </div>
        <div className="flex flex-col w-[196px] h-[100px] justify-center items-center gap-1 py-5 px-16 rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-semibold">
              {data && data.AbsentEmployess}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] rotate-180 ms-1" />
          </div>
          <p className="text-lg font-medium leading-6 text-[#2E2E2E]">
            Absent
          </p>
        </div>
      </div>
    </div>
  );
};
