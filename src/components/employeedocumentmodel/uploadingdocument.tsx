import { useForm } from "react-hook-form";
import Add from '../../assets/BluePlus.png'
import React, { useRef, useState } from "react";
import arrow from "../../assets/FileArrowUp.png"
// import glass from "../../assets/MagnifyingGlass.png";


interface DocumentFormData {
    resourceDocsName: string;
    attachment: string;
}

export const EmployeeUploadingdocument = () => {





    // DOCUMENT FORM CODE STARTS
    const [showDocumentsForm, setShowDocumentsForm] = useState<DocumentFormData[]>([]);
    const handleDocumentClick = () => {
        const newForm: DocumentFormData = {
            resourceDocsName: '',
            attachment: ''
        };
        setShowDocumentsForm([...showDocumentsForm, newForm]);
    }
    const handleDocumentInputChange = (index: number, field: keyof DocumentFormData, value: string) => {
        const updatedForms = [...showDocumentsForm];
        updatedForms[index][field] = value;
        setShowDocumentsForm(updatedForms);
    };
    console.log(showDocumentsForm)
    // DOCUMENT FORM CODE ENDS


    const handleFormSubmit = () => {
        setShowDocumentsForm([]);
    }

    // search
    const [search, setSearch] = React.useState('');

    // const handleInputChange = (event:any) => {
    //     setSearch(event.target.value);
    // };

    React.useEffect(() => {
        console.log(search);
        setSearch("")
    }, [search]);




    // INPUT FILES START


    function handleFile(files: any) {

        alert("Number of files: " + files.length);
    }


    // drag drop file component
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef<any>(null)

    // handle drag events
    const handleDrag = function (e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e: any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    // INPUT FILES END

    const {
        register,
        handleSubmit,
    } = useForm();
    return (
        <div className="mx-10">
            <form
                onDragEnter={handleDrag}
                onSubmit={handleSubmit((data) => {

                    console.log(data)
                    handleFormSubmit();
                })}
            >
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Uploading Documents</h1>
                        <p className="text-[#000000] text-[16px] leading-6 font-bold">For Madhav Sharma</p>
                    </div>
                </div>
                <div className="mt-10 flex gap-4">
                    <button onClick={handleDocumentClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={Add} className='w-4' alt="" /><p className="px-2">Add a Document</p></button>
                </div>


                {/* DOCUMENT FORM STARTS */}

                {showDocumentsForm && showDocumentsForm.map((element, index) => {
                    console.log(element)
                    return <div key={index} className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>

                        <div className='flex gap-10 mx-6'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Document Name</p>
                                </div>
                                <div>
                                    <input
                                        {...register(`resourceDocsName${index + 1}`, { required: true })}
                                        onChange={(e) => handleDocumentInputChange(index, 'resourceDocsName', e.target.value)}
                                        value={element.resourceDocsName}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Attachment</p>
                                </div>
                                <div>
                                    {/* <input
                                        {...register(`attachment${index + 1}`, { required: true })}
                                        onChange={(e) => handleDocumentInputChange(index, 'attachment', e.target.value)}
                                        value={element.attachment}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' /> */}
                                    <input ref={inputRef} type="file" className='hidden' multiple={true} onChange={handleChange} />
                                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                                        <div className="flex gap-1 text-[12px] items-center justify-center leading-5 border border-dashed border-[#9198F7] w-[300px] h-14 rounded-sm bg-[#ECEDFE]">
                                            <p className="text-[#666666]">Drag & Drop or </p>
                                            <div className="upload-button underline text-[#283093] cursor-pointer" onClick={onButtonClick}>Browse</div>
                                        </div>
                                    </label>
                                    {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {/* DOCUMENT FORM ENDS */}
                <div className="mt-10">
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={arrow} className='w-4' alt="" /><p className="px-2">Upload Resources</p></button>
                </div>
            </form>
        </div>
    )
}
