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
export const rruleToText = (rrule) => {
  const yourStrings = {
    every: 'Chaques',
    until: "jusqu'au",
    day: 'jour',
    days: 'jour',
    week: 'semaine',
    weeks: 'semaines',
    on: 'le',
    in: 'in',
    'on the': 'le',
    for: 'pour',
    and: 'et',
    or: 'ou',
    at: 'à',
    last: 'dernier',
    '(~ approximate)': '(~ approximativement)',
    times: 'fois',
    time: 'fois',
    minutes: 'minutes',
    hours: 'heures',
    weekdays: 'jours de la semaine',
    weekday: 'jour de la semaine',
    months: 'mois',
    month: 'mois',
    years: 'années',
    year: 'année',
  };
  const language = {
    dayNames: [
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
      'dimanche',
    ],
    monthNames: [
      'janvier ',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'aoùt',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
  };
  const getText = (id) => {
    return yourStrings[id];
  };

  const dateFormat = (year, month, day) => `${day} ${month} ${year}`;

  return rrule.toText(getText, language, dateFormat);
};
export const urlWithHttpsdefault = (url) => {
  if (url && !url.includes('http')) {
    return `https://${url}`;
  }
  return url;
};
export const urlRectification = (text) => {
  const urlRegex = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gi;
  return text.replace(urlRegex, (url) => {
    return `${urlWithHttpsdefault(url)}`;
  });
};

/* parse Text and find the URL to show as hyperlink */
export const linkify = (text) => {
  const urlRegex = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gi;
  return text.replace(urlRegex, (url) => {
    return `<a href="${urlWithHttpsdefault(url)}" + target="_blank">${url}</a>`;
  });
};
