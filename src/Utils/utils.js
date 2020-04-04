import {Responsive} from "semantic-ui-react";
import config from './../config.json';

/* retur width */
export const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* build uuid v4 */
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/* function to build the url of an image, adding the url before the image path */
export const getImageUrl = (url) => {
  return `${config.API_SERVER.HTTP}://${config.API_SERVER.URL}${url}`;
} ;

/* function to validate email format */
export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

// To DO
export const validateFloatType = (dataToValidate) => {

};

/* function to ommit typename key from graphql results */
export const omitTypename = (object) => {
  const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
  return JSON.parse(JSON.stringify(object), omitTypename);
};

/* function to build options array for Select Component (quantity selection) */
export const buildQuantitySelectOptions = (qavailable) => {
  let options = [];
  for (let i = 0; i <= qavailable; i++) {
    options.push({
      key:i,
      value:i,
      text:i
    });
  }
  return options;
};