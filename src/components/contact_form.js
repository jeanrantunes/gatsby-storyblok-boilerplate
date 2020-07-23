import React from "react";
import SbEditable from "storyblok-react";

const ContactForm = (props) => (
  <SbEditable content={props.blok}>
    <h1>Contact</h1>
    <form
      name="contact-form"
      methodx="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input name="name" placeholder="Your name" type="text" />
      <input name="email" placeholder="Your e-mail" type="text" />

      <button type="submit">submit</button>
    </form>
  </SbEditable>
);

export default ContactForm;
