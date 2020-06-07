import React from "react"
import styled from "styled-components"
import { SECOND_COLOR, GREY, BG_COLOR } from "../constants"
import ScrollArea from "./ScrollArea"
import NextSvg from "../../content/assets/next.svg"
import BackSvg from "../../content/assets/back.svg"
import GatsbyImage from "gatsby-image"
import ExternalLink from "./ExternalLink"

const Container = styled.div`
  margin-bottom: 1rem;
`
const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 0.2rem;
`
const StyledImage = styled(GatsbyImage)`
  padding-top: 56.25%;
  height: 0;
  z-index: 1;
`
const ThumbnailImage = styled(GatsbyImage)`
  width: 80px;
  height: 50px;
  border-bottom: ${(props) =>
    props.activeImage ? `solid ${SECOND_COLOR} 2px` : "none"};
  img {
    padding-bottom: 1px;
  }
`
const ThumbnailRow = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ImageButton = styled.button`
  padding: 0.1rem;
  z-index: 2;
  border: none;
`

const NavigateButton = styled.button`
  background-color: ${BG_COLOR};
  border: none;
  z-index: 2;
  cursor: pointer;
  height: 50px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: ${(prop) => (prop.next ? "flex-end" : "flex-start")};
  padding: 0;
`
const StyledBackSvg = styled(BackSvg)`
  path {
    stroke: ${(props) => (props.disabled ? GREY : SECOND_COLOR)};
  }
`
const StyledNextSvg = styled(NextSvg)`
  path {
    stroke: ${(props) => (props.disabled ? GREY : SECOND_COLOR)};
  }
`
const Gallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const thumbnailsRef = React.useRef(images.map(() => React.createRef()))
  React.useEffect(() => {
    thumbnailsRef.current[currentImageIndex].current.scrollIntoView(false)
  }, [currentImageIndex])
  const currentImage = images[currentImageIndex]
  if (!images) return null
  return (
    <Container>
      <ImageContainer>
        <ExternalLink to={currentImage.childImageSharp.original.src}>
          <StyledImage
            fluid={currentImage.childImageSharp.fluid}
            title={currentImage.name}
            alt={currentImage.name}
          />
        </ExternalLink>
      </ImageContainer>
      <ThumbnailRow>
        <NavigateButton
          onClick={() => {
            setCurrentImageIndex(currentImageIndex - 1)
          }}
          disabled={currentImageIndex === 0}
          title="back"
        >
          <StyledBackSvg disabled={currentImageIndex === 0} />
        </NavigateButton>
        <ScrollArea contentStyles={{ display: "inline-flex" }} noScrollY>
          {images.map((image, index) => (
            <ImageButton
              key={index}
              ref={thumbnailsRef.current[index]}
              onClick={() => {
                setCurrentImageIndex(index)
              }}
            >
              <ThumbnailImage
                fluid={image.childImageSharp.fluid}
                title={image.name}
                alt={image.name}
                activeImage={index === currentImageIndex}
              />
            </ImageButton>
          ))}
        </ScrollArea>
        <NavigateButton
          onClick={() => {
            setCurrentImageIndex(currentImageIndex + 1)
          }}
          next={true}
          disabled={currentImageIndex === images.length - 1}
          title="next"
        >
          <StyledNextSvg disabled={currentImageIndex === images.length - 1} />
        </NavigateButton>
      </ThumbnailRow>
    </Container>
  )
}

export default Gallery
