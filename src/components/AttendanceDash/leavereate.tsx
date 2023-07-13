import { useState } from "react";
import left from "../../assets/caret-left.png";
import right from "../../assets/caret-right.png";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import rarrow from "../../assets/r-arrow.png";
import larrow from "../../assets/gray-left.png";

import down from "../../assets/down.png";

import { Attendence } from "./attendence";
import "../../leaves.css";
import filter from "../../assets/filter.png";
import LineChart from "./chart";

export const Leavereate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen1, setIsSubOpen1] = useState(false);
  const [isSubOpen2, setIsSubOpen2] = useState(false);
  const [isSubOpen3, setIsSubOpen3] = useState(false);

  const [isOpen2, setIsOpen2] = useState(false);

  const [isOpen5, setIsOpen5] = useState(false);

  const toggleDropdown = () => {
    setIsOpen5(!isOpen5);
  };
  return (
    <div>
      <Attendence></Attendence>
      <div className="flex flex-col items-start px-10 py-[40px] gap-[24px] flex-1 self-stretch">
        <div className="flex pt-[48px] justify-center items-end gap-[24px]">
        <div>
            <button className="flex justify-center items-center" onClick={toggleDropdown}>
              <img src={left} alt="" className="w-[24px] h-[24px]" />
              <span className="flex px-[8px] py-[4px] justify-center items-center gap-[8px] text-primary-blue text-lg font-inter font-medium leading-7 hover:bg-primary-bg rounded-lg">
                {" "}
                Leave Rate{" "}
              </span>
              <img src={right} alt="" className="w-[24px] h-[24px]" />
            </button>
            {isOpen5 && (
              <div className="z-50 bg-white flex flex-col px-[48px] gap-[20px] text-center py-5 absolute shadow-xl">
                <div className="font-inter text-base font-normal leading-6 tracking-tight cursor-pointer">
                  Late arrival
                </div>
                <div className="font-inter text-base font-normal leading-6 tracking-tight cursor-pointer">
                  Early Departure
                </div>
                <div className="font-inter text-base font-normal leading-6 tracking-tight cursor-pointer">
                  Work Hour
                </div>
                <div className="font-inter text-base font-normal leading-6 tracking-tight cursor-pointer">
                  Over Time
                </div>
              </div>

            )}
          </div>




          <div className="flex px-[20px] py-[12px] bg-[#fafafa]  justify-center border border-solid border-primary-border rounded-xl items-center gap-[8px]">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full "
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  All Departments
                  <img
                    src={down}
                    alt=""
                    className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? "transform rotate-180" : ""
                      }`}
                  />
                </button>
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-[1rem] w-[10rem] rounded-md shadow-lg bg-white  ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 gap-[10px] text-sm text-center text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <img
                          src={rarrow}
                          alt=""
                          className={`-mr-1 ml-2 h-5 w-5`}
                        />
                        Plant 1
                      </a>
                      <div className="relative group">
                        <button
                          onClick={() => setIsSubOpen1(!isSubOpen1)}
                          className="block w-full  text-center gap-[20px] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          <img
                            src={rarrow}
                            alt=""
                            className={`-mr-1 ml-2 h-5 w-5 ${isSubOpen1 ? "transform rotate-90" : ""
                              }`}
                          />
                          Plant 2
                        </button>
                        {isSubOpen1 && (
                          <button
                            onClick={() => setIsSubOpen2(!isSubOpen2)}
                            className="block w-full  text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {/* <img src={right} alt=""  className={`-mr-1 ml-2 h-5 w-5 ${
                              isSubOpen2 ? "transform rotate-90" : ""
                            }`} /> */}
                            Production
                            <div className="origin-top-right absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-black ring-opacity-5">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {isSubOpen2 && (
                                  <div className="origin-top-right absolute right-0 mt-2 w-56 bg-white z-50 rounded-md shadow-lg   ring-black ring-opacity-5">
                                    <div
                                      className="py-1"
                                      role="menu"
                                      aria-orientation="vertical"
                                      aria-labelledby="options-menu"
                                    >
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                      >
                                        Pro Team 1
                                      </a>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                      >
                                        Pro Team 2
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        )}
                        {isSubOpen1 && (
                          <button
                            onClick={() => setIsSubOpen3(!isSubOpen3)}
                            className="block w-full  text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {/* <img src={right} alt=""  className={`-mr-1 ml-2 h-5 w-5 ${
                              isSubOpen3 ? "transform rotate-90" : ""
                            }`} /> */}
                            febrication
                            <div className="origin-top-right absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-black ring-opacity-5">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {isSubOpen3 && (
                                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg   ring-black ring-opacity-5">
                                    <div
                                      className="py-1"
                                      role="menu"
                                      aria-orientation="vertical"
                                      aria-labelledby="options-menu"
                                    >
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                      >
                                        Fab Team 1
                                      </a>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                      >
                                        Fab Team 2
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>


          </div>

          <div className="flex flex-col    justify-center items-center gap-[8px]">

            <button
              className="text-neutral-n-600 px-[20px] py-[12px] flex bg-[#fafafa] items-center gap-[10px] leading-trim text-capitalize text-sm font-inter font-medium tracking-tighter  border border-solid border-primary-border rounded-full"
              onClick={() => setIsOpen2(!isOpen2)}
            >
            <img src={filter} alt="" className="h-[16px] w-[16px]" />
              Filter
            </button>

            {isOpen2 && (
              <div className=" w-[240px] absolute mt-[17rem] z-50 bg-white p-4 rounded shadow">
                <div className="mb-2 justify-between flex gap-[10px] ">
                  <label className="block text-gray-700">Name</label>
                  <input
                    className="mt-1 block w-[94px] h-[23px] rounded-md border border-solid border-primary-border shadow-sm"
                    type="text"
                  />
                </div>
                <div className="mb-2 justify-between flex  gap-[10px] ">
                  <label className="block text-gray-700">Date</label>
                  <input
                    className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                    type="date"
                  />
                </div>
                <div className="mb-2 justify-between flex gap-[10px] ">
                  <label className="block text-gray-700">Punch in:</label>
                  <input
                    className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                    type="time"
                  />
                </div>
                <div className="mb-2 flex justify-between  gap-[10px] ">
                  <label className="block text-gray-700">Punch out:</label>
                  <input
                    className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                    type="time"
                  />
                </div>
                <div className="mb-2 flex justify-between gap-[10px] ">
                  <label className="block text-gray-700">Job profile:</label>
                  <input
                    className="mt-1 block w-[94px] rounded-md border border-solid border-primary-border shadow-sm"
                    type="text"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-[688px] p-[24px] flex-col justify-center items-center gap-[36px] rounded-[8px] border border-solid border-primary-border bg-white">
          <div className="flex justify-between items-center self-stretch">
            <div className="flex items-center px-[16px] py-[8px] gap-[24px] border border-solid border-primary-border bg-[#fafafa]  rounded-xl">
              <span className="leading-trim text-capitalize text-sm font-inter font-medium tracking-tighter">
                {" "}
                Key Employement{" "}
              </span>
              <div className="flex items-start gap-[8px]">
                <img src={img1} alt="" className="h-[30px] w-[30px]" />
                <img src={img2} alt="" className="h-[30px] w-[30px]" />
                <img src={img3} alt="" className="h-[30px] w-[30px]" />
                <img src={img4} alt="" className="h-[30px] w-[30px]" />
                <img src={img5} alt="" className="h-[30px] w-[30px]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <div className="flex gap-[8px] items-center justify-center">
                <img src={larrow} alt="" className="h-[12px] w-[12px]" />
                <span className="text-base fonpxt-inter font-medium leading-5 tracking-tighter">
                  26 Jun - 2 Jul
                </span>
                <img src={rarrow} alt="" className="h-[12px] w-[12px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};
