import { ADDON_BY_NAME } from '../../data/siteData';
import { useBooking } from '../../context/BookingContext';
import StepService from './StepService';
import StepAddons from './StepAddons';
import StepDateTime from './StepDateTime';
import StepDetails from './StepDetails';
import StepDeposit from './StepDeposit';

const TABS = [
  { step: 1, label: 'Service' },
  { step: 2, label: 'Add-ons' },
  { step: 3, label: 'Date & time' },
  { step: 4, label: 'Your details' },
  { step: 5, label: 'Deposit' },
];

export default function BookingSection() {
  const { step, setStep, service, day, time, dayLabel, addons, deposit, removeAddon } = useBooking();

  const canReach = (targetStep) => {
    if (targetStep >= 2 && !service) return false;
    if (targetStep >= 4 && (!day || !time)) return false;
    return true;
  };

  const showSummary = Boolean(service || day || time);

  return (
    <section className="bookingPage" id="booking">
      <div className="wrap">
        <div className="bookingHead">
          <span className="eyebrow">Book an appointment</span>
          <h2>Pick a service, pick a time.</h2>
          <p>Every new client starts with a consultation — booked separately or combined with your first service.</p>
        </div>

        <div className="bookingShell">
          <div className="bookingTabs">
            {TABS.map((t) => (
              <div
                key={t.step}
                className={`bookingTab${step === t.step ? ' active' : ''}`}
                onClick={() => { if (canReach(t.step)) setStep(t.step); }}
              >
                {t.step}. {t.label}
              </div>
            ))}
          </div>

          <div className="bookingBody">
            {showSummary && (
              <div className="bookingSummary">
                {service && <span>SERVICE<b>{service}</b></span>}
                {dayLabel && <span>DATE<b>{dayLabel}</b></span>}
                {time && <span>TIME<b>{time}</b></span>}
                {service && <span>DEPOSIT<b>{deposit ? `£${deposit}` : 'None required'}</b></span>}
                {addons.length > 0 && (
                  <span>
                    ADD-ONS
                    <span className="summaryAddonList">
                      {addons.map((a) => (
                        <span className="summaryAddonRow" key={a}>
                          {a}{' '}
                          <span className="addonMeta">+£{ADDON_BY_NAME[a]?.price} · +{ADDON_BY_NAME[a]?.minutes}min</span>
                          <span className="rmAddon" onClick={() => removeAddon(a)}>remove</span>
                        </span>
                      ))}
                    </span>
                  </span>
                )}
              </div>
            )}

            {step === 1 && <StepService />}
            {step === 2 && <StepAddons />}
            {step === 3 && <StepDateTime />}
            {step === 4 && <StepDetails />}
            {step === 5 && <StepDeposit />}
          </div>
        </div>
      </div>
    </section>
  );
}
