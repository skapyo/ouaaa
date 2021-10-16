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

export const urlWithHttpsdefault = (url) => {
  if (!url.includes('http')) {
    return `https://${url}`;
  }
  return url;
};

/* parse Text and find the URL to show as hyperlink */
export const linkify = (text) => {
  const urlRegex = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gi;
  return text.replace(urlRegex, (url) => {
    return `<a href="${urlWithHttpsdefault(url)}" + target="_blank">${urlWithHttpsdefault(url)}</a>`;
  });
};
