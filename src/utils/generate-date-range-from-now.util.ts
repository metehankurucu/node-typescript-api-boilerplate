const generateDateRangeFromNow = (
  seconds: number = 1,
  mins: number = 1,
  hours: number = 1,
  days: number = 1,
) => {
  const startDate = new Date(Date.now() - 1000 * seconds * mins * hours * days);
  return {
    startDate,
    endDate: new Date(),
  };
};

export default generateDateRangeFromNow;
