const omitTypename = (object) => {
  const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
  return JSON.parse(JSON.stringify(object), omitTypename);
};

export default omitTypename;
