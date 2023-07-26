import { Link } from "react-router-dom"
import AddPlus from "../../assets/AddPlus.png"
import FolderNotch from "../../assets/FolderNotch.png"
import PresentationChart from "../../assets/PresentationChart.png"
import SealCheck from "../../assets/SealCheck.png"

const TraningDashboard = () => {
    return (
        <div className="mx-10 pt-2">
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Training Dashboard</h1>
            </div>
            <div className="flex gap-8 mt-10">
                <div className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg p-4 gap-2'>
                    <div className='flex flex-col items-center justify-center w-[109px] h-[120px] gap-3'>
                        <div className=''>
                            <img className='w-[32px] h-[32px]' src={AddPlus} alt="plus" />
                        </div>
                        <div>
                            <p className='text-[#757575] text-[18px] leading-6'>Add</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Link to="/add-traning-resources">
                            <div className='flex flex-col items-center justify-center w-[169px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                <div className=''>
                                    <img className='w-[32px] h-[32px]' src={FolderNotch} alt="plus" />
                                </div>
                                <div>
                                    <p className='text-xl font-medium text-[#283093]'>Resources</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/add-traning-quiz">
                            <div className='flex flex-col items-center justify-center w-[158px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                <div className=''>
                                    <img className='w-[32px] h-[32px]' src={SealCheck} alt="gearimg" />
                                </div>
                                <div>
                                    <p className='text-xl font-medium text-[#283093]'>Quiz</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
                <Link to="/traning-status">
                    <div className="flex flex-col items-center justify-center gap-3 w-[193px] h-[152px] bg-[#ECEDFE] rounded-lg p-6">
                        <div className=''>
                            <img className='w-[32px] h-[32px]' src={PresentationChart} alt="gearimg" />
                        </div>
                        <div>
                            <p className='text-xl font-medium text-[#283093]'>Training Status</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TraningDashboard