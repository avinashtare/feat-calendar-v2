export enum CalendarSelectionType {
  Month = "Month",
  Year = "Year",
}

export interface SelectDates {
  year: string | null;
  month: string | null;
  day: number | null;
}

export interface ModalActionsState {
  show: boolean;
  clickdDates: SelectDates;
}

export type getMonthFromYear = {
  month: string;
};

export interface CalenderProps {
  currentCalendar: CalendarSelectionType;
  SelectedDates: SelectDates;
  navigateMonth: (month: getMonthFromYear) => void;
  changeCalenderSelection: (calenderSelection: CalendarSelectionType) => void;
  getClikedDay: (day: SelectDates) => void;
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
  getClikedDay?: (day: SelectDates) => void;
}

export interface UserData {
  id: string | null;
  exerciseName: string | null;
  trainerName: string | null;
  startTime: string | null;
  endTime: string | null;
  period: string | null;
  customerName: string | null;
  currentDate: string | null;
  userPicture?: string | null;
}

export interface SchedulerProps {
  selectedDate: (data: UserData) => void;
}
export interface CalenderModalProps {
  selectedDate: (data: UserData) => void;
  modalActions: ModalActionsState;
  closeModal: () => void;
}
