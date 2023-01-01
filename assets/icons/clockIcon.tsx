import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function ClockIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G data-name="01 align center">
        <Path d="M12 24a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0012 2z" />
        <Path d="M7.947 15.598l-1.061-1.696L11 11.325V6h2v6.433l-5.053 3.165z" />
      </G>
    </Svg>
  );
}
