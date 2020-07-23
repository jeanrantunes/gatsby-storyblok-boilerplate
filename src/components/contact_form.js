import React from "react";
import SbEditable from "storyblok-react";

const ContactForm = (props) => (
  <SbEditable content={props.blok}>
    <h1>Contact</h1>

    <form
      name="contact"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="contact" value="contact" />
      <div>
        <label>Your Email:</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" />
      </div>
      <button type="submit">Send</button>
    </form>
  </SbEditable>
);

export default ContactForm;
