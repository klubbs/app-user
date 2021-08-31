import * as React from "react"
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function InfoIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G data-name="01 align center">
        <Path d="M12 24a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0012 2z" />
        <Path d="M14 19h-2v-7h-2v-2h2a2 2 0 012 2z" />
        <Circle cx={12} cy={6.5} r={1.5} />
      </G>
    </Svg>
  )
}
