import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

function UserIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props} >
      <G data-name="01 align center">
        <Path d="M21 24h-2v-5.043A2.96 2.96 0 0016.043 16H7.957A2.96 2.96 0 005 18.957V24H3v-5.043A4.963 4.963 0 017.957 14h8.086A4.963 4.963 0 0121 18.957zM12 12a6 6 0 116-6 6.006 6.006 0 01-6 6zm0-10a4 4 0 104 4 4 4 0 00-4-4z" />
      </G>
    </Svg>
  )
}

export { UserIcon }
