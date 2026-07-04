import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(value) {
  let v = value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
  return v;
}

const SHIPPING = 4.5;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', postcode: '' });
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const [orderRef, setOrderRef] = useState(null);

  const total = subtotal + (items.length > 0 ? SHIPPING : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `SR-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    clearCart();
  };

  if (orderRef) {
    return (
      <section className="checkoutPage">
        <div className="wrap">
          <div className="confirm show">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Order placed</span>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 24, marginTop: 12 }}>
              Thanks — your order is confirmed.
            </p>
            <p className="ref">Reference {orderRef}. A confirmation email would be sent to you in a live version.</p>
            <Link to="/shop" className="btn caramel" style={{ marginTop: 20, display: 'inline-flex' }}>Continue shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkoutPage">
        <div className="wrap">
          <div className="sectionHead">
            <div>
              <span className="eyebrow">Checkout</span>
              <h2>Your cart is empty.</h2>
            </div>
          </div>
          <Link to="/shop" className="btn caramel">Browse the shop</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkoutPage">
      <div className="wrap">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Checkout</span>
            <h2>Almost there.</h2>
          </div>
        </div>

        <div className="checkoutLayout">
          <form className="checkoutForm" onSubmit={handleSubmit}>
            <span className="flabel">Shipping details</span>
            <div className="fieldRow" style={{ marginBottom: 14 }}>
              <div className="field">
                <label htmlFor="co-name">Full name</label>
                <input id="co-name" required value={shipping.name} onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))} />
              </div>
              <div className="field">
                <label htmlFor="co-email">Email</label>
                <input id="co-email" type="email" required value={shipping.email} onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))} />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="co-address">Address</label>
              <input id="co-address" required value={shipping.address} onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))} />
            </div>
            <div className="fieldRow" style={{ marginBottom: 24 }}>
              <div className="field">
                <label htmlFor="co-city">City</label>
                <input id="co-city" required value={shipping.city} onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))} />
              </div>
              <div className="field">
                <label htmlFor="co-postcode">Postcode</label>
                <input id="co-postcode" required value={shipping.postcode} onChange={(e) => setShipping((s) => ({ ...s, postcode: e.target.value }))} />
              </div>
            </div>

            <span className="flabel">Payment</span>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, opacity: 0.5, marginBottom: 16 }}>
              Demo form only — no real payment is processed.
            </p>
            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="coCardName">Name on card</label>
              <input id="coCardName" required value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />
            </div>
            <div className="fieldRow" style={{ marginBottom: 8 }}>
              <div className="field">
                <label htmlFor="coCardNumber">Card number</label>
                <input
                  id="coCardNumber" inputMode="numeric" maxLength={19} required placeholder="•••• •••• •••• ••••"
                  value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
                />
              </div>
              <div className="fieldRow" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field">
                  <label htmlFor="co-expiry">Expiry</label>
                  <input
                    id="co-expiry" maxLength={5} required placeholder="MM/YY"
                    value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="co-cvc">CVC</label>
                  <input
                    id="co-cvc" inputMode="numeric" maxLength={4} required placeholder="•••"
                    value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn caramel" style={{ marginTop: 16, width: '100%' }}>
              Place order — £{total.toFixed(2)}
            </button>
          </form>

          <div className="checkoutSummary">
            <span className="flabel">Order summary</span>
            {items.map(({ product, qty }) => (
              <div className="checkoutLine" key={product.id}>
                <span>{product.name} × {qty}</span>
                <span>£{(product.price * qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="checkoutLine">
              <span>Shipping</span>
              <span>£{SHIPPING.toFixed(2)}</span>
            </div>
            <div className="checkoutLine checkoutTotal">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
