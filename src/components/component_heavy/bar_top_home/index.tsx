import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";
import COLORS from '../../../../assets/constants/colors';

import { WelcomeName, Wrapper, Circle } from './styles';
import styled from "styled-components";



const BarTopHome: React.FC = () => {
  return (
    <Wrapper >
      {/* <WelcomeName>Ola, Adônis</WelcomeName> */}
      <Circle>
        <Feather name="package" size={22} color={COLORS.COLOR_WHITE} />
      </Circle>
    </Wrapper>
  );
}

export default BarTopHome;
