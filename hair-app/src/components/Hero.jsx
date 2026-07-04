export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroBg">
        <img src="images/hero-salon.svg" alt="" />
      </div>
      <div className="wrap heroContent">
        <span className="eyebrow eyebrowonDark">
          Bundles, sew-ins &amp; wig installs — by appointment
        </span>
        <h1>
          A flawless install, <em>without</em> the stress of sourcing hair
          yourself.
        </h1>
        <p className="lede">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="heroActions">
          <a href="#booking" className="btn caramel">
            Book an appointment
          </a>
          <a href="#lookbook" className="btn ghost ghostOnDark">
            View the lookbook
          </a>
        </div>
      </div>
    </section>
  );
}
