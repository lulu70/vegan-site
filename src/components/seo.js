/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  description,
  lang,
  meta,
  title,
  image,
  recipe,
  author,
  date,
  updatedDate,
  nutritionalValues,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            siteUrl
          }
        }
      }
    `
  )
  const metaTitle = title ? title : site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl
  const metaImageUrl = image
    ? `${siteUrl}${image.publicURL}`
    : `${siteUrl}${site.siteMetadata.image}`
  const metaImageWidth = image ? image.childImageSharp.original.width : 1920
  const metaImageHeight = image ? image.childImageSharp.original.height : 1080
  const metaAuthor = author ? author.title : site.siteMetadata.author

  const schemaOrg = {
    "@context": "https://schema.org/",
    "@type": recipe ? "Recipe" : "Website",
    name: metaTitle,
    image: [metaImageUrl],
    author: {
      "@type": "Person",
      name: metaAuthor,
    },
    datePublished: date,
    dateModified: updatedDate,
    description: metaDescription,
    // recipeCuisine: "American",
    // prepTime: "PT1M",
    // cookTime: "PT2M",
    // totalTime: "PT3M",
    // keywords: "non-alcoholic",
    // recipeYield: 6,
    // recipeCategory: "Drink",
    nutrition: {
      "@type": "NutritionInformation",
      calories: nutritionalValues ? nutritionalValues.cal : "",
    },
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "5",
    //   ratingCount: "18",
    // },
    // recipeIngredient: [
    //   "2 cups of pineapple juice",
    //   "5/8 cup cream of coconut",
    //   "ice",
    // ],
    // recipeInstructions: [
    //   {
    //     "@type": "HowToStep",
    //     text:
    //       "Blend 2 cups of pineapple juice and 5/8 cup cream of coconut until smooth.",
    //   },
    //   {
    //     "@type": "HowToStep",
    //     text: "Fill a glass with ice.",
    //   },
    //   {
    //     "@type": "HowToStep",
    //     text: "Pour the pineapple juice and coconut mixture over ice.",
    //   },
    // ],
    // video: {
    //   "@type": "VideoObject",
    //   name: "How to make a Party Coffee Cake",
    //   description: "This is how you make a Party Coffee Cake.",
    //   thumbnailUrl: [
    //     "https://example.com/photos/1x1/photo.jpg",
    //     "https://example.com/photos/4x3/photo.jpg",
    //     "https://example.com/photos/16x9/photo.jpg",
    //   ],
    //   contentUrl: "http://www.example.com/video123.mp4",
    //   embedUrl: "http://www.example.com/videoplayer?video=123",
    //   uploadDate: "2018-02-05T08:00:00+08:00",
    //   duration: "PT1M33S",
    //   interactionStatistic: {
    //     "@type": "InteractionCounter",
    //     interactionType: { "@type": "http://schema.org/WatchAction" },
    //     userInteractionCount: 2347,
    //   },
    //   expires: "2019-02-05T08:00:00+08:00",
    // },
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        {
          name: `image`,
          content: metaImageUrl,
        },
        {
          property: `og:image`,
          content: metaImageUrl,
        },
        {
          property: `og:image:width`,
          content: metaImageWidth,
        },
        {
          property: `og:image:height`,
          content: metaImageHeight,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: metaAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
