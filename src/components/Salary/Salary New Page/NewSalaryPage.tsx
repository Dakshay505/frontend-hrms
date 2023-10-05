import { useEffect, useState } from "react";
import search from "../../../assets/MagnifyingGlass.png"
import { SalaryFilterComponents } from './components/SalaryFilterComponents';
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllSalaryAsync } from "../../../redux/Slice/NewSalarySlice";
import { getNewSalaryDataApi } from "../../../redux/API/NewSalaryApi";



export const NewSalaryPage = () => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageCount, setPageCount] = useState(1);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllSalaryAsync({ limit, page }));
    }, [limit, page, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getNewSalaryDataApi(limit, page);
            const totalItems = data?.data?.salaryRecord?.length
            console.log("ghere", totalItems)
            setTotal(totalItems);
            const newPageCount = Math.ceil(totalItems / limit);
            setPageCount(newPageCount)

            if (page > newPageCount) {
                setPage(newPageCount);
            } else {
                setPage(page);
            }

        };
        fetchData();
    }, [limit, page]);



    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setPage(newPage);
            dispatch(getAllSalaryAsync({ page: newPage, limit }));
        } else {
            setPage(1);
            dispatch(getAllSalaryAsync({ page: 1, limit }));
        }
    }



    useEffect(() => {
        dispatch(getAllSalaryAsync());
    }, []);

    const salaryData = useSelector((state: any) => state.newSalary?.data?.data?.salaryRecords);
    console.log("aaaaaaaaaaaaaaaa", salaryData)


    return (
        <div className='p-[40px]'>
            <div className='flex flex-col gap-[10px]'>


                <div className="flex flex-col py-[10px] gap-6  flex-start">
                    <div className="flex-col flex gap-[20px] justify-between ">
                        <div className="text-2xl font-bold text-[#2E2E2E]">
                            Salary Database
                        </div>
                        <div className='border flex gap-[15px] px-[15px] py-[13px] shadow-lg  border-solid border-[#DEDEDE] rounded-[8px]'>
                            <img src={search} alt="" className='w-[20px] h-[20px]' />
                            <input type="search" className='outline-none w-full ' placeholder="Search" />
                        </div>

                    </div>
                    <SalaryFilterComponents />
                </div>

                <hr />

                <div className="flex flex-start pt-[25px] gap-6">
                    <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                        <p className="text-[14px] font-medium  text-[#2E2E2E]">
                            Total Salary
                        </p>
                        <div className="flex text-[24px] font-bold justify-center items-center">
                            {salaryData.salary}
                        </div>
                    </div>



                    <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                        <p className="text-[14px] font-medium  text-[#2E2E2E]">
                            Total Punch in
                        </p>
                        <div className="flex text-[24px] font-bold justify-center items-center">
                            100
                        </div>
                    </div>



                    <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                        <p className="text-[14px] font-medium  text-[#2E2E2E]">
                            Total Punch Out
                        </p>
                        <div className="flex text-[24px] font-bold justify-center items-center">
                            95
                        </div>
                    </div>



                    <div className="flex flex-col w-[190px] shadow-lg h-[85px] justify-center items-center gap-1 py-[7px] px-[21px] rounded-xl bg-[#FAFAFA] border border-solid border-[#DEDEDE]">
                        <p className="text-[14px] font-medium  text-[#2E2E2E]">
                            Total Salary A
                        </p>
                        <div className="flex text-[24px] font-bold justify-center items-center">
                            5,45,000
                        </div>
                    </div>





                </div>


                <div className="py-6 mb-24">
                    <div className="table-container" style={{ overflowY: 'auto' }}>
                        <table className="w-full">

                            <tbody className="">
                                <tr className="bg-[#ECEDFE] cursor-default">
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Sr No.
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Employee Code
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Employee Name
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Group Name
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Job Profile
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Over Time
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Salary
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Duty hour required
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Lunch
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        total working hours
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Added By
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Actual working hour
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Total working hours
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Duty hours
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        over time hours
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Earning in a day/Salary A
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Salary B
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                        Salary c
                                    </td>

                                </tr>

                                {salaryData && salaryData.map((element: any, index: any) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.employeeCode ? element?.employee?.employeeCode : "-"}
                                        </td>

                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.name ? element?.employee?.name : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.groupId?.groupName ? element?.employee?.groupId?.groupName : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.jobProfileId?.jobProfileName ? element?.employee?.jobProfileId?.jobProfileName : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.overTime ? element?.employee?.overTime : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.salary ? element?.employee?.salary : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.workingHours ? element?.employee?.workingHours : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.lunchTime ? element?.employee?.lunchTime : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.employee?.workingHours ? element?.employee?.workingHours : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            Added By
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.actualWorkinghours ? element?.actualWorkinghours : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.totalWorkingHours ? element?.totalWorkingHours : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.totalWorkingHours ? element?.totalWorkingHours : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            Overtime rate
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.salary ? element?.salary : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.salaryB ? element?.salaryB : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            SalaryC
                                        </td>


                                    </tr>
                                ))}

                            </tbody >

                        </table>

                    </div>

                    <div className="flex bg-white border-t-2 border-gray-100 py-6 text-sm">
                        <div className="px-3">
                            <select
                                className="bg-theme-btn-gray px-2 py-0.5 border-2 text-zinc-500 border-gray-50 rounded-lg"
                                value={limit}
                                onChange={(event) => {
                                    const selectedLimit = Number(event.target.value);
                                    if (selectedLimit === total) {
                                        setLimit(total);
                                        setPage(1);
                                        // dispatch(getAllSalaryAsync({ page: 1, limit: total }));
                                    } else {
                                        setLimit(selectedLimit);
                                        setPage(1);
                                        // dispatch(getAllSalaryAsync({ page: 1, limit: selectedLimit }));
                                    }
                                }}
                            >
                                <option value="10">10</option>
                                <option value="1">1</option>
                                <option value="20">20</option>
                                <option value={total} selected={limit === total}>
                                    All
                                </option>
                            </select>

                            <label className="text-zinc-400 pl-2">Items per page</label>
                            <label className="text-zinc-700 pl-4">{(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} items</label>
                        </div>
                        <div className="ml-auto px-6 flex items-center">
                            <div
                                className="bg-theme-btn-gray px-2 py-0.5 border-2 text-zinc-500 border-gray-50 rounded-lg"
                            >
                                <p>{page}</p>
                            </div>
                            <label className="text-zinc-700 pl-2">of {pageCount} pages</label>
                            <label className="text-zinc-700 pl-4">
                                <div className="inline-block">
                                    <button onClick={() => handlePageChange(page - 1)}>
                                        <Icon
                                            className="inline-block"
                                            icon="ic:round-keyboard-arrow-left"
                                            width="20"
                                        />
                                    </button>
                                    <button onClick={() => handlePageChange(page + 1)}>
                                        <Icon
                                            className="inline-block"
                                            icon="material-symbols:keyboard-arrow-right"
                                            width="20"
                                        />
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
