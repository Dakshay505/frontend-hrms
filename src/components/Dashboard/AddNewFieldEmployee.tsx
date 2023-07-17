
import { useForm } from 'react-hook-form';
import BluePlus from '../../assets/BluePlus.png';
import { useState } from 'react';
import GearSixWhite from '../../assets/GearSixWhite.svg'
import PencilSimple from '../../assets/PencilSimple.svg'
import TrashSimple from '../../assets/TrashSimple.svg'

const AddNewFieldEmployee = () => {
    const [showInputBox, setshowInputBox] = useState<any>([]);
    const [inputOnEditButton, setInputOnEditButton] = useState(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const handleShowInputBox = () => {
        setshowInputBox([...showInputBox, 1]);
    }
    const handleFormSubmit = (data: any) => {
        console.log(data);
        const dataFieldNames = []
        for (let j in data) {
            dataFieldNames.push(data[j]);
        }
        const fields = []
        for (let i = 0; i < dataFieldNames.length; i++) {
            fields.push({
                name: dataFieldNames[i],
                type: "string"
            })
        }
        console.log(fields);
        reset();
        setshowInputBox([]);
    }

    const handlePencilEditClick = () => {
        setInputOnEditButton(!inputOnEditButton);
    }

    // FORM SUBMIT
    
    const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
        setInputOnEditButton(!inputOnEditButton);
      };
    
      const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onSubmit)();
        }
      };
    return (
        <div className="mx-10">
            <div className="pt-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Add New Fields for Employee</h1>
            </div>
            <div className='mt-10'>
                <div onClick={handleShowInputBox}>
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className='px-2'>Add New Data Field</p></button>
                </div>
                <form onSubmit={handleSubmit((data) => {
                    handleFormSubmit(data);
                })}
                >
                    {showInputBox.length > 0 &&
                        showInputBox.map((element: any, index: number) => {
                            return <div key={index} className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>
                                <div key={element+1} className='flex gap-10 mx-6'>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <p className='text-sm font-normal text-[#1C1C1C]'>Field Name</p>
                                        </div>
                                        <div>
                                            <input
                                                {...register(`fieldName${index + 1}`, { required: true })}
                                                type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[640px]' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <div className='mt-10'>
                        <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={GearSixWhite} className='w-4' alt="" /><p className="px-2">Configure</p></button>
                    </div>
                </form>
            </div>
            {/* UPDATE EXISTING CUSTOM FIELDS START */}
            <div className='mt-12'>
                    <div>
                        <h1 className='text-2xl text-[#2E2E2E] font-bold'>Update Existing Custom Fields for Employees</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='grid grid-cols-2 gap-6 mt-8'>
                            <div className='flex justify-between items-center p-4 border border-solid [#DEDEDE] rounded-lg bg-[#FAFAFA] w-[332px]'>
                                <div>
                                    <p className='text-[16px] leading-6 text-[#283093] font-medium'>Name</p>
                                    {inputOnEditButton && <div>
                                        <input
                                        {...register("inputValue", {required: true})}
                                        className='bg-[#FAFAFA] text-sm text-[#4A4A4A] font-normal placeholder:text-[#4A4A4A] focus:outline-none'
                                        onKeyDown={handleKeyDown}
                                        placeholder='Type Here'
                                        type="text"
                                         />
                                    </div>}
                                </div>
                                <div className='flex gap-2'>
                                    <img onClick={handlePencilEditClick} src={PencilSimple} alt="Pencil" />
                                    <img src={TrashSimple} alt="Trash" />
                                </div>
                            </div>
                        </div>
                    </form>
            </div>
            {/* UPDATE EXISTING CUSTOM FIELDS END */}
        </div>
    )
}

export default AddNewFieldEmployee