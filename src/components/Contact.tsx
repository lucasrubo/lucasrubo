import IonIcon from '@reacticons/ionicons';
function Contact() {
  return (
    <article className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58768.43300337679!2d-47.01880025!3d-22.986032299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cdaee7763fcf%3A0x382e43ff2cf3dd00!2sValinhos%2C%20SP%2C%2013274-465!5e0!3m2!1spt-BR!2sbr!4v1750898025689!5m2!1spt-BR!2sb"
            width="400"
            height="300"
            loading="lazy"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form action="#" className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>

          <button className="form-btn" type="submit" disabled data-form-btn>
            <IonIcon name="paper-plane"></IonIcon>
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}
export default Contact;
