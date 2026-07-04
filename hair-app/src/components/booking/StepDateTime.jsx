import { useMemo } from 'react';
import { useBooking, formatDayLabel } from '../../context/BookingContext';

const TIME_SLOTS = ['9:00', '10:00', '11:00', '12:30', '2:00', '3:00', '4:00', '5:00'];

function buildAvailableDays() {
  const days = [];
  const today = new Date();
  let offset = 0;
  while (days.length < 10) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    offset += 1;
    // Closed Sunday (0) and Monday (1)
    if (d.getDay() === 0 || d.getDay() === 1) continue;
    days.push(d);
  }
  return days;
}

export default function StepDateTime() {
  const { day, time, chooseDay, setTime, setStep } = useBooking();
  const days = useMemo(buildAvailableDays, []);

  const canContinue = Boolean(day && time);

  return (
    <div className="stepPanel">
      <div className="fieldBlock">
        <span className="flabel">Choose a day</span>
        <div className="dayStrip">
          {days.map((d) => {
            const iso = d.toISOString();
            const selected = day === iso;
            return (
              <div
                key={iso}
                className={`dayChip${selected ? ' selected' : ''}`}
                onClick={() => chooseDay(iso, formatDayLabel(d))}
              >
                <div className="dname">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]}</div>
                <div className="dnum">{d.getDate()}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fieldBlock">
        <span className="flabel">Choose a time</span>
        <div className="timeGrid">
          {TIME_SLOTS.map((slot) => (
            <div
              key={slot}
              className={`timeSlot${time === slot ? ' selected' : ''}`}
              onClick={() => setTime(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
      </div>
      <div className="formSubmit">
        <button className="btn ghost" onClick={() => setStep(2)}>Back</button>
        <button className="btn caramel" disabled={!canContinue} onClick={() => setStep(4)}>
          Continue
        </button>
      </div>
    </div>
  );
}
