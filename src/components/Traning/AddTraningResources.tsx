import { useForm } from "react-hook-form";
import BluePlus from '../../assets/BluePlus.png'
import FileArrowUp from '../../assets/FileArrowUp.png'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import { addTrainingDocumentsAsync, addTrainingLinksAsync } from "../../redux/Slice/TrainingSlice";
import X from '../../assets/X.svg'


const AddTraningResources = () => {

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
    const [showLinkForm, setShowLinkForm] = useState<any>([]);
    const [showLinkFormValue, setShowLinkFormValue] = useState<any>(false);
    const handleLinkClick = () => {
        setShowDocumentsForm(false);
        setShowLinkFormValue(true);
        setShowLinkForm([...showLinkForm, 1]);
    }
    // LINK FORM CODE ENDS


    // DOCUMENT FORM CODE STARTS
    const [showDocumentsForm, setShowDocumentsForm] = useState(false);
    const handleDocumentClick = () => {
        setShowDocumentsForm(true);
        setShowLinkFormValue(false);
        setShowLinkForm([]);
    }

    // DOCUMENT FORM CODE ENDS
    const handleFormSubmit = () => {
        setShowLinkForm([]);
        setShowDocumentsForm(false);
    }

    const {
        register,
        handleSubmit,
    } = useForm();

    function convertToObjectArray(resources: any) {
        var objArray = [];
        var index = 1;

        while (true) {
            var resourceNameKey = "resourceName" + index;
            var resourceLinkKey = "resourceLink" + index;

            if (resources.hasOwnProperty(resourceNameKey) && resources.hasOwnProperty(resourceLinkKey)) {
                var resourceName = resources[resourceNameKey];
                var resourceLink = resources[resourceLinkKey];

                var obj = {
                    resourceName: resourceName,
                    resourceUrl: resourceLink
                };

                objArray.push(obj);
                index++;
            } else {
                break;
            }
        }

        return objArray;
    }

    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileReset = () => {
        setSelectedFile(null);
    };

    return (
        <div className="mx-10">
            <form

                onSubmit={handleSubmit((data) => {
                    if (showLinkFormValue) {
                        const sendData = {
                            groupName: groupName,
                            jobProfileName: jobProfileName,
                            objArray: convertToObjectArray(data)
                        };
                        console.log(sendData);
                        dispatch(addTrainingLinksAsync(sendData));
                    }
                    if (showDocumentsForm) {
                        console.log(data);
                        const formData = new FormData();
                        formData.append('file', selectedFile);
                        formData.append('fileName', data.fileName);
                        formData.append('groupName', groupName);
                        formData.append('JobProfileName', jobProfileName);
                        for (const entry of formData.entries()) {
                            console.log(entry[0] + ": " + entry[1]);
                        }
                        dispatch(addTrainingDocumentsAsync(formData))
                    }
                    handleFormSubmit();
                })}
            >

                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Add Training Resources</h1>
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
                <div className="mt-10 flex gap-4">
                    <div onClick={handleLinkClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a Link</p></div>
                    <div onClick={handleDocumentClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a Document</p></div>
                </div>

                {/* LINK FORM START */}
                {(showLinkFormValue && showLinkForm) && showLinkForm.map((element: any, index: any) => {
                    return <div key={index} className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>

                        <div key={element} className='flex gap-10 mx-6'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Resource Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register(`resourceName${index + 1}`, { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Resource Link</p>
                                </div>
                                <div>
                                    <input
                                        {...register(`resourceLink${index + 1}`, { required: true })}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {/* LINK FORM END */}
                {/* DOCUMENT FORM STARTS */}
                {showDocumentsForm && <div className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>
                    <div className='flex gap-10 mx-6'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Resource Name</p>
                            </div>
                            <div>
                                <input
                                    {...register(`fileName`, { required: true })}
                                    type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm font-normal text-[#1C1C1C]'>Attachment</p>
                            </div>
                            <div className="relative">
                                {selectedFile ? (
                                    <div className="flex items-center justify-center border border-dashed border-[#DEDEDE] bg-[#FAFAFA] w-[300px] h-14 rounded-sm">
                                        <span className="text-[12px] leading-5 font-normal text-[#666666]">{selectedFile.name}</span>
                                        <button onClick={handleFileReset}>
                                            <img src={X} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center border border-dashed border-[#9198F7] bg-[#ECEDFE] w-[300px] h-14 rounded-sm">
                                        <label htmlFor="files" className="text-[12px] leading-5 font-normal text-[#666666]">Drag & Drop or<span className="text-[#283093] underline cursor-pointer"> Browse</span></label>
                                        <input
                                        {...register("file", {required: true})}
                                            type="file"
                                            name="file"
                                            id="files"
                                            className="absolute opacity-0"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                  )}
                            </div>
                        </div>
                    </div>
                </div>}
                {/* DOCUMENT FORM ENDS */}
                <div className="mt-10">
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={FileArrowUp} className='w-4' alt="" /><p className="px-2">Upload Resources</p></button>
                </div>
            </form>
        </div>
    )
}

export default AddTraningResources