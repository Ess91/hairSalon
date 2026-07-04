import { SERVICE_CATEGORIES, calcDeposit } from '../data/siteData';
import { useBooking } from '../context/BookingContext';

export default function Services() {
  const { openPicker } = useBooking();

  const handleBook = (service) => {
    openPicker({ service: service.name, price: service.price, addons: [], tags: null });
  };

  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Services</span>
            <h2>Priced honestly. Booked directly.</h2>
          </div>
          <p>Every service requires a 50% deposit to secure your slot. Final price confirmed.</p>
        </div>

        <div className="serviceList">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.label}>
              <div className="serviceCategory">{category.label}</div>
              {category.services.map((service) => (
                <div className="serviceRow" id={service.id} key={service.id}>
                  <div>
                    <h3>{service.name}</h3>
                    <p className="desc">{service.description}</p>
                  </div>
                  <span className="duration">{service.duration.toUpperCase()}</span>
                  <span className="price">
                    £{service.price}
                    <span className="depositNote">50% deposit — £{calcDeposit(service.name)}</span>
                  </span>
                  <button className="btn small ghost" onClick={() => handleBook(service)}>Book</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
