import profile from "../data/profile";
import IonIcon from "@reacticons/ionicons";
import { useRef, useState, useEffect } from "react";

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [isValid, setIsValid] = useState(false);

  const isEmailValid = (email: string) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const { fullname, email, message } = formState;
    const valid =
      fullname.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 0 &&
      isEmailValid(email);

    setIsValid(valid);
  }, [formState]); // Reavalia sempre que o formState mudar

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullname, email, message } = formState;
    const phone = profile.phone.replace(/\D/g, "");
    const text = encodeURIComponent(
      `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`
    );
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <article className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">{profile.contact.title}</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src={profile.contact.location}
            width="400"
            height="300"
            loading="lazy"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">{profile.contact.form}</h3>

        <form ref={formRef} className="form" data-form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              value={formState.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className={`form-input${
                formState.email && !isEmailValid(formState.email)
                  ? " invalid"
                  : ""
              }`}
              placeholder="Email address"
              required
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            value={formState.message}
            onChange={handleChange}
          ></textarea>

          <button className="form-btn" type="submit" disabled={!isValid}>
            <IonIcon name="paper-plane" />
            <span>{profile.contact.buttonSend}</span>
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;
