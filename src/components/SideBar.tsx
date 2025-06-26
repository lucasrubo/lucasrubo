import profile from '../data/profile';
import IonIcon from '@reacticons/ionicons';
const SideBar: React.FC = () => {
  return (
    <aside className="sidebar" data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={profile.avatar} alt={profile.name} width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={profile.name}>{profile.name}</h1>
          <p className="title">{profile.title}</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn>
          <span>Show Contacts</span>
          <IonIcon name="chevron-down"></IonIcon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box"><IonIcon name="mail-outline"></IonIcon></div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href={`mailto:${profile.email}`} className="contact-link">{profile.email}</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box"><IonIcon name="phone-portrait-outline"></IonIcon></div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href={`tel:${profile.phone}`} className="contact-link">{profile.phone}</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box"><IonIcon name="calendar-outline"></IonIcon></div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime={profile.birthday}>{profile.birthdayText}</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box"><IonIcon name="location-outline"></IonIcon></div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>{profile.location}</address>
            </div>
          </li>
        </ul>
        <div className="separator"></div>
        <ul className="social-list">
          <li className="social-item">
            <a href="#" className="social-link">
              <IonIcon name="logo-facebook" role="img" className="md hydrated" aria-label="logo facebook"></IonIcon>
            </a>
          </li>
          <li className="social-item">
            <a href="#" className="social-link">
              <IonIcon name="logo-twitter" role="img" className="md hydrated" aria-label="logo twitter"></IonIcon>
            </a>
          </li>
          <li className="social-item">
            <a href="#" className="social-link">
              <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    
  );
};

export default SideBar;
