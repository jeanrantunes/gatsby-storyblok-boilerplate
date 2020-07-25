const request = require("request");
const axios = require("axios");
// populate environment variables locally.
require("dotenv").config();
const { NETLIFY_AUTH_TOKEN } = process.env;

// hardcoding this for a moment... TODO: replace request with somethign that follows redirects
const URL = "https://elegant-wiles-a8b2e1.netlify.app";
/*
  delete this submission via the api
*/
function purgeComment(id) {
  const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`;

  axios({
    method: "delete",
    url,
  })
    .then((resp) => {
      callback(null, {
        statusCode: 200,
        body: "Comment deleted from queue",
      });
    })
    .catch((err) => {
      console.log("delete", err);
      callback(null, { statusCode: 500, body: JSON.stringify(error.response) });
    });
}
/*
  Handle the lambda invocation
*/
exports.handler = async (event, context, callback) => {
  // parse the payload
  const body = event.body.split("payload=")[1];
  const payload = JSON.parse(unescape(body));
  const method = payload.actions[0].name;
  const id = payload.actions[0].value;

  if (method === "delete") {
    purgeComment(id);
  } else if (method === "approve") {
    // get the comment data from the queue
    const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`;

    axios({
      method: "get",
      url,
    })
      .then((resp) => {
        console.log(resp);
        callback(null, {
          statusCode: 200,
          body: resp.statusText,
        });
      })
      .catch((error) => {
        console.log(error);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(error.response),
        });
      });

    // request(url, function (err, response, body) {
    //   if (!err && response.statusCode === 200) {
    //     const data = JSON.parse(body).data;

    //     // now we have the data, let's massage it and post it to the approved form
    //     const payload = {
    //       "form-name": "approved-comments",
    //       path: data.path,
    //       received: new Date().toString(),
    //       email: data.email,
    //       name: data.name,
    //       comment: data.comment,
    //     };

    //     const approvedURL = URL;

    //     console.log("Posting to", approvedURL);
    //     console.log(payload);

    //     // post the comment to the approved lost
    //     request.post({ url: approvedURL, formData: payload }, function (
    //       err,
    //       httpResponse,
    //       body
    //     ) {
    //       var msg;
    //       if (err) {
    //         msg = "Post to approved comments failed:" + err;
    //         console.log(msg);
    //       } else {
    //         msg = "Post to approved comments list successful.";
    //         console.log(msg);
    //         purgeComment(id);
    //       }
    //       var msg = "Comment registered. Site deploying to include it.";
    //       callback(null, {
    //         statusCode: 200,
    //         body: msg,
    //       });
    //       return console.log(msg);
    //     });
    //   }
    // });
  }
};
