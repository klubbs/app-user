import React from 'react';
import COLORS from '../../../../assets/constants/colors'

import { Wrapper, Container, StablishmentName, Image, ContainerBadges, ContainerDescriptions, OpenCloseBadge } from './styles';
import IconText from '../icon_text'
import BadgesLine from "../badges_line"
import { IStablishmentCard } from './params';


const StablishmentCard: React.FC<IStablishmentCard> = (props) => {
  return (

    <Wrapper onPress={props.onPress}>
      <Image source={{ uri: props.uri }}>
        <OpenCloseBadge />
      </Image>
      <Container>
        <StablishmentName>{props.title}</StablishmentName>
        <ContainerDescriptions>
          <IconText icon={'star'} color={COLORS.COLOR_YELLOW} description={'4.5 / 5'} />
          <IconText icon={'tag'} color={COLORS.COLOR_YELLOW} description={'10 Cupons'} />
        </ContainerDescriptions>
        <ContainerBadges>
          <BadgesLine text={"Churrascaria"} color={COLORS.COLOR_YELLOW} />
        </ContainerBadges>
      </Container>
    </Wrapper >
  );
}

export default StablishmentCard;
