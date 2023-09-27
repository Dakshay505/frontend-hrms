import funnel from "../assets/FunnelSimple.svg"
import img1 from "../assets/Face 1.svg"

export const Loginlogs = () => {
    const data = [
        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        },

        {
            employeeName: {
                name: 'Simprabh Singh',
                imageSrc: img1,
            },
            role: 'Manager',
            time: '10:00 AM',
            device: 'Desktop',
            phoneNumber: '123-456-7890',
        }
    ];

    return (
        <div className='px-[40px] pb-[50px] pt-[32px]'>
            <div className="py-6 mb-24 overflow-auto">
                <table className="w-full">
                    <tbody>
                        <tr className="bg-[#ECEDFE] cursor-default">
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Employee Name</span>
                                    <img src={funnel} alt="" />
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Role</span>
                                    <img src={funnel} alt="" />

                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <span> Time</span>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Device</span>
                                    <img src={funnel} alt="" />

                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span>Phone Number</span>
                                    <img src={funnel} alt="" />
                                </div>
                            </td>
                        </tr>


                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-[#FAFAFA] ">
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    <div className="flex gap-[10px] items-center">
                                        <img
                                            src={item.employeeName.imageSrc}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        {item.employeeName.name}
                                    </div>
                                </td >
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.role}
                                </td>
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.time}
                                </td>
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.device}
                                </td>
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.phoneNumber}
                                </td>
                            </tr>
                        ))}
                    </tbody >
                </table>
            </div>
        </div>
    )
}
