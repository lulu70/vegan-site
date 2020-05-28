import React from "react"
import RSC from "react-scrollbars-custom"
import PropTypes from "prop-types"
import { GREY } from "../constants"

const ScrollArea = ({ contentStyles, ...rest }) => {
  return (
    <RSC
      {...rest}
      disableTracksWidthCompensation
      trackYProps={{
        style: {
          backgroundColor: "transparent",
          width: "2px",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: GREY,
          width: "2px",
        },
      }}
      trackXProps={{
        style: {
          backgroundColor: "transparent",
          height: "2px",
        },
      }}
      thumbXProps={{
        style: {
          backgroundColor: GREY,
          height: "2px",
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
}

export default ScrollArea
