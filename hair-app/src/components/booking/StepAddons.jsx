import { ADDON_NAMES, ADDON_BY_NAME } from '../../data/siteData';
import { useBooking } from '../../context/BookingContext';

export default function StepAddons() {
  const { addons, toggleAddon, setStep } = useBooking();

  return (
    <div className="stepPanel">
      <div className="fieldBlock">
        <span className="flabel">Optional add-ons</span>
        <div className="checkGrid">
          {ADDON_NAMES.map((name) => {
            const meta = ADDON_BY_NAME[name];
            const checked = addons.includes(name);
            return (
              <div
                key={name}
                className={`checkPill${checked ? ' checked' : ''}`}
                onClick={() => toggleAddon(name)}
              >
                {name} <b>+£{meta.price} · +{meta.minutes}min</b>
              </div>
            );
          })}
        </div>
      </div>
      <div className="formSubmit">
        <button className="btn ghost" onClick={() => setStep(1)}>Back</button>
        <button className="btn caramel" onClick={() => setStep(3)}>Continue</button>
      </div>
    </div>
  );
}
