const deleteUndefinedProps = (obj: object) => {
  const values = { ...obj };
  Object.keys(values).forEach((key) => {
    if (values[key] === undefined) {
      delete values[key];
    }
  });
  return values;
};

export default deleteUndefinedProps;
