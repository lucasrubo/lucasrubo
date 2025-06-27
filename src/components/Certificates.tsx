import IonIcon from "@reacticons/ionicons";
import profile from "../data/profile";
import { useState } from "react";

// Gera categorias técnicas a partir do campo type e "All"
const getTypes = (certificates: typeof profile.certificates) => {
  const types = Array.from(new Set(certificates.map((c) => c.type)));
  return ["All", ...types];
};

function Certificates() {
  const [selectedType, setSelectedType] = useState("All");
  const types = getTypes(profile.certificates);

  const filteredCertificates =
    selectedType === "All"
      ? profile.certificates
      : profile.certificates.filter((cert) => cert.type === selectedType);

  return (
    <article className="portfolio" data-page="certificates">
      <header>
        <h2 className="h2 article-title">Certificates</h2>
      </header>
      <section className="projects">
        <ul className="filter-list">
          {types.map((type) => (
            <li className="filter-item" key={type}>
              <button
                className={selectedType === type ? "active" : ""}
                data-filter-btn
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
        <div className="filter-select-box">
          <button className="filter-select" data-select>
            <div className="select-value" data-selecct-value>
              {selectedType}
            </div>
            <div className="select-icon">
              <IonIcon name="chevron-down"></IonIcon>
            </div>
          </button>
          <ul className="select-list">
            {types.map((type) => (
              <li className="select-item" key={type}>
                <button data-select-item onClick={() => setSelectedType(type)}>
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="project-list">
          {filteredCertificates.map((cert) => (
            <li
              className="project-item active"
              data-filter-item
              data-category={cert.type}
              key={cert.credentialId}
            >
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <IonIcon name="eye-outline"></IonIcon>
                  </div>
                  <img
                    src={`./images/certificates/${cert.credentialId}.png`}
                    alt={cert.name}
                    loading="lazy"
                  />
                </figure>
                <h3 className="project-title">{cert.name}</h3>
                <p className="project-category">{cert.issuer}</p>
                <p className="project-category">{cert.issueDate}</p>
                <p className="project-category">
                  <b>{cert.type}</b>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
export default Certificates;
