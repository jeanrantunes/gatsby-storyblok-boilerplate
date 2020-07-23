import React from "react";
import SbEditable from "storyblok-react";

const Feature = (props) => (
  <SbEditable content={props.blok}>
    <form name="contact" data-netlify="true">
      <p>
        <label>
          Name <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Email <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Your Role:{" "}
          <select name="role[]" multiple>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </SbEditable>
);

export default Feature;
