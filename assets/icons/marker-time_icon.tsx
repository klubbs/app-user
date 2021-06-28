import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function MarkerTimeIcon(props: SvgProps) {
  return (
    <Svg
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M12 23.994l-7.063-6.909A10 10 0 1119.071 2.936a10.011 10.011 0 010 14.142zm0-21.988a8 8 0 00-5.657 13.658L12 21.2l5.665-5.54A8 8 0 0012 2.006zM12 16a6 6 0 116-6 6.006 6.006 0 01-6 6zm0-10a4 4 0 104 4 4 4 0 00-4-4zm2.207 4.793L13 9.586V7h-2v3.414l1.793 1.793z" />
    </Svg>
  )
}

export { MarkerTimeIcon }
