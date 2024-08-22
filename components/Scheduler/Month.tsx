import { MonthYearCalenderProps } from "./types/types";
import { months, weeks } from "./utils/calender-constants";

const MonthsCalander: React.FC<MonthYearCalenderProps> = ({
  today,
  CurrentDateUser,
  getTotalDays,
  getClikedDay,
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
      {/* all day box  */}
      <div className="grid grid-cols-7 gap-1 w-full">
        {getTotalDays?.presentFirstDay &&
          Array.from({ length: 35 }).map((_, index) => {
            let currentDate = null;
            let currentYear = CurrentDateUser.year;
            let currentMonth = CurrentDateUser.month;
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

                // get this find for months
                if (CurrentDateUser.month) {
                  if (
                    months.indexOf(CurrentDateUser.month) - 1 < 0 &&
                    CurrentDateUser.year
                  ) {
                    currentMonth = months[11];
                    currentMonth = months[0];
                    currentYear = (
                      parseInt(CurrentDateUser.year) - 1
                    ).toString();
                  } else {
                    currentMonth =
                      months[months.indexOf(CurrentDateUser.month) - 1];
                  }
                }
              } else {
                let day = index - getTotalDays.presentFirstDay + 2;
                if (CurrentDateUser.month)
                  currentMonth = months[months.indexOf(CurrentDateUser.month)];

                if (getTotalDays.present < day) {
                  day = day % getTotalDays.present;

                  // find month if user click on like current month is aug then user click on july 11 or sep 1
                  if (CurrentDateUser.month)
                    currentMonth =
                      months[months.indexOf(CurrentDateUser.month) + 1];
                  if (
                    CurrentDateUser.month &&
                    months.indexOf(CurrentDateUser.month) >= 11 &&
                    CurrentDateUser.year
                  ) {
                    currentMonth = months[0];
                    currentYear = (
                      parseInt(CurrentDateUser.year) + 1
                    ).toString();
                  }
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
                  onClick={() => {
                    getClikedDay &&
                      getClikedDay({
                        day: currentDate,
                        month: currentMonth,
                        year: currentYear,
                      });
                  }}
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

export default MonthsCalander;
