import { useForm } from "react-hook-form";
import Plus from "../../assets/Plus.png"
import { useDispatch, useSelector } from 'react-redux'
import { createShopAsync } from "../../redux/Slice/ShopSlice";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
export const Shop = () => {

    const dispatch = useDispatch();
    const [parentShopValue, setParentShopValue] = useState("");

    const AddShop = useSelector((state: any) => state.Shop);
    console.log(AddShop)



    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
    }: any = useForm();




    const validateShopName = (value: any) => {
        if (/^\d/.test(value)) {
            return "Shop Name cannot start with a digit";
        }
        return true;
    };

    const handleShopNameChange = (e: any) => {
        const inputShopName = e.target.value;
        if (/^\d/.test(inputShopName)) {
            setValue("ShopName", inputShopName.replace(/^\d/, ""));
        }
    };


    useEffect(() => {

        dispatch(getAllJobProfileAsync)

    }, [])

    const alljobprofile = useSelector((state: any) => state.jobProfile.jobProfiles)
    console.log("hiiii", alljobprofile)




    return (
        <div className="mx-10">
            <div className="pt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Shops</h1>
            </div>
            <form onSubmit={handleSubmit((data: any) => {
                dispatch(createShopAsync(data)).then((res: any) => {
                    if (res.payload.success) {
                        toast.success(res.payload.message);
                    } else {
                        toast.error(res.payload.message);
                    }
                    dispatch(getAllJobProfileAsync());
                })


                reset()
            })}
            >
                <div className="mt-10">
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Shop Name</p>
                            </div>
                            <div>
                                <input
                                    {...register('shopName', { required: "Name is required", validate: validateShopName })}
                                    type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]'
                                    onChange={handleShopNameChange} />
                                {errors.ShopName && <p className="text-red-500">{errors.ShopName.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Job Profile</p>
                                </div>
                                <div>
                                    <select
                                        {...register('jobProfileName', { required: "Employment Type required" })}
                                        onChange={(event) => setParentShopValue(event.target.value)}
                                        className='border border-solid border-[#DEDEDE] rounded  px-3 h-10 w-[324px] text-[#666666]'>
                                      
                                        {alljobprofile.map((option: any, index: any) => (
                                            <option
                                                key={index}
                                                value={option.jobProfileName}
                                                className='border border-solid border-[#DEDEDE] w-[324px] h-10 px-2'
                                            >
                                                {option.jobProfileName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        {/* <Link to="/update-hierarchy"> */}
                        <button type='submit' className='flex items-center justify-center  text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4 rounded-[8px]'><img src={Plus} className='w-4' alt="" /><p className="px-2">Add Shop</p></button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
        </div>
    )
}
