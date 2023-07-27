import { useEffect, useState } from 'react';
import submitimg from "../../assets/paper-plane.png"
import retry from "../../assets/repeat.png"
import back from "../../assets/buttonback.png"
import { Link } from 'react-router-dom';
import { fetchQuizQuestionsAsync } from '../../redux/Slice/TrainingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store';


interface QuizData {
    question: string;
    options: string[];
    correctAnswer: string;
}

export const EmployeeAssessmentQuiz = () => {
    const dispatch = useDispatch();
    const { questions } = useSelector((state: RootState) => state.training);


    useEffect(() => {
        dispatch(fetchQuizQuestionsAsync());
    }, [dispatch]);

    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [isPassed, setIsPassed] = useState(false);
    const passingMark = 2;
    
    const score = Object.values(userAnswers).filter((answer, index) => answer === questions[index]).length;
    const totalQuestions = questions.length;

    const handleGoBack = () => {
        setSubmitted(false);
        setIsPassed(false);
        setUserAnswers({});
    };

    const handleRetry = () => {
        setSubmitted(false);
        setIsPassed(false);
        setUserAnswers({});
    };

    const handleSubmit = () => {
        setSubmitted(true);

        if (score >= passingMark) {
            setIsPassed(true);
        } else {
            setIsPassed(false);
        }

        console.log("User Answers:", userAnswers);
        console.log("Score:", score, "/", totalQuestions);

        if (score >= passingMark) {
            console.log("Congratulations! You passed the quiz.");
        } else {
            console.log("Unfortunately, you did not pass the quiz. Please try again.");
        }
    };

    return (
        <div className='px-[30px] py-[32px] flex flex-col gap-[40px] w-[768px]'>
            <h1 className={`text-2xl font-bold text-[#2E2E2E] `}>
                {submitted
                    ? isPassed
                        ? 'You passed the assessment!'
                        : 'You failed the assessment!'
                    : 'Assessment Quiz'
                }
            </h1>
            {submitted && (
                <p className={`text-lg font-bold ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                    Score: {score}/{totalQuestions}
                </p>
            )}
            {(!submitted || isPassed) && questions.map((questionData: QuizData, questionIndex: number) => (
                <div key={questionIndex} className="my-4 flex flex-col gap-[16px]">
                    <p className="font-semibold">
                        {questionIndex + 1}. {questionData.question}
                    </p>
                    {questionData.options.map((option, optionIndex) => {
                        const inputId = `question_${questionIndex}_option_${optionIndex}`;
                        const isChecked = userAnswers[questionIndex] === option;
                        const isCorrectAnswer = submitted && option === questions[questionIndex];

                        return (
                            <div key={optionIndex} className='gap-[10px] flex'>
                                <input
                                    type="radio"
                                    id={inputId}
                                    name={`question_${questionIndex}`}
                                    value={option}
                                    checked={isChecked}
                                    onChange={() => setUserAnswers({ ...userAnswers, [questionIndex]: option })}
                                    disabled={submitted}
                                />
                                <label
                                    htmlFor={inputId}
                                    className={`
                                        ${isChecked && !isCorrectAnswer && submitted ? 'bg-red-200' : ''}
                                        ${isCorrectAnswer && submitted ? 'bg-green-200' : ''}
                                    `}
                                >
                                    {option}
                                </label>
                            </div>
                        );
                    })}
                </div>
            ))}

            {submitted && (
                <div className="flex flex-col gap-[]]">
                    {isPassed ? (
                        <button
                            className='h-[40px] px-[16px] py-[12px] flex justify-center text-center gap-[8px] items-center rounded-[8px] bg-primary-blue'
                        >
                            <img src={back} alt="" className='h-[16px] w-[16px]' />
                            <span className='text-[14px] font-medium text-white'>Go Back to Training Resources</span>
                        </button>
                    ) : (
                        <div className="flex gap-[24px]">
                            <button
                                onClick={handleRetry}
                                className='h-[40px] px-[16px] py-[12px] flex justify-center text-center gap-[8px] items-center rounded-[8px] bg-primary-blue'
                            >
                                <img src={retry} alt="" className='h-[16px] w-[16px]' />
                                <span className='text-[14px] font-medium text-white'>Reattempt Quiz</span>
                            </button>
                            <Link to="/employee-TrainingResource">
                                <button
                                    onClick={handleGoBack}
                                    className='h-[40px] px-[16px] py-[12px] flex justify-center text-center gap-[8px] items-center rounded-[8px] border border-primary-blue '
                                >
                                    <img src={back} alt="" className='h-[16px] w-[16px]' />
                                    <span className='text-[14px] font-medium text-primary-blue'>Go Back to Training Resources</span>
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
            {!submitted && (
                <div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='h-[40px] w-[113px] flex justify-center items-center text-center gap-[8px] rounded-[8px] bg-[#283093] py-[12px] px-[16px]'
                    >
                        <img src={submitimg} alt="" className='h-[16px] w-[16px]' />
                        <span className='text-[14px] font-medium text-white'>Submit</span>
                    </button>
                </div>
            )}
        </div>
    );
};
