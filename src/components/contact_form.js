import React from "react";

const ContactForm = (props) => (
  <div>
    <h1>Contact</h1>
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input name="name" placeholder="Your name" type="text" />
      <button type="submit">submit</button>
    </form>
  </div>
);

export default ContactForm;
