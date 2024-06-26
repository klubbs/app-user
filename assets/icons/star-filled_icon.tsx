import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function StarFilledIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path d="M1.327 12.4l3.56 2.6-1.352 4.187A3.178 3.178 0 004.719 22.8a3.177 3.177 0 003.8-.019L12 20.219l3.482 2.559a3.227 3.227 0 004.983-3.591L19.113 15l3.56-2.6a3.227 3.227 0 00-1.9-5.832H16.4l-1.327-4.136a3.227 3.227 0 00-6.146 0L7.6 6.568H3.231a3.227 3.227 0 00-1.9 5.832z" />
    </Svg>
  )
}

export { StarFilledIcon }
