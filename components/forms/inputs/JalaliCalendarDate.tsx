"use client";

import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useDaeStore } from "@/stores/dateStore";
import DateObject from "react-date-object";

type Props = {
  value: DateObject | null;
  onChange: (value: DateObject | null) => void;
};

export default function JalaliCalendarDate({ value, onChange }: Props) {

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 border border-gray-300 rounded text-black">
      <Calendar
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        format="MM/DD/YYYY HH:mm:ss"
        // plugins={[<TimePicker position="bottom" />]}
      />
      {value ? (
        <span className="ml-4 text-sm text-gray-800">
          تاریخ انتخاب‌ شده: {value.format("YYYY/MM/DD")}
        </span>
      ) : (
        <span className="ml-4 text-sm text-center text-red-400">
          لطفا تاریخ تولد خود را از کادر بالا انتخاب کنید
        </span>
      )}
    </div>
  );
}
