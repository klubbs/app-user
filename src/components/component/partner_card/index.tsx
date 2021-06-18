import React from 'react';
import { View } from 'react-native';
import { Feather } from "@expo/vector-icons";

import { Wrapper, Image, WrapperImage, ContainerDescription, ContainerTexts, ContainerSocialMidias, PartnerName, Coupons } from './styles';
import COLORS from '../../../../assets/constants/colors';
import styled from "styled-components";





const PartnerCard: React.FC = () => {
  return (
    <Wrapper >
      <WrapperImage >
        <Image source={{ uri: "https://yt3.ggpht.com/ytc/AAUvwniRYZJAnDuZv0bHVkRWorCYYacm49zD_84SnCR1Pg=s900-c-k-c0x00ffffff-no-rj" }} />
        <Feather name={"heart"} size={20} color={COLORS.COLOR_YELLOW} />
      </WrapperImage>
      <ContainerDescription >
        <ContainerTexts >
          <PartnerName>Gabriel Bruno</PartnerName>
          <Coupons>+100 Cupons</Coupons>
        </ContainerTexts>
        <ContainerSocialMidias >
          <Feather name={"instagram"} size={14} color={COLORS.COLOR_BLACK} />
          <Feather name={"twitter"} size={14} color={COLORS.COLOR_BLACK} />
        </ContainerSocialMidias>
      </ContainerDescription>
    </Wrapper >
  );
}

export default PartnerCard;
