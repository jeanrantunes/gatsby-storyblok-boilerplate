import React from "react";
import SbEditable from "storyblok-react";

const ContactForm = (props) => (
  <SbEditable content={props.blok}>
    <h1>Contact</h1>
  </SbEditable>
);

export default ContactForm;
