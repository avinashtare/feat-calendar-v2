import React, { useEffect, useState } from "react";
import {
  CalenderProps,
  CalendarSelectionType,
  SelectDates,
  getTotalDaysTypes,
} from "./types/types";
import { getTotalDays, getYearMonth } from "./utils/Date.Uitls";
import MonthsCalander from "./Month";
import YearCalander from "./Year";

const Calender: React.FC<CalenderProps> = ({
  currentCalendar,
  SelectedDates,
  navigateMonth,
  changeCalenderSelection,
  getClikedDay,
}) => {
  const [CurrentDateUser, setCurrentDateShow] = useState<getTotalDaysTypes>({
    lastMonth: null,
    present: null,
    presentFirstDay: null,
  });

  const [Today, setToday] = useState<SelectDates>({
    day: null,
    month: null,
    year: null,
  });

  useEffect(() => {
    if (SelectedDates.year && SelectedDates.month) {
      let totalDays = getTotalDays(
        parseInt(SelectedDates.year),
        SelectedDates.month
      );
      setCurrentDateShow(totalDays);
    }
  }, [SelectedDates]);

  // update only ones to get todays date
  useEffect(() => {
    const today = getYearMonth();
    setToday({ ...today });
  }, []);

  return (
    <div className="w-full mt-5">
      {CalendarSelectionType.Year == currentCalendar ? (
        <YearCalander
          today={Today}
          changeCalenderSelection={changeCalenderSelection}
          CurrentDateUser={SelectedDates}
          navigateMonth={navigateMonth}
        />
      ) : (
        ""
      )}
      {CalendarSelectionType.Month == currentCalendar ? (
        <MonthsCalander
          today={Today}
          CurrentDateUser={SelectedDates}
          getTotalDays={CurrentDateUser}
          getClikedDay={getClikedDay}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Calender;
