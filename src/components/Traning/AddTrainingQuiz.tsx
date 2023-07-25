import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync } from '../../redux/Slice/GroupSlice';
import { getAllJobProfileAsync } from '../../redux/Slice/JobProfileSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FileArrowUp from '../../assets/FileArrowUp.png';
import BluePlus from '../../assets/BluePlus.png';

export const AddTrainingQuiz = () => {
    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);
    const [groupName, setGroupName] = useState("All Groups");
    const [jobProfileName, setjobProfileName] = useState("All Job Profiles");

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllJobProfileAsync());
    }, []);


    const [showQuestions, setshowQuestions] = useState<any>([]);
    const [showQuestionsList, setshowQuestionsList] = useState<any>(false);
    const handleQuizOpen = () => {
        setShowQuizForm(true);
        setshowQuestionsList(true);
        setshowQuestions([...showQuestions, 1]);
    }
    const [showQuizForm, setShowQuizForm] = useState(false);


    console.log(showQuizForm)
    // const [CorrectAnswer, setCorrectAnswer] = useState('');
    // const [isChecked, setIsChecked] = useState(false);

    // const handleInputChange = (event: any) => {
    //     setCorrectAnswer(event.target.value);
    // };

    // const handleRadioChange = () => {
    //     setIsChecked(!isChecked);
    // };


    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [options, setOptions] = useState([
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
    ]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: any) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = event.target.value;
        setSelectedAnswers(updatedAnswers);
    };


    const handleRadioChange = (index: any) => {
        const updatedOptions = options.map((option, i) => {
            return {
                ...option,
                isCorrect: i === index,
            };
        });
        setOptions(updatedOptions);
    };



    const handleFormSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5050/api/v1/api/quiz/addQuestion', {
                groupName: groupName,
                jobProfileName: jobProfileName,
            });


            if (response.status === 200) {
                // Quiz successfully uploaded
                console.log('Quiz uploaded successfully');
            } else {
                // Handle error
                console.error('Failed to upload quiz');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };





 

    const {
        register,
        handleSubmit,
    } = useForm();

    // const [Question, setQuestion] = useState('');


    return (
        <div className='mx-10 pb-[32px]'>
            <form
                onSubmit={handleSubmit((data) => {
                    let Data = data

                    Data = {

                        groupName: groupName,
                        answers: selectedAnswers,
                        jobProfileName: jobProfileName,
                        ...data,
                    }
                    console.log("data", Data)
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
                        return <div key={index} className='border border-solid border-[#B0B0B0] w-[688px] rounded-lg p-6 mt-6'>
                            <div key={element} className='flex flex-col  w-[640px] gap-[20px] '>
                                <div className='flex  gap-[20px]'>
                                    <div>
                                        <textarea

                                            {...register(`Question${index + 1}`, { required: true })}

                                            placeholder='Enter A Question'
                                            className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-[81px] w-[536px]'
                                        />
                                    </div>

                                    <div>
                                        <input
                                            {...register(`Points${index + 1}`, { required: true })}
                                            placeholder='Points'
                                            type="number" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[80px]' />
                                    </div>
                                </div>
                                <div className='flex flex-wrap  gap-[20px]'>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={selectedAnswers[0] || ''}
                                            onChange={(e) => handleInputChange(e, 0)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"

                                            name="options_0"
                                            id="Questions_0"
                                            checked={options[0].isCorrect}
                                            onChange={() => handleRadioChange(0)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={selectedAnswers[1] || ''}
                                            onChange={(e) => handleInputChange(e, 1)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"

                                            name="options_1"
                                            id="Questions_1"
                                            checked={options[1].isCorrect}
                                            onChange={() => handleRadioChange(1)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={selectedAnswers[2] || ''}
                                            onChange={(e) => handleInputChange(e, 2)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"

                                            name="options_2"
                                            id="Questions_2"
                                            checked={options[2].isCorrect}
                                            onChange={() => handleRadioChange(2)}
                                        />
                                    </div>

                                    <div className='border justify-between items-center flex border-solid border-[#DEDEDE] rounded py-4 px-3 h-[40px] w-[300px]'>
                                        <input
                                            type="text"
                                            // value={selectedAnswers[3] || ''}
                                            onChange={(e) => handleInputChange(e, 3)}

                                            className='py-4 px-3 h-[20px] outline-none'
                                        />
                                        <input
                                            type="radio"

                                            name="options_3"
                                            id="Questions_3"
                                            checked={options[3].isCorrect}
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