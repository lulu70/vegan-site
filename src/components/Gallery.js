import React from "react"
import Image from "./Image"
import styled from "styled-components"
import { SECOND_COLOR, GREY } from "../constants"
import ScrollArea from "./ScrollArea"
import NextSvg from "../../content/assets/next.svg"
import BackSvg from "../../content/assets/back.svg"

const Container = styled.div`
  margin-bottom: 1rem;
`
const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 0.2rem;
`
const StyledImage = styled(Image)`
  padding-top: 50%;
  height: 0;
  z-index: 1;
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
`
const ThumbnailRow = styled.div`
  height: 60px;
`
const ImageButton = styled.button`
  padding: 0.1rem;
  z-index: 2;
  border: none;
`

const ThumbnailImage = styled(Image)`
  width: 80px;
  height: 50px;
  border-bottom: ${(props) =>
    props.activeImage ? `solid ${SECOND_COLOR} 2px` : "none"};
  img {
    padding-bottom: 1px;
  }
`
const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  z-index: 2;
  cursor: pointer;
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
  const currentImage = images[currentImageIndex]
  if (!images) return null
  return (
    <Container>
      <ImageContainer>
        <StyledImage filename={currentImage} />
        <Overlay>
          <Button
            onClick={() => {
              setCurrentImageIndex(currentImageIndex - 1)
            }}
            disabled={currentImageIndex === 0}
            title="back"
          >
            <StyledBackSvg disabled={currentImageIndex === 0} />
          </Button>
          <Button
            onClick={() => {
              setCurrentImageIndex(currentImageIndex + 1)
            }}
            disabled={currentImageIndex === images.length - 1}
            title="next"
          >
            <StyledNextSvg disabled={currentImageIndex === images.length - 1} />
          </Button>
        </Overlay>
      </ImageContainer>
      <ThumbnailRow>
        <ScrollArea contentStyles={{ display: "inline-flex" }} noScrollY>
          {images.map((image, index) => (
            <ImageButton
              key={index}
              onClick={() => {
                setCurrentImageIndex(index)
              }}
            >
              <ThumbnailImage
                filename={image}
                unlink
                activeImage={image === currentImage}
              />
            </ImageButton>
          ))}
        </ScrollArea>
      </ThumbnailRow>
    </Container>
  )
}

export default Gallery
