import React from "react";
import { navigate } from "gatsby-link";
import SbEditable from "storyblok-react";
import commentsJson from "../../_data/approved-comments_submissions.json";
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

  componentDidMount() {
    const comments = commentsJson.map((c) => ({
      name: c.data.name,
      email: c.data.email,
      comment: c.data.comment,
    }));
    this.setState({ comments });
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
          name="comments-queue"
          method="post"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="comments-queue" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your name:
              <br />
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your email:
              <br />
              <input type="email" name="email" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Comment:
              <br />
              <textarea name="comment" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        <form name="approved-comments" data-netlify="true">
          <input hidden type="text" name="name" />
          <input hidden type="text" name="email" />
          <textarea hidden type="text" name="comment" />
        </form>
        {JSON.stringify(this.state)}
      </SbEditable>
    );
  }
}
