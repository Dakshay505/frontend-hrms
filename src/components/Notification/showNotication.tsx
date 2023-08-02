import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getAllEmployeeAsync } from "../../redux/Slice/EmployeeSlice";
import { fetchNotifications } from '../../redux/Slice/notificationSlice';
import cross from "../../assets/X.png"
export default function ShowNotification() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [fetchedSuggestions, setFetchedSuggestions] = useState<any>([]);
    const [employeeId, setEmployeeId] = useState("");
    const [notifications, setNotifications] = useState<any[]>([]);
    console.log(employeeId)
    useEffect(() => {
        dispatch(getAllEmployeeAsync()).then((res: any) => {
            const employeeData = res.payload.employees;
            const arr = employeeData.map((employee: any) => {
                const employeeId = employee._id;
                const name = employee.name;
                const profilePicture = employee.profilePicture || "https://cdn-icons-png.flaticon.com/512/219/219983.png";
                const jobProfileName = employee?.jobProfile?.jobProfileName || "N/A";
                return { employeeId, name, profilePicture, jobProfileName };
            });
            setFetchedSuggestions(arr);
        });
    }, []);

    const handleJobProfileNameClick = async (employeeId: string) => {
        try {
          const notificationsResponse = await dispatch(fetchNotifications(employeeId));
          setNotifications(notificationsResponse.payload || []);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      
    const handleInputChange = (event: any) => {
        if (event.target.value !== "") {
            setSearch(event.target.value);
            getSuggestions(event.target.value);
        } else {
            setSearch(event.target.value);
            setSuggestions([]);
        }
    };

    const handleClearSearch = () => {
        setSearch("");
        setSuggestions([]);
        setNotifications([]);
    };

    const getSuggestions = (inputValue: any) => {
        const filteredSuggestions = fetchedSuggestions.filter((suggestion: any) =>
            suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    return (
        <div className="mx-16">
            <div className="flex justify-between pt-8">
                <div className="flex gap-10 items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Notifications</h1>
                    </div>
                    <div className="">
                        <form>
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <div className="relative">
                                            <input
                                                type="search"
                                                id="searchInput"
                                                onChange={handleInputChange}
                                                value={search}
                                                placeholder="Search"
                                                required
                                                className="border border-solid border-[#DEDEDE] text-sm font-normal text-[#666666] w-[220px] h-10 px-[20px] focus:outline-none rounded"
                                            />
                                            {search && (
                                                <button
                                                    type="button"
                                                    className="absolute top-[15px] right-[23px] text-gray-500"
                                                    onClick={handleClearSearch}
                                                >
                                                   <img src={cross} alt="" className='h-[10px] w-[10px]' />
                                                        
                                                </button>
                                            )}
                                            {suggestions.length > 0 && (
                                                <div className="absolute top-12 flex flex-col text-[#2E2E2E] border border-solid border-[#DEDEDE] rounded py-3 min-w-[320px] max-h-[320px] overflow-y-auto bg-[#FFFFFF]">
                                                    {suggestions.map((element: any, index: any) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setSearch(element.name);
                                                                setEmployeeId(element.employeeId);
                                                                setSuggestions([]);
                                                                handleJobProfileNameClick(element.employeeId); // Fetch notifications on click
                                                            }}
                                                            className="flex gap-3 p-3 hover:bg-[#F5F5F5] cursor-pointer"
                                                        >
                                                            <div>
                                                                <img
                                                                    src={element.profilePicture}
                                                                    className="w-[50px] h-[50px] rounded-full"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium #1C1C1C">{element.name}</p>
                                                                <p className="text-[12px] leading-5 font-normal text-[#757575]">
                                                                    {element.jobProfileName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className="table w-[70%] mt-[3rem]">
                <thead>
                    <tr className='bg-[#ECEDFE] flex justify-between px-5 cursor-default'>
                        <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Date</th>
                        <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Message</th>
                        <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.length > 0 && notifications.map((item: any) => (
                        <tr key={item._id} className='hover:bg-[#FAFAFA] flex  justify-between px-5 cursor-default'>
                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>
                                {item.date.slice(0,10)}
                            </td>
                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>
                                {item.message}
                            </td>
                            <td className='py-4 px-5 text-sm font-normal text-[#2E2E2E]'>
                                {item.date.slice(11,19)}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}
