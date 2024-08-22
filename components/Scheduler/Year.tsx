import { CalendarSelectionType, MonthYearCalenderProps } from "./types/types";
import { months } from "./utils/calender-constants";

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
              } ${
                CurrentDateUser.month == month
                  ? "bg-sky-600 hover:bg-sky-500"
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

export default YearCalander;
