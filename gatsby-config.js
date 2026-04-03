module.exports = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: false,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'zxx'
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: process.env.STRAPI_API_URL || `http://strapi:1337`, // Updated to use `http://strapi:1337`
      apiURL: `http://localhost:1337`,
        queryLimit: 1000,
        collectionTypes: [
          "testimonials",
          "partners",
          "blogs",
          "blog-categories",
          "heropage-slider",
          "projects",
          "company-features",
          "technologies",
          "company-history",
          "company-values",
          "Why-srashtasofts",
          "vacancies",
          "life-at-companies",
          "hire-a-teams",
          "recent-works",
          "abouts",
        ],
        singleTypes: ["company-information", "company-highlight"],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -120
      }
    },
  ],
}
