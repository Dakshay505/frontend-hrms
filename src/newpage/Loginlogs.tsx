import { fetchLoggedInHistory } from "../redux/Slice/LoginHistorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { fetchLoggedInHistoryAPI } from "../redux/API/LoginHistroyApi";


export const Loginlogs = () => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const loggedInHistory = useSelector((state: any) => state.loginHistroy.data?.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedInHistory({ limit, page }));
      }, [limit, page, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchLoggedInHistoryAPI(limit,page);
            setTotal(data.totalLogs);
            const newPageCount = Math.ceil(data.totalLogs / limit);
            setPageCount(newPageCount);
            if (page > newPageCount) {
                setPage(newPageCount);
            }
            dispatch(fetchLoggedInHistory(data.data));
        };
        fetchData();
    }, [limit, page, dispatch]);



    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setPage(newPage); 
            dispatch(fetchLoggedInHistory({ page: newPage, limit }));
        } else {
            alert("Invalid page number");
        }
    }

    return (
        <div className='px-[20px] pb-[50px]'>
            <div className=" mb-24 flex flex-col gap-[20px] overflow-auto">
                <table className="w-full">
                    <tbody>
                        <tr className="bg-[#ECEDFE] cursor-default">
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Sr No</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Employee Code</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Employee Name</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Job Profile</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Role</span>

                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Device</span>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <span> Time</span>
                            </td>

                        </tr>

                        {loggedInHistory &&
                            loggedInHistory
                                .slice((page - 1) * limit, page * limit)
                                .map((element: any, index: any) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.userInfo?.employeeCode ? element?.userInfo?.employeeCode : "-"}


                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.userInfo?.name ? element?.userInfo?.name : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.userInfo?.jobProfile ? element?.userInfo?.jobProfile : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.userInfo?.role ? element?.userInfo?.role : "-"}
                                        </td>


                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            {element?.device?.userAgent ? element?.device?.userAgent.slice(13, 42) : "-"}
                                        </td>
                                        <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div>
                                                    {element?.logInTime ? element?.logInTime.slice(11, 16) : "-"}
                                                </div>
                                                <div>
                                                    {element?.logInTime ? element?.logInTime.slice(0, 10) : "-"}
                                                </div>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                    </tbody >
                </table>

                {/* pagination */}

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
                                    dispatch(fetchLoggedInHistory({ page: 1, limit: total })); 
                                } else {
                                    setLimit(selectedLimit);
                                    setPage(1); 
                                    dispatch(fetchLoggedInHistory({ page: 1, limit: selectedLimit })); 
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
    )
}
