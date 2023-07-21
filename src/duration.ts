const getDurationString = (startDate: Date, endDate: Date) => {
  const start = endDate.getTime();
  const end = startDate.getTime();
  const diffTime = Math.abs(start - end);
  const months = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const remMonths = months % 12;
  const remYears = Math.floor(months / 12);

  const durationStr =
    (remYears > 0 ? `${remYears} year${remYears > 1 ? 's' : ''}` : '') +
    (remMonths > 0 ? ` ${remMonths} month${remMonths > 1 ? 's' : ''}` : '');

  return durationStr;
};

export { getDurationString };
