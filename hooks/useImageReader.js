import {useEffect, useState} from 'react';

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
          const url = URL.createObjectURL(img);
          return {
            id:idState+index, 
            file:img,
            img:url,
            croppedImg : {
              crop:{
                x : 0,
                y : 0
              },
              rotation : 0,
              zoom : 1,
              file : img,
              img : url,
              modified : false
            },
            activated:true,
            deleted:false,
            newpic : true,
            serverId : null
          };
        })
        setResultState(result);
        setLoadingState(false);
      }
    },[imagesListState]);
    
    return [setImagesList, loadingState, resultState,imagesListState];
  
  };

  export default useImageReader;