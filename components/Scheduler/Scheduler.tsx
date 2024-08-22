"use client";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { months } from "./calender-constants";
import { CalendarSelectionType, getMonthFromYear, SelectDates } from "./types";
import { getYearMonth } from "./Date.Uitls";
import "./style.css";

const Schedule: React.FC = () => {
  const [calendarSelection, setCalendarSelection] = useState(
    CalendarSelectionType.Month
  );

  const changeCalenderSelection = (
    calenderSelection: CalendarSelectionType
  ): void => {
    if (calenderSelection == CalendarSelectionType.Year) {
      setCalendarSelection(CalendarSelectionType.Year);
    } else {
      setCalendarSelection(CalendarSelectionType.Month);
    }
  };

  const [SelectDates, setDates] = useState<SelectDates>({
    month: null,
    year: null,
    day: null,
  });

  // suer click on month from year section
  const handleClickYear = ({ month }: getMonthFromYear): void => {
    setDates({ ...SelectDates, month });
  };

  useEffect(() => {
    const { month, year, day } = getYearMonth();
    setDates({ month, year, day });
  }, []);

  return (
    <>
      <div className="bg-[#1E1E1E] w-full p-4 rounded-lg">
        <div className="title">
          <span className="text-white">Workout Schedule</span>
        </div>
        {/* top  */}
        <div className="mx-2">
          {/* actions  */}
          <div className="actions flex mt-4">
            {/* selectors  */}
            <div className="selector">
              {/* select years */}
              <select
                className="bg-[#1E1E1E] font-sans outline-none text-white border-[1px] rounded-md cursor-pointer h-8"
                value={SelectDates.year ? SelectDates.year : ""}
                onChange={(e) => {
                  setDates({ ...SelectDates, year: e.currentTarget.value });
                }}
              >
                {Array.from({ length: 50 }).map((_, index) => (
                  <option key={index} value={index + 2015}>
                    {index + 2015}
                  </option>
                ))}
              </select>

              {/* select months */}
              {calendarSelection == CalendarSelectionType.Month ? (
                <select
                  className="ml-2 bg-[#1E1E1E] font-sans  text-center outline-none text-white border-[1px] rounded-md cursor-pointer h-8"
                  value={SelectDates.month ? SelectDates.month : ""}
                  onChange={(e) => {
                    setDates({ ...SelectDates, month: e.currentTarget.value });
                  }}
                >
                  {months.map((month, index) => (
                    <option
                      key={index}
                      value={month}
                      className="cursor-pointer"
                    >
                      {month}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
            </div>
            {/* years month clickcable  */}
            <div className="ml-4">
              <button
                className={`mr-2 border-[1px] font-sans p-1 px-2 pl-4 ${
                  calendarSelection == CalendarSelectionType.Month
                    ? "text-green-600 border-green-600"
                    : "text-white border-white"
                } rounded-l-lg h-8 w-20`}
                onClick={() =>
                  changeCalenderSelection(CalendarSelectionType.Month)
                }
              >
                Month
              </button>
              <button
                className={`mr-2 border-[1px] font-sans p-1 px-2 pr-4 ${
                  calendarSelection == CalendarSelectionType.Year
                    ? "text-green-600 border-green-600"
                    : "text-white border-white"
                } rounded-r-lg h-8 w-20`}
                onClick={() =>
                  changeCalenderSelection(CalendarSelectionType.Year)
                }
              >
                Year
              </button>
            </div>
          </div>
        </div>
        {/* calender year - months  */}
        <Calender
          currentCalendar={calendarSelection}
          SelectedDates={SelectDates}
          navigateMonth={handleClickYear}
          changeCalenderSelection={changeCalenderSelection}
        />
      </div>
    </>
  );
};

export default Schedule;
