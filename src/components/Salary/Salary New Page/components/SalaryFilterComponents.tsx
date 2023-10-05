import { useEffect, useRef, useState } from 'react'

import SelectAll from "../../../../assets/Select All.svg"
import ClearAll from "../../../../assets/Clear-all.svg"
import { useDispatch, useSelector } from 'react-redux';
import { getAllSalaryAsync } from '../../../../redux/Slice/NewSalarySlice';



const options2 = [
    {label: 'Day' },
    {label: 'Night' },
];

export const SalaryFilterComponents = () => {


    const [isOpen1, setIsOpen1] = useState(false);
    const dropdownRef1 = useRef<HTMLDivElement | null>(null);

    const [isOpen2, setIsOpen2] = useState(false);
    const dropdownRef2 = useRef<HTMLDivElement | null>(null);

    const [isOpen3, setIsOpen3] = useState(false);
    const dropdownRef3 = useRef<HTMLDivElement | null>(null);

    const [isOpen4, setIsOpen4] = useState(false);
    const dropdownRef4 = useRef<HTMLDivElement | null>(null);

    const [isOpen5, setIsOpen5] = useState(false);
    const dropdownRef5 = useRef<HTMLDivElement | null>(null);

    const [isOpen6, setIsOpen6] = useState(false);
    const dropdownRef6 = useRef<HTMLDivElement | null>(null);

    const [isOpen7, setIsOpen7] = useState(false);
    const dropdownRef7 = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
                dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
                dropdownRef3.current && !dropdownRef3.current.contains(event.target) &&
                dropdownRef4.current && !dropdownRef4.current.contains(event.target) &&
                dropdownRef5.current && !dropdownRef5.current.contains(event.target) &&
                dropdownRef6.current && !dropdownRef6.current.contains(event.target) &&
                dropdownRef7.current && !dropdownRef7.current.contains(event.target)
            ) {
                setIsOpen1(false);
                setIsOpen2(false);
                setIsOpen3(false);
                setIsOpen4(false);
                setIsOpen5(false);
                setIsOpen6(false);
                setIsOpen7(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen6(false)
        setIsOpen7(false)
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen6(false)
        setIsOpen7(false)
    };

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen6(false)
        setIsOpen7(false)
    };

    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen5(false)
        setIsOpen6(false)
        setIsOpen7(false)
    };

    const toggleDropdown5 = () => {
        setIsOpen5(!isOpen5);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen6(false)
        setIsOpen7(false)
    };

    const toggleDropdown6 = () => {
        setIsOpen6(!isOpen6);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen7(false)
    };

    const toggleDropdown7 = () => {
        setIsOpen7(!isOpen7);
        setIsOpen1(false)
        setIsOpen2(false)
        setIsOpen3(false)
        setIsOpen4(false)
        setIsOpen5(false)
        setIsOpen6(false)
    };



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSalaryAsync());
      }, []);
    
      const salaryData = useSelector((state:any) => state.newSalary?.data?.data?.salaryRecords);
      console.log("aaaaaaaaaaaaaaaa",salaryData)

    return (
        <div className='flex py-[20px] gap-[10px]'>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef1}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] font-bold  bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm  text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown1}
                >
                    All Group
                </button>

                {isOpen1 && (
                    <div className="absolute left-0 mt-2 w-[200px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {salaryData && salaryData.map((element:any) => (
                                <label
                                    key={element.id}
                                    className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    {element?.employee?.groupId?.groupName}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef2}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown2}

                >
                    Departmnt
                </button>

                {isOpen2 && (
                    <div className=" absolute left-0 mt-2 w-[200px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {salaryData && salaryData.map((element:any) => (
                                <label
                                    key={element.id}
                                    className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    { element?.employee?.groupId?.groupName}

                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef3}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown3}

                >
                    Employee Code
                </button>

                {isOpen3 && (
                    <div className=" absolute left-0 mt-2 w-[200px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="flex flex-row px-4 py-2 gap-3">
                        <img src={SelectAll} className="h-5 w-5 b" />
                        <img src={ClearAll} className="h-5 w-5 " />
                    </div>
                    <div className="py-1">

                        {salaryData && salaryData.map((element:any) => (
                            <label
                                key={element.id}
                                className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"

                                />
                                { element?.employee?.employeeCode}

                            </label>
                        ))}
                    </div>
                </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef4}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown4}

                >
                    Job Profile
                </button>

              
                {isOpen4 && (
                    <div className=" absolute left-0 mt-2 w-[350px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {salaryData && salaryData.map((element:any) => (
                                <label
                                    key={element.id}
                                    className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    { element?.employee?.jobProfileId?.jobProfileName}

                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef5}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown5}

                >
                    Date
                </button>

                {isOpen5 && (
                    <div className=" absolute left-0 mt-2 w-[200px]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {salaryData && salaryData.map((element:any) => (
                                <label
                                    key={element.id}
                                    className="flex items-center gap-[10px]  px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    { element?.attendance?.date.slice(0,10)}

                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef6}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown6}

                >
                    MOnth
                </button>

                {isOpen6 && (
                    <div className=" absolute left-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {options2.map((option) => (
                                <label
                                    className="flex items-center gap-[10px] justify-between px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    {option.label}

                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="relative shadow-sm inline-block text-left" ref={dropdownRef7}>
                <button
                    type="button"
                    className="border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg px-[10px] py-[8px] w-[150px] h-[60px] text-sm font-bold text-[#2E2E2E]  focus:outline-none"
                    onClick={toggleDropdown7}

                >
                    Shift
                </button>

                {isOpen7 && (
                    <div className=" absolute left-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row px-4 py-2 gap-3">
                            <img src={SelectAll} className="h-5 w-5 b" />
                            <img src={ClearAll} className="h-5 w-5 " />
                        </div>
                        <div className="py-1">

                            {options2.map((option) => (
                                <label
                                    className="flex items-center gap-[10px] justify-between px-4 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"

                                    />
                                    {option.label}

                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>


        </div>)
}
