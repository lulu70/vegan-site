import React from "react"
import styled from "styled-components"
import { SECOND_COLOR, MAIN_FONT_SIZE, GREY } from "../constants"
import NutritionalValues from "./NutritionalValues"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import PrintSvg from "../../content/assets/print.svg"
import ExternalLink from "./ExternalLink"
import shortUuid from "short-uuid"
const Container = styled.div`
  padding-top: 6rem;
  margin-top: -6rem;
`
const InnerContainer = styled.div`
  font-size: ${MAIN_FONT_SIZE};
  border: dashed 1px ${SECOND_COLOR};
  padding: 1rem;
`
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: dashed 1px;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
`
const TopColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const PrintLink = styled(Link)`
  width: 60px;
  color: ${SECOND_COLOR};
  background-color: ${GREY};
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`
const StyledImage = styled(GatsbyImage)`
  width: 128px;
  height: 72px;
`
const PrintView = ({ fileName, noPrintButton, setImageLoaded, post }) => {
  return post ? (
    <Container id="printView__innerContainer">
      <InnerContainer>
        <TopRow>
          <TopColumn>
            <h2>{post.frontmatter.title}</h2>
            <NutritionalValues
              values={post.frontmatter.ingredients[0].nutritionalValues}
            />
            {!noPrintButton && (
              <PrintLink
                to={`/app/print`}
                state={{ post }}
                data-test-id="printView__printLink"
              >
                Print
                <PrintSvg />
              </PrintLink>
            )}
          </TopColumn>
          <ExternalLink to={post.frontmatter.images[0].publicURL}>
            <StyledImage
              fluid={post.frontmatter.images[0].childImageSharp.fluid}
              title={post.frontmatter.images[0].name}
              alt={post.frontmatter.images[0].name}
              onLoad={() => {
                if (setImageLoaded) setImageLoaded(true)
              }}
            />
          </ExternalLink>
        </TopRow>
        {post.frontmatter.ingredients &&
          post.frontmatter.ingredients.map((list, index) => (
            <React.Fragment key={shortUuid.generate()}>
              <h3>{list.title || "Ingredients"}</h3>
              {index !== 0 && list.nutritionalValues && (
                <NutritionalValues values={list.nutritionalValues} />
              )}
              <ul>
                {list.items.map((item) => (
                  <li key={shortUuid.generate()}>{item}</li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        {post.frontmatter.instructions &&
          post.frontmatter.instructions.map((list) => (
            <React.Fragment key={shortUuid.generate()}>
              <h3>{list.title || "Let's start"}</h3>
              <ol>
                {list.items.map((item) => (
                  <li key={shortUuid.generate()}>{item}</li>
                ))}
              </ol>
            </React.Fragment>
          ))}
        <span>Enjoy!</span>
      </InnerContainer>
    </Container>
  ) : (
    <span />
  )
}

export default PrintView
