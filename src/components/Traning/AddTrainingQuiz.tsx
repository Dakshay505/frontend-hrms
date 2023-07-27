import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { useForm } from 'react-hook-form';
import { addTrainingQuizAsync } from '../../redux/Slice/TrainingSlice';
import FileArrowUp from '../../assets/FileArrowUp.png';
import BluePlus from '../../assets/BluePlus.png';

export const AddTrainingQuiz = () => {
    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const [groupName, setGroupName] = useState("All Groups");
    console.log(groupName)
    const [jobProfileName, setjobProfileName] = useState("All Job Profiles");

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());

    }, []);


    const [showQuestions, setshowQuestions] = useState<any>([]);
    const [showQuestionsList, setshowQuestionsList] = useState<any>(false);
    const handleQuizOpen = () => {
        if (!showQuestionsList) {
            setShowQuizForm(true);
            setshowQuestionsList(true);
            setshowQuestions([...showQuestions, 1]);
        }
    };
    const [showQuizForm, setShowQuizForm] = useState(false);
    console.log(showQuizForm)
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setoptions] = useState(["", "", "", ""]);
    const handleInputChange = (e: any, index: any) => {
        const newoptions = [...options];
        newoptions[index] = e.target.value;
        setoptions(newoptions);
    };


    const handleRadioChange = (index: any) => {
        setSelectedOption(index);
    };

    useEffect(() => {
        if (selectedOption !== null) {
            const correctAnswer = options[selectedOption];
            console.log(`Selected input value: ${correctAnswer}`);
        }
    }, [selectedOption, options]);

    const {
        register,
        handleSubmit,
    } = useForm();
    return (
        <div className='mx-10 pb-[32px]'>
            <form
                onSubmit={handleSubmit((data) => {
                    let Data = data
                    Data = {
                        jobProfile: jobProfileName,
                        // groupName: groupName,
                        correctAnswer: selectedOption !== null ? options[selectedOption] : null,
                        options,
                        points: data['points'],
                        question: data['question']
                    }

                    console.log("data", Data)
                    dispatch(addTrainingQuizAsync());
                    // handleFormSubmit();
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
                                <p className='text-sm font-normal text-[#1C1C1C]'>Passing Marks</p>
                            </div>
                            <div>
                                <input
                                    {...register('Passing Marks', { required: true })}
                                    type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Total Points</p>
                            </div>
                            <div>
                                <input
                                    {...register('Totalpoints', { required: true })}
                                    type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[324px]' />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex gap-4">
                        <div onClick={handleQuizOpen} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a Question</p></div>
                    </div>

                    {(showQuestionsList && showQuestions) && showQuestions.map((element: any, index: any) => {
                        const radioGroupName = `options_${index}`;
                        return <div key={index} className='border border-solid border-[#B0B0B0] w-[688px] rounded-lg p-6 mt-6'>
                            <div key={element} className='flex flex-col  w-[640px] gap-[20px] '>
                                <div className='flex  gap-[20px]'>
                                    <div>
                                        <textarea
                                            {...register(`question`, { required: true })}
                                            placeholder='Enter A Question'
                                            className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-[81px] w-[536px]'
                                        />
                                    </div>

                                    <div>
                                        <input
                                            {...register(`points`, { required: true })}
                                            placeholder='Points'
                                            type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[80px]' />
                                    </div>
                                </div>
                                <div className='flex flex-wrap  gap-[20px]'>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={''}
                                            onChange={(e) => handleInputChange(e, 0)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"
                                            name={radioGroupName}
                                            id={`Questions_${index}_0`}
                                            // checked={""}
                                            onChange={() => handleRadioChange(0)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            onChange={(e) => handleInputChange(e, 1)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"
                                            name={radioGroupName}
                                            id={`Questions_${index}_0`}
                                            onChange={() => handleRadioChange(1)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={''}
                                            onChange={(e) => handleInputChange(e, 2)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"
                                            name={radioGroupName} // Use the unique name for this set of radio buttons
                                            id={`Questions_${index}_0`}
                                            // checked={options[2].isCorrect}
                                            onChange={() => handleRadioChange(2)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={''}
                                            onChange={(e) => handleInputChange(e, 3)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"
                                            name={radioGroupName} // Use the unique name for this set of radio buttons
                                            id={`Questions_${index}_0`}
                                            // checked={options[3].isCorrect}
                                            onChange={() => handleRadioChange(3)}
                                        />
                                    </div>
                                </div>
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