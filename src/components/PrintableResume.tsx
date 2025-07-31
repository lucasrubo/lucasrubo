import React from "react";
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

const PrintableResume = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const age = getAge(profile.birthday);

  // Condensar o texto "About Me" para ser mais conciso
  const condensedAbout = `I am ${age} years old with a Computer Science degree from Universidade Paulista. Currently working as a Developer at Areco, specializing in front-end development for ERP Web systems using Blazor, and contributing to supplementary systems with Blazor and Delphi. My passion lies in front-end development, crafting intuitive, responsive user interfaces. I have extensive experience with React, TypeScript, PHP systems, and database management. Previously worked at IBM in CI/CD automation and NB41 in web development.`;

  return (
    <div ref={ref} className="printable-resume">
      {/* Compact Header */}
      <header className="print-header">
        <div className="print-header-left">
          <h1 className="print-name">{profile.name}</h1>
          <h2 className="print-title">{profile.title}</h2>
        </div>
        <div className="print-header-right">
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          <p>Age: {age}</p>
        </div>
      </header>

      <div className="print-content">
        <div className="print-left-column">
          {/* About Section - Condensed */}
          <section className="print-section compact">
            <h3 className="print-section-title">Professional Summary</h3>
            <p className="print-summary">{condensedAbout}</p>
          </section>

          {/* Experience */}
          <section className="print-section">
            <h3 className="print-section-title">Experience</h3>
            <div className="print-timeline">
              {profile.resume.experience.map((item, index) => (
                <div key={index} className="print-timeline-item compact">
                  <div className="print-timeline-header">
                    <h4 className="print-timeline-title">{item.title}</h4>
                    <span className="print-timeline-period">{item.period}</span>
                  </div>
                  <p className="print-timeline-company">{item.company}</p>
                  <p className="print-timeline-description condensed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="print-section">
            <h3 className="print-section-title">Education</h3>
            <div className="print-timeline">
              {profile.resume.education.map((item, index) => (
                <div key={index} className="print-timeline-item compact">
                  <div className="print-timeline-header">
                    <h4 className="print-timeline-title">{item.title}</h4>
                    <span className="print-timeline-period">{item.period}</span>
                  </div>
                  <p className="print-timeline-description condensed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="print-right-column">
          {/* Skills - More compact */}
          <section className="print-section">
            <h3 className="print-section-title">Technical Skills</h3>
            <div className="print-skills compact">
              {profile.resume.skills.map((skill, index) => (
                <div key={index} className="print-skill-item compact">
                  <span className="print-skill-name">{skill.name}</span>
                  <span className="print-skill-level">{skill.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Core Competencies */}
          <section className="print-section">
            <h3 className="print-section-title">Core Competencies</h3>
            <div className="print-competencies">
              {profile.services.map((service, index) => (
                <div key={index} className="print-competency-item">
                  <h4 className="print-competency-title">{service.title}</h4>
                  <p className="print-competency-description">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Certifications - Reduced to most relevant */}
          <section className="print-section">
            <h3 className="print-section-title">Key Certifications</h3>
            <div className="print-certificates compact">
              {profile.certificates.slice(0, 6).map((cert, index) => (
                <div key={index} className="print-cert-item compact">
                  <h4 className="print-cert-name">{cert.name}</h4>
                  <p className="print-cert-details">
                    {cert.issuer} • {cert.issueDate}
                  </p>
                </div>
              ))}
              {profile.certificates.length > 6 && (
                <p className="print-more-certs">
                  + {profile.certificates.length - 6} more certifications
                  available
                </p>
              )}
            </div>
          </section>

          {/* Contact Links */}
          <section className="print-section">
            <h3 className="print-section-title">Links</h3>
            <div className="print-links">
              <p>
                <strong>LinkedIn:</strong> {profile.about.linkedin}
              </p>
              <p>
                <strong>GitHub:</strong> {profile.about.github}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

PrintableResume.displayName = "PrintableResume";

export default PrintableResume;
