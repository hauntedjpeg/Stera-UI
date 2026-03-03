import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { addDays, isSameDay, setHours, setMinutes } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@arc/ui";

const meta: Meta<typeof Calendar> = {
  title: "Arc UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Calendar>;

const calendarClassName = "rounded-lg border";

export const Default: Story = {
  args: { className: calendarClassName },
};

export const Basic: Story = {
  render: function BasicCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className={calendarClassName}
      />
    );
  },
};

export const Range: Story = {
  render: function RangeCalendar() {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className={calendarClassName}
      />
    );
  },
};

export const MonthAndYearSelector: Story = {
  render: function MonthAndYearSelectorCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className={calendarClassName}
      />
    );
  },
};

export const Presets: Story = {
  render: function PresetsCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = new Date();
    const presets = [
      { label: "Today", date: today },
      { label: "Tomorrow", date: addDays(today, 1) },
      { label: "In 3 days", date: addDays(today, 3) },
      { label: "In a week", date: addDays(today, 7) },
      { label: "In 2 weeks", date: addDays(today, 14) },
    ];
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={calendarClassName}
        />
        <div className="flex flex-wrap gap-2">
          {presets.map(({ label, date: d }) => (
            <button
              key={label}
              type="button"
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
              onClick={() => setDate(d)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const DateAndTimePicker: Story = {
  render: function DateAndTimePickerCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");

    const applyTimeToDate = (d: Date | undefined, time: string) => {
      if (!d) return d;
      const [hours, minutes] = time.split(":").map(Number);
      return setMinutes(setHours(new Date(d), hours), minutes);
    };

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={calendarClassName}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="start-time">
              Start Time
            </label>
            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="end-time">
              End Time
            </label>
            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs"
            />
          </div>
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString()} from{" "}
            {applyTimeToDate(date, startTime)?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            to{" "}
            {applyTimeToDate(date, endTime)?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    );
  },
};

const bookedDates = [
  addDays(new Date(), 2),
  addDays(new Date(), 5),
  addDays(new Date(), 7),
  addDays(new Date(), 10),
];

export const BookedDates: Story = {
  render: function BookedDatesCalendar() {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(d: Date) =>
          bookedDates.some((booked) => isSameDay(d, booked))
        }
        className={calendarClassName}
      />
    );
  },
};

export const CustomCellSize: Story = {
  render: function CustomCellSizeCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className={`${calendarClassName} [--cell-size:2.75rem] md:[--cell-size:3rem]`}
      />
    );
  },
};

export const WeekNumbers: Story = {
  render: function WeekNumbersCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showWeekNumber
        className={calendarClassName}
      />
    );
  },
};
