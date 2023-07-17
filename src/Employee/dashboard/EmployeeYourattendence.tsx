import { useState, useEffect } from "react";
import glass from "../../assets/MagnifyingGlass.png";
import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
import Filter from '../../assets/filter.png'
import { getMyAttandenceAsync, postAttandenceByDateAsync } from "../../redux/Slice/AttandenceSlice";



export const Employeeattendence = () => {
    const dispatch = useDispatch();
    const todayStaffAttandence = useSelector((state: any) => state.attandence.staffAttandence);
    const myAttandence = useSelector((state: any) => state.attandence.myAttandence);

    const [isLabelVisible, setLabelVisible] = useState(true);
    const [attandenceValue, setAttandenceValue] = useState("Your Attandence");
    const [search, setSearch] = useState('');

    const handleInputChange = (event: any) => {
        if (event.target.value !== "") {
            setLabelVisible(false);
        }
        else {
            setLabelVisible(true);
        }
        setSearch(event.target.value);
        console.log(search)
    };
    useEffect(() => {
        dispatch(postAttandenceByDateAsync())
        dispatch(getMyAttandenceAsync());
    }, [])

    const handleTableRowClick = (data: any) => {
        console.log(data._id)
    }


    return (
        <div>
            <div className="pt-8 px-[40px]">
                <div className="flex w-[688px] items-start gap-[291px]">
                    <p className="text-2xl text-[#2E2E2E] font-bold leading-8">
                        Attendance Database
                    </p>
                </div>
                <div className=" flex pt-6 justify-between items-end self-stretch ">
                    <div className="flex gap-4 items-center">
                        <div>
                            <select
                                className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg text-sm text-[#2E2E2E] font-medium w-[176px] h-10 px-5'
                                onChange={(event) => setAttandenceValue(event.target.value)}>
                                <option>Your Attandence</option>
                                <option>Staff Attandence</option>
                            </select>
                        </div>
                        <div className="flex items-center border border-solid [#DEDEDE] bg-[#FAFAFA] py-3 px-5 rounded-[53px] w-[100px] h-10">
                            <div className="flex gap-2 items-center">
                                <img src={Filter} className="h-4 w-4" alt="" />
                                <p className="text-sm font-medium text-[#2E2E2E]">Filter</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container flex justify-center items-center">
                            <div className="relative">
                                {isLabelVisible && <div className="absolute top-[10px] left-6">
                                    <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text">
                                        <img src={glass} alt="" className="h-4 w-4" />
                                        <p className="text-sm text-[#B0B0B0] font-medium">Search</p>
                                    </label>
                                </div>}
                                <input
                                    type="search"
                                    id="searchInput"
                                    onChange={handleInputChange}
                                    className="h-10 w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:shadow focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[100%]'>
                    <div className='mt-10 overflow-auto'>
                        {attandenceValue === "Your Attandence" ? <div className='py-6'>
                            {/* TABLE STARTS HERE */}
                            <table>
                                <tbody>
                                    <tr className='bg-[#ECEDFE] cursor-default'>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Approved By </td>
                                    </tr>
                                    {myAttandence && myAttandence.map((element: any, index: number) => {
                                        const latestAttandence = element.attendance[0];
                                        const latestPunches = latestAttandence.punches[0]

                                        return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.date ? (latestAttandence.date).slice(0, 10) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(11, 16) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? (latestPunches.punchOut).slice(11, 16) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.approvedBy ? latestAttandence.approvedBy : "Not Avilable"}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            {/* TABLE ENDS HERE */}
                        </div> : ""}

                        {attandenceValue === "Staff Attandence" ? <div className='py-6'>
                            {/* TABLE STARTS HERE */}
                            <table>
                                <tbody>
                                    <tr className='bg-[#ECEDFE] cursor-default'>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch In</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Punch Out</td>
                                        <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Approved By </td>
                                    </tr>
                                    
                                    {todayStaffAttandence && todayStaffAttandence.map((element: any, index: number) => {
                                        const latestAttandence = element.attendance[0];
                                        const latestPunches = latestAttandence.punches[0]

                                        return <tr key={index} className='hover:bg-[#FAFAFA]' onClick={() => handleTableRowClick(element)}>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.date ? (latestAttandence.date).slice(0, 10) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{element.employee?.name ? element.employee?.name : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchIn ? (latestPunches.punchIn).slice(11, 16) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestPunches.punchOut ? (latestPunches.punchOut).slice(11, 16) : "Not Avilable"}</td>
                                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{latestAttandence.approvedBy ? latestAttandence.approvedBy : "Not Avilable"}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            {/* TABLE ENDS HERE */}
                        </div> : ""}
                    </div>
                </div>
            </div>

        </div>

    )
}
