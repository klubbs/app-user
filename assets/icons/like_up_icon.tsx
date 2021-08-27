import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function LikeUpIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M15.021 7l.336-2.041a3.044 3.044 0 00-4.208-3.287 3.139 3.139 0 00-1.567 1.553L7.717 7H3a3 3 0 00-3 3v9a3 3 0 003 3h19.018L24 10.963 24.016 7zM2 19v-9a1 1 0 011-1h4v11H3a1 1 0 01-1-1zm20-8.3L20.33 20H9V8.909l2.419-4.9a1.07 1.07 0 011.722-.209 1.024 1.024 0 01.233.84L12.655 9H22z"
        data-name="01 align center"
      />
    </Svg>
  )
}

export { LikeUpIcon }
