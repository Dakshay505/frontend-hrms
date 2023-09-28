import funnel from "../assets/FunnelSimple.svg"
import img1 from "../assets/Face 1.svg"
import edit from "../assets/editIcon2.svg"
import { useState } from "react";
export const NewPage = () => {
    const data = [
        {
            Name: {
                name: 'ABC',
                imageSrc: img1,
            },
            email: 'abc@gmail.com',
            number: '4596584253',
            role: 'manager',
            aadhar: '452536251455',
        },


    ];



    const [editedRole, setEditedRole] = useState('');
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    const openEditPopup = (role: any) => {
        setEditedRole(role);
        setIsEditPopupOpen(true);
    };

    const saveEditedRole = () => {

        setIsEditPopupOpen(false);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };
    return (
        <div className='px-[40px] pb-[50px] pt-[32px]'>
            <div className=" mb-24 flex flex-col gap-[20px] overflow-auto">

                <div>
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">New Page</h1>
                </div>
                <table className="w-full">
                    <tbody>
                        <tr className="bg-[#ECEDFE] cursor-default">
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span>Name</span>
                                    <img src={funnel} alt="" />
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Email</span>
                                    <img src={funnel} alt="" />

                                </div>
                            </td>

                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span> Phone Number</span>
                                    <img src={funnel} alt="" />

                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span>Role</span>
                                    <img src={funnel} alt="" />
                                </div>
                            </td>
                            <td className="py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap">
                                <div className="flex gap-[10px]">
                                    <span>Aadhar</span>
                                    <img src={funnel} alt="" />
                                </div>
                            </td>
                        </tr>


                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-[#FAFAFA] ">
                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    <div className="flex gap-[10px] items-center">
                                        <img
                                            src={item.Name.imageSrc}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        {item.Name.name}
                                    </div>
                                </td >

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.email}
                                </td>

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.number}
                                </td>

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    <div className="flex gap-[10px] items-center">
                                        {item.role}
                                        <img
                                            src={edit}
                                            alt=""
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => openEditPopup(item.role)}
                                        />
                                    </div>
                                </td>

                                <td className="py-4 px-5 text-sm font-normal text-[#2E2E2E] whitespace-nowrap">
                                    {item.aadhar}
                                </td>
                            </tr>
                        ))}
                    </tbody >
                </table>

                {isEditPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-bg absolute inset-0 bg-gray-800 opacity-50"></div>
                        <div className="modal relative bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Edit Role</h2>
                            <input
                                type="text"
                                className="w-full border rounded px-2 py-1 mb-2"
                                value={editedRole}
                                onChange={(e) => setEditedRole(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={saveEditedRole}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                    onClick={closeEditPopup}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
