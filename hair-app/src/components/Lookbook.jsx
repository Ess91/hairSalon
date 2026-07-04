import { useRef, useState } from 'react';
import { SERVICE_BY_NAME } from '../data/siteData';
import { useBooking } from '../context/BookingContext';
import { useLookbook } from '../context/LookbookContext';
import { flashTarget } from '../utils/flashTarget';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Lookbook() {
  const [index, setIndex] = useState(0);
  const { openPicker } = useBooking();
  const { looks } = useLookbook();
  const touchStartX = useRef(null);
  const dragStartX = useRef(null);

  const goTo = (i) => {
    const next = ((i % looks.length) + looks.length) % looks.length;
    setIndex(next);
  };

  const handleBookLook = (look) => {
    const serviceName = look.services[0] || '';
    const service = SERVICE_BY_NAME[serviceName];
    openPicker({
      service: serviceName,
      price: service ? service.price : 0,
      addons: look.addons.slice(),
      tags: look.services,
    });
  };

  return (
    <section id="lookbook">
      <div className="wrap">
        <div className="lookbookMast">
          <svg className="dotgrid" width="180" height="140" viewBox="0 0 180 140" fill="none" aria-hidden="true">
            <g fill="var(--espresso)" opacity="0.35">
              {[4, 24, 44, 64].map((y) =>
                [4, 24, 44, 64, 84, 104].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />)
              )}
            </g>
          </svg>
          <div className="lookbookMastInner">
            <div>
              <span className="eyebrow">The Lookbook</span>
              <h2 className="lookbookTitle">
                Look
                <br />
                Book
                <em>Swipe through — or use the arrows.</em>
              </h2>
            </div>
            <div className="lookbookMeta">
              <div className="season">2026 EDIT · HAIRSALON</div>
              <p>Every look shows exactly what was done, and what to book to get there yourself.</p>
            </div>
          </div>
        </div>

        <div className="carousel" id="lookCarousel" tabIndex={0} onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') goTo(index - 1);
          if (e.key === 'ArrowRight') goTo(index + 1);
        }}>
          <button className="carArrow left" aria-label="Previous look" onClick={() => goTo(index - 1)}>‹</button>

          <div
            className="carouselViewport"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 45) goTo(index + (dx < 0 ? 1 : -1));
              touchStartX.current = null;
            }}
            onMouseDown={(e) => { dragStartX.current = e.clientX; }}
            onMouseUp={(e) => {
              if (dragStartX.current === null) return;
              const dx = e.clientX - dragStartX.current;
              if (Math.abs(dx) > 60) goTo(index + (dx < 0 ? 1 : -1));
              dragStartX.current = null;
            }}
          >
            <div className="carouselTrack" style={{ transform: `translateX(-${index * 100}%)` }}>
              {looks.map((look, i) => (
                <div className="carSlide" key={i}>
                  <div className="lookMedia">
                    <span className="pageTag">N.{pad(i + 1)}</span>
                    <img src={look.image} alt={look.title} draggable={false} />
                  </div>
                  <div className="lookText">
                    <span className="kicker">{look.kicker}</span>
                    <h3>{look.title}</h3>
                    <p className="description">{look.description}</p>

                    {look.services.length > 0 && (
                      <>
                        <span className="tagLabel">Services used</span>
                        <div className="serviceTags">
                          {look.services.map((s) => (
                            <a
                              key={s}
                              href={`#${SERVICE_BY_NAME[s]?.id || ''}`}
                              className="serviceLink"
                              onClick={(e) => { e.preventDefault(); flashTarget(SERVICE_BY_NAME[s]?.id); }}
                            >
                              {s}
                            </a>
                          ))}
                        </div>
                      </>
                    )}

                    {look.addons.length > 0 && (
                      <>
                        <span className="tagLabel">Add-on{look.addons.length > 1 ? 's' : ''}</span>
                        <div className="addonTags">
                          {look.addons.map((a) => (
                            <span className="addonStatic" key={a}>{a}</span>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="lookCTA">
                      <button className="btn caramel" onClick={() => handleBookLook(look)}>
                        Book this look
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carArrow right" aria-label="Next look" onClick={() => goTo(index + 1)}>›</button>
        </div>

        <div className="carFooter">
          <div className="carDots">
            {looks.map((_, i) => (
              <button
                key={i}
                className={`carDot${i === index ? ' active' : ''}`}
                aria-label={`Go to look ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <span className="carCounter">{pad(index + 1)} / {pad(looks.length)}</span>
        </div>
      </div>
    </section>
  );
}
