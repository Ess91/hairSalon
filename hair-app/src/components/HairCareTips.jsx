const TIPS = [
  {
    title: 'Sleep on silk or satin',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Space out the heat',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: "Don't skip the aftercare sheet",
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export default function HairCareTips() {
  return (
    <section id="care">
      <div className="wrap">
        <div className="sectionHad">
          <div>
            <span className="eyebrow">Hair care tips</span>
            <h2>A few things worth knowing between visits.</h2>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="tipsGrid">
          {TIPS.map((tip, i) => (
            <div className="tip" key={tip.title}>
              <span className="tNum">{String(i + 1).padStart(2, '0')}</span>
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
