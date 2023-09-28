import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png"
import { useDispatch, useSelector } from 'react-redux'
import { createGroupAsync, getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import {useEffect, useState} from "react"
import toast from 'react-hot-toast';
import Work from "../../assets/CalendarCheck.png"
import { createWorkDayAsync, getWorkDayAsync, updateWorkDayAsync } from "../../redux/Slice/WorkDaySlice";
import EditImage from "../../assets/PencilSimple.png"
import check from "../../assets/Check.svg"

const AddWorkDay= () => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
   
const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    }: any = useForm();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [numberOfDays, setNumberOfDays] = useState([]);
    const [update,setUpdate]=useState(false)
    const workdays:any=useSelector((state: any) => state.Work.workingData)
    console.log("hjhjhjhj",workdays)
    useEffect(()=>{
        dispatch(getWorkDayAsync(currentYear))

    },[])
  
    // Function to handle the month selection
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
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month: string = e.target.value;
    
       
        
        const daysArray:any= Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
        setNumberOfDays(daysArray);
        setSelectedMonth(month);
    }
 

const handleUpdate=(month:any,day:any)=>{
   
    setUpdate(true)
    setSelectedDay(day)
    setSelectedMonth(month)
    const daysArray:any= Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
    setNumberOfDays(daysArray);


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
                   onSubmit={handleSubmit((data: any) => {
                    
                    
                       
                    if(update===true){
                        data = {
                            monthName:selectedMonth,
                            workingDay:selectedDay,
                            year:currentYear
                        }
                   
                    console.log(data);
                        dispatch(updateWorkDayAsync(data)).then((res: any) => {
                            if (res.payload.success) {
                                toast.success(res.payload.message);
                                dispatch(getWorkDayAsync(currentYear))
                                setSelectedMonth("")
                                setSelectedDay("")
                            } else {
                                toast.error(res.payload.message);
                            }
                            
                           
                            
                        })

                    }
                    else{
                        data = {
                            ...data,
                            year:currentYear
                        }
                   
                    console.log(data);
                   
                    dispatch(createWorkDayAsync(data)).then((res: any) => {
                        if (res.payload.success) {
                            toast.success(res.payload.message);
                            dispatch(getWorkDayAsync(currentYear))
                            setSelectedMonth("")
                            setSelectedDay("")
                        } else {
                            toast.error(res.payload.message);
                        }
                        
                       
                        
                    })
                      }
                })}>
                
                
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
                                        value={selectedDay}
                                        onChange={(event:any)=>setSelectedDay(event.target.value)}
                                        
                                        className='border border-solid border-[#DEDEDE] text-[#666666] w-[324px] h-10 px-2'>
                                        <option >Select the day</option>
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
                        <div className="flex flex-row gap-4 mt-10">
                            {/* <Link to="/update-hierarchy"> */}
                            <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={update?check:Plus} className='w-4' alt="" /><p className="px-2">{update?"Update work day":"Add Work Day"}</p></button>
                            {update && <button onClick={()=>setUpdate(false)} className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Work Day</p></button>
                             }
                            {/* </Link> */}
                        </div>
                    </div>
                   
                </form>
                <table className="mt-2">
                        <tbody>
                            <tr className='bg-[#ECEDFE] cursor-default'>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Month</td>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Day</td>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>Update</td>
                                
                            </tr>
                            {workdays && workdays.length>0 && workdays[0].month && workdays[0].month.length >0 &&
                            workdays[0].month.map((element: any) => {
                                return<>
                                <tr className='hover:bg-[#FAFAFA]'>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>{element.monthName}</td>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>{element.workingDay}</td>
                                <td className='py-4 px-5 text-sm font-medium text-[#2E2E2E] whitespace-nowrap'>
                                    <img src={EditImage} className="h-[14px]" onClick={()=>handleUpdate(element.monthName,element.workingDay)}
                                    />
                                    </td>
                                  </tr>

                                </>
                            })
                            
}
                            </tbody>
                </table>
            </div>
        </>
    )
}

export default AddWorkDay