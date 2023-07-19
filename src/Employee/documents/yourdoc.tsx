import { useEffect, useState } from 'react';
import axios from 'axios';
import { uploadImageApiPath } from '../../APIRoutes';

export const Yourdoc = () => {
    const [imageUrls, setImageUrls] = useState<Document[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${uploadImageApiPath}`);
          const data = response.data;
          console.log(data);
          const documents = data.doc[0].document;
          const mappedImages = documents.map((document: any) => ({
            id: document._id,
            name: document.docsName,
            url: document.docs,
          }));
          console.log(mappedImages);
          setImageUrls(mappedImages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

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
