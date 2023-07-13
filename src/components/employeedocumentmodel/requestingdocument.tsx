import { useForm } from "react-hook-form";
import BluePlus from '../../assets/BluePlus.png'
import FileArrowUp from '../../assets/FileArrowUp.png'
import React, {  useState } from "react";

interface LinkFormData {
    resourceName: string;
    resourceLink: string;
}


export const EmployeeRequestingdocument = () => {


    // LINK FORM CODE STARTS
    const [showLinkForm, setShowLinkForm] = useState<LinkFormData[]>([]);
    const handleLinkClick = () => {
        const newForm: LinkFormData = {
            resourceName: '',
            resourceLink: ''
        };
        setShowLinkForm([...showLinkForm, newForm]);
    }
    const handleLinkInputChange = (index: number, field: keyof LinkFormData, value: string) => {
        const updatedForms = [...showLinkForm];
        updatedForms[index][field] = value;
        setShowLinkForm(updatedForms);
    };
    console.log(showLinkForm)
    // LINK FORM CODE ENDS

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        console.log(`Selected value: ${event.target.value}`);
        // console.log(handleChange)
    };

    // search
    const [search, setSearch] = React.useState('');


  
    React.useEffect(() => {
      console.log(search);
      setSearch("")
    }, [search]);
  



    // INPUT FILES END

    const {
        register,
        handleSubmit,
    } = useForm();
    return (
        <div className="mx-10">
            <form

                onSubmit={handleSubmit((data) => {

                    console.log(data)
                })}
            >
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Request Documents</h1>
                        <p className="text-[#000000] text-[16px] leading-6 font-bold">For Madhav Sharma</p>
                    </div>
                </div>
                <div className="mt-10 flex gap-4">
                    <div onClick={handleLinkClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a New Document</p></div>

                </div>

                {/* LINK FORM START */}
                {showLinkForm && showLinkForm.map((element, index) => {
                    console.log(element)
                    return <div key={index} className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>

                        <div className='flex gap-10 mx-6'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Document Name</p>
                                </div>
                                <div> 
                                    <input
                                        {...register(`resourceName${index + 1}`, { required: true })}
                                        onChange={(e) => handleLinkInputChange(index, 'resourceName', e.target.value)}
                                        value={element.resourceName}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Format</p>
                                </div>
                                <select
                                    value={selectedValue}
                                    onChange={handleChange}
                                    className="border border-solid border-[#DEDEDE] rounded px-3 h-10 w-[300px]"
                                >
                                    <option value="Format1">Format 1</option>
                                    <option value="Format2">Format 2</option>
                                    <option value="Format3">Format 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                })}
                {/* LINK FORM END */}

                <div className="mt-10">
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={FileArrowUp} className='w-4' alt="" /><p className="px-2">Upload Resources</p></button>
                </div>
            </form>
        </div>
    )
}

