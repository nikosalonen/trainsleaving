module.exports = {
  siteMetadata: {
    title: `Lähtevät junat - vain sinulle tärkeät lähdöt`,
    description: `Katso lähtöajat vain niille junille jotka pysähtyvät sinun määränpäässäsi.`,
    url: `https://lahtevat.info`,
    siteUrl: `https://lahtevat.info`,
    thumbnail: ``,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://lahtevat.info`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lähtevät junat`,
        short_name: `Lähtevät`,
        start_url: `/`,
        background_color: `#8d449b`,
        theme_color: `#8d449b`,
        display: `minimal-ui`,
        icon: `src/images/Juna.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-128638877-1`,
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        cookieDomain: `lahtevat.info`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
