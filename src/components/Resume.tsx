import IonIcon from "@reacticons/ionicons";
import profile from "../data/profile";
function Resume() {
  return (
    <article className="resume" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon name="book-outline"></IonIcon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          {profile.resume.education.map((item, i) => (
            <li className="timeline-item" key={i}>
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span>{item.period}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon name="book-outline"></IonIcon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          {profile.resume.experience.map((item, i) => (
            <li className="timeline-item" key={i}>
              <h4 className="h4 timeline-item-title">
                {item.title}{" "}
                <span className="timeline-company">at {item.company}</span>
              </h4>
              <span>{item.period}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {profile.resume.skills.map((skill, i) => (
            <li className="skills-item" key={i}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.value}>{skill.value}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
export default Resume;
