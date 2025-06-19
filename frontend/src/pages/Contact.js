import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email, phone, message } = form;

    const whatsappMessage = `Hello Chandana Rice Stores,
My name is ${name}.
Email: ${email}
Phone: ${phone}
Message: ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/917671879837?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <div>
          <h2>Store Location</h2>
          <p>
            Door No. 1‑33 PSR Complex, beside Sridevi Theatre<br />
            Chandanagar, Hyderabad, Telangana 500050
          </p>
        </div>
        <div>
          <h2>Call Us</h2>
            <p><a href="tel:+917671879837">+91 76718 79837</a></p>

          <p><a href="tel:+919248004999">+91 92480 04999</a></p>
        </div>
        <div>
          <h2>Email</h2>
          <p><a href="mailto:chandanarice@gmail.com">chandanarice@gmail.com</a></p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Your Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send via WhatsApp</button>
      </form>
    </div>
  );
}

export default Contact;
