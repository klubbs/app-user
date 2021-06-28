import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function CouponIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G data-name="01 align center">
        <Path d="M18 0h-4v1a2 2 0 01-4 0V0H6a3 3 0 00-3 3v21h7v-1a2 2 0 014 0v1h7V3a3 3 0 00-3-3zm-2.126 22a4 4 0 00-7.748 0H5v-5h3v-2H5V3a1 1 0 011-1h2.126a4 4 0 007.748 0H18a1 1 0 011 1v12h-3v2h3v5z" />
        <Path d="M10 15h4v2h-4z" />
      </G>
    </Svg>
  )
}

export { CouponIcon }
