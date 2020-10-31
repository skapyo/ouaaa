/* function to build the url of an image, adding the url before the image path */
export const getImageUrl = (url) => {
    if(url==null)
        return null;
    debugger;
    return `${process.env.NEXT_PUBLIC_URI}${url}`;
} ;
