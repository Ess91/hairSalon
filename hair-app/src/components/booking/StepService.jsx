import { SERVICE_CATEGORIES } from '../../data/siteData';
import { useBooking } from '../../context/BookingContext';

export default function StepService() {
  const { service: selectedService, selectService, addons, setStep } = useBooking();

  const handleSelect = (service) => {
    // Selecting a service directly keeps whatever add-ons were already chosen
    // (e.g. via the picker modal) rather than clearing them.
    selectService(service.name, service.price, addons);
  };

  return (
    <div className="stepPanel">
      <div className="fieldBlock">
        <span className="flabel">Choose a service</span>
        <div className="servicePick">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.label}>
              <div className="servicePickCategory">{category.label}</div>
              {category.services.map((service) => (
                <div
                  key={service.id}
                  className={`serviceOpt${selectedService === service.name ? ' selected' : ''}`}
                  onClick={() => handleSelect(service)}
                >
                  <span className="sname">{service.name}</span>
                  <span className="smeta">{service.duration} · £{service.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="formSubmit">
        <small>Select a service to continue to add-ons.</small>
        <button className="btn caramel" disabled={!selectedService} onClick={() => setStep(2)}>
          Continue
        </button>
      </div>
    </div>
  );
}
