import React from "react"
import RSC from "react-scrollbars-custom"
import PropTypes from "prop-types"
import { GREY, SECOND_COLOR } from "../constants"

const ScrollArea = ({ contentStyles, ...rest }) => {
  return (
    <RSC
      {...rest}
      disableTracksWidthCompensation
      trackYProps={{
        style: {
          backgroundColor: "transparent",
          width: "8px",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: SECOND_COLOR,
          width: "8px",
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
