"use strict";

const axios = require("axios");

// populate environment variables locally.
require("dotenv").config();

const URL = "https://elegant-wiles-a8b2e1.netlify.app";

exports.handler = (event, context, callback) => {
  // get the arguments from the notification
  const body = JSON.parse(event.body);
  // // prepare call to the Slack API
  const slackURL = process.env.SLACK_WEBHOOK_URL;
  const slackPayload = {
    text: "New comment on " + URL,
    attachments: [
      {
        fallback: "New comment on the comment example site",
        color: "#444",
        author_name: body.data.email,
        text: body.data.comment,
      },
      {
        fallback: "Manage comments on " + URL,
        callback_id: "comment-action",
        actions: [
          {
            type: "button",
            text: "Approve comment",
            name: "approve",
            value: body.id,
          },
          {
            type: "button",
            style: "danger",
            text: "Delete comment",
            name: "delete",
            value: body.id,
          },
        ],
      },
    ],
  };
  // post the notification to Slack

  axios({
    method: "post",
    url: slackURL,
    data: {
      ...slackPayload,
    },
  })
    .then((resp) => {
      callback(null, {
        statusCode: 200,
        body: resp.statusText,
      });
    })
    .catch((error) => {
      callback(null, { statusCode: 500, body: JSON.stringify(error.response) });
    });
};
