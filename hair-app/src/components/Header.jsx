import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../content/CartContext";
import { useSectionNav } from "../hooks/useSectionNav";

const SECTION_LINKS = [
  { id: "lookbook", label: "Lookbook" },
  { id: "services", label: "Services" },
  { id: "care", label: "Hair care" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const goToSection = useSectionNav();

  const handleSectionClick = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    goToSection(id);
  };

  return (
    <>
      <header className="siteHeader">
        <nav className="nav">
          <Link className="logo" to="/">
            HAIR SALON
          </Link>
          <div className="navLinks">
            {SECTION_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={handleSectionClick(l.id)}
              >
                {l.label}
              </a>
            ))}
            <Link to="/shop">Shop</Link>
          </div>
          <div className="navCta">
            <button className="cartButton" onClick={openDrawer} aria-label="Open cart">
                Cart
                {itemCount > 0 && <span className="cartCount">{itemCount}</span>}
            </button>
            <a href="#booking" className="btn caramel btnNav" onClick={handleSectionClick('booking')}>Book now</a>
            <button className="burger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
                <span />
                <span />
                <span />
                </button>
          </div>
        </nav>
      </header>

      <div className={`mobileMenu${menuOpen ? ' open' : ''}`}>
        {SECTION_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={handleSectionClick(l.id)}>{l.label}</a>
        ))}
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <a href="#booking" className="btn caramel" onClick={handleSectionClick('booking')}>Book now</a>
      </div>
    </>
  );
}
