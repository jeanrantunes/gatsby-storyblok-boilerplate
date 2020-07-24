import React from "react";
import SbEditable from "storyblok-react";
import { navigate } from "gatsby-link";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <SbEditable content={this.props.blok}>
        <h1>Contact</h1>
        <form
          name="queue"
          method="post"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="queue" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Nome:
              <br />
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
          </p>

          <p>
            <label>
              Comentário:
              <br />
              <textarea name="comment" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Enviar</button>
          </p>
        </form>
      </SbEditable>
    );
  }
}
