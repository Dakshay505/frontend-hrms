import { useState } from 'react';
import { Loginlogs } from './Loginlogs';
import {NewPage} from './NewPage';

export const EmployeesSidebar = () => {
    const [activeTab, setActiveTab] = useState('employee');
    const toggleTab = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className='px-[40px] pb-[50px] pt-[32px]'>
            <div className='flex gap-[31px] flex-col'>
                    <div className="flex px-[24px] py-[8px] items-start justify-around border border-[#d7d7d7] rounded-[8px] space-x-4">
                        <button
                            className={`p-2 ${activeTab === 'employee'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('employee')}
                        >
                            Session Logs
                        </button>
                        <button
                            className={`p-2 ${activeTab === 'personal'
                                ? 'text-[#283093] underline font-medium'
                                : 'text-black'
                                }`}
                            onClick={() => toggleTab('personal')}
                        >
                            All Employees Detail
                        </button>
                        
                    </div>
                    <div className=''>
                        {activeTab === 'employee' && (
                            <div className="p-[16px]"><Loginlogs /></div>
                        )}
                        {activeTab === 'personal' && (
                            <div className="p-[16px]"><NewPage/></div>
                        )}
                       
                    </div>
                </div>

        </div>
    )
}
