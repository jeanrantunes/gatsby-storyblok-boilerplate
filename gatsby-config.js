module.exports = {
  siteMetadata: {
    title: "Gatsby Default Starter",
  },
  plugins: [
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: "fv7wrIeVFdM1vQySHk8wogtt",
        homeSlug: "home",
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
  ],
};
