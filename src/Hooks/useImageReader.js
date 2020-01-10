import {useState,useEffect} from 'react';

const useImageReader = () => {

    const [imagesListState, setImagesListState] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const [resultState, setResultState] = useState(null);
    const [idState, setIdState] = useState(0);
  
    const setImagesList = (images) => {
      setLoadingState(true);
      setImagesListState(images);
    }
  
    useEffect(() => {
      if(imagesListState) {
        const result = imagesListState.map((img, index) => {
          setIdState(idState+index);
          return {
            id:idState+index, 
            file:img,
            img:URL.createObjectURL(img),
            activated:true,
            deleted:false
          };
        })
        setResultState(result);
        setLoadingState(false);
      }
    },[imagesListState]);
    
    return [setImagesList, loadingState, resultState,imagesListState];
  
  };

  export default useImageReader;