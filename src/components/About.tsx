import profile from '../data/profile';
function About() {
  return (
    <article className="about  active" data-page="about">
      <header>
        <h2 className="h2 article-title">{profile.about.title}</h2>
      </header>

      <section className="about-text">
        {profile.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section className="service">
        <ul className="service-list">
          {profile.services.map((service, i) => (
            <li key={i} className="service-item">
              <div className="service-icon-box">
                <img src={service.icon} alt={service.title} width="40" />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
export default About;
