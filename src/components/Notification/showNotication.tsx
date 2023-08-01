import { useEffect } from 'react';
import { fetchNotifications } from '../../redux/Slice/notificationSlice';
import glass from '../../assets/MagnifyingGlass.png'
import { useDispatch, useSelector } from 'react-redux';


export default function ShowNotication() {
    const notification: any = []
    const id = useSelector((state:any) => state.login);
    console.log("id",id)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchNotifications("64b6b0d427e4fbc4d20c5c51"));
      console.log("eapcfubifcbawofc",id)
    }, [dispatch]);
    return (
        <div className='mx-10'>
            <div className="flex justify-between pt-8">
                <div className="flex gap-10 items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Notifications</h1>
                    </div>
                    <div>
                        <form action="">
                            <label htmlFor="searchInput" className="flex gap-2 items-center cursor-text  w-[200px] py-3 px-5 rounded-full z-0 text-sm font-medium text-[#2E2E2E] border border-solid border-primary-border focus:outline-none">
                                <img src={glass} alt="" className="h-4 w-4" />
                                <input className="w-full h-[1rem] outline-none" type='search' placeholder='search' />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <table className="table mt-[3rem]">
                    <thead>
                        <tr className='bg-[#ECEDFE] flex gap-[10rem] px-5 cursor-default'>
                            <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Name</th>
                            <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Message</th>
                            <th className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notification && notification.map((item: any) => {
                            return (
                                <tr key={item} className='hover:bg-[#FAFAFA] flex gap-[10rem] px-5 cursor-default'>
                                    <th className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap hover:underline cursor-pointer'>{item.date}</th>
                                    <th className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{item.notificationType}</th>
                                    <th className='py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap'>{item.message}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
