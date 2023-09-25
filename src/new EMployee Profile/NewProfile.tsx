import { useState } from 'react';
import NewPicture from './newEmployeePicture'
import { EmployeeDetails } from './Components/EmployeeDetails';
import { PersonalDetails } from './Components/PersonalDetails';
import { BankDetails } from './Components/BankDetails';

export const NewProfile = () => {
    const [activeTab, setActiveTab] = useState('employee');

    const toggleTab = (tab: any) => {
        setActiveTab(tab);
    };
    return (
        <div className='px-[40px] pb-[50px] pt-[32px]'>
            <div className='flex gap-[31px]'>
                <NewPicture />
                <div className='flex w-[600px] gap-[16px] pt-[32px] flex-col '>
                    <div className="flex px-[24px] py-[8px] items-start justify-around border border-[#d7d7d7] rounded-[8px] space-x-4">
                        <button
                            className={`p-2 ${activeTab === 'employee'
                                    ? 'text-[#283093] underline font-medium'
                                    : 'text-black'    
                                }`}
                            onClick={() => toggleTab('employee')}
                        >
                            Employee Detail
                        </button>
                        <button
                            className={`p-2 ${activeTab === 'personal'
                                    ? 'text-[#283093] underline font-medium'
                                    : 'text-black'    
                                }`}
                            onClick={() => toggleTab('personal')}
                        >
                            Personal Detail
                        </button>
                        <button
                            className={`p-2 ${activeTab === 'bank'
                                    ? 'text-[#283093] underline font-medium'
                                    : 'text-black'   
                                }`}
                            onClick={() => toggleTab('bank')}
                        >
                            Bank Detail
                        </button>
                    </div>


                    <div className='border  border-[#d7d7d7] rounded-[8px]'>
                        {activeTab === 'employee' && (
                            <div className="p-[16px]"><EmployeeDetails/></div>
                        )}

                        {activeTab === 'personal' && (
                            <div className="p-[16px]"><PersonalDetails/></div>
                        )}

                        {activeTab === 'bank' && (
                            <div className="p-[16px]"><BankDetails/></div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
