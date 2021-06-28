import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function ShopIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M24 10L21.8 0H2.2L.024 9.783 0 11a3.966 3.966 0 001 2.618V21a3 3 0 003 3h16a3 3 0 003-3v-7.382A3.966 3.966 0 0024 11zm-22 .109L3.8 2H7v4h2V2h6v4h2V2h3.2l1.8 8.109V11a2 2 0 01-2 2h-1a2 2 0 01-2-2h-2a2 2 0 01-2 2h-2a2 2 0 01-2-2H7a2 2 0 01-2 2H4a2 2 0 01-2-2zM20 22H4a1 1 0 01-1-1v-6.142A3.939 3.939 0 004 15h1a3.975 3.975 0 003-1.382A3.975 3.975 0 0011 15h2a3.99 3.99 0 003-1.357A3.99 3.99 0 0019 15h1a3.939 3.939 0 001-.142V21a1 1 0 01-1 1z"
        data-name="01 align center"
      />
    </Svg>
  )
}

export { ShopIcon }
