
import check from "../../assets/seal-check.png"
import { Link } from 'react-router-dom'

export const TrainingResource = () => {
    return (
        <div className='px-[40px] pt-[32px] w-[768px]'>
            <div className='flex justify-between '>
                <div className="">
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Training Resources</h1>
                </div>
                <div className='flex px-[16px] py-[12px] justify-center items-center border rounded-[8px] h-[40px] border-primary-blue'>
                    <Link to="/employee-EmployeeAssesmentQuiz">
                        <button className='flex justify-center items-center text-center gap-[8px]'>
                            <img src={check} alt="" className='h-[16px]  w-[16px]' />
                            <span className='text-primary-blue text-[14px] font-medium'>
                                Attempt Assesment Quiz
                            </span>
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    )
}
