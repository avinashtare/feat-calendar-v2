"use client";
import React, {
  FormEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { CalenderModalProps, UserData } from "./types";
import { months } from "./calender-constants";

const CalenderModal: React.FC<CalenderModalProps> = ({
  selectedDate,
  modalActions,
}) => {
  const [ShowModalState, setShowModal] = useState({ show: false });
  const modalRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<UserData>({
    id: null,
    exerciseName: null,
    trainerName: null,
    startTime: null,
    endTime: null,
    period: null,
    customerName: null,
    currentDate: null,
    userPicture: null,
  });

  const showModal = (): void => {
    setShowModal({ show: true });
    modalRef.current?.classList && modalRef.current.classList.add("opacity-0");
    setTimeout(() => {
      modalRef.current?.classList &&
        modalRef.current.classList.add("opacity-1");
    }, 300);
  };

  const HideModal = (): void => {
    modalRef.current?.classList && modalRef.current.classList.add("opacity-0");
    setTimeout(() => {
      setShowModal({ show: false });
    }, 600);
  };

  const handleFileUplaod = (e: HTMLInputElement): void => {
    if (e.files) {
      const fileName = "/" + e.files[0].name;
      setUserData({ ...userData, userPicture: fileName });
    }
  };

  const submitForm = (element: React.FormEvent<HTMLFormElement>): void => {
    element.preventDefault();
    const { month, year, day } = modalActions.clickdDates;
    let currentDate = "";

    if (month !== null && year !== null && day !== null) {
      currentDate = new Date(
        parseInt(year),
        months.indexOf(month),
        day + 1
      ).toISOString();
    }

    const newUserData = {
      ...userData,
      currentDate,
      id: "user" + Math.random(),
    };
    //set state
    setUserData(newUserData);
    //call back
    selectedDate(newUserData);
    HideModal();
  };

  const modalClickEvent = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target instanceof HTMLElement && event.target.id === "modal") {
      HideModal();
    }
  };

  useEffect(() => {
    if (modalActions.show) {
      showModal();
    }
  }, [modalActions]);

  // init
  useEffect(() => {
    ShowModalState.show ? showModal() : HideModal();
  }, []);

  return (
    <div>
      <>
        <div
          className={`${
            ShowModalState.show ? "flex" : "hidden"
          } z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000009b] flex justify-center  duration-500`}
          ref={modalRef}
          onClick={modalClickEvent}
          id="modal"
        >
          <form
            className="absolute w-[500px] bg-[#1e1e1e] top-[20%] rounded-lg px-6 py-5"
            onSubmit={submitForm}
          >
            <div className="top flex justify-between">
              <span className="text-white">Add Note</span>
              <IoMdClose
                className="text-red-800 hover:text-white duration-500 font-sans text-xl cursor-pointer"
                onClick={(): void => {
                  HideModal();
                }}
              />
            </div>
            {/* first input  */}
            <div className="inputs flex flex-col	gap-4 pt-2">
              <input
                type="text"
                className="outline-none px-2 py-1 bg-[#1e1e1e] border border-t-gray-100 rounded-lg text-white font-sans"
                placeholder="Enter Exercise Name"
                value={userData.exerciseName ? userData.exerciseName : ""}
                onChange={(e) =>
                  setUserData({ ...userData, exerciseName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Enter Exercise trainer"
                className="outline-none px-2 py-1 bg-[#1e1e1e] border border-t-gray-100 rounded-lg text-white font-sans"
                value={userData.trainerName ? userData.trainerName : ""}
                onChange={(e) =>
                  setUserData({ ...userData, trainerName: e.target.value })
                }
              />
            </div>
            {/* time secon  */}
            <div className="times flex justify-between my-2">
              <div className="flex items-center justify-center">
                <label
                  className="text-nowrap text-white font-sans-1 text-sm mr-2"
                  htmlFor="input-time--1"
                >
                  Start Time:
                </label>
                <input
                  type="time"
                  className="w-20"
                  onChange={(e) => {
                    setUserData({ ...userData, startTime: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-nowrap text-white font-sans-1 text-sm mr-2">
                  End Time:
                </label>
                <input
                  type="time"
                  className="w-20"
                  onChange={(e) => {
                    setUserData({ ...userData, endTime: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-nowrap text-white font-sans-1 text-sm mr-2">
                  AM/PM
                </label>
                <select
                  value={userData.period ? userData.period : "AM"}
                  onChange={(e) => {
                    setUserData({ ...userData, period: e.target.value });
                  }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            {/* customer name */}
            <div className="inputs flex flex-col	gap-4 pt-2">
              <input
                type="text"
                className="outline-none px-2 py-1 bg-[#1e1e1e] border border-t-gray-100 rounded-lg text-white font-sans"
                placeholder="Enter Customer Name"
                value={userData.customerName ? userData.customerName : ""}
                onChange={(e) =>
                  setUserData({ ...userData, customerName: e.target.value })
                }
              />
              <input
                type="file"
                className="outline-none px-2 py-1 bg-[#1e1e1e] border border-t-gray-100 rounded-lg text-white font-sans"
                onChange={(e) => handleFileUplaod(e.target)}
              />
            </div>
            {/* actions  */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="border mx-2 mt-4 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Add
              </button>
              <button
                type="button"
                className="border mx-2 mt-4 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={(): void => {
                  HideModal();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default CalenderModal;
