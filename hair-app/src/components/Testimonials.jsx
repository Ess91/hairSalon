const QUOTES = [
  {
    quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
    who: 'Bundle & install client',
  },
  {
    quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
    who: 'Extensions client',
  },
  {
    quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
    who: 'First-time client',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="wrap">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">What clients say</span>
            <h2 className="onDark">Word of mouth, mostly.</h2>
          </div>
          <p>&nbsp;</p>
        </div>
        <div className="quoteTrack">
          {QUOTES.map((q) => (
            <div className="quote" key={q.who}>
              <p className="q">{q.quote}</p>
              <span className="who">— {q.who}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
