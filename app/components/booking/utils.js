import moment from "moment";

export const getDuration = (startDate, endDate, type = "days") => {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const duration = endMoment.diff(startMoment, type) || 0;

  return duration;
};

export const getRange = (startDate, endDate, type = "days") => {
  let fromDate = moment(startDate);
  let toDate = moment(endDate).add(1, type);
  let diff = toDate.diff(fromDate, type);
  let range = [];
  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, type).toDate());
  }
  return range;
};
