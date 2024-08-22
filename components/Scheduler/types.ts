export enum CalendarSelectionType {
  Month = "Month",
  Year = "Year",
}

export interface SelectDates {
  year: string | null;
  month: string | null;
  day: number | null;
}

export type getMonthFromYear = {
  month: string;
};

export interface CalenderProps {
  currentCalendar: CalendarSelectionType;
  SelectedDates: SelectDates;
  navigateMonth: (month: getMonthFromYear) => void;
  changeCalenderSelection: (calenderSelection: CalendarSelectionType) => void;
}

export interface getTotalDaysTypes {
  lastMonth: number | null;
  present: number | null;
  presentFirstDay: number | null;
}

export interface MonthYearCalenderProps {
  today: SelectDates;
  CurrentDateUser: SelectDates;
  getTotalDays?: getTotalDaysTypes;
  navigateMonth?: (month: getMonthFromYear) => void;
  changeCalenderSelection?: (calenderSelection: CalendarSelectionType) => void;
}
