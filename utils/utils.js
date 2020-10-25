/* function to build the url of an image, adding the url before the image path */
export const getImageUrl = (url) => {
    if(url==null)
        return null;
    return `${config.API_SERVER.HTTP}://${config.API_SERVER.URL}${url}`;
} ;
