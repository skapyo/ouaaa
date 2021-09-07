/* function to build the url of an image, adding the url before the image path */
export const getImageUrl = (url) => {
  if (url == null) return null;
  return `${process.env.NEXT_PUBLIC_URI}${url}`;
};

export const entriesHasElementWithCode = (entries, code) => {
  let hasEntry = false;
  debugger;
  entries.map(
    (entry) => {
      if (entry
      && entry.collection
      && entry.collection.code
        === code) {
        hasEntry = true;
      }
      return hasEntry;
    },
  );

  return hasEntry;
};
