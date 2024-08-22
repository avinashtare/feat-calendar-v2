import { months } from "./calender-constants";
import { getTotalDaysTypes } from "../types/types";
export const getYearMonth = () => {
  let dateObj = new Date();

  let year = dateObj.getFullYear().toString();
  let month = months[dateObj.getMonth()];
  let day = dateObj.getDate();

  return { year, month, day };
};

export const getTotalDays = (
  year: number,
  month: string
): getTotalDaysTypes => {
  const monthInt = months.indexOf(month);

  const presentFirstDay = new Date(year, monthInt, 1).getDay() + 1;

  let lastMonth;
  if (monthInt <= 0) {
    lastMonth = new Date(year - 1, 12, 0).getDate();
  } else {
    lastMonth = new Date(year, monthInt, 0).getDate();
  }
  const present = new Date(year, monthInt + 1, 0).getDate();
  let dates = {
    lastMonth,
    present,
    presentFirstDay,
  };
  return dates;
};
