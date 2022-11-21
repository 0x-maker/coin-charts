import moment from "moment";

const getDateYear = () => {
  return {
    start: moment().subtract(1, "years").valueOf(),
    end: moment().valueOf(),
    interval: "d1",
  };
};

const getDateDay = () => {
  return {
    start: moment().subtract(1, "days").valueOf(),
    end: moment().valueOf(),
    interval: "h1",
  };
};

const getDateMonth = () => {
  return {
    start: moment().subtract(1, "months").valueOf(),
    end: moment().valueOf(),
    interval: "d1",
  };
};

const getDateWeek = () => {
  return {
    start: moment().subtract(1, "weeks").valueOf(),
    end: moment().valueOf(),
    interval: "d1",
  };
};

export const CHART_DATES = [
  {
    key: "year",
    label: "Year",
    params: getDateYear,
  },
  {
    key: "30day",
    label: "Month",
    params: getDateMonth,
  },
  {
    key: "7day",
    label: "Week",
    params: getDateWeek,
  },
  {
    key: "1day",
    label: "Day",
    params: getDateDay,
  },
];
