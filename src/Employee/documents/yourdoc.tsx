import { useEffect, useState } from 'react';
import axios from 'axios';
import { getEmployeeDocsRouterApiPath } from '../../APIRoutes';

export const Yourdoc = ({ id }: { id: string }) => {
    const [imageUrls, setImageUrls] = useState<any>([]);

    const viewdoc = async (id: string) => {
        try {
            const response = await axios.get(`${getEmployeeDocsRouterApiPath}/64b3b5a9772e74ea54bc98c9`);
            const data = response.data;
            console.log(data, response);
            if (data.doc && data.doc.length > 0 && data.doc[0].document) {
                const documents = data.doc[0].document;
                const mappedImages = documents.map((document: any) => ({
                    id: document._id,
                    name: document.docsName,
                    url: document.docs,
                }));
                console.log("hey", id)
                setImageUrls(mappedImages);
            } else {
                setImageUrls([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        viewdoc(id);
    }, [id]);

    return (
        <div className='flex flex-col items-start self-stretch max-w-[768px] pt-[32px]  px-[40px] gap-[32px]'>
            <div className="text-[#2E2E2E] text-2xl font-inter font-bold leading-8">
                Your Documents
            </div>
            {imageUrls && imageUrls.map((image: any, index: number) => (
                <img key={index} src={image.url} alt={`Image ${index}`} />
            ))}
        </div>
    );
};
