import React, { useEffect, useState } from "react";
import { months, weeks } from "./calender-constants";
import {
  CalenderProps,
  CalendarSelectionType,
  SelectDates,
  MonthYearCalenderProps,
  getTotalDaysTypes,
} from "./types";
import { getTotalDays, getYearMonth } from "./Date.Uitls";

const Calender: React.FC<CalenderProps> = ({
  currentCalendar,
  SelectedDates,
  navigateMonth,
  changeCalenderSelection,
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
        />
      ) : (
        ""
      )}
    </div>
  );
};

const YearCalander: React.FC<MonthYearCalenderProps> = ({
  today,
  CurrentDateUser,
  navigateMonth,
  changeCalenderSelection,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 w-full">
        {navigateMonth &&
          changeCalenderSelection &&
          months.map((month, index) => (
            <div
              key={index}
              onClick={(): void => {
                navigateMonth({ month });
                changeCalenderSelection(CalendarSelectionType.Month);
              }}
              className={`border-transparent border border-t-gray-500 h-auto aspect-[12/5]  hover:bg-[rgba(13,13,13,0.26)] cursor-pointer ${
                today.month == month && CurrentDateUser.year == today.year
                  ? "border-t-sky-600 "
                  : ""
              }`}
            >
              <span className="p-2 font-semibold text-white text-sm text-right font-sans block">
                {month}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

const MonthsCalander: React.FC<MonthYearCalenderProps> = ({
  today,
  CurrentDateUser,
  getTotalDays,
}) => {
  return (
    <>
      {/* top weeks  */}
      <div className="grid grid-cols-7 gap-1 w-full">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="text-right mr-2 text-white font-sans text-base"
          >
            {week}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 w-full">
        {getTotalDays?.presentFirstDay &&
          Array.from({ length: 35 }).map((_, index) => {
            let currentDate = 0;
            if (
              getTotalDays?.presentFirstDay !== null &&
              getTotalDays.present != null &&
              getTotalDays.lastMonth != null
            ) {
              let newDate = 1111;
              if (index < getTotalDays.presentFirstDay - 1) {
                newDate =
                  getTotalDays.lastMonth -
                  getTotalDays.presentFirstDay +
                  index +
                  2;
              } else {
                let day = index - getTotalDays.presentFirstDay + 2;
                if (getTotalDays.present < day) {
                  day = day % getTotalDays.present;
                }

                newDate = day;
              }
              currentDate = newDate != null ? newDate : 0;
            }
            return (
              <div
                key={index}
                className="h-auto aspect-[6/5] flex items-center justify-center px-1"
              >
                <div
                  className={`box relative flex justify-end w-full h-full border-2 border-l-0 border-r-0 border-b-0 border-gray-500  cursor-pointer ${
                    today.day == currentDate &&
                    today.month == CurrentDateUser.month &&
                    today.year == CurrentDateUser.year
                      ? "bg-sky-600 hover:bg-sky-400"
                      : "hover:bg-[rgba(13,13,13,0.26)]"
                  }`}
                >
                  <span className="p-2 font-semibold text-white text-sm">
                    {currentDate}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Calender;
