"use strict";

var request = require("request");

// populate environment variables locally.
require("dotenv").config();

const URL = "https://elegant-wiles-a8b2e1.netlify.app";

/*
  Our serverless function handler
*/
exports.handler = async (event, context, callback) => {
  // get the arguments from the notification
  const body = JSON.parse(event.body);
  console.log(body);
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

  // // post the notification to Slack
  request.post({ url: slackURL, json: slackPayload }, function (
    err,
    httpResponse,
    body
  ) {
    var msg;
    if (err) {
      msg = "Post to Slack failed:" + err;
    } else {
      msg = "Post to Slack successful!  Server responded with:" + body;
    }
    callback(null, {
      statusCode: 200,
      body: msg,
    });
    return console.log(msg);
  });
};
