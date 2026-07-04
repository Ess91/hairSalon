//  Tag lines for various sections of the sites

const VALUES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  'A 50% deposit secures every booking — the rest is settled in the chair.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
];

export default function ValueStrip() {
  return (
    <section className="valueStrip">
      <div className="wrap valueStripInner">
        <div className="valueGrid">
          {VALUES.map((text, i) => (
            <div className="valueItem" key={i}>
              <span className="vNum">{String(i + 1).padStart(2, '0')}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}