require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.ettissalet-othmani.com/",
    title: `ettissalet othmani`,
    description: `Achat sur internet Smartphone produits high-tech aux meilleurs prix. Comparez et achetez en livraison rapide à domicile`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.GATSBY_ACCESS_TOKEN,
        spaceId: process.env.GATSBY_SPACE_ID,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `ettissalet-othmani`,
        short_name: `ettissalet-othmani.com`,
        start_url: `https://www.ettissalet-othmani.com/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "src/images/eo.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
