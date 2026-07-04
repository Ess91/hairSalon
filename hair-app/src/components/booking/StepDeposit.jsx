import { useState } from 'react';
import { SERVICE_BY_NAME, addonsTotal, addonsMinutes } from '../../data/siteData';
import { useBooking } from '../../context/BookingContext';

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  let v = value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
  return v;
}

export default function StepDeposit() {
  const { service, addons, day, dayLabel, time, deposit, setStep } = useBooking();
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const servicePrice = SERVICE_BY_NAME[service]?.price || 0;
  const addonsSum = addonsTotal(addons);
  const addonsMins = addonsMinutes(addons);
  const grandTotal = servicePrice + addonsSum;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `SR-${Math.floor(100000 + Math.random() * 900000)}`;
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    const addonsLine = addons.length ? ` · Add-ons: ${addons.join(', ')}` : '';
    return (
      <div className="confirm show">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Booking requested</span>
        <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 24, marginTop: 12 }}>
          We'll confirm your slot shortly.
        </p>
        <p className="ref">
          Reference {reference} · {service} · {dayLabel} at {time}{addonsLine} · £{deposit} deposit taken
        </p>
      </div>
    );
  }

  return (
    <div className="stepPanel">
      <form onSubmit={handleSubmit}>
        <div className="depositBlock">
          <div className="depRow"><span className="depLabel">Deposit to secure this slot (50%)</span></div>
          <div className="depAmount">£{deposit}</div>
          <p className="depNote">
            Charged now to hold your appointment for {service} (£{servicePrice} service
            {addonsSum ? ` + £${addonsSum} add-ons` : ''} = £{grandTotal} total). The remaining balance is
            paid on the day.
          </p>
          {addons.length > 0 && (
            <p className="depNote">
              Add-ons: {addons.map((a) => a).join(', ')} — adds {addonsMins}min to your appointment.
            </p>
          )}
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, opacity: 0.5, marginBottom: 16 }}>
          Demo form only — no real payment is processed. A live version would connect to a real payment provider (e.g. Stripe).
        </p>
        <div className="field" style={{ marginBottom: 16 }}>
          <label htmlFor="cardName">Name on card</label>
          <input
            id="cardName" type="text" placeholder="As it appears on the card" required
            value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
          />
        </div>
        <div className="fieldRow" style={{ marginBottom: 16 }}>
          <div className="field">
            <label htmlFor="cardNumber">Card number</label>
            <input
              id="cardNumber" type="text" inputMode="numeric" placeholder="•••• •••• •••• ••••" maxLength={19} required
              value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
            />
          </div>
          <div className="fieldRow" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="field">
              <label htmlFor="cardExpiry">Expiry</label>
              <input
                id="cardExpiry" type="text" placeholder="MM/YY" maxLength={5} required
                value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
              />
            </div>
            <div className="field">
              <label htmlFor="cardCvc">CVC</label>
              <input
                id="cardCvc" type="text" inputMode="numeric" placeholder="•••" maxLength={4} required
                value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
              />
            </div>
          </div>
        </div>

        <div className="formSubmit">
          <button type="button" className="btn ghost" onClick={() => setStep(4)}>Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <small style={{ fontFamily: 'var(--mono)', fontSize: 10.5, opacity: 0.5, maxWidth: 240, lineHeight: 1.6 }}>
              Deposits are fully refundable with 48 hours' notice. The rest is paid in the chair.
            </small>
            <button type="submit" className="btn caramel">Confirm booking</button>
          </div>
        </div>
      </form>
    </div>
  );
}
