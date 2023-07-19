import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';


import FileArrowUp from '../../assets/FileArrowUp.png'
import BluePlus from '../../assets/BluePlus.png'
import { useForm } from 'react-hook-form';


export const AddTrainingQuiz = () => {
    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const [groupName, setGroupName] = useState("All Groups");
    const [jobProfileName, setjobProfileName] = useState("All Job Profiles");

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
    }, [])

    // LINK FORM CODE STARTS
    const [showQuestions, setshowQuestions] = useState<any>([]);
    const [showQuestionsList, setshowQuestionsList] = useState<any>(false);
    const handleLinkClick = () => {
        setShowDocumentsForm(false);
        setshowQuestionsList(true);
        setshowQuestions([...showQuestions, 1]);
    }
    // LINK FORM CODE ENDS

    const [selectedFile, setSelectedFile] = useState<any>(null);

    // DOCUMENT FORM CODE STARTS
    const [showDocumentsForm, setShowDocumentsForm] = useState(false);
    const handleDocumentClick = () => {
        setShowDocumentsForm(true);
        setshowQuestionsList(false);
        setshowQuestions([]);
    }
    console.log("hlo", selectedFile, setSelectedFile, showDocumentsForm, handleDocumentClick)

    // DOCUMENT FORM CODE ENDS
    const handleFormSubmit = () => {
        setshowQuestions([]);
        setShowDocumentsForm(false);
    }
    console.log(handleFormSubmit,)


    const {
        register,
        handleSubmit
    } = useForm();

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event: any) => {
        setSelectedOption(event.target.value);
    };


    return (
        <div className='mx-10 pb-32px'>
            <form
                onSubmit={handleSubmit((data) => {
                    data = {
                        groupName: groupName,
                        jobProfileName: jobProfileName,
                        ...data,
                        selectedOption,
                    }
                    console.log(data)
                    // dispatch(createEmployeeAsync(data)); 
                    handleFormSubmit();
                })}
            >
                <div className='flex flex-col self-stretch  gap-[40px]'>
                    <div className="flex flex-col gap-3">
                        <div className="mt-8">
                            <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Training Quiz</h1>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className="text-[#000000] text-[16px] leading-6 font-medium">For:</p>
                            <div>
                                <select
                                    onChange={(event) => setGroupName(event.target.value)}
                                    className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                    <option>All Groups</option>
                                    {groupList && groupList.map((element: any, index: number) => {
                                        return <option key={index}>{element.groupName}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <select
                                    onChange={(event) => setjobProfileName(event.target.value)}
                                    className='flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                    <option>All Job Profiles</option>
                                    {jobProfileList && jobProfileList.map((element: any, index: number) => {
                                        return <option key={index}>{element.jobProfileName}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Name of Quiz</p>
                            </div>
                            <div>
                                <input
                                    {...register('Name of Quiz', { required: true })}
                                    type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Passing Marks</p>
                            </div>
                            <div>
                                <input
                                    {...register('Passing Marks', { required: true })}
                                    type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex gap-4">
                        <div onClick={handleLinkClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a Question</p></div>
                    </div>

                    {(showQuestionsList && showQuestions) && showQuestions.map((element: any, index: any) => {
                        return <div key={index} className='border border-solid border-[#B0B0B0] w-[688px] rounded-lg p-6 mt-6'>

                            <div key={element} className='flex flex-col  w-[640px] gap-[20px] '>
                                <div className='flex  gap-[20px]'>
                                    <div>
                                        <textarea

                                            {...register(`Question${index + 1}`, { required: true })}
                                            placeholder='Enter A Question'

                                            className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-[81px] w-[536px]' />
                                    </div>
                                    <div>
                                        <input
                                            {...register(`Points${index + 1}`, { required: true })}
                                            placeholder='Points'
                                            type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[80px]' />
                                    </div>
                                </div>

                                <div className='flex  gap-[20px]'>
                                    <div className='border justify-between items-center flex  border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[536px]' >
                                        <input
                                            {...register('Option1')}
                                            type="text" placeholder='Option1' className=' py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio" name="options" id="Questions"
                                            value="Option1"
                                            checked={selectedOption === "Option1"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                    <div className='border justify-between items-center flex  border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[536px]' >
                                        <input
                                            {...register('Option2')}
                                            type="text" placeholder='Option2' className=' py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio" name="options" id="Questions"
                                            value="Option2"
                                            checked={selectedOption === "Option2"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex  gap-[20px]'>
                                    <div className='border justify-between items-center flex  border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[536px]' >
                                        <input
                                            {...register('Option3')}
                                            type="text" placeholder='Option3' className=' py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio" name="options" id="Questions"
                                            value="Option3"
                                            checked={selectedOption === "Option3"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                    <div className='border justify-between items-center flex  border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[536px]' >
                                        <input
                                            {...register('Option4')}
                                            type="text" placeholder='Option4' className=' py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio" name="options" id="Questions"
                                            value="Option4"
                                            checked={selectedOption === "Option4"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>
                                {/* <p>Selected Radio Button: {selectedOption}</p> */}
                            


                        </div>
                        </div>
                    })}
                <div className='flex gap-6 mt-10'>
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={FileArrowUp} className='w-4' alt="" /><p className="px-2">Upload Quiz</p></button>
                </div>
        </div>
            </form >

        </div >
    )
}
