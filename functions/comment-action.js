const axios = require("axios");
const FormData = require("form-data");
// populate environment variables locally.
require("dotenv").config();
const { NETLIFY_AUTH_TOKEN } = process.env;

// hardcoding this for a moment... TODO: replace request with somethign that follows redirects
const URL = "https://elegant-wiles-a8b2e1.netlify.app";
/*
  delete this submission via the api
*/
function purgeComment(id, callback) {
  const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`;

  axios({
    method: "delete",
    url,
  })
    .then((resp) => {
      callback(null, {
        statusCode: 200,
        body: "Comentário não aprovado.",
      });
    })
    .catch((err) => {
      console.warn("delete", err);
      callback(null, {
        statusCode: 500,
        body: "Problema ao excluir o comentário",
      });
    });
}
/*
  Handle the lambda invocation
*/
exports.handler = (event, context, callback) => {
  const body = event.body.split("payload=")[1];
  const payload = JSON.parse(unescape(body));
  const method = payload.actions[0].name;
  const id = payload.actions[0].value;

  if (method === "delete") {
    purgeComment(id, callback);
  } else if (method === "approve") {
    // get the comment data from the queue
    const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`;

    axios({
      method: "get",
      url,
    })
      .then((resp) => {
        const { name, email, comment } = resp.data.data;
        const payload = {
          "form-name": "approved-comments",
          received: new Date().toString(),
          email: email,
          name: name,
          comment: comment,
        };

        const form = new FormData();
        form.append("form-name", "approved-comments");
        form.append("received", new Date().toString());
        form.append("email", email);
        form.append("name", name);
        form.append("comment", comment);

        axios({
          method: "post",
          url: URL,
          headers: form.getHeaders(),
          data: form,
        })
          .then((response) => {
            callback(null, {
              statusCode: 200,
              body: "Depoimento aprovado.",
            });
          })
          .catch((error) => {
            console.warn(error);
            callback(null, {
              statusCode: 500,
              body: "Problema ao postar o depoimento",
            });
          });
      })
      .catch((error) => {
        console.warn(error);
        callback(null, {
          statusCode: 500,
          body: "Problema ae consultar o comentário na fila.",
        });
      });
  }
};
