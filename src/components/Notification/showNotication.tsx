import { useState } from 'react';
import { getNotificationApiPath } from '../../APIRoutes';
import glass from '../../assets/MagnifyingGlass.png'
import axios from "axios"
export default function ShowNotication() {
    const [notification, setNotificationData] = useState<any>([])

    axios.get(`${getNotificationApiPath}`)
        .then(function (response) {
            setNotificationData(response.data.notification)
        })
        .catch(function (error) {
            console.error(error);
        });
    console.log(notification)

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
                                <input className="w-full h-[1rem]" type='search' placeholder='search' />
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
