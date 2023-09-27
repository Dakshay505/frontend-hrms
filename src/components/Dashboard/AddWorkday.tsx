import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png"
import { useDispatch, useSelector } from 'react-redux'
import { createGroupAsync, getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import {useEffect, useState} from "react"
import toast from 'react-hot-toast';
import Work from "../../assets/CalendarCheck.png"

const AddWorkDay= () => {
    const dispatch = useDispatch();
   
const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    }: any = useForm();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [numberOfDays, setNumberOfDays] = useState([]);
  
    // Function to handle the month selection
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month: string = e.target.value;
    
        const daysInMonth: Record<string, number> = {
          January: 31,
          February: 28,
          March: 31,
          April: 30,
          May: 31,
          June: 30,
          July: 31,
          August: 31,
          September: 30,
          October: 31,
          November: 30,
          December: 31,
        };
        
        const daysArray:any= Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
        setNumberOfDays(daysArray);
        setSelectedMonth(month);
    }
 


    
      


    return (
        <>
            <div className="mx-10">
                <div className="pt-8 flex flex-row gap-2">
                    <img className="h-[24px] w-[24px] mt-1" src={Work} />
                    <h1 className="text-2xl font-bold text-[#2E2E2E]">Working Days</h1>
                </div>
                <hr className="color:black"></hr>
                <form 
                
                >
                     <div className="mt-10">
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Month</p>
                                </div>
                                <div>
                                <select
                                        {...register('monthName', { required: true })}
                                        value={selectedMonth}
                                        onChange={handleMonthChange}
                                        
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option>Choose the Month</option>
                                        <option value="January">January</option>
                                        <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Number of days</p>
                                </div>
                                <div>
                                <select
                                        {...register('workingDay', { required: true })}
                                        
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option>Select the day</option>
                                        {numberOfDays.length>0 && numberOfDays.map((day:any) => (
              <option key={day} value={day}>
                {day}
                                       </option>
                                        ))}
                       
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            {/* <Link to="/update-hierarchy"> */}
                            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Work Day</p></button>
                            {/* </Link> */}
                        </div>
                    </div>
                   
                </form>
            </div>
        </>
    )
}

export default AddWorkDay