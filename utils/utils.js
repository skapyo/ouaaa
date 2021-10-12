/* function to build the url of an image, adding the url before the image path */
export const getImageUrl = (url) => {
  if (url == null) return null;
  return `${process.env.NEXT_PUBLIC_URI}${url}`;
};

export const entriesHasElementWithCode = (entries, code) => {
  let hasEntry = false;
  if (entries) {
    entries.map((entry) => {
      if (entry && entry.collection && entry.collection.code === code) {
        hasEntry = true;
      }
      return hasEntry;
    });
  }

  return hasEntry;
};

/* parse Text and find the URL to show as hyperlink */
export const linkify = (text) => {
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
};
