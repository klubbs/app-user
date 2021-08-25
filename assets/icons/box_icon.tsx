import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function BoxIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G data-name="01 align center">
        <Path d="M24 3a3 3 0 00-3-3H3a3 3 0 00-3 3v6h1v15h22V9h1zM2 3a1 1 0 011-1h18a1 1 0 011 1v4H2zm19 19H3V9h18z" />
        <Path d="M8 12h8v2H8z" />
      </G>
    </Svg >
  )
}

export { BoxIcon }
