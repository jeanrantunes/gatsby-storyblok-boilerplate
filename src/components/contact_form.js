import React from "react";
import SbEditable from "storyblok-react";

const ContactForm = (props) => (
  <SbEditable content={props.blok}>
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
  </SbEditable>
);

export default ContactForm;
