import profile from "../data/profile";
function getAge(birthday: string) {
  const birth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function About() {
  const age = getAge(profile.birthday);
  const aboutParagraphs = profile.about.paragraphs.map((p, i) =>
    i === 0 ? p.replace(/\d{2}/, age.toString()) : p
  );
  return (
    <article className="about  active" data-page="about">
      <header>
        <h2 className="h2 article-title">{profile.about.title}</h2>
      </header>

      <section className="about-text">
        {aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
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
