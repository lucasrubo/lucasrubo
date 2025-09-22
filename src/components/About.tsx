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
  // Calcular anos de experiência a partir de 2019
  const firstYear = 2019;
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - firstYear;

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
          {/* Card especial de anos de experiência */}
          <li className="service-item">
            <div className="service-icon-box exp-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#222224" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#eccb68"
                  fontSize="18"
                  fontWeight="bold"
                  dy=".3em"
                >
                  {yearsExp}
                </text>
              </svg>
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">years of experience</h4>
              <p className="service-item-text">
                Professional experience in web development, UI, and modern
                technologies since 2019.
              </p>
            </div>
          </li>
          {/* Demais serviços */}
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
