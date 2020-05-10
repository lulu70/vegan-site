import React from "react"
import RSC from "react-scrollbars-custom"
import PropTypes from "prop-types"

const ScrollArea = ({ contentStyles, scrollTop, ...rest }) => {
  return (
    <RSC
      {...rest}
      scrollTop={scrollTop}
      disableTracksWidthCompensation
      trackYProps={{
        style: {
          backgroundColor: "transparent",
          width: "2px",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: "#d4d0d0",
          width: "4px",
        },
      }}
      contentProps={{
        style: contentStyles,
      }}
    />
  )
}

ScrollArea.propTypes = {
  contentStyles: PropTypes.object,
  scrollTop: PropTypes.number,
}

export default ScrollArea
