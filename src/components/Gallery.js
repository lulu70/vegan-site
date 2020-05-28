import React from "react"
import Image from "./Image"
import styled from "styled-components"
import { SECOND_COLOR } from "../constants"
import ScrollArea from "./ScrollArea"

const StyledImage = styled(Image)`
  padding-top: 50%;
  height: 0;
`
const ThumbnailRow = styled.div`
  height: 60px;
`
const ImageWrapper = styled.div``

const ThumbnailImage = styled(Image)`
  margin: 0.2rem 0.2rem 0 0;
  width: 80px;
  height: 50px;
  border-bottom: ${(props) =>
    props.activeImage ? `solid ${SECOND_COLOR} 2px` : "none"};
  img {
    padding-bottom: 1px;
  }
`
const Gallery = ({ images }) => {
  const [currentImage, setCurrentImage] = React.useState(
    images ? images[0] : ""
  )
  if (!images) return null
  return (
    <>
      <StyledImage filename={currentImage} />
      <ThumbnailRow>
        <ScrollArea contentStyles={{ display: "inline-flex" }} noScrollY>
          {images.map((image, index) => (
            <ImageWrapper
              key={index}
              onClick={() => {
                setCurrentImage(image)
              }}
            >
              <ThumbnailImage
                filename={image}
                unlink
                activeImage={image === currentImage}
              />
            </ImageWrapper>
          ))}
        </ScrollArea>
      </ThumbnailRow>
    </>
  )
}

export default Gallery
