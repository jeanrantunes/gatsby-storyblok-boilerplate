// massage the approved comments data into the shape we'd like
// embelish the data with gravatars
const submissions = require("./approved-comments_submissions.json");
console.log(submissions);
module.exports = () => {
  let comments = {};

  submissions.forEach((entry) => {
    let comment = {
      name: entry.data.name,
      comment: entry.data.comment.trim(),
      date: entry.data.received,
    };

    // Add it to an existing array or create a new one in the comments object
    if (comments[entry.data.path]) {
      comments[entry.data.path].push(comment);
    } else {
      comments[entry.data.path] = [comment];
    }
  });

  return comments;
};
